import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameState {
  selectedPlanet: number;
  currency: number;
  progress: Record<string, any>;
  items: string[];
}

interface GameContextProps extends GameState {
  setSelectedPlanet: (index: number) => void;
  addCurrency: (amount: number) => void;
  updateProgress: (key: string, value: any) => void;
  buyItem: (item: string, cost: number) => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<number>(0);
  const [currency, setCurrency] = useState<number>(0);
  const [progress, setProgress] = useState<Record<string, any>>({});
  const [items, setItems] = useState<string[]>([]);

  // Load saved state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      const state = JSON.parse(savedState);
      setSelectedPlanet(state.selectedPlanet);
      setCurrency(state.currency);
      setProgress(state.progress);
      setItems(state.items);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify({ selectedPlanet, currency, progress, items }));
  }, [selectedPlanet, currency, progress, items]);

  const addCurrency = (amount: number) => {
    setCurrency(prev => prev + amount);
  };

  const updateProgress = (key: string, value: any) => {
    setProgress(prev => ({ ...prev, [key]: value }));
  };

  const buyItem = (item: string, cost: number) => {
    if (currency >= cost) {
      setCurrency(prev => prev - cost);
      setItems(prev => [...prev, item]);
    } else {
      alert('Not enough currency');
    }
  };

  return (
    <GameContext.Provider
      value={{ selectedPlanet, currency, progress, items, setSelectedPlanet, addCurrency, updateProgress, buyItem }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
