"use client";

import { useState,useRef } from "react";
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
  const foregroundRef = useRef<HTMLDivElement>(null);

  // Called when the QuestionSet changes the current question
  const handleQuestionChange = (question: Question) => {
    setCurrentQuestion(question);
    setHint(null); // Clear any previous hint
  };

  const handlePlanetSelect = () => {
    setInQuestionMode(true);
  };

  const handleQuestionsComplete = () => {
    setInQuestionMode(false);
    setHint(null);
  };

  const handleBackToSpaceship = () => {
    setInQuestionMode(false);
    setHint(null);
  };

  return (
    <GameProvider>
      <div
        className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] relative bg-center"
        style={{ 
          backgroundImage: `url(${starsBackground})`,
          overflow: "hidden",
          width:'100%'
          
        }}
      >
        {/* Moon image: in front of background but behind content */}
        <div
          ref={foregroundRef}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "auto",
            zIndex: 1, // lower than game content
            pointerEvents: "none",
          }}
        >
          <Image
            src="/moon-slice.png"
            alt="Moon"
            width={250}
            height={0}
            style={{
              pointerEvents: "none",
              width: "100%",
              height: "auto",
              imageRendering: "pixelated",
              position: "relative", // ensure it stays within this container
              zIndex: 0,
              bottom:"0%"
            }}
          />
          {!inQuestionMode && <ItemPlacements containerRef={foregroundRef} />}
        </div>

        {/* Wrapper for content with higher z-index */}
        <div className="relative z-10">
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
            <div className="fixed bottom-22 left-10">
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

          
        </div>
        
      </div>
     
    </GameProvider>
  );
}
