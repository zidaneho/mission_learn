import React from 'react';
import { useGame } from '../context/GameContext';

const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

const PlanetSelector: React.FC<{ onSelect: () => void }> = ({ onSelect }) => {
  const { selectedPlanet, setSelectedPlanet } = useGame();

  const handleLeft = () => {
    setSelectedPlanet((selectedPlanet - 1 + planets.length) % planets.length);
  };

  const handleRight = () => {
    setSelectedPlanet((selectedPlanet + 1) % planets.length);
  };

  return (
    <div>
      <h2>Spaceship Control Center</h2>
      <div>
        <button onClick={handleLeft}>Left</button>
        <span style={{ margin: '0 20px' }}>{planets[selectedPlanet]}</span>
        <button onClick={handleRight}>Right</button>
      </div>
      <button onClick={onSelect} style={{ marginTop: '20px' }}>Select Planet</button>
    </div>
  );
};

export default PlanetSelector;
