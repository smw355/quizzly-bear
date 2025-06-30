import React from 'react';
import type { MultipleChoiceQuestion as MultipleChoiceQuestionType } from '../../types';

interface Props {
  question: MultipleChoiceQuestionType;
  questionNumber: number;
  totalQuestions: number;
  roundTheme: string;
}

export const MultipleChoiceQuestion: React.FC<Props> = ({
  question,
  questionNumber,
  totalQuestions,
  roundTheme,
}) => {
  const labels = ['A', 'B', 'C', 'D'];

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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-8 leading-tight">
            {question.question}
          </h1>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {question.options.map((option, index) => (
              <div key={index} className="answer-option">
                <div className="flex items-center space-x-4">
                  <div className="bg-honey-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                    {labels[index]}
                  </div>
                  <span className="text-left flex-1">{option}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-honey-500 text-white rounded-lg p-6 inline-block">
          <p className="text-xl font-medium">
            Teams: Choose A, B, C, or D
          </p>
        </div>
      </div>
    </div>
  );
};