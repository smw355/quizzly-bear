import React from 'react';
import type { Question } from '../../types';
import { TextAnswerQuestion } from './TextAnswerQuestion';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { TrueFalseQuestion } from './TrueFalseQuestion';
import { ClosestNumberQuestion } from './ClosestNumberQuestion';
import { ImageQuestion } from './ImageQuestion';

interface Props {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  roundTheme: string;
  onNext?: () => void;
}

export const QuestionContainer: React.FC<Props> = ({
  question,
  questionNumber,
  totalQuestions,
  roundTheme,
}) => {
  const renderQuestion = () => {
    switch (question.type) {
      case 'text_answer':
        return (
          <TextAnswerQuestion
            question={question}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            roundTheme={roundTheme}
          />
        );
      case 'multiple_choice':
        return (
          <MultipleChoiceQuestion
            question={question}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            roundTheme={roundTheme}
          />
        );
      case 'true_false':
        return (
          <TrueFalseQuestion
            question={question}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            roundTheme={roundTheme}
          />
        );
      case 'closest_number':
        return (
          <ClosestNumberQuestion
            question={question}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            roundTheme={roundTheme}
          />
        );
      case 'image':
        return (
          <ImageQuestion
            question={question}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            roundTheme={roundTheme}
          />
        );
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                Unknown Question Type
              </h1>
              <p className="text-gray-600">
                Question type '{(question as Question).type}' is not supported.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {renderQuestion()}
      
      {/* Navigation hint */}
      <div className="fixed bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
        <p className="text-sm">Press Space to continue</p>
      </div>
    </div>
  );
};