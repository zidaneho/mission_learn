"use client";

import { useState } from "react";
import { GameProvider } from "../context/GameContext";
import PlanetSelector from "../components/PlanetSelector";
import QuestionSet from "../components/QuestionSet";
import Shop from "../components/Shop";
import {shopItems, ShopItem} from "../components/ShopItems";
import ItemPlacements from "../components/ItemPlacements";

export default function Home() {
  const [showShop, setShowShop] = useState(false);
  const [inQuestionMode, setInQuestionMode] = useState(false);

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
  
  return (
    <GameProvider>
      <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] relative">
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
            />
          ) : (
            <PlanetSelector onSelect={handlePlanetSelect} />
          )}
        </main>

        {/* Shop Button */}
        <button
          onClick={() => setShowShop(true)}
          className="fixed bottom-10 left-10 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Shop
        </button>

        {/* Shop Modal */}
        {showShop && <Shop onClose={() => setShowShop(false)} />}

        {/* Item Placements: Only show when not in question mode */}
        {!inQuestionMode && <ItemPlacements />}
      </div>
    </GameProvider>
  );
}
