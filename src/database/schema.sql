-- Game Packs table - stores complete quiz games
CREATE TABLE IF NOT EXISTS game_packs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '1.0',
  author TEXT NOT NULL DEFAULT 'Unknown',
  description TEXT,
  total_rounds INTEGER NOT NULL DEFAULT 15,
  active BOOLEAN NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Pack Rounds table - stores individual rounds within a game pack
CREATE TABLE IF NOT EXISTS pack_rounds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pack_id INTEGER NOT NULL,
  round_number INTEGER NOT NULL,
  theme_name TEXT NOT NULL,
  theme_description TEXT,
  questions_json TEXT NOT NULL, -- JSON array of questions
  usage_count INTEGER NOT NULL DEFAULT 0,
  last_used DATETIME,
  FOREIGN KEY (pack_id) REFERENCES game_packs(id) ON DELETE CASCADE
);

-- Teams table - persistent team information
CREATE TABLE IF NOT EXISTS teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  total_games INTEGER NOT NULL DEFAULT 0,
  total_wins INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_played DATETIME
);

-- Games table - individual quiz game sessions
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  pack_id INTEGER NOT NULL,
  winning_team_id INTEGER,
  completed_rounds INTEGER NOT NULL DEFAULT 0,
  total_rounds INTEGER NOT NULL DEFAULT 15,
  FOREIGN KEY (pack_id) REFERENCES game_packs(id),
  FOREIGN KEY (winning_team_id) REFERENCES teams(id)
);

-- Game Scores table - scores for each round of each game
CREATE TABLE IF NOT EXISTS game_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  game_id INTEGER NOT NULL,
  round_number INTEGER NOT NULL,
  team_scores_json TEXT NOT NULL, -- JSON object: {"team_id": score}
  FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pack_rounds_pack_id ON pack_rounds(pack_id);
CREATE INDEX IF NOT EXISTS idx_pack_rounds_usage ON pack_rounds(usage_count, last_used);
CREATE INDEX IF NOT EXISTS idx_games_pack_id ON games(pack_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_game_id ON game_scores(game_id);