const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const isDev = process.env.NODE_ENV === 'development';

// Database will be initialized when app starts
let database = null;

async function initializeDatabase() {
  try {
    // Import the database class
    const Database = require('better-sqlite3');
    const { readFileSync } = require('fs');
    
    // Create database in user data directory
    const userDataPath = app.getPath('userData');
    const dbPath = path.join(userDataPath, 'quizzly-bear.db');
    
    console.log('Initializing database at:', dbPath);
    database = new Database(dbPath);
    
    // Initialize schema
    const schemaPath = path.join(__dirname, '../src/database/schema.sql');
    const schema = readFileSync(schemaPath, 'utf8');
    database.exec(schema);
    
    // Initialize with default quiz packs if database is empty
    await initializeDefaultContent();
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}

// Database helper functions
function getGamePacks() {
  const stmt = database.prepare('SELECT * FROM game_packs WHERE active = 1 ORDER BY created_at DESC');
  return stmt.all();
}

function getGamePack(id) {
  const stmt = database.prepare('SELECT * FROM game_packs WHERE id = ?');
  return stmt.get(id);
}

function createGamePack(pack) {
  const stmt = database.prepare(`
    INSERT INTO game_packs (name, version, author, description, total_rounds)
    VALUES (?, ?, ?, ?, ?)
  `);
  return stmt.run(pack.name, pack.version, pack.author, pack.description, pack.total_rounds);
}

function getPackRounds(packId) {
  const stmt = database.prepare('SELECT * FROM pack_rounds WHERE pack_id = ? ORDER BY round_number ASC');
  return stmt.all(packId);
}

function createPackRound(round) {
  const stmt = database.prepare(`
    INSERT INTO pack_rounds (pack_id, round_number, theme_name, theme_description, questions_json)
    VALUES (?, ?, ?, ?, ?)
  `);
  return stmt.run(round.pack_id, round.round_number, round.theme_name, round.theme_description, round.questions_json);
}

function getTeams() {
  const stmt = database.prepare(`
    SELECT *, 
           CASE WHEN total_games > 0 THEN ROUND((total_wins * 100.0) / total_games, 1) ELSE 0 END as win_percentage
    FROM teams 
    ORDER BY last_played DESC, total_wins DESC
  `);
  return stmt.all();
}

function createTeam(name) {
  const stmt = database.prepare('INSERT INTO teams (name) VALUES (?)');
  return stmt.run(name);
}

function updateTeamStats(teamId, won) {
  const stmt = database.prepare(`
    UPDATE teams 
    SET total_games = total_games + 1,
        total_wins = total_wins + ?,
        last_played = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  return stmt.run(won ? 1 : 0, teamId);
}

function createGame(packId, totalRounds) {
  const stmt = database.prepare('INSERT INTO games (pack_id, total_rounds) VALUES (?, ?)');
  return stmt.run(packId, totalRounds);
}

function saveRoundScores(gameId, roundNumber, teamScores) {
  const stmt = database.prepare(`
    INSERT OR REPLACE INTO game_scores (game_id, round_number, team_scores_json)
    VALUES (?, ?, ?)
  `);
  return stmt.run(gameId, roundNumber, JSON.stringify(teamScores));
}

function getRoundScores(gameId, roundNumber) {
  const stmt = database.prepare('SELECT team_scores_json FROM game_scores WHERE game_id = ? AND round_number = ?');
  const result = stmt.get(gameId, roundNumber);
  return result ? JSON.parse(result.team_scores_json) : {};
}

function updateGameWinner(gameId, winningTeamId) {
  const stmt = database.prepare('UPDATE games SET winning_team_id = ? WHERE id = ?');
  return stmt.run(winningTeamId, gameId);
}

async function initializeDefaultContent() {
  try {
    const existingPacks = getGamePacks();
    
    if (existingPacks.length === 0) {
      console.log('Initializing default quiz packs...');
      
      // Create default packs
      const bearEssentialsPack = createGamePack({
        name: "Bear Essentials",
        version: "1.0",
        author: "Quizzly Bear Team",
        description: "10 bear-themed rounds perfect for any pub quiz night",
        total_rounds: 10
      });
      
      const quirkyPack = createGamePack({
        name: "Quizzlies Quirky Questions Vol 1",
        version: "1.0", 
        author: "Quizzly Bear Team",
        description: "10 wonderfully weird rounds where random knowledge meets delightful madness",
        total_rounds: 10
      });
      
      // Load rounds from JSON files in quizpacks directory
      try {
        // Check if quiz pack files exist and load them
        const quizpacksDir = path.join(__dirname, '../quizpacks');
        
        // These would be loaded when the user actually imports them
        // For now, the built-in data will be loaded from the React components when needed
        
        console.log('Default quiz packs created (rounds will be loaded from React components)');
      } catch (error) {
        console.log('Quiz pack files not found, will use React component data');
      }
    }
  } catch (error) {
    console.error('Failed to initialize default content:', error);
  }
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.cjs')
    },
    icon: path.join(__dirname, '../public/icon.png'),
    fullscreen: false,
    autoHideMenuBar: true,
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Handle keyboard shortcuts for presentation mode
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F11') {
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
    }
  });
}

// IPC Handlers for database operations
ipcMain.handle('db:getGamePacks', async () => {
  try {
    return database ? getGamePacks() : [];
  } catch (error) {
    console.error('Error getting game packs:', error);
    return [];
  }
});

ipcMain.handle('db:getGamePack', async (event, id) => {
  try {
    return database ? getGamePack(id) : null;
  } catch (error) {
    console.error('Error getting game pack:', error);
    return null;
  }
});

ipcMain.handle('db:createGamePack', async (event, pack) => {
  try {
    return database ? createGamePack(pack) : null;
  } catch (error) {
    console.error('Error creating game pack:', error);
    return null;
  }
});

ipcMain.handle('db:getPackRounds', async (event, packId) => {
  try {
    return database ? getPackRounds(packId) : [];
  } catch (error) {
    console.error('Error getting pack rounds:', error);
    return [];
  }
});

ipcMain.handle('db:createPackRound', async (event, round) => {
  try {
    return database ? createPackRound(round) : null;
  } catch (error) {
    console.error('Error creating pack round:', error);
    return null;
  }
});

ipcMain.handle('db:getTeams', async () => {
  try {
    return database ? getTeams() : [];
  } catch (error) {
    console.error('Error getting teams:', error);
    return [];
  }
});

ipcMain.handle('db:createTeam', async (event, name) => {
  try {
    return database ? createTeam(name) : null;
  } catch (error) {
    console.error('Error creating team:', error);
    return null;
  }
});

ipcMain.handle('db:updateTeamStats', async (event, teamId, won) => {
  try {
    return database ? updateTeamStats(teamId, won) : null;
  } catch (error) {
    console.error('Error updating team stats:', error);
    return null;
  }
});

ipcMain.handle('db:createGame', async (event, packId, totalRounds) => {
  try {
    return database ? createGame(packId, totalRounds) : null;
  } catch (error) {
    console.error('Error creating game:', error);
    return null;
  }
});

ipcMain.handle('db:saveRoundScores', async (event, gameId, roundNumber, teamScores) => {
  try {
    return database ? saveRoundScores(gameId, roundNumber, teamScores) : null;
  } catch (error) {
    console.error('Error saving round scores:', error);
    return null;
  }
});

ipcMain.handle('db:getRoundScores', async (event, gameId, roundNumber) => {
  try {
    return database ? getRoundScores(gameId, roundNumber) : {};
  } catch (error) {
    console.error('Error getting round scores:', error);
    return {};
  }
});

ipcMain.handle('db:updateGameWinner', async (event, gameId, winningTeamId) => {
  try {
    return database ? updateGameWinner(gameId, winningTeamId) : null;
  } catch (error) {
    console.error('Error updating game winner:', error);
    return null;
  }
});

app.whenReady().then(async () => {
  await initializeDatabase();
  createWindow();
});

app.on('window-all-closed', () => {
  if (database) {
    database.close();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', () => {
  if (database) {
    database.close();
  }
});