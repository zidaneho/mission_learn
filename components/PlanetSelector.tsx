import React from 'react';
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
      <Profile />
      <button onClick={onSelect} style={{ marginTop: '20px' }}>Select Planet</button>
    </div>
  );
};

export default PlanetSelector;
