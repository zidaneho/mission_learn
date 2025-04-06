import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Image from 'next/image';
import NeptuneImage from './PlanetImages/Neptune.png';
import EarthImage from './PlanetImages/Earth.png';
import MarsImage from './PlanetImages/Mars.png';
import MercuryImage from './PlanetImages/Mercury.png';
import VenusImage from './PlanetImages/Venus.png';
import JupiterImage from './PlanetImages/Jupiter.png';
import SaturnImage from './PlanetImages/Saturn.png';
import UranusImage from './PlanetImages/Uranus.png';
import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_SECRET_KEY });

const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

function Profile() {

  const { selectedPlanet } = useGame();

  switch (selectedPlanet) {
    case 0:
      return <Image src={MercuryImage} width={200} height={200} alt="Mercury" />;
    case 1:
      return <Image src={VenusImage} width={200} height={200} alt="Venus" />;
    case 2:
      return <Image src={EarthImage} width={200} height={200} alt="Earth" />;
    case 3:
      return <Image src={MarsImage} width={200} height={200} alt="Mars" />;
    case 4:
      return <Image src={JupiterImage} width={200} height={200} alt="Jupiter" />;
    case 5:
      return <Image src={SaturnImage} width={200} height={200} alt="Saturn" />;
    case 6:
      return <Image src={UranusImage} width={200} height={200} alt="Uranus" />;
    case 7:
      return <Image src={NeptuneImage} width={200} height={200} alt="Neptune" />;
    default:
      return null;
  }
}



const AskPrompt: React.FC = () => {
  return <div>askPrompt()</div>;
};
const PlanetSelector: React.FC<{ onSelect: () => void }> = ({ onSelect }) => {
  const { selectedPlanet, setSelectedPlanet } = useGame();
  const [leftClicked, setLeftClicked] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const [planetFact, setFact] = useState<string | null>(null); // Explicitly initialize with null

  const handleLeft = () => {
    setLeftClicked(true);
    setTimeout(() => setLeftClicked(false), 1000);
    setSelectedPlanet((selectedPlanet - 1 + planets.length) % planets.length);
  };

  const handleRight = () => {
    setRightClicked(true);
    setTimeout(() => setRightClicked(false), 1000);
    setSelectedPlanet((selectedPlanet + 1) % planets.length);
    console.log("Selected Planet: ", selectedPlanet);
  };

  const planetFunFact = async () => {
    var selectedPlanetName = planets[selectedPlanet]; // Get the name of the selected planet

    var prompt = `Give me a ${selectedPlanetName} fact in 30 words or less. Make it worded for a singular young kid. Act like you're a friendly face working at mission control talking to a student on a tour of mission control for the first time. Be creative with your sentence starters. You and the kid are looking at a monitor with a picture of the planet.`; // Construct the prompt
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      if (response) {
        setFact(response.text ?? null); // Use null if response.text is undefined
      }
      

    } catch (error) {
      console.error("Error fetching response from Gemini:", error);
    }
   
  };



  return (
    <div className="flex flex-col items-center">
      <h2>Spaceship Control Center</h2>

      {/* Container for arrow images and planet image */}
      <div className="relative flex items-center justify-center mt-4">
        {/* Left Arrow */}
        <div className="absolute left-[-80px]">
          <Image
            src="/left_arrow.png" // Place left_arrow.png in public folder
            alt="Left Arrow"
            width={50}
            height={50}
            onClick={handleLeft}
            className="cursor-pointer transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Planet Image */}
        <Profile />

        {/* Right Arrow */}
        <div className="absolute right-[-80px]">
          <Image
            src="/right_arrow.png" // Place right_arrow.png in public folder
            alt="Right Arrow"
            width={50}
            height={50}
            onClick={handleRight}
            className="cursor-pointer transition-transform duration-300 hover:scale-110"
          />
        </div>

      </div>

      {/* Planet Name */}
      <span style={{ marginTop: '20px' }}>{planets[selectedPlanet]}</span>

      {/* Select Button */}
      <button
        onClick={onSelect}
        className="mt-4 px-4 py-2 rounded border border-teal-600 text-teal-600 hover:border-teal-500 hover:text-teal-500 hover:scale-105 hover:shadow-lg hover:shadow-teal-500 transition-all"
      >
        Select Planet
      </button>

      <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
          <Image
            src="/right_arrow.png" // Place right_arrow.png in public folder
            alt="Right Arrow"
            width={50}
            height={50}
            onClick={planetFunFact}
            className="cursor-pointer transition-transform duration-300 hover:scale-110"
          />
      </div>

      <div style={{ position: 'fixed', bottom: '90px', left: '50%', transform: 'translateX(-50%)', width: '250px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)', backgroundColor: '#000009' }}>
      {planetFact && <p>Fun fact: {planetFact}</p>}
      </div>
    </div>

    
  );
};

export default PlanetSelector;
