import React from 'react';
import { useGame } from '../context/GameContext';

const shopItems = [
  { id: 'shield', name: 'Shield', cost: 10 },
  { id: 'engine', name: 'Engine Boost', cost: 15 },
  // add more items as needed
];

interface ShopProps {
  onClose: () => void;
}

const Shop: React.FC<ShopProps> = ({ onClose }) => {
  const { currency, buyItem } = useGame();

  return (
    <div className="shop-modal" style={{
      position: 'absolute', top: 50, left: 50, background: '#fff', padding: 20, border: '1px solid #ccc'
    }}>
      <h2>Shop</h2>
      <p>Currency: {currency}</p>
      <ul>
        {shopItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.cost} points 
            <button onClick={() => buyItem(item.name, item.cost)}>Buy</button>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close Shop</button>
    </div>
  );
};

export default Shop;
