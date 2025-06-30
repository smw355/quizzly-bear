import React from 'react';
import type { Question } from '../../types';

interface Props {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  roundTheme: string;
  onNext?: () => void;
}

export const AnswerReveal: React.FC<Props> = ({
  question,
  questionNumber,
  totalQuestions,
  roundTheme,
}) => {
  const renderAnswer = () => {
    switch (question.type) {
      case 'multiple_choice': {
        const correctIndex = question.options.findIndex(option => option === question.answer);
        const labels = ['A', 'B', 'C', 'D'];
        
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
              {question.options.map((option, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border-2 flex items-center space-x-4 ${
                    index === correctIndex 
                      ? 'bg-green-100 border-green-500 text-green-800' 
                      : 'bg-gray-100 border-gray-300 text-gray-600'
                  }`}
                >
                  <div className={`rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg ${
                    index === correctIndex ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                  }`}>
                    {labels[index]}
                  </div>
                  <span className="text-left flex-1 text-lg">{option}</span>
                  {index === correctIndex && (
                    <span className="text-2xl">✓</span>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-green-500 text-white rounded-xl p-6 inline-block">
              <p className="text-2xl font-bold">
                Correct Answer: {labels[correctIndex]} - {question.answer}
              </p>
            </div>
          </div>
        );
      }

      case 'true_false': {
        return (
          <div className="space-y-6">
            <div className="flex justify-center space-x-8 mb-8">
              <div className={`rounded-2xl p-6 min-w-48 text-center ${
                question.answer === 'true' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-300 text-gray-600'
              }`}>
                <div className="text-3xl font-bold">TRUE</div>
                {question.answer === 'true' && <div className="text-2xl mt-2">✓</div>}
              </div>
              <div className={`rounded-2xl p-6 min-w-48 text-center ${
                question.answer === 'false' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-300 text-gray-600'
              }`}>
                <div className="text-3xl font-bold">FALSE</div>
                {question.answer === 'false' && <div className="text-2xl mt-2">✓</div>}
              </div>
            </div>
            <div className="bg-green-500 text-white rounded-xl p-6 inline-block">
              <p className="text-2xl font-bold">
                Correct Answer: {question.answer.toUpperCase()}
              </p>
            </div>
          </div>
        );
      }

      default:
        return (
          <div className="bg-green-500 text-white rounded-2xl p-8 inline-block">
            <p className="text-3xl font-bold mb-2">
              Answer: {question.answer}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-honey-100 flex flex-col justify-center items-center p-8">
      <div className="w-full max-w-6xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-forest-700 mb-2">
            {roundTheme}
          </h2>
          <p className="text-lg text-gray-600">
            Question {questionNumber} of {totalQuestions} - Answer
          </p>
        </div>

        {/* Question (smaller) */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-700 leading-tight">
            {question.question}
          </h3>
        </div>

        {/* Answer Display */}
        <div className="mb-8">
          {renderAnswer()}
        </div>

        {/* Explanation */}
        {question.explanation && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-8 text-left max-w-4xl mx-auto">
            <h4 className="font-bold text-blue-800 mb-2">Explanation:</h4>
            <p className="text-blue-700 text-lg">{question.explanation}</p>
          </div>
        )}

        {/* Next instruction */}
        <div className="bg-honey-500 text-white rounded-lg p-6 inline-block">
          <p className="text-xl font-medium">
            {questionNumber < totalQuestions 
              ? 'Press Space for next question' 
              : 'Press Space to enter scores'
            }
          </p>
        </div>
      </div>

      {/* Navigation hint */}
      <div className="fixed bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
        <p className="text-sm">Press Space to continue</p>
      </div>
    </div>
  );
};