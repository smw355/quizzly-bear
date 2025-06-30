const { contextBridge, ipcRenderer } = require('electron');

// Expose database API to renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Game Pack operations
  getGamePacks: () => ipcRenderer.invoke('db:getGamePacks'),
  getGamePack: (id) => ipcRenderer.invoke('db:getGamePack', id),
  createGamePack: (pack) => ipcRenderer.invoke('db:createGamePack', pack),
  
  // Pack Round operations
  getPackRounds: (packId) => ipcRenderer.invoke('db:getPackRounds', packId),
  createPackRound: (round) => ipcRenderer.invoke('db:createPackRound', round),
  
  // Team operations
  getTeams: () => ipcRenderer.invoke('db:getTeams'),
  createTeam: (name) => ipcRenderer.invoke('db:createTeam', name),
  updateTeamStats: (teamId, won) => ipcRenderer.invoke('db:updateTeamStats', teamId, won),
  
  // Game operations
  createGame: (packId, totalRounds) => ipcRenderer.invoke('db:createGame', packId, totalRounds),
  saveRoundScores: (gameId, roundNumber, teamScores) => 
    ipcRenderer.invoke('db:saveRoundScores', gameId, roundNumber, teamScores),
  getRoundScores: (gameId, roundNumber) => 
    ipcRenderer.invoke('db:getRoundScores', gameId, roundNumber),
  updateGameWinner: (gameId, winningTeamId) => 
    ipcRenderer.invoke('db:updateGameWinner', gameId, winningTeamId),
});