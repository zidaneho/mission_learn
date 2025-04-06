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

const ai = new GoogleGenAI({ apiKey: "AIzaSyA1Oc9ePnHrkuUydkZ1RitQhX-245bvaos" });

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
  const [encouragementTest, setEncourage] = useState<string | null>(null); // Explicitly initialize with null

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
    var prompt = `Give me a ${selectedPlanetName} fact in 30 words or less. Make it worded for a young kid. Act like you're the planet Pluto`; // Construct the prompt
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

  const encouragementText = async () => {
    var selectedPlanetName = planets[selectedPlanet]; // Get the name of the selected planet
    var prompt = `Pretend I am a young kid who just answered a question incorrectly. Give me words of encouragement with a positive joking try again vibe. Make it only one line. If you can, make it astronomy themed`; // Construct the prompt
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      if (response) {
        setEncourage(response.text ?? null); // Use null if response.text is undefined
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
      <button onClick={onSelect} style={{ marginTop: '20px' }}>
        Select Planet
      </button>

        <button onClick={planetFunFact}>Planet Fun fact</button>
        {planetFact && <p>Fun fact: {planetFact}</p>}
        <button onClick={encouragementText}>Words of encouragement</button>
        {encouragementTest && <p>Encourage: {encouragementTest}</p>}
    </div>

    
  );
};

export default PlanetSelector;
