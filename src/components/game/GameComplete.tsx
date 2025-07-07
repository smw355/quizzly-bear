import React, { useEffect, useState } from 'react';
import type { TeamScore } from '../../types';

interface Props {
  winner: TeamScore | null;
  finalScores: TeamScore[];
  onNewGame: () => void;
}

export const GameComplete: React.FC<Props> = ({
  winner,
  finalScores,
  onNewGame,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    const animateTimeout = setTimeout(() => setAnimateIn(true), 100);
    const confettiTimeout = setTimeout(() => setShowConfetti(true), 500);
    
    // Cleanup timeouts on unmount
    return () => {
      clearTimeout(animateTimeout);
      clearTimeout(confettiTimeout);
    };
  }, []);

  const getPositionEmoji = (position: number) => {
    switch (position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  const getPodiumHeight = (position: number) => {
    switch (position) {
      case 1: return 'h-32'; // Tallest for 1st place
      case 2: return 'h-24'; // Medium for 2nd place
      case 3: return 'h-20'; // Shorter for 3rd place
      default: return 'h-16';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-honey-200 to-forest-200 flex flex-col justify-center items-center p-8 relative overflow-hidden">
      {/* Animated confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-bounce text-6xl absolute top-20 left-20 opacity-70">🎊</div>
          <div className="animate-bounce text-4xl absolute top-32 right-32 opacity-60 animation-delay-300">✨</div>
          <div className="animate-bounce text-5xl absolute bottom-40 left-40 opacity-80 animation-delay-500">🎉</div>
          <div className="animate-bounce text-3xl absolute bottom-20 right-20 opacity-70 animation-delay-700">🌟</div>
          <div className="animate-bounce text-4xl absolute top-40 left-1/2 opacity-60 animation-delay-900">🎈</div>
          <div className="animate-bounce text-5xl absolute bottom-60 right-1/3 opacity-80 animation-delay-1100">🏆</div>
        </div>
      )}

      <div className={`w-full max-w-6xl mx-auto text-center transition-all duration-1000 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Main Celebration Header */}
        <div className="mb-12">
          <div className="text-8xl mb-6 animate-pulse">🏆🎉🏆</div>
          <h1 className="text-7xl font-bold text-forest-800 mb-4 drop-shadow-lg">
            QUIZ COMPLETE!
          </h1>
          <div className="text-6xl animate-bounce">🐻</div>
        </div>

        {/* Champion Announcement */}
        {winner && (
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white rounded-3xl shadow-2xl p-12 mb-12 transform hover:scale-105 transition-all duration-300 border-4 border-yellow-300">
            <div className="animate-pulse text-6xl mb-4">👑</div>
            <h2 className="text-6xl font-bold mb-6 drop-shadow-lg">
              🏆 CHAMPIONS! 🏆
            </h2>
            <h3 className="text-7xl font-bold mb-4 text-yellow-100 drop-shadow-lg">
              {winner.team_name}
            </h3>
            <p className="text-4xl font-semibold">
              Champion Score: <span className="font-bold text-yellow-100">{winner.current_score}</span> points
            </p>
            <div className="mt-6 text-5xl animate-bounce">🎊 🥇 🎊</div>
          </div>
        )}

        {/* Podium Display for Top 3 */}
        {finalScores.length >= 3 && (
          <div className="mb-12">
            <h3 className="text-4xl font-bold text-forest-800 mb-8">
              🏆 PODIUM FINISHERS 🏆
            </h3>
            <div className="flex justify-center items-end space-x-6 mb-8">
              {/* 2nd Place */}
              <div className="text-center">
                <div className={`bg-gray-300 ${getPodiumHeight(2)} w-24 rounded-t-lg flex items-end justify-center pb-2 shadow-lg`}>
                  <span className="text-white font-bold text-lg">2nd</span>
                </div>
                <div className="bg-white rounded-lg p-4 mt-2 shadow-md border-2 border-gray-300">
                  <div className="text-4xl mb-2">🥈</div>
                  <div className="font-bold text-lg text-gray-800">{finalScores[1]?.team_name}</div>
                  <div className="text-gray-600 font-semibold">{finalScores[1]?.current_score} pts</div>
                </div>
              </div>

              {/* 1st Place (Tallest) */}
              <div className="text-center">
                <div className={`bg-yellow-500 ${getPodiumHeight(1)} w-28 rounded-t-lg flex items-end justify-center pb-2 shadow-lg border-2 border-yellow-400`}>
                  <span className="text-white font-bold text-xl">1st</span>
                </div>
                <div className="bg-white rounded-lg p-6 mt-2 shadow-xl border-4 border-yellow-400">
                  <div className="text-5xl mb-3 animate-bounce">🥇</div>
                  <div className="font-bold text-xl text-yellow-800">{finalScores[0]?.team_name}</div>
                  <div className="text-yellow-600 font-bold text-lg">{finalScores[0]?.current_score} pts</div>
                  <div className="text-2xl mt-2">👑</div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="text-center">
                <div className={`bg-orange-400 ${getPodiumHeight(3)} w-24 rounded-t-lg flex items-end justify-center pb-2 shadow-lg`}>
                  <span className="text-white font-bold text-lg">3rd</span>
                </div>
                <div className="bg-white rounded-lg p-4 mt-2 shadow-md border-2 border-orange-400">
                  <div className="text-4xl mb-2">🥉</div>
                  <div className="font-bold text-lg text-orange-800">{finalScores[2]?.team_name}</div>
                  <div className="text-orange-600 font-semibold">{finalScores[2]?.current_score} pts</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Complete Final Standings */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h3 className="text-4xl font-bold text-forest-800 mb-8">
            📊 FINAL LEADERBOARD 📊
          </h3>
          <div className="space-y-4">
            {finalScores.map((teamScore, index) => {
              const position = index + 1;
              const isWinner = position === 1;
              const isTopThree = position <= 3;
              
              return (
                <div
                  key={teamScore.team_id}
                  className={`flex items-center justify-between p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    isWinner 
                      ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-4 border-yellow-400 shadow-lg' 
                      : isTopThree
                      ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300 shadow-md'
                      : 'bg-gray-50 border border-gray-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-6">
                    <div className={`text-4xl font-bold flex items-center ${
                      isWinner ? 'text-yellow-600' : isTopThree ? 'text-gray-600' : 'text-gray-500'
                    }`}>
                      <span className="mr-2">{getPositionEmoji(position)}</span>
                      #{position}
                    </div>
                    <div className={`text-3xl font-bold ${
                      isWinner ? 'text-yellow-800' : isTopThree ? 'text-gray-800' : 'text-gray-700'
                    }`}>
                      {teamScore.team_name}
                    </div>
                    {isWinner && <span className="text-3xl animate-bounce">👑</span>}
                  </div>
                  <div className={`text-3xl font-bold ${
                    isWinner ? 'text-yellow-800' : isTopThree ? 'text-gray-700' : 'text-gray-600'
                  }`}>
                    {teamScore.current_score} pts
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bear mascot celebration */}
        <div className="bg-gradient-to-r from-honey-500 to-honey-600 text-white rounded-3xl p-12 mb-8 inline-block shadow-2xl border-4 border-honey-400">
          <div className="text-8xl mb-6 animate-bounce">🐻</div>
          <h3 className="text-4xl font-bold mb-4 drop-shadow-lg">
            Thanks for playing Quizzly Bear!
          </h3>
          <p className="text-2xl font-semibold">
            Hope you had a <span className="text-honey-200">bear-y</span> good time! 
          </p>
          <div className="text-4xl mt-4">🐾 🎯 🐾</div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onNewGame}
            className="bg-gradient-to-r from-forest-500 to-forest-600 hover:from-forest-600 hover:to-forest-700 text-white font-bold py-6 px-12 rounded-2xl text-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-forest-400"
          >
            🎮 Start New Quiz!
          </button>
          <button
            onClick={() => window.close()}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-6 px-12 rounded-2xl text-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-gray-400"
          >
            🚪 Exit Game
          </button>
        </div>
      </div>

    </div>
  );
};