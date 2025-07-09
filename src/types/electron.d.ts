import type { DatabaseGamePack, DatabaseRound, DatabaseTeam, GamePack } from './index';

export interface ElectronAPI {
  // Game Pack operations
  getGamePacks: () => Promise<DatabaseGamePack[]>;
  getGamePack: (id: number) => Promise<DatabaseGamePack | null>;
  createGamePack: (pack: Omit<GamePack, 'id' | 'created_at'>) => Promise<{ lastInsertRowid: number } | null>;
  
  // Pack Round operations
  getPackRounds: (packId: number) => Promise<DatabaseRound[]>;
  createPackRound: (round: Omit<DatabaseRound, 'id' | 'usage_count' | 'last_used'>) => Promise<{ lastInsertRowid: number } | null>;
  
  // Team operations
  getTeams: () => Promise<DatabaseTeam[]>;
  createTeam: (name: string) => Promise<{ lastInsertRowid: number } | null>;
  updateTeamStats: (teamId: number, won: boolean) => Promise<{ changes: number } | null>;
  
  // Game operations
  createGame: (packId: number, totalRounds: number) => Promise<{ lastInsertRowid: number } | null>;
  saveRoundScores: (gameId: number, roundNumber: number, teamScores: Record<string, number>) => Promise<{ changes: number } | null>;
  getRoundScores: (gameId: number, roundNumber: number) => Promise<Record<string, number>>;
  updateGameWinner: (gameId: number, winningTeamId: number) => Promise<{ changes: number } | null>;
  
  // System operations
  openExternal: (url: string) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}