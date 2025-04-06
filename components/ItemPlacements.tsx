"use client";

import React, { useEffect, RefObject, useState } from "react";
import { useGame } from "../context/GameContext";
import { shopItems } from "./ShopItems";
import { GoogleGenAI } from "@google/genai";
import Image from "next/image";

interface ItemPlacementsProps {
  containerRef: RefObject<HTMLDivElement>;
}

const ItemPlacements: React.FC<ItemPlacementsProps> = ({ containerRef }) => {
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_SECRET_KEY });
  const [itemFact, setItemFact] = useState<string | null>(null); // Explicitly initialize with null
  const { items } = useGame();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions(); // Initial call
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [containerRef]);

  const itemFunFact = async (itemName: string) => {
    const prompt = `Give me a ${itemName} fact in 30 words or less. Make it worded for a singular young kid. Act like you're a friendly face working at mission control talking to a student on a tour of mission control for the first time. Be creative with your sentence starters. Act like you are both looking at the item.`;
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      if (response) {
        setItemFact(response.text ?? null);
      }
    } catch (error) {
      console.error("Error fetching response from Gemini:", error);
    }
  };

  return (
    <>
      {items.map((itemName) => {
        const item = shopItems.find((i) => i.name === itemName);
        if (!item) return null;

        // Calculate left and top positions based on container dimensions.
        const left = item.x * dimensions.width;
        const top = item.y * dimensions.height;

        return (
          <div
            key={item.id}
            style={{
              position: "absolute",
              left: left,
              top: top,
              transform: `translate(-50%, -50%) scale(${item.scale ?? 1})`,
              transformOrigin: "center center",
              pointerEvents: "none",
              textAlign: "center",
            }}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={48}
              height={48}
              onClick={() => itemFunFact(item.name)}
              className="cursor-pointer transition-transform duration-300 hover:scale-110"
            />
            <div
              style={{
                position: "fixed",
                left: "50%",
                transform: "translateX(-50%)",
                width: "250px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
                backgroundColor: "#000009",
              }}
            >
              {itemFact && <p>Fun fact: {itemFact}</p>}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ItemPlacements;
