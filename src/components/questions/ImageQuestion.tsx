import React from 'react';
import type { ImageQuestion as ImageQuestionType } from '../../types';

interface Props {
  question: ImageQuestionType;
  questionNumber: number;
  totalQuestions: number;
  roundTheme: string;
}

export const ImageQuestion: React.FC<Props> = ({
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

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* Image Display */}
          <div className="mb-8">
            <img
              src={question.image_path}
              alt="Quiz question image"
              className="max-w-full max-h-96 mx-auto rounded-lg shadow-md object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder.png';
                target.alt = 'Image not found';
              }}
            />
          </div>

          {/* Question */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            {question.question}
          </h1>
        </div>

        {/* Instructions */}
        <div className="bg-honey-500 text-white rounded-lg p-6 inline-block">
          <p className="text-xl font-medium">
            Teams: Look at the image and write your answer
          </p>
        </div>
      </div>
    </div>
  );
};