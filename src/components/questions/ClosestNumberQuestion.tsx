import React from 'react';
import type { ClosestNumberQuestion as ClosestNumberQuestionType } from '../../types';

interface Props {
  question: ClosestNumberQuestionType;
  questionNumber: number;
  totalQuestions: number;
  roundTheme: string;
}

export const ClosestNumberQuestion: React.FC<Props> = ({
  question,
  questionNumber,
  totalQuestions,
  roundTheme,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-honey-100 to-forest-100 flex flex-col justify-center items-center p-8">
      <div className="w-full max-w-6xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-forest-700 mb-2">
            {roundTheme}
          </h2>
          <p className="text-lg text-gray-600">
            Question {questionNumber} of {totalQuestions}
          </p>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-xl p-12 mb-8">
          <h1 className="question-display text-gray-800 mb-8">
            {question.question}
          </h1>
          
          {/* Special indicator for closest number */}
          <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-r-lg inline-block">
            <p className="text-orange-700 font-medium text-xl">
              📊 Closest answer gets the point!
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-honey-500 text-white rounded-lg p-6 inline-block">
          <p className="text-xl font-medium">
            Teams: Write your number
          </p>
        </div>
      </div>
    </div>
  );
};