"use client";

import { useState } from "react";
import { GameProvider } from "../context/GameContext";
import PlanetSelector from "../components/PlanetSelector";
import QuestionSet from "../components/QuestionSet";
import Shop from "../components/Shop";
import {shopItems, ShopItem} from "../components/ShopItems";
import ItemPlacements from "../components/ItemPlacements";
import { GoogleGenAI } from "@google/genai";
import Image from 'next/image';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_SECRET_KEY });

interface Question {
  question: string;
  options: string[];
  answer: number;
}

export default function Home() {
  const [showShop, setShowShop] = useState(false);
  const [inQuestionMode, setInQuestionMode] = useState(false);
  const starsBackground = "/stars_background.png";

  const [hintText, setHint] = useState<string | null>(null); // Explicitly initialize with null

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const handleQuestionChange = (question: Question) => {
    setCurrentQuestion(question); // Update state in page.tsx
  };

  const handlePlanetSelect = () => {
    // Start the question mode when a planet is selected
    setInQuestionMode(true);
  };

  const handleQuestionsComplete = () => {
    // Return to the spaceship view after questions are finished
    setInQuestionMode(false);
  };

  const handleBackToSpaceship = () => {
    // Back button action from the planet's question view
    setInQuestionMode(false);
  };
  
  const getHint = async () => {

    if (!currentQuestion) {
      console.error("No current question to provide a hint for.");
      return;
    }

    var prompt = `Pretend I am a young kid who needs a small hint to answer the question ` + currentQuestion.question + 'give this kid a hint to answer. Do not include the correct answer text in the hint. Make sure the hint is relevant to the context of the question and answer. ' + currentQuestion.options[currentQuestion.answer]; // Construct the prompt
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      if (response) {
        //setEncourage(response.text ?? null); // Use null if response.text is undefined
        setHint(response.text ?? null);
      }
      

    } catch (error) {
      console.error("Error fetching response from Gemini:", error);
    }
   
  };

  return (
    <GameProvider>
      <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] relative bg-center"
      style={{backgroundImage: `url(${starsBackground})`}}>
        {/* Game Header */}
        <header className="w-full flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold">Elementary Space Adventure</h1>
        </header>

        {/* Game Main Content */}
        <main className="flex flex-col items-center gap-8">
          {inQuestionMode ? (
            <>
              <QuestionSet 
                onComplete={handleQuestionsComplete} 
                onBack={handleBackToSpaceship}
                onQuestionChange={handleQuestionChange} // Pass the callback 
              />
          
              <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
                <Image
                  src="/right_arrow.png" // Place right_arrow.png in public folder
                  alt="Right Arrow"
                  width={50}
                  height={50}
                  onClick={getHint}
                  className="cursor-pointer transition-transform duration-300 hover:scale-110"
                />
              </div>
            </>
          ) : (
            <PlanetSelector onSelect={handlePlanetSelect} />
          )}
        </main>

        {/* Shop Button: Only show on home screen */}
        {!inQuestionMode && (
          <button
            onClick={() => setShowShop(true)}
            className="fixed bottom-10 left-10 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Shop
          </button>
        )}

        {/* Shop Modal */}
        {showShop && <Shop onClose={() => setShowShop(false)} />}

        {/* Item Placements: Only show when not in question mode */}
        {!inQuestionMode && <ItemPlacements />}
      </div>
    </GameProvider>
  );
}
