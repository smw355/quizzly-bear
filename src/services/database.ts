import type { GamePack, Team, Round, DatabaseGamePack, DatabaseRound, DatabaseTeam } from '../types';

class DatabaseService {
  private get api() {
    if (typeof window !== 'undefined' && window.electronAPI) {
      return window.electronAPI;
    }
    throw new Error('Electron API not available');
  }

  // Game Pack operations
  async getGamePacks(): Promise<GamePack[]> {
    try {
      const packs = await this.api.getGamePacks();
      return packs.map(this.mapDbPackToGamePack);
    } catch (error) {
      console.error('Failed to get game packs:', error);
      return [];
    }
  }

  async getGamePack(id: number): Promise<GamePack | null> {
    try {
      const pack = await this.api.getGamePack(id);
      if (!pack) return null;
      return this.mapDbPackToGamePack(pack);
    } catch (error) {
      console.error('Failed to get game pack:', error);
      return null;
    }
  }

  async createGamePack(pack: Omit<GamePack, 'id' | 'created_at' | 'active'>): Promise<GamePack | null> {
    try {
      const result = await this.api.createGamePack({
        name: pack.name,
        version: pack.version,
        author: pack.author,
        description: pack.description,
        total_rounds: pack.total_rounds
      });
      
      if (result && result.lastInsertRowid) {
        return await this.getGamePack(result.lastInsertRowid);
      }
      return null;
    } catch (error) {
      console.error('Failed to create game pack:', error);
      return null;
    }
  }

  async createGamePackWithRounds(pack: Omit<GamePack, 'id' | 'created_at' | 'active'>, rounds: Round[]): Promise<GamePack | null> {
    try {
      // Create the pack first
      const createdPack = await this.createGamePack(pack);
      if (!createdPack || !createdPack.id) return null;

      // Create all the rounds
      for (const round of rounds) {
        await this.api.createPackRound({
          pack_id: createdPack.id,
          round_number: round.round_number,
          theme_name: round.theme_name,
          theme_description: round.theme_description,
          questions_json: JSON.stringify(round.questions)
        });
      }

      // Return the pack with rounds loaded
      return { ...createdPack, rounds };
    } catch (error) {
      console.error('Failed to create game pack with rounds:', error);
      return null;
    }
  }

  async getPackRounds(packId: number): Promise<Round[]> {
    try {
      const dbRounds = await this.api.getPackRounds(packId);
      return dbRounds.map(this.mapDbRoundToRound);
    } catch (error) {
      console.error('Failed to get pack rounds:', error);
      return [];
    }
  }

  // Team operations
  async getTeams(): Promise<Team[]> {
    try {
      const teams = await this.api.getTeams();
      return teams.map(this.mapDbTeamToTeam);
    } catch (error) {
      console.error('Failed to get teams:', error);
      return [];
    }
  }

  async createTeam(name: string): Promise<Team | null> {
    try {
      const result = await this.api.createTeam(name);
      if (result && result.lastInsertRowid) {
        return {
          id: result.lastInsertRowid,
          name,
          total_games: 0,
          total_wins: 0,
          win_percentage: 0
        };
      }
      return null;
    } catch (error) {
      console.error('Failed to create team:', error);
      return null;
    }
  }

  async updateTeamStats(teamId: number, won: boolean): Promise<void> {
    try {
      await this.api.updateTeamStats(teamId, won);
    } catch (error) {
      console.error('Failed to update team stats:', error);
    }
  }

  // Game operations
  async createGame(packId: number, totalRounds: number): Promise<number | null> {
    try {
      const result = await this.api.createGame(packId, totalRounds);
      return result ? result.lastInsertRowid : null;
    } catch (error) {
      console.error('Failed to create game:', error);
      return null;
    }
  }

  async saveRoundScores(gameId: number, roundNumber: number, teamScores: Record<string, number>): Promise<void> {
    try {
      await this.api.saveRoundScores(gameId, roundNumber, teamScores);
    } catch (error) {
      console.error('Failed to save round scores:', error);
    }
  }

  async getRoundScores(gameId: number, roundNumber: number): Promise<Record<string, number>> {
    try {
      return await this.api.getRoundScores(gameId, roundNumber);
    } catch (error) {
      console.error('Failed to get round scores:', error);
      return {};
    }
  }

  async updateGameWinner(gameId: number, winningTeamId: number): Promise<void> {
    try {
      await this.api.updateGameWinner(gameId, winningTeamId);
    } catch (error) {
      console.error('Failed to update game winner:', error);
    }
  }

  // Helper methods to map database objects to app types
  private mapDbPackToGamePack(dbPack: DatabaseGamePack): GamePack {
    return {
      id: dbPack.id,
      name: dbPack.name,
      version: dbPack.version,
      author: dbPack.author,
      description: dbPack.description,
      total_rounds: dbPack.total_rounds,
      active: Boolean(dbPack.active),
      created_at: dbPack.created_at,
      rounds: [] // Will be loaded separately when needed
    };
  }

  private mapDbRoundToRound(dbRound: DatabaseRound): Round {
    return {
      round_number: dbRound.round_number,
      theme_name: dbRound.theme_name,
      theme_description: dbRound.theme_description,
      questions: JSON.parse(dbRound.questions_json)
    };
  }

  private mapDbTeamToTeam(dbTeam: DatabaseTeam): Team {
    return {
      id: dbTeam.id,
      name: dbTeam.name,
      total_games: dbTeam.total_games,
      total_wins: dbTeam.total_wins,
      win_percentage: dbTeam.win_percentage || 0
    };
  }
}

export const databaseService = new DatabaseService();