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
  // Add more questions or load questions based on the planet/topic
];

interface QuestionSetProps {
  onComplete: () => void;
  onBack: () => void;
}

const QuestionSet: React.FC<QuestionSetProps> = ({ onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addCurrency, selectedPlanet } = useGame();

  // Define color themes for each planet (by index order):
  // Mercury: red, Venus: yellow, Earth: bluish green, Mars: red,
  // Jupiter: brown, Saturn: saffron, Uranus: light blue, Neptune: dark blue.
  const planetThemes = [
    { box: "bg-red-500/80", text: "text-white" },    // Mercury
    { box: "bg-yellow-500/80", text: "text-black" },   // Venus
    { box: "bg-teal-500/80", text: "text-white" },       // Earth (bluish green)
    { box: "bg-red-600/80", text: "text-white" },        // Mars
    { box: "bg-orange-700/80", text: "text-white" },     // Jupiter (brown-ish)
    { box: "bg-amber-500/80", text: "text-black" },      // Saturn (saffron)
    { box: "bg-sky-400/80", text: "text-black" },        // Uranus (light blue)
    { box: "bg-blue-900/80", text: "text-white" },       // Neptune (dark blue)
  ];

  // Choose the theme based on the currently selected planet
  const theme = planetThemes[selectedPlanet] || planetThemes[0];

  const currentQuestion = sampleQuestions[currentIndex];

  const handleAnswer = (optionIndex: number) => {
    if (optionIndex === currentQuestion.answer) {
      addCurrency(5); // Reward 5 points for a correct answer
    }
    if (currentIndex < sampleQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className={`max-w-md w-full p-6 ${theme.box} backdrop-blur rounded-lg shadow-lg`}>
      <div className="flex justify-between mb-4">
        <button onClick={onBack} className={`${theme.text} hover:underline`}>
          &larr; Back to Spaceship
        </button>
        <span className={theme.text}>
          Question {currentIndex + 1} of {sampleQuestions.length}
        </span>
      </div>
      <p className={`${theme.text} mb-4`}>{currentQuestion.question}</p>
      <ul className="space-y-2">
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => handleAnswer(index)}
              className="w-full text-left px-4 py-2 bg-white/70 text-black rounded hover:bg-white/90"
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
