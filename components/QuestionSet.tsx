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
}

const QuestionSet: React.FC<QuestionSetProps> = ({ onComplete }) => {
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
    <div>
      <h3>Question {currentIndex + 1} of {sampleQuestions.length}</h3>
      <p>{currentQuestion.question}</p>
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <button onClick={() => handleAnswer(index)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionSet;
