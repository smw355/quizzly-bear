import React, { useState } from 'react';
import type { Team } from '../../types';

interface Props {
  availableTeams: Team[];
  onTeamsSelected: (teams: Team[]) => void;
  onBack: () => void;
}

export const TeamSetup: React.FC<Props> = ({
  availableTeams,
  onTeamsSelected,
  onBack,
}) => {
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [showNewTeamForm, setShowNewTeamForm] = useState(false);

  const handleSelectExistingTeam = (team: Team) => {
    if (selectedTeams.some(t => t.id === team.id)) {
      setSelectedTeams(selectedTeams.filter(t => t.id !== team.id));
    } else {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  const handleAddNewTeam = () => {
    if (newTeamName.trim() && !selectedTeams.some(t => t.name === newTeamName.trim())) {
      // Generate a unique temporary ID for new teams
      const tempId = Date.now() + Math.floor(Math.random() * 1000);
      const newTeam: Team = {
        id: tempId,
        name: newTeamName.trim(),
        total_games: 0,
        total_wins: 0,
      };
      setSelectedTeams([...selectedTeams, newTeam]);
      setNewTeamName('');
      setShowNewTeamForm(false);
    }
  };

  const handleRemoveTeam = (teamToRemove: Team) => {
    setSelectedTeams(selectedTeams.filter(t => 
      t.id ? t.id !== teamToRemove.id : t.name !== teamToRemove.name
    ));
  };

  const canProceed = selectedTeams.length >= 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-honey-100 to-forest-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-forest-800 mb-4">
            🐻 Team Setup
          </h1>
          <p className="text-xl text-gray-600">
            Select existing teams or create new ones
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Teams */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-forest-700 mb-6">
              Previous Teams
            </h2>
            
            {availableTeams.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {availableTeams.map((team) => {
                  const isSelected = selectedTeams.some(t => t.id === team.id);
                  return (
                    <div
                      key={team.id}
                      onClick={() => handleSelectExistingTeam(team)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-honey-500 bg-honey-50' 
                          : 'border-gray-200 hover:border-honey-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-lg">{team.name}</h3>
                          <p className="text-sm text-gray-600">
                            {team.total_games} games • {team.total_wins} wins
                            {team.win_percentage && (
                              <span> • {team.win_percentage}% win rate</span>
                            )}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="text-2xl text-honey-500">✓</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No previous teams found</p>
                <p className="text-sm">Create new teams to get started</p>
              </div>
            )}
          </div>

          {/* Selected Teams & New Team Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-forest-700 mb-6">
              Selected Teams ({selectedTeams.length})
            </h2>

            {/* Selected Teams List */}
            <div className="space-y-3 mb-6">
              {selectedTeams.map((team) => (
                <div
                  key={team.id || team.name}
                  className="flex items-center justify-between p-3 bg-honey-50 border border-honey-200 rounded-lg"
                >
                  <div>
                    <h3 className="font-bold">{team.name}</h3>
                    {team.id && (
                      <p className="text-sm text-gray-600">
                        {team.total_games} games • {team.total_wins} wins
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveTeam(team)}
                    className="text-red-500 hover:text-red-700 text-xl font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}

              {selectedTeams.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No teams selected</p>
                  <p className="text-sm">Need at least 2 teams to start</p>
                </div>
              )}
            </div>

            {/* Add New Team */}
            <div className="border-t pt-6">
              {!showNewTeamForm ? (
                <button
                  onClick={() => setShowNewTeamForm(true)}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-honey-400 hover:text-honey-600 transition-colors"
                >
                  + Add New Team
                </button>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="Enter team name"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-honey-500 focus:outline-none text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddNewTeam()}
                    autoFocus
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleAddNewTeam}
                      disabled={!newTeamName.trim()}
                      className="flex-1 py-2 bg-honey-500 text-white rounded-lg hover:bg-honey-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Add Team
                    </button>
                    <button
                      onClick={() => {
                        setShowNewTeamForm(false);
                        setNewTeamName('');
                      }}
                      className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Back
          </button>
          
          <button
            onClick={() => onTeamsSelected(selectedTeams)}
            disabled={!canProceed}
            className={`px-8 py-3 rounded-lg font-bold transition-colors ${
              canProceed
                ? 'bg-forest-500 text-white hover:bg-forest-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {canProceed 
              ? `Start Quiz with ${selectedTeams.length} teams →` 
              : 'Select at least 2 teams'
            }
          </button>
        </div>
      </div>
    </div>
  );
};