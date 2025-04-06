"use client";

import { useState, useRef } from "react";
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

function HomeContent() {
  const { selectedPlanet, markPlanetCompleted } = useGame();
  const [showShop, setShowShop] = useState(false);
  const [inQuestionMode, setInQuestionMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [hintText, setHint] = useState<string | null>(null);
  const starsBackground = "/stars_background.png";
  const foregroundRef = useRef<HTMLDivElement>(null);

  // Update current question (and clear any previous hint)
  const handleQuestionChange = (question: Question) => {
    setCurrentQuestion(question);
    setHint(null);
  };

  const handlePlanetSelect = () => {
    setInQuestionMode(true);
  };

  const handleQuestionsComplete = () => {
    // When all questions for the current planet are answered correctly, mark it as completed.
    markPlanetCompleted(selectedPlanet);
    setInQuestionMode(false);
    setHint(null);
  };

  const handleBackToSpaceship = () => {
    setInQuestionMode(false);
    setHint(null);
  };

  return (
    <div
      className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-space-mono)] relative bg-center"
      style={{
        backgroundImage: `url(${starsBackground})`,
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Foreground container for moon-slice image */}
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
            position: "relative",
            zIndex: 0,
            bottom: "0%",
          }}
        />
        {/* Render ItemPlacements inside this container if desired */}
        {!inQuestionMode && <ItemPlacements containerRef={foregroundRef} />}
      </div>

      {/* Wrapper for all interactive content with higher z-index */}
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

        {/* Currency Display (only on home screen) */}
        {!inQuestionMode && (
          <div className="fixed bottom-16 left-10">
            <CurrencyDisplay />
          </div>
        )}

        {/* Shop Button (only on home screen) */}
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
  );
}

export default function Home() {
  return (
    <GameProvider>
      <HomeContent />
    </GameProvider>
  );
}
