import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { GoogleGenAI } from "@google/genai";
import Image from 'next/image';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_SECRET_KEY });


interface Question {
  question: string;
  options: string[];
  answer: number;
}

const questionSets: { [key: number]: { category: string; questions: Question[] } } = {
  0: { // Mercury - Anatomy
    category: "Anatomy",
    questions: [
      {
        question: "Which of the following are the 5 senses?",
        options: [
          "Talking, thinking, jumping, running, sleeping",
          "Seeing, hearing, smelling, tasting, touching",
          "Laughing, crying, walking, swimming, drawing",
          "Blinking, hiccupping, yawning, sneezing, coughing"
        ],
        answer: 1,
      },
      {
        question: "What is the largest organ in your body?",
        options: ["Brain", "Heart", "Skin", "Liver"],
        answer: 2,
      },
      {
        question: "What does your heart do?",
        options: ["Helps you see", "Helps you talk", "Pumps blood through your body", "Helps you sleep"],
        answer: 2,
      },
      {
        question: "What does your brain do?",
        options: ["Helps you run", "Helps you think and feel", "Pumps your blood", "Helps you breathe"],
        answer: 1,
      },
      {
        question: "What does your stomach do?",
        options: ["Helps you taste your food", "Helps digest (break down) food", "Tells you the weather", "Helps you think"],
        answer: 1,
      },
    ],
  },
  1: { // Venus - Scientific thinking
    category: "Scientific thinking",
    questions: [
      {
        question: "What is the first step of the scientific method?",
        options: ["Do an experiment", "Make a guess", "Ask a question", "Look in a book"],
        answer: 2,
      },
      {
        question: "What is a hypothesis?",
        options: ["A type of plant", "A tool used in science", "A funny joke", "An educated guess you can test"],
        answer: 3,
      },
      {
        question: "Which tool helps you see things that are very small?",
        options: ["Thermometer", "Microscope", "Ruler", "Stopwatch"],
        answer: 1,
      },
      {
        question: "Why do scientists do experiments?",
        options: ["To play games", "To test their hypothesis", "To make art", "To clean up messes"],
        answer: 1,
      },
      {
        question: "What do you call something that stays the same in an experiment?",
        options: ["A guess", "A change", "A variable", "A control"],
        answer: 3,
      },
    ],
  },
  2: { // Earth - Plants and animals
    category: "Plants and animals",
    questions: [
      {
        question: "How do plants get water from their habitat?",
        options: [
          "Through their leaves, via photosynthesis",
          "Through their roots, by absorbing water from the soil",
          "Through their flowers, during blooming",
          "Through their stems, via evaporation"
        ],
        answer: 1,
      },
      {
        question: "What is the main difference between reptiles, amphibians, and mammals?",
        options: [
          "Reptiles lay eggs, amphibians live in water, and mammals have fur or hair.",
          "Reptiles have fur, amphibians live on land, and mammals lay eggs.",
          "Reptiles can fly, amphibians live in the sky, and mammals have scales.",
          "Reptiles breathe through gills, amphibians have feathers, and mammals lay eggs."
        ],
        answer: 0,
      },
      {
        question: "True or False: Plants make food by using sunlight in a process called photosynthesis.",
        options: ["True", "False"],
        answer: 0,
      },
      {
        question: "What do herbivores eat?",
        options: ["Meat", "Plants", "Both plants and meat", "Insects"],
        answer: 1,
      },
      {
        question: "Which of the following is an example of an amphibian?",
        options: ["Lizard", "Frog", "Dog", "Bat"],
        answer: 1,
      },
    ],
  },
  3: { // Mars - Rocks and minerals
    category: "Rocks and minerals",
    questions: [
      {
        question: "Where are minerals found?",
        options: ["Only in the ocean", "Inside the Earth, in rocks and soil", "Only on the surface of the moon", "Only in plants"],
        answer: 1,
      },
      {
        question: "What is the hardest mineral on Earth?",
        options: ["Gold", "Diamond", "Iron", "Salt"],
        answer: 1,
      },
      {
        question: "What is the name of the process that breaks down rocks into smaller pieces?",
        options: ["Erosion", "Hardening", "Freezing", "Ignition"],
        answer: 0,
      },
      {
        question: "Which of these is a common example of a sedimentary rock?",
        options: ["Granite", "Marble", "Sandstone", "Basalt"],
        answer: 2,
      },
      {
        question: "What is a rock that forms from cooling and hardening of lava called?",
        options: ["Sedimentary rock", "Metamorphic rock", "Igneous rock", "Fossil rock"],
        answer: 2,
      },
    ],
  },
  4: { // Jupiter - Natural Disasters
    category: "Natural Disasters",
    questions: [
      {
        question: "What comes out of a volcano when it erupts?",
        options: ["Snow and ice", "Lava and ash", "Wind and rain", "Lightning"],
        answer: 1,
      },
      {
        question: "What causes an earthquake?",
        options: ["Clouds moving in the sky", "The Sun shining too brightly", "Plates under Earth’s surface shifting", "Heavy cars driving on the road"],
        answer: 2,
      },
      {
        question: "What is a wildfire?",
        options: ["A campfire", "A small fire in a house", "A large fire that spreads quickly in nature", "A fire on a stove"],
        answer: 2,
      },
      {
        question: "What should you do if there is a natural disaster warning?",
        options: ["Go outside and watch", "Keep playing like normal", "Listen to adults and follow safety rules", "Fly a kite"],
        answer: 2,
      },
      {
        question: "What kind of storm brings thunder, lightning, and heavy rain?",
        options: ["Earthquake", "Blizzard", "Thunderstorm", "Hurricane"],
        answer: 2,
      },
    ],
  },
  5: { // Saturn - Space and the Solar
    category: "Space and the Solar",
    questions: [
      {
        question: "What is the center of our solar system?",
        options: ["Earth", "The Moon", "The Sun", "Mars"],
        answer: 2,
      },
      {
        question: "What causes day and night on Earth?",
        options: ["The Moon moving around the Earth", "The Sun moving across the sky", "Earth spinning around", "Stars twinkling"],
        answer: 2,
      },
      {
        question: "Which planet has rings around it?",
        options: ["Mars", "Venus", "Mercury", "Saturn"],
        answer: 3,
      },
      {
        question: "What are stars made of?",
        options: ["Ice", "Gas", "Water", "Rocks"],
        answer: 1,
      },
      {
        question: "What is the name of our galaxy?",
        options: ["The Star Galaxy", "The Sun Spiral", "The Milky Way", "The Space Zone"],
        answer: 2,
      },
    ],
  },
  6: { // Uranus - Water cycle and weather
    category: "Water cycle and weather",
    questions: [
      {
        question: "What is it called when the sun heats up water and it turns into a gas?",
        options: ["Condensation", "Evaporation", "Precipitation", "Collection"],
        answer: 1,
      },
      {
        question: "What do we call it when water falls from clouds as rain, snow, sleet, or hail?",
        options: ["Condensation", "Evaporation", "Precipitation", "Collection"],
        answer: 2,
      },
      {
        question: "What is the main cause of the weather on Earth?",
        options: ["The Earth's rotation", "The Sun's heat", "The moon", "The ocean currents"],
        answer: 1,
      },
      {
        question: "What is a cloud made of?",
        options: ["Dust", "Water vapor", "Air", "Smoke"],
        answer: 1,
      },
      {
        question: "What is the term for when water vapor cools and turns back into liquid, forming clouds?",
        options: ["Transpiration", "Evaporation", "Precipitation", "Condensation"],
        answer: 3,
      },
    ],
  },
  7: { // Neptune - Solids, liquids, gas
    category: "Solids, liquids, gas",
    questions: [
      {
        question: "What do we call water when it turns into ice?",
        options: ["Gas", "Liquid", "Solid", "Steam"],
        answer: 2,
      },
      {
        question: "What do we call water when it turns into steam?",
        options: ["Ice", "Fog", "Gas", "Snow"],
        answer: 2,
      },
      {
        question: "Which of these is an example of a liquid?",
        options: ["Milk", "Ice", "Air", "Rock"],
        answer: 0,
      },
      {
        question: "What happens to the molecules in a solid when it is heated?",
        options: ["They move faster and spread apart", "They slow down and come closer together", "They freeze", "They stay in the same place"],
        answer: 0,
      },
      {
        question: "What do we call the process when a solid turns into a liquid?",
        options: ["Freezing", "Evaporation", "Melting", "Condensation"],
        answer: 2,
      },
    ],
  },
};

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

const QuestionSet: React.FC<{ onComplete: () => void; onBack: () => void; }> = ({ onComplete, onBack }) => {
  const { addCurrency, selectedPlanet } = useGame();
  const currentSet = questionSets[selectedPlanet] || questionSets[0];
  const category = currentSet.category;
  const questions = currentSet.questions;
  const theme = planetThemes[selectedPlanet] || planetThemes[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ index: number; isCorrect: boolean } | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [disableOptions, setDisableOptions] = useState(false);
  

  const currentQuestion = questions[currentIndex];

  const [encouragementTest, setEncourage] = useState<string | null>(null); // Explicitly initialize with null


  const handleAnswer = (optionIndex: number) => {
    if (disableOptions) return;
    if (optionIndex === currentQuestion.answer) {
      setFeedback({ index: optionIndex, isCorrect: true });
      setDisableOptions(true);
      setFeedbackMessage("Amazing work!");
      addCurrency(5);
      setTimeout(() => {
        setFeedback(null);
        setFeedbackMessage(null);
        setDisableOptions(false);
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          onComplete();
        }
      }, 1000);
    } else {
      setFeedback({ index: optionIndex, isCorrect: false });
      setDisableOptions(true);
      // Call the encouragement
      //setFeedbackMessage("well....");
      encouragementText();
      //setFeedbackMessage('${encouragementTest}');
      
      setTimeout(() => {
        setFeedback(null);
        setFeedbackMessage(null);
        setDisableOptions(false);
      }, 6500); 
    }
  };

  const encouragementText = async () => {
    var prompt = `Pretend I am a young kid who just answered a question incorrectly. Give me words of encouragement with a positive joking try again vibe. Make it only one line. If you can, make it astronomy themed`; // Construct the prompt
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      if (response) {
        //setEncourage(response.text ?? null); // Use null if response.text is undefined
        setFeedbackMessage("huh");
        setFeedbackMessage(response.text ?? null);
      }
      

    } catch (error) {
      console.error("Error fetching response from Gemini:", error);
    }
   
  };

  const getHint = async () => {
    var prompt = `Pretend I am a young kid who needs a small hint to answer the question ` + currentQuestion.question + 'give this kid a hint to answer. Do not include the correct answer text in the hint. Make sure the hint is relevant to the context of the question and answer. ' + currentQuestion.options[currentQuestion.answer]; // Construct the prompt
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      if (response) {
        //setEncourage(response.text ?? null); // Use null if response.text is undefined
        setFeedbackMessage("huh");
        setFeedbackMessage(response.text ?? null);
      }
      

    } catch (error) {
      console.error("Error fetching response from Gemini:", error);
    }
   
  };

  return (
    <div>
    <div className={`max-w-md w-full p-6 ${theme.box} backdrop-blur rounded-lg shadow-lg`}>
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <button onClick={onBack} className={`${theme.text} hover:underline`}>
            &larr; Back to Spaceship
          </button>
          <span className={`${theme.text}`}>
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
        <Image
            src="/right_arrow.png" // Place right_arrow.png in public folder
            alt="Right Arrow"
            width={50}
            height={50}
            onClick={getHint}
            className="cursor-pointer transition-transform duration-300 hover:scale-110"
          />
        <div className="mt-4 text-center font-bold text-black text-2xl">
          Category: {category}
        </div>
      </div>
      <p className={`${theme.text} mb-4`}>{currentQuestion.question}</p>
      <ul className="space-y-2">
        {currentQuestion.options.map((option, index) => {
          let optionClass = "w-full text-left px-4 py-2 bg-white/70 text-black rounded hover:bg-white/90";
          if (feedback && feedback.index === index) {
            optionClass = feedback.isCorrect
              ? "w-full text-left px-4 py-2 bg-green-300 text-black rounded"
              : "w-full text-left px-4 py-2 bg-red-300 text-black rounded";
          }
          return (
            <li key={index}>
              <button onClick={() => handleAnswer(index)} className={optionClass} disabled={disableOptions}>
                {option}
              </button>
            </li>
          );
        })}
      </ul>
      {feedbackMessage && <div className="mt-4 text-center font-bold">{feedbackMessage}</div>}


    </div>



</div>
    
  );


};

export default QuestionSet;
