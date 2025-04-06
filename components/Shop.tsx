"use client";

// components/Shop.tsx
import React, { useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import './Shop.css';
import {shopItems,ShopItem} from "../components/ShopItems"



interface ShopProps {
  onClose: () => void;
}

const Shop: React.FC<ShopProps> = ({ onClose }) => {
  const { currency, buyItem, items } = useGame();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close shop on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="shop-backdrop">
      <div ref={modalRef} className="shop-modal">
        <h2 className="shop-title">🛒 Game Shop</h2>
        <p className="shop-currency">
          Currency: <span>{currency}</span>
        </p>
        <ul className="shop-items">
          {shopItems.map(item => {
            const alreadyOwned = items.includes(item.name);

            return (
            <li key={item.id} className="shop-item">
              <span>
                {item.name} - <strong>{item.cost} pts</strong>
              </span>
              {alreadyOwned ? (
                <span style={{ fontSize: 12, color: 'gray' }}>✔ Owned</span>
              ) : (
              <button
                className="buy-button"
                onClick={() => buyItem(item.name, item.cost)}
              >
                Buy
              </button>
              )}
            </li>
          );
          })}
        </ul>
        <button onClick={onClose}>Close Shop</button>
      </div>
    </div>
  );
};

export default Shop;
