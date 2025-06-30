import React from 'react';
import type { TextAnswerQuestion as TextAnswerQuestionType } from '../../types';

interface Props {
  question: TextAnswerQuestionType;
  questionNumber: number;
  totalQuestions: number;
  roundTheme: string;
}

export const TextAnswerQuestion: React.FC<Props> = ({
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
        <div className="bg-white rounded-2xl shadow-xl p-12 mb-12">
          <h1 className="question-display text-gray-800">
            {question.question}
          </h1>
        </div>

        {/* Instructions */}
        <div className="bg-honey-500 text-white rounded-lg p-6 inline-block">
          <p className="text-xl font-medium">
            Teams: Write your answer
          </p>
        </div>
      </div>
    </div>
  );
};