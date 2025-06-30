import React from 'react';
import type { Round } from '../../types';

interface Props {
  round: Round;
  roundNumber: number;
  totalRounds: number;
}

export const RoundAnswers: React.FC<Props> = ({
  round,
  roundNumber,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-honey-100 flex flex-col justify-center items-center p-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-forest-800 mb-4">
            📋 Round {roundNumber} Answers
          </h1>
          <h2 className="text-2xl font-medium text-forest-700 mb-2">
            {round.theme_name}
          </h2>
          <p className="text-lg text-gray-600">
            Check your answers and mark your scores
          </p>
        </div>

        {/* Questions and Answers */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="space-y-8">
            {round.questions.map((question, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                {/* Question */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Question {index + 1}:
                  </h3>
                  <p className="text-lg text-gray-700">{question.question}</p>
                  
                  {/* Show options for multiple choice */}
                  {question.type === 'multiple_choice' && (
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
                      {question.options.map((option, optIndex) => {
                        const labels = ['A', 'B', 'C', 'D'];
                        const isCorrect = option === question.answer;
                        return (
                          <div key={optIndex} className={`p-2 rounded ${isCorrect ? 'bg-green-100 font-bold' : 'bg-gray-50'}`}>
                            {labels[optIndex]}) {option}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Answer */}
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <div className="text-green-600 text-xl">✓</div>
                    <div>
                      <h4 className="font-bold text-green-800 text-lg">
                        Answer: {question.answer}
                      </h4>
                      {question.explanation && (
                        <p className="text-green-700 mt-2">{question.explanation}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center">
          <div className="bg-honey-500 text-white rounded-2xl p-6 inline-block">
            <p className="text-xl font-medium mb-2">
              🐻 Teams: Mark your scores!
            </p>
            <p className="text-lg">
              Press Space when ready to enter scores
            </p>
          </div>
        </div>
      </div>

      {/* Navigation hint */}
      <div className="fixed bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
        <p className="text-sm">Press Space to enter scores</p>
      </div>
    </div>
  );
};