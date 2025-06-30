import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';

export class QuizDatabase {
  private db: Database.Database;

  constructor(dbPath: string = 'quizzly-bear.db') {
    this.db = new Database(dbPath);
    this.initializeDatabase();
  }

  private initializeDatabase() {
    const schemaPath = join(__dirname, 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf8');
    
    this.db.exec(schema);
    
    console.log('Database initialized successfully');
  }

  // Game Pack methods
  createGamePack(pack: {
    name: string;
    version: string;
    author: string;
    description?: string;
    total_rounds: number;
  }) {
    const stmt = this.db.prepare(`
      INSERT INTO game_packs (name, version, author, description, total_rounds)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    return stmt.run(pack.name, pack.version, pack.author, pack.description, pack.total_rounds);
  }

  getGamePacks(activeOnly: boolean = true) {
    const stmt = this.db.prepare(`
      SELECT * FROM game_packs 
      ${activeOnly ? 'WHERE active = 1' : ''}
      ORDER BY created_at DESC
    `);
    
    return stmt.all();
  }

  getGamePack(id: number) {
    const stmt = this.db.prepare('SELECT * FROM game_packs WHERE id = ?');
    return stmt.get(id);
  }

  // Pack Rounds methods
  createPackRound(round: {
    pack_id: number;
    round_number: number;
    theme_name: string;
    theme_description?: string;
    questions_json: string;
  }) {
    const stmt = this.db.prepare(`
      INSERT INTO pack_rounds (pack_id, round_number, theme_name, theme_description, questions_json)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    return stmt.run(
      round.pack_id,
      round.round_number,
      round.theme_name,
      round.theme_description,
      round.questions_json
    );
  }

  getPackRounds(packId: number) {
    const stmt = this.db.prepare(`
      SELECT * FROM pack_rounds 
      WHERE pack_id = ? 
      ORDER BY round_number ASC
    `);
    
    return stmt.all(packId);
  }

  getLeastUsedRounds(packId: number, limit: number = 15) {
    const stmt = this.db.prepare(`
      SELECT * FROM pack_rounds 
      WHERE pack_id = ? 
      ORDER BY usage_count ASC, last_used ASC, round_number ASC
      LIMIT ?
    `);
    
    return stmt.all(packId, limit);
  }

  incrementRoundUsage(roundId: number) {
    const stmt = this.db.prepare(`
      UPDATE pack_rounds 
      SET usage_count = usage_count + 1, last_used = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);
    
    return stmt.run(roundId);
  }

  // Team methods
  createTeam(name: string) {
    const stmt = this.db.prepare(`
      INSERT INTO teams (name) VALUES (?)
    `);
    
    return stmt.run(name);
  }

  getTeams() {
    const stmt = this.db.prepare(`
      SELECT *, 
             CASE WHEN total_games > 0 THEN ROUND((total_wins * 100.0) / total_games, 1) ELSE 0 END as win_percentage
      FROM teams 
      ORDER BY last_played DESC, total_wins DESC
    `);
    
    return stmt.all();
  }

  getTeam(id: number) {
    const stmt = this.db.prepare('SELECT * FROM teams WHERE id = ?');
    return stmt.get(id);
  }

  updateTeamStats(teamId: number, won: boolean) {
    const stmt = this.db.prepare(`
      UPDATE teams 
      SET total_games = total_games + 1,
          total_wins = total_wins + ?,
          last_played = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    return stmt.run(won ? 1 : 0, teamId);
  }

  // Game methods
  createGame(packId: number, totalRounds: number = 15) {
    const stmt = this.db.prepare(`
      INSERT INTO games (pack_id, total_rounds) VALUES (?, ?)
    `);
    
    return stmt.run(packId, totalRounds);
  }

  updateGameWinner(gameId: number, winningTeamId: number) {
    const stmt = this.db.prepare(`
      UPDATE games SET winning_team_id = ? WHERE id = ?
    `);
    
    return stmt.run(winningTeamId, gameId);
  }

  updateGameProgress(gameId: number, completedRounds: number) {
    const stmt = this.db.prepare(`
      UPDATE games SET completed_rounds = ? WHERE id = ?
    `);
    
    return stmt.run(completedRounds, gameId);
  }

  // Game Scores methods
  saveRoundScores(gameId: number, roundNumber: number, teamScores: Record<string, number>) {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO game_scores (game_id, round_number, team_scores_json)
      VALUES (?, ?, ?)
    `);
    
    return stmt.run(gameId, roundNumber, JSON.stringify(teamScores));
  }

  getRoundScores(gameId: number, roundNumber: number) {
    const stmt = this.db.prepare(`
      SELECT team_scores_json FROM game_scores 
      WHERE game_id = ? AND round_number = ?
    `);
    
    const result = stmt.get(gameId, roundNumber) as { team_scores_json: string } | undefined;
    return result ? JSON.parse(result.team_scores_json) : {};
  }

  getGameScores(gameId: number) {
    const stmt = this.db.prepare(`
      SELECT round_number, team_scores_json FROM game_scores 
      WHERE game_id = ? 
      ORDER BY round_number ASC
    `);
    
    return stmt.all(gameId);
  }

  close() {
    this.db.close();
  }
}

export default QuizDatabase;