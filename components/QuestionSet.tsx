import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

interface Question {
  question: string;
  options: string[];
  answer: number; // index of the correct option
}

const sampleQuestions: Question[] = [
  {
    question: 'What is 2 + 2?',
    options: ['3', '4', '5'],
    answer: 1,
  },
  {
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris'],
    answer: 2,
  },
  // You can add more questions or load questions based on the planet/topic
];

interface QuestionSetProps {
  onComplete: () => void;
  onBack: () => void; // Added onBack to the interface
}

const QuestionSet: React.FC<QuestionSetProps> = ({ onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addCurrency } = useGame();

  const currentQuestion = sampleQuestions[currentIndex];

  const handleAnswer = (optionIndex: number) => {
    if (optionIndex === currentQuestion.answer) {
      addCurrency(5); // Reward 5 points for correct answer
    }
    if (currentIndex < sampleQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="max-w-md w-full p-6 bg-white/80 backdrop-blur rounded-lg shadow-lg">
      <div className="flex justify-between mb-4">
        <button onClick={onBack} className="text-blue-500 hover:underline">
          &larr; Back to Spaceship
        </button>
        <span>
          Question {currentIndex + 1} of {sampleQuestions.length}
        </span>
      </div>
      <p className="mb-4">{currentQuestion.question}</p>
      <ul className="space-y-2">
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => handleAnswer(index)}
              className="w-full text-left px-4 py-2 bg-blue-100 rounded hover:bg-blue-200"
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionSet;
