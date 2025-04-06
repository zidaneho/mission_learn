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
import Uranus from './PlanetImages/Uranus.png';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyA1Oc9ePnHrkuUydkZ1RitQhX-245bvaos" });

const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
function Profile() {

  const { selectedPlanet } = useGame();
  switch (selectedPlanet) {
    case 0: // Mercury
      return (
        <Image
          src={MercuryImage}          
          width={200}
          height={200}
          alt="Mercury"
        />
      );
    
    case 1: // Venus
      return (
        <Image
          src={VenusImage}          
          width={200}
          height={200}
          alt="Venus"
        />
      );
    case 2: // Earth
      return (
        <Image
          src={EarthImage}          
          width={200}
          height={200}
          alt="Earth"
        />
      );
    case 3: // Mars
      return (
        <Image
          src={MarsImage}          
          width={200}
          height={200}
          alt="Mars"
        />
      );
    case 4: // Jupiter
      return (
        <Image
          src={JupiterImage}          
          width={200}
          height={200}
          alt="Jupiter"
        />
      );
    case 5: // Saturn
      return (
        <Image
          src={SaturnImage}          
          width={200}
          height={200}
          alt="Saturn"
        />
      );
    case 6: // Uranus
      return (
        <Image
          src={Uranus}          
          width={200}
          height={200}
          alt="Uranus"
        />
      );
    case 7: // Neptune
      return (
        <Image
          src={NeptuneImage}          
          width={200}
          height={200}
          alt="Neptune"
        />
      );
      
    


    default:
      break;
  }

}


const AskPrompt: React.FC = () => {
  return <div>askPrompt()</div>;
};
const PlanetSelector: React.FC<{ onSelect: () => void }> = ({ onSelect }) => {
  const { selectedPlanet, setSelectedPlanet } = useGame();
  const [response, setResponse] = useState<string | null>(null); // Explicitly initialize with null

  const handleLeft = () => {
    setSelectedPlanet((selectedPlanet - 1 + planets.length) % planets.length);
  };

  const handleRight = () => {
    setSelectedPlanet((selectedPlanet + 1) % planets.length);
    console.log("Selected Planet: ", selectedPlanet);
  };

  const askPrompt = async () => {
    var selectedPlanetName = planets[selectedPlanet]; // Get the name of the selected planet
    var prompt = `Give me a ${selectedPlanetName} fact in 30 words or less`; // Construct the prompt
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      if (response) {
        setResponse(response.text ?? null); // Use null if response.text is undefined
      }
      

    } catch (error) {
      console.error("Error fetching response from Gemini:", error);
    }
   
  };

  return (
    <div>
      <h2>Spaceship Control Center</h2>
      <div>
        <button onClick={handleLeft}>Left</button>
        <span style={{ margin: '0 20px' }}>{planets[selectedPlanet]}</span>
        <button onClick={handleRight}>Right</button>
        <span style={{ margin: '0 20px' }}>{planets[selectedPlanet]}</span>
        <button onClick={askPrompt}>Test Gemini</button>
        {response && <p>Fun fact: {response}</p>}
      </div>
      <Profile />

      <button onClick={onSelect} style={{ marginTop: '20px' }}>Select Planet</button>
    </div>
  );
};

export default PlanetSelector;
