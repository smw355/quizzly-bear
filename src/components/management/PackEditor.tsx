import React, { useState } from 'react';
import type { GamePack, Round, Question, QuestionType, MultipleChoiceQuestion, ImageQuestion } from '../../types';

interface Props {
  pack?: GamePack;
  onSave: (pack: GamePack, rounds: Round[]) => void;
  onCancel: () => void;
}

export const PackEditor: React.FC<Props> = ({
  pack,
  onSave,
  onCancel,
}) => {
  const isEditing = !!pack?.id;
  
  // Pack metadata state
  const [packData, setPackData] = useState({
    name: pack?.name || '',
    version: pack?.version || '1.0',
    author: pack?.author || '',
    description: pack?.description || '',
  });

  // Rounds state
  const [rounds, setRounds] = useState<Round[]>(
    pack?.rounds || [createNewRound(1)]
  );

  const [activeRound, setActiveRound] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  function createNewRound(roundNumber: number): Round {
    return {
      round_number: roundNumber,
      theme_name: `Round ${roundNumber} Theme`,
      theme_description: '',
      questions: [createNewQuestion('text_answer')],
    };
  }

  function createNewQuestion(type: QuestionType): Question {
    const baseQuestion = {
      type,
      question: '',
      answer: '',
      explanation: '',
      points: 1,
    };

    switch (type) {
      case 'multiple_choice':
        return {
          ...baseQuestion,
          type: 'multiple_choice',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
        };
      case 'true_false':
        return {
          ...baseQuestion,
          type: 'true_false',
          answer: 'true',
        };
      case 'closest_number':
        return {
          ...baseQuestion,
          type: 'closest_number',
          scoring_type: 'closest',
        };
      case 'image':
        return {
          ...baseQuestion,
          type: 'image',
          image_path: '',
        };
      default:
        return baseQuestion as Question;
    }
  }

  const validatePack = (): string[] => {
    const errors: string[] = [];
    
    if (!packData.name.trim()) errors.push('Pack name is required');
    if (!packData.author.trim()) errors.push('Author name is required');
    if (rounds.length === 0) errors.push('At least one round is required');

    rounds.forEach((round, roundIndex) => {
      if (!round.theme_name.trim()) {
        errors.push(`Round ${roundIndex + 1} needs a theme name`);
      }
      if (round.questions.length === 0) {
        errors.push(`Round ${roundIndex + 1} needs at least one question`);
      }
      
      round.questions.forEach((question, questionIndex) => {
        if (!question.question.trim()) {
          errors.push(`Round ${roundIndex + 1}, Question ${questionIndex + 1} needs question text`);
        }
        if (!question.answer.trim()) {
          errors.push(`Round ${roundIndex + 1}, Question ${questionIndex + 1} needs an answer`);
        }
        
        if (question.type === 'multiple_choice') {
          const mcq = question as MultipleChoiceQuestion;
          if (!mcq.options || mcq.options.length < 2) {
            errors.push(`Round ${roundIndex + 1}, Question ${questionIndex + 1} needs at least 2 options`);
          }
        }
      });
    });

    return errors;
  };

  const handleSave = () => {
    const validationErrors = validatePack();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newPack: GamePack = {
      id: pack?.id || Date.now(),
      name: packData.name.trim(),
      version: packData.version.trim(),
      author: packData.author.trim(),
      description: packData.description.trim(),
      total_rounds: rounds.length,
      active: true,
      created_at: pack?.created_at || new Date().toISOString(),
    };

    onSave(newPack, rounds);
  };

  const addRound = () => {
    const newRound = createNewRound(rounds.length + 1);
    setRounds([...rounds, newRound]);
    setActiveRound(rounds.length);
    setActiveQuestion(0);
  };

  const deleteRound = (roundIndex: number) => {
    if (rounds.length <= 1) return;
    
    const newRounds = rounds.filter((_, i) => i !== roundIndex)
      .map((round, i) => ({ ...round, round_number: i + 1 }));
    
    setRounds(newRounds);
    setActiveRound(Math.min(roundIndex, newRounds.length - 1));
    setActiveQuestion(0);
  };

  const addQuestion = () => {
    const newRounds = [...rounds];
    newRounds[activeRound].questions.push(createNewQuestion('text_answer'));
    setRounds(newRounds);
    setActiveQuestion(newRounds[activeRound].questions.length - 1);
  };

  const deleteQuestion = (questionIndex: number) => {
    if (rounds[activeRound].questions.length <= 1) return;
    
    const newRounds = [...rounds];
    newRounds[activeRound].questions.splice(questionIndex, 1);
    setRounds(newRounds);
    setActiveQuestion(Math.min(questionIndex, newRounds[activeRound].questions.length - 1));
  };

  const updateRound = (field: keyof Round, value: string) => {
    const newRounds = [...rounds];
    (newRounds[activeRound] as unknown as Record<string, unknown>)[field] = value;
    setRounds(newRounds);
  };

  const updateQuestion = (field: string, value: string | number | string[]) => {
    const newRounds = [...rounds];
    (newRounds[activeRound].questions[activeQuestion] as unknown as Record<string, unknown>)[field] = value;
    setRounds(newRounds);
  };

  const currentQuestion = rounds[activeRound]?.questions[activeQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-honey-100 to-forest-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-forest-800 mb-2">
              {isEditing ? '✏️ Edit Quiz Pack' : '➕ Create New Quiz Pack'}
            </h1>
            <p className="text-lg text-gray-600">
              {isEditing ? 'Update your quiz pack content' : 'Build your custom quiz pack'}
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={onCancel}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-forest-500 text-white rounded-lg hover:bg-forest-600 transition-colors"
            >
              {isEditing ? 'Update Pack' : 'Create Pack'}
            </button>
          </div>
        </div>

        {/* Validation Errors */}
        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-red-800 mb-2">Please fix these issues:</h3>
            <ul className="list-disc list-inside text-red-700 text-sm">
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pack Metadata */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Pack Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pack Name *
                </label>
                <input
                  type="text"
                  value={packData.name}
                  onChange={(e) => setPackData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-honey-500 focus:outline-none"
                  placeholder="My Awesome Quiz Pack"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author *
                </label>
                <input
                  type="text"
                  value={packData.author}
                  onChange={(e) => setPackData(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-honey-500 focus:outline-none"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Version
                </label>
                <input
                  type="text"
                  value={packData.version}
                  onChange={(e) => setPackData(prev => ({ ...prev, version: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-honey-500 focus:outline-none"
                  placeholder="1.0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={packData.description}
                  onChange={(e) => setPackData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-honey-500 focus:outline-none h-20 resize-none"
                  placeholder="Describe your quiz pack..."
                />
              </div>
            </div>

            {/* Rounds List */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-800">Rounds ({rounds.length})</h3>
                <button
                  onClick={addRound}
                  className="px-3 py-1 bg-honey-500 text-white rounded text-sm hover:bg-honey-600"
                >
                  + Add Round
                </button>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {rounds.map((round, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setActiveRound(index);
                      setActiveQuestion(0);
                    }}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      activeRound === index 
                        ? 'bg-honey-100 border-2 border-honey-300' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">Round {index + 1}</p>
                        <p className="text-xs text-gray-600">{round.theme_name}</p>
                        <p className="text-xs text-gray-500">{round.questions.length} questions</p>
                      </div>
                      {rounds.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteRound(index);
                          }}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Round Editor */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Round {activeRound + 1} Details
            </h2>
            
            {rounds[activeRound] && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Theme Name *
                  </label>
                  <input
                    type="text"
                    value={rounds[activeRound].theme_name}
                    onChange={(e) => updateRound('theme_name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-honey-500 focus:outline-none"
                    placeholder="Round theme..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Theme Description
                  </label>
                  <textarea
                    value={rounds[activeRound].theme_description || ''}
                    onChange={(e) => updateRound('theme_description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-honey-500 focus:outline-none h-16 resize-none"
                    placeholder="Optional description..."
                  />
                </div>

                {/* Questions List */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-gray-800">
                      Questions ({rounds[activeRound].questions.length})
                    </h3>
                    <button
                      onClick={addQuestion}
                      className="px-3 py-1 bg-forest-500 text-white rounded text-sm hover:bg-forest-600"
                    >
                      + Add Question
                    </button>
                  </div>
                  
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {rounds[activeRound].questions.map((question, index) => (
                      <div
                        key={index}
                        onClick={() => setActiveQuestion(index)}
                        className={`p-2 rounded cursor-pointer transition-colors ${
                          activeQuestion === index 
                            ? 'bg-forest-100 border-2 border-forest-300' 
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-sm">Q{index + 1}: {question.type}</p>
                            <p className="text-xs text-gray-600 truncate">
                              {question.question || 'No question text'}
                            </p>
                          </div>
                          {rounds[activeRound].questions.length > 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteQuestion(index);
                              }}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Question Editor */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Question {activeQuestion + 1} Editor
            </h2>
            
            {currentQuestion && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question Type
                  </label>
                  <select
                    value={currentQuestion.type}
                    onChange={(e) => {
                      const newType = e.target.value as QuestionType;
                      const newQuestion = createNewQuestion(newType);
                      newQuestion.question = currentQuestion.question;
                      newQuestion.explanation = currentQuestion.explanation;
                      newQuestion.points = currentQuestion.points;
                      updateQuestion('type', newType);
                      // Update the entire question to match the new type
                      const newRounds = [...rounds];
                      newRounds[activeRound].questions[activeQuestion] = newQuestion;
                      setRounds(newRounds);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-honey-500 focus:outline-none"
                  >
                    <option value="text_answer">Text Answer</option>
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="true_false">True/False</option>
                    <option value="closest_number">Closest Number</option>
                    <option value="image">Image Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question Text *
                  </label>
                  <textarea
                    value={currentQuestion.question}
                    onChange={(e) => updateQuestion('question', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-honey-500 focus:outline-none h-20 resize-none"
                    placeholder="Enter your question..."
                  />
                </div>

                {/* Type-specific fields */}
                {currentQuestion.type === 'multiple_choice' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Options
                    </label>
                    {(currentQuestion as MultipleChoiceQuestion).options?.map((option: string, index: number) => (
                      <input
                        key={index}
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(currentQuestion as MultipleChoiceQuestion).options];
                          newOptions[index] = e.target.value;
                          updateQuestion('options', newOptions);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-honey-500 focus:outline-none mb-2"
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      />
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'image' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image Path
                    </label>
                    <input
                      type="text"
                      value={(currentQuestion as ImageQuestion).image_path || ''}
                      onChange={(e) => updateQuestion('image_path', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-honey-500 focus:outline-none"
                      placeholder="/images/question-image.jpg"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Answer *
                  </label>
                  {currentQuestion.type === 'true_false' ? (
                    <select
                      value={currentQuestion.answer}
                      onChange={(e) => updateQuestion('answer', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-honey-500 focus:outline-none"
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  ) : currentQuestion.type === 'multiple_choice' ? (
                    <select
                      value={currentQuestion.answer}
                      onChange={(e) => updateQuestion('answer', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-honey-500 focus:outline-none"
                    >
                      {(currentQuestion as MultipleChoiceQuestion).options?.map((option: string, index: number) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={currentQuestion.answer}
                      onChange={(e) => updateQuestion('answer', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-honey-500 focus:outline-none"
                      placeholder="Correct answer..."
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Explanation
                  </label>
                  <textarea
                    value={currentQuestion.explanation || ''}
                    onChange={(e) => updateQuestion('explanation', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-honey-500 focus:outline-none h-16 resize-none"
                    placeholder="Optional explanation..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Points
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={currentQuestion.points}
                    onChange={(e) => updateQuestion('points', parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-honey-500 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};