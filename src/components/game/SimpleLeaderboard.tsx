import React from 'react';
import type { TeamScore } from '../../types';

interface Props {
  scores: TeamScore[];
  roundNumber: number;
  totalRounds: number;
}

export const SimpleLeaderboard: React.FC<Props> = ({
  scores,
  roundNumber,
  totalRounds,
}) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🏆 Leaderboard 🏆
          </h1>
          <h2 className="text-xl text-gray-600">
            After Round {roundNumber} of {totalRounds}
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {scores.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No scores found
            </div>
          ) : (
            <div className="space-y-4">
              {scores.map((teamScore, index) => {
                const position = index + 1;
                const bgColor = position === 1 ? 'bg-yellow-500' : position === 2 ? 'bg-gray-500' : 'bg-orange-600';
                const emoji = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : '🐻';
                
                return (
                  <div
                    key={teamScore.team_id}
                    className={`${bgColor} text-white rounded-lg p-6 flex justify-between items-center shadow-lg`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{emoji}</span>
                      <div>
                        <span className="text-2xl font-bold text-white">{position}. {teamScore.team_name}</span>
                        {teamScore.round_score > 0 && (
                          <div className="text-sm text-white opacity-90">
                            +{teamScore.round_score} this round
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-3xl font-bold text-white">{teamScore.current_score}</span>
                      <span className="text-lg text-white ml-1">pts</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          {roundNumber < totalRounds ? (
            <div className="bg-orange-600 text-white rounded-2xl p-6 inline-block">
              <p className="text-xl font-bold mb-2">
                🐻 Ready for Round {roundNumber + 1}?
              </p>
              <p className="text-lg">
                Press Space to continue
              </p>
            </div>
          ) : (
            <div className="bg-green-500 text-white rounded-2xl p-6 inline-block">
              <p className="text-xl font-bold mb-2">
                🎉 That's all the rounds!
              </p>
              <p className="text-lg">
                Press Space to see final results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};