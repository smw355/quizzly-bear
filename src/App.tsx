import { useState, useEffect } from 'react';
import type { GameState, GamePack, Team, Round } from './types';
import { GamePackSelector, TeamSetup } from './components/setup';
import { PackManagement, PackEditor } from './components/management';
import { bearEssentialsRounds } from './data/bearEssentials';
import { quirkyQuestionsRounds } from './data/quirkyQuestions';
import { GameFlow } from './components/GameFlow';
import { GameLogic } from './utils/gameLogic';
import { databaseService } from './services/database';

type AppPhase = 'pack_selection' | 'team_setup' | 'game_playing' | 'pack_management' | 'pack_editing';

function App() {
  const [appPhase, setAppPhase] = useState<AppPhase>('pack_selection');
  const [selectedPack, setSelectedPack] = useState<GamePack | null>(null);
  const [selectedRounds, setSelectedRounds] = useState<Round[]>([]);
  const [currentGame, setCurrentGame] = useState<GameState | null>(null);
  const [editingPack, setEditingPack] = useState<GamePack | null>(null);
  
  // Data loaded from database
  const [availablePacks, setAvailablePacks] = useState<GamePack[]>([]);
  const [availableTeams, setAvailableTeams] = useState<Team[]>([]);
  const [currentGameId, setCurrentGameId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Load data from database on app start
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [packs, teams] = await Promise.all([
        databaseService.getGamePacks(),
        databaseService.getTeams()
      ]);
      
      // Load rounds for each pack
      const packsWithRounds = await Promise.all(
        packs.map(async (pack) => {
          if (pack.id) {
            const rounds = await databaseService.getPackRounds(pack.id);
            return { ...pack, rounds };
          }
          return pack;
        })
      );
      
      setAvailablePacks(packsWithRounds);
      setAvailableTeams(teams);
    } catch (error) {
      console.error('Failed to load data:', error);
      // Fallback to built-in packs if database fails
      setAvailablePacks([
        {
          id: 1,
          name: "Bear Essentials",
          version: "1.0",
          author: "Quizzly Bear Team",
          description: "10 bear-themed rounds perfect for any pub quiz night",
          total_rounds: 10,
          rounds: bearEssentialsRounds,
          active: true,
        },
        {
          id: 2,
          name: "Quizzlies Quirky Questions Vol 1",
          version: "1.0",
          author: "Quizzly Bear Team",
          description: "10 wonderfully weird rounds where random knowledge meets delightful madness",
          total_rounds: 10,
          rounds: quirkyQuestionsRounds,
          active: true,
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePackSelected = (pack: GamePack, rounds: Round[]) => {
    setSelectedPack(pack);
    setSelectedRounds(rounds);
    setAppPhase('team_setup');
  };

  const handleTeamsSelected = async (teams: Team[]) => {
    if (selectedPack && selectedRounds.length > 0) {
      try {
        // First, ensure all teams are saved to the database
        const savedTeams: Team[] = [];
        for (const team of teams) {
          if (team.id && team.id < 1000000) {
            // This is an existing team with a real database ID
            savedTeams.push(team);
          } else {
            // This is a new team with a temporary ID, save it to database
            const savedTeam = await databaseService.createTeam(team.name);
            if (savedTeam) {
              savedTeams.push(savedTeam);
            } else {
              throw new Error(`Failed to create team: ${team.name}`);
            }
          }
        }

        // Create game in database
        const gameId = await databaseService.createGame(selectedPack.id!, selectedRounds.length);
        if (gameId) {
          setCurrentGameId(gameId);
          const gameState = GameLogic.initializeGame(selectedPack, savedTeams, selectedRounds, gameId);
          setCurrentGame(gameState);
          setAppPhase('game_playing');
        }
      } catch (error) {
        console.error('Failed to create game:', error);
      }
    }
  };

  const handleGameEnd = async (finalGameState: GameState) => {
    try {
      // Save final game results to database
      if (currentGameId && finalGameState.scores.length > 0) {
        // Find winning team from scores
        const sortedScores = [...finalGameState.scores].sort((a, b) => b.current_score - a.current_score);
        const winningScore = sortedScores[0];
        
        // Update game winner
        if (winningScore.team_id) {
          await databaseService.updateGameWinner(currentGameId, winningScore.team_id);
        }
        
        // Update team statistics
        for (const teamScore of finalGameState.scores) {
          if (teamScore.team_id) {
            const won = teamScore.team_id === winningScore.team_id;
            await databaseService.updateTeamStats(teamScore.team_id, won);
          }
        }
      }
      
      console.log('Game ended and saved:', finalGameState);
    } catch (error) {
      console.error('Failed to save game results:', error);
    }
    
    // Reset to pack selection for new game
    setCurrentGame(null);
    setCurrentGameId(null);
    setSelectedPack(null);
    setSelectedRounds([]);
    setAppPhase('pack_selection');
    
    // Reload teams to get updated statistics
    loadData();
  };

  const handleSaveProgress = async (gameState: GameState) => {
    try {
      // Save game progress to database
      if (currentGameId) {
        // Save current round scores from the scores array
        const teamScores: Record<string, number> = {};
        gameState.scores.forEach(score => {
          if (score.team_id) {
            teamScores[score.team_id.toString()] = score.current_score;
          }
        });
        
        await databaseService.saveRoundScores(
          currentGameId,
          gameState.current_round,
          teamScores
        );
      }
      
      console.log('Progress saved:', gameState);
      setCurrentGame(gameState);
    } catch (error) {
      console.error('Failed to save progress:', error);
      setCurrentGame(gameState);
    }
  };

  const handleManagePacks = () => {
    setAppPhase('pack_management');
  };

  const handleBackToPackSelection = () => {
    setAppPhase('pack_selection');
  };

  const handlePackImported = async (pack: GamePack) => {
    try {
      // Save imported pack to database
      const savedPack = await databaseService.createGamePackWithRounds(pack, pack.rounds || []);
      if (savedPack) {
        setAvailablePacks(prev => [...prev, savedPack]);
      }
    } catch (error) {
      console.error('Failed to import pack:', error);
    }
  };

  const handlePackDeleted = (packId: number) => {
    setAvailablePacks(prev => prev.filter(p => p.id !== packId));
  };

  const handlePackEdited = (pack: GamePack) => {
    setEditingPack(pack);
    setAppPhase('pack_editing');
  };

  const handlePackSaved = async (pack: GamePack, rounds: Round[]) => {
    try {
      const packWithRounds = { ...pack, rounds };
      
      if (pack.id && availablePacks.some(p => p.id === pack.id)) {
        // Update existing pack (TODO: implement update functionality)
        setAvailablePacks(prev => prev.map(p => p.id === pack.id ? packWithRounds : p));
      } else {
        // Add new pack
        const savedPack = await databaseService.createGamePackWithRounds(pack, rounds);
        if (savedPack) {
          setAvailablePacks(prev => [...prev, savedPack]);
        }
      }
      setAppPhase('pack_management');
      setEditingPack(null);
    } catch (error) {
      console.error('Failed to save pack:', error);
    }
  };

  const handlePackEditCancelled = () => {
    setAppPhase('pack_management');
    setEditingPack(null);
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-honey-100 to-forest-100">
        <div className="text-center">
          <div className="text-6xl mb-4">🐻</div>
          <h1 className="text-2xl font-bold text-forest-800 mb-4">Loading Quizzly Bear...</h1>
          <p className="text-gray-600">Setting up your quiz database</p>
        </div>
      </div>
    );
  }

  const renderCurrentPhase = () => {
    switch (appPhase) {
      case 'pack_selection':
        return (
          <GamePackSelector
            availablePacks={availablePacks}
            onPackSelected={handlePackSelected}
            onManagePacks={handleManagePacks}
          />
        );

      case 'team_setup':
        return (
          <TeamSetup
            availableTeams={availableTeams}
            onTeamsSelected={handleTeamsSelected}
            onBack={handleBackToPackSelection}
          />
        );

      case 'game_playing':
        if (!currentGame) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
                <p className="text-gray-600 mb-4">No game state found</p>
                <button
                  onClick={handleBackToPackSelection}
                  className="px-6 py-3 bg-honey-500 text-white rounded-lg hover:bg-honey-600"
                >
                  Back to Home
                </button>
              </div>
            </div>
          );
        }
        
        return (
          <GameFlow
            initialGameState={currentGame}
            onGameEnd={handleGameEnd}
            onSaveProgress={handleSaveProgress}
          />
        );

      case 'pack_management':
        return (
          <PackManagement
            availablePacks={availablePacks}
            onPackImported={handlePackImported}
            onPackDeleted={handlePackDeleted}
            onPackEdited={handlePackEdited}
            onBack={handleBackToPackSelection}
          />
        );

      case 'pack_editing':
        return (
          <PackEditor
            pack={editingPack || undefined}
            onSave={handlePackSaved}
            onCancel={handlePackEditCancelled}
          />
        );

      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                Unknown App Phase
              </h1>
              <p className="text-gray-600">
                Current phase: {appPhase}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app">
      {renderCurrentPhase()}
      
      {/* Global keyboard shortcuts info */}
      {appPhase === 'game_playing' && (
        <div className="fixed bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded text-xs">
          F11: Fullscreen • Esc: Menu
        </div>
      )}
    </div>
  );
}

export default App;