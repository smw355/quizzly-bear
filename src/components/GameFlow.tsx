import React, { useState, useEffect, useCallback } from 'react';
import type { GameState } from '../types';
import { GameLogic } from '../utils/gameLogic';
import { QuestionContainer } from './questions';
import { RoundIntro } from './game/RoundIntro';
import { RoundAnswers } from './game/RoundAnswers';
import { ScoreEntry } from './game/ScoreEntry';
import { SimpleLeaderboard } from './game/SimpleLeaderboard';
import { GameComplete } from './game/GameComplete';

interface Props {
  initialGameState: GameState;
  onGameEnd: (gameState: GameState) => void;
  onSaveProgress: (gameState: GameState) => void;
}

export const GameFlow: React.FC<Props> = ({
  initialGameState,
  onGameEnd,
  onSaveProgress,
}) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const handleNext = useCallback(() => {
    const newState = GameLogic.advanceGame(gameState);
    setGameState(newState);
    onSaveProgress(newState);

    // Don't automatically call onGameEnd when game completes
    // Let the GameComplete component handle this when user clicks "Start New Game"
  }, [gameState, onSaveProgress]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        handleNext();
      } else if (event.code === 'Escape') {
        event.preventDefault();
        // TODO: Add pause/menu functionality
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, handleNext]);

  const handleScoreSubmit = (roundScores: Record<number, number>) => {
    const updatedState = GameLogic.updateTeamScores(gameState, roundScores);
    const nextState = GameLogic.advanceGame(updatedState);
    setGameState(nextState);
    onSaveProgress(nextState);

    if (GameLogic.isGameComplete(nextState)) {
      onGameEnd(nextState);
    }
  };

  const renderCurrentPhase = () => {
    switch (gameState.current_phase) {
      case 'round_intro': {
        const currentRound = GameLogic.getCurrentRound(gameState);
        if (!currentRound) return <div>Error: No round found</div>;
        
        return (
          <RoundIntro
            round={currentRound}
            roundNumber={gameState.current_round + 1}
            totalRounds={gameState.total_rounds}
            onNext={handleNext}
          />
        );
      }

      case 'question': {
        const currentQuestion = GameLogic.getCurrentQuestion(gameState);
        const currentRoundForQuestion = GameLogic.getCurrentRound(gameState);
        if (!currentQuestion || !currentRoundForQuestion) {
          return <div>Error: No question found</div>;
        }
        
        return (
          <QuestionContainer
            question={currentQuestion}
            questionNumber={gameState.current_question + 1}
            totalQuestions={currentRoundForQuestion.questions.length}
            roundTheme={currentRoundForQuestion.theme_name}
            onNext={handleNext}
          />
        );
      }

      case 'answer_reveal': {
        const answerRound = GameLogic.getCurrentRound(gameState);
        if (!answerRound) {
          return <div>Error: No round found</div>;
        }
        
        return (
          <RoundAnswers
            round={answerRound}
            roundNumber={gameState.current_round + 1}
            totalRounds={gameState.total_rounds}
          />
        );
      }

      case 'score_entry': {
        const scoreRound = GameLogic.getCurrentRound(gameState);
        if (!scoreRound) return <div>Error: No round found</div>;
        
        return (
          <ScoreEntry
            teams={gameState.teams}
            round={scoreRound}
            roundNumber={gameState.current_round + 1}
            onSubmitScores={handleScoreSubmit}
          />
        );
      }

      case 'leaderboard': {
        const leaderboardScores = GameLogic.getLeaderboard(gameState);
        console.log('Leaderboard Debug:', { 
          gameState: gameState, 
          scores: gameState.scores, 
          leaderboardScores 
        });
        return (
          <SimpleLeaderboard
            scores={leaderboardScores}
            roundNumber={gameState.current_round + 1}
            totalRounds={gameState.total_rounds}
          />
        );
      }

      case 'game_complete': {
        const winner = GameLogic.getWinningTeam(gameState);
        return (
          <GameComplete
            winner={winner}
            finalScores={GameLogic.getLeaderboard(gameState)}
            onNewGame={() => onGameEnd(gameState)}
          />
        );
      }

      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                Unknown Game Phase
              </h1>
              <p className="text-gray-600">
                Current phase: {gameState.current_phase}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="game-flow">
      {renderCurrentPhase()}
      
      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 left-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs">
          <div>Phase: {gameState.current_phase}</div>
          <div>Round: {gameState.current_round + 1}/{gameState.total_rounds}</div>
          <div>Question: {gameState.current_question + 1}</div>
        </div>
      )}
    </div>
  );
};