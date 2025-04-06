'use client';
import { useGame } from '../context/GameContext';
import React, { useState } from 'react';

import { shopItems } from './ShopItems';
import { GoogleGenAI } from "@google/genai";
import Image from 'next/image';






const ItemPlacements: React.FC = () => {
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_SECRET_KEY });
  const [itemFact, setItemFact] = useState<string | null>(null); // Explicitly initialize with null
  const { items } = useGame();
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

  const itemFunFact = async (itemName: string) => {
    var prompt = `Give me a ${itemName} fact in 30 words or less. Make it worded for a singular young kid. Act like you're a friendly face working at mission control talking to a student on a tour of mission control for the first time. Be creative with your sentence starters. Act like you are both looking at the item.`; // Construct the prompt
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      if (response) {
        setItemFact(response.text ?? null); // Use null if response.text is undefined
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

        return (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              left: `${item.x * screenWidth}px`,
              top: `${item.y * screenHeight}px`,
              transform: 'translate(-50%, -50%)',
              //pointerEvents: 'none',
              textAlign: 'center',
              
            }}
          >
            <Image src={item.image} alt={item.name}  width={48} height={48}  onClick={() => itemFunFact(item.name)} className="cursor-pointer transition-transform duration-300 hover:scale-110"/>
            <div style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', width: '250px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)', backgroundColor: '#000009' }}>
            {itemFact && <p>Fun fact: {itemFact}</p>}
            </div>

          </div>
        );
      })}
    </>
  );
};

export default ItemPlacements;
