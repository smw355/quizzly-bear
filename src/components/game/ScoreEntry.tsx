import React, { useState } from 'react';
import type { Team, Round } from '../../types';

interface Props {
  teams: Team[];
  round: Round;
  roundNumber: number;
  onSubmitScores: (scores: Record<number, number>) => void;
}

export const ScoreEntry: React.FC<Props> = ({
  teams,
  round,
  roundNumber,
  onSubmitScores,
}) => {
  const [scores, setScores] = useState<Record<number, string>>({});
  const maxScore = round.questions.length;

  const handleScoreChange = (teamId: number, score: string) => {
    console.log('Score change:', { teamId, score, currentScores: scores });
    setScores(prev => ({
      ...prev,
      [teamId]: score,
    }));
  };

  const handleSubmit = () => {
    const numericScores: Record<number, number> = {};
    
    teams.forEach(team => {
      const teamId = team.id || 0;
      const scoreStr = scores[teamId] || '0';
      const score = parseInt(scoreStr) || 0;
      // Clamp score between 0 and maxScore
      numericScores[teamId] = Math.max(0, Math.min(score, maxScore));
    });

    console.log('Score Entry Debug:', { 
      teams: teams,
      enteredScores: scores,
      numericScores: numericScores 
    });

    onSubmitScores(numericScores);
  };

  const allScoresEntered = teams.every(team => {
    const score = scores[team.id || 0];
    return score !== undefined && score !== '';
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-honey-100 to-forest-100 flex flex-col justify-center items-center p-8">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-forest-700 mb-2">
            Round {roundNumber}: {round.theme_name}
          </h2>
          <p className="text-xl text-gray-600">
            Enter team scores (out of {maxScore})
          </p>
        </div>

        {/* Score Entry Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {teams.map(team => (
              <div key={team.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {team.name}
                  </h3>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="text-lg font-medium text-gray-600">
                    Score:
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={maxScore}
                    value={scores[team.id || 0] || ''}
                    onChange={(e) => handleScoreChange(team.id || 0, e.target.value)}
                    className="w-20 px-3 py-2 text-xl font-bold text-center border-2 border-gray-300 rounded-lg focus:border-honey-500 focus:outline-none"
                    placeholder="0"
                  />
                  <span className="text-lg text-gray-500">
                    / {maxScore}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              disabled={!allScoresEntered}
              className={`px-8 py-4 text-xl font-bold rounded-lg transition-colors ${
                allScoresEntered
                  ? 'bg-honey-500 hover:bg-honey-600 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {allScoresEntered ? 'Continue to Leaderboard' : 'Enter all scores to continue'}
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-r-lg inline-block">
            <p className="text-blue-700">
              💡 Ask each team for their score and enter it above
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};