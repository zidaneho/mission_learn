'use client';
import { useGame } from '../context/GameContext';
import { shopItems } from './ShopItems';

const ItemPlacements = () => {
  const { items } = useGame();
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

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
              pointerEvents: 'none',
              textAlign: 'center',
            }}
          >
            <img src={item.image} alt={item.name} style={{ width: 48, height: 48 }} />
          </div>
        );
      })}
    </>
  );
};

export default ItemPlacements;
