import type { GameState, GamePhase, TeamScore, Round, Question, Team, GamePack } from '../types';

export class GameLogic {
  static initializeGame(
    gamePack: GamePack,
    teams: Team[],
    selectedRounds: Round[],
    gameId?: number
  ): GameState {
    const teamScores: TeamScore[] = teams.map((team) => {
      if (!team.id) {
        throw new Error(`Team '${team.name}' must have a database ID before starting a game`);
      }
      return {
        team_id: team.id,
        team_name: team.name,
        current_score: 0,
        round_score: 0,
      };
    });

    return {
      pack: gamePack,
      teams,
      current_round: 0,
      current_question: 0,
      current_phase: 'round_intro',
      rounds: selectedRounds,
      scores: teamScores,
      completed_rounds: 0,
      total_rounds: selectedRounds.length,
      game_id: gameId,
    };
  }

  static getNextPhase(currentPhase: GamePhase, isLastQuestion: boolean, isLastRound: boolean): GamePhase {
    switch (currentPhase) {
      case 'setup':
        return 'round_intro';
      case 'round_intro':
        return 'question';
      case 'question':
        if (isLastQuestion) {
          return 'answer_reveal';
        }
        return 'question';
      case 'answer_reveal':
        return 'score_entry';
      case 'score_entry':
        return 'leaderboard';
      case 'leaderboard':
        if (isLastRound) {
          return 'game_complete';
        }
        return 'round_intro';
      case 'game_complete':
        return 'game_complete';
      default:
        return currentPhase;
    }
  }

  static advanceGame(gameState: GameState): GameState {
    const currentRound = gameState.rounds[gameState.current_round];
    if (!currentRound) {
      throw new Error('No current round available');
    }
    const isLastQuestion = gameState.current_question >= currentRound.questions.length - 1;
    const isLastRound = gameState.current_round >= gameState.rounds.length - 1;

    const nextPhase = this.getNextPhase(gameState.current_phase, isLastQuestion, isLastRound);

    const newState = { ...gameState, current_phase: nextPhase };

    // Handle transitions that require updating counters
    switch (gameState.current_phase) {
      case 'question':
        if (!isLastQuestion && nextPhase === 'question') {
          newState.current_question = gameState.current_question + 1;
        }
        break;
      case 'leaderboard':
        if (!isLastRound) {
          newState.current_round = gameState.current_round + 1;
          newState.current_question = 0;
          newState.completed_rounds = gameState.completed_rounds + 1;
          // Reset round scores
          newState.scores = gameState.scores.map(score => ({
            ...score,
            round_score: 0,
          }));
        }
        break;
    }

    return newState;
  }

  static getCurrentQuestion(gameState: GameState): Question | null {
    if (gameState.current_round >= gameState.rounds.length) return null;
    
    const currentRound = gameState.rounds[gameState.current_round];
    if (gameState.current_question >= currentRound.questions.length) return null;
    
    return currentRound.questions[gameState.current_question];
  }

  static getCurrentRound(gameState: GameState): Round | null {
    if (gameState.current_round >= gameState.rounds.length) return null;
    return gameState.rounds[gameState.current_round];
  }

  static updateTeamScores(
    gameState: GameState,
    roundScores: Record<number, number>
  ): GameState {
    console.log('updateTeamScores Debug:', {
      currentScores: gameState.scores,
      roundScores: roundScores
    });

    const updatedScores = gameState.scores.map(teamScore => {
      const roundScore = roundScores[teamScore.team_id] || 0;
      const newScore = {
        ...teamScore,
        round_score: roundScore,
        current_score: teamScore.current_score + roundScore,
      };
      console.log(`Team ${teamScore.team_name}: ${teamScore.current_score} + ${roundScore} = ${newScore.current_score}`);
      return newScore;
    });

    console.log('Updated scores:', updatedScores);

    return {
      ...gameState,
      scores: updatedScores,
    };
  }

  static getLeaderboard(gameState: GameState): TeamScore[] {
    return [...gameState.scores].sort((a, b) => b.current_score - a.current_score);
  }

  static getWinningTeam(gameState: GameState): TeamScore | null {
    const leaderboard = this.getLeaderboard(gameState);
    return leaderboard.length > 0 ? leaderboard[0] : null;
  }

  static calculateClosestNumberWinner(
    answers: Record<number, string>,
    correctAnswer: number
  ): number[] {
    let closestTeams: number[] = [];
    let closestDistance = Infinity;

    Object.entries(answers).forEach(([teamIdStr, answerStr]) => {
      const teamId = parseInt(teamIdStr);
      const answer = parseFloat(answerStr);
      
      if (isNaN(answer)) return; // Skip invalid numbers
      
      const distance = Math.abs(answer - correctAnswer);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestTeams = [teamId];
      } else if (distance === closestDistance) {
        closestTeams.push(teamId);
      }
    });

    return closestTeams;
  }

  static isGameComplete(gameState: GameState): boolean {
    return gameState.current_phase === 'game_complete';
  }

  static getGameProgress(gameState: GameState): {
    roundProgress: number;
    questionProgress: number;
    overallProgress: number;
  } {
    const totalQuestions = gameState.rounds.reduce((sum, round) => sum + round.questions.length, 0);
    const completedQuestions = gameState.rounds
      .slice(0, gameState.current_round)
      .reduce((sum, round) => sum + round.questions.length, 0) + gameState.current_question;

    return {
      roundProgress: (gameState.current_round + 1) / gameState.total_rounds,
      questionProgress: gameState.current_round < gameState.rounds.length ? 
        gameState.current_question / Math.max(1, gameState.rounds[gameState.current_round].questions.length) : 0,
      overallProgress: completedQuestions / totalQuestions,
    };
  }
}