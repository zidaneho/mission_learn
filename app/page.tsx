"use client";

import { useState } from "react";
import { GameProvider, useGame } from "../context/GameContext";
import PlanetSelector from "../components/PlanetSelector";
import QuestionSet, { Question } from "../components/QuestionSet";
import Shop from "../components/Shop";
import { shopItems, ShopItem } from "../components/ShopItems";
import ItemPlacements from "../components/ItemPlacements";
import Image from "next/image";

function CurrencyDisplay() {
  const { currency } = useGame();
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded border border-white bg-black bg-opacity-50 text-white text-lg font-bold">
      <Image src="/currency.png" alt="Coin" width={20} height={20} />
      <span>{currency}</span>
    </div>
  );
}

export default function Home() {
  const [showShop, setShowShop] = useState(false);
  const [inQuestionMode, setInQuestionMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [hintText, setHint] = useState<string | null>(null);
  const starsBackground = "/stars_background.png";

  // This function is called from QuestionSet when the current question changes.
  const handleQuestionChange = (question: Question) => {
    setCurrentQuestion(question);
    setHint(null); // Clear any previous hint
  };

  const handlePlanetSelect = () => {
    // Start the question mode when a planet is selected
    setInQuestionMode(true);
  };

  const handleQuestionsComplete = () => {
    // Return to the spaceship view after questions are finished
    setInQuestionMode(false);
    setHint(null);
  };

  const handleBackToSpaceship = () => {
    // Back button action from the planet's question view
    setInQuestionMode(false);
    setHint(null);
  };

  return (
    <GameProvider>
      <div
        className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] relative bg-center"

        style={{ 
          backgroundImage: `url(${starsBackground})`,
          overflow:"hidden" 
        }}
      >
        <Image
          src="/Moon.png"
          alt="Moon"
          width={2000}
          height={2000}
          className="absolute z-10 pointer-events-none"
          style={{
            bottom: "-900px", // moves it 100px *below* the screen
            left: "50%",       // center it horizontally
            transform: "translateX(-50%)",
            imageRendering: "pixelated"
          }}
        />
        {/* Game Header */}
        <header className="w-full flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold">Elementary Space Adventure</h1>
        </header>

        {/* Game Main Content */}
        <main className="flex flex-col items-center gap-8">
          {inQuestionMode ? (
            <QuestionSet 
              onComplete={handleQuestionsComplete} 
              onBack={handleBackToSpaceship}
              onQuestionChange={handleQuestionChange}
            />
          ) : (
            <PlanetSelector onSelect={handlePlanetSelect} />
          )}
        </main>

        {/* Currency Display: Only show on home screen */}
        {!inQuestionMode && (

          <div className="fixed bottom-25 left-10">
            <CurrencyDisplay />
          </div>
        )}

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
