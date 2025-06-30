import React from 'react';
import type { TrueFalseQuestion as TrueFalseQuestionType } from '../../types';

interface Props {
  question: TrueFalseQuestionType;
  questionNumber: number;
  totalQuestions: number;
  roundTheme: string;
}

export const TrueFalseQuestion: React.FC<Props> = ({
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
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-12 leading-tight">
            {question.question}
          </h1>

          {/* True/False Options */}
          <div className="flex justify-center space-x-12">
            <div className="bg-green-500 text-white rounded-2xl p-8 min-w-48">
              <div className="text-4xl font-bold">TRUE</div>
            </div>
            <div className="bg-red-500 text-white rounded-2xl p-8 min-w-48">
              <div className="text-4xl font-bold">FALSE</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-honey-500 text-white rounded-lg p-6 inline-block">
          <p className="text-xl font-medium">
            Teams: Choose True or False
          </p>
        </div>
      </div>
    </div>
  );
};