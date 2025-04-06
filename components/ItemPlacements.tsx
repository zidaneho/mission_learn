'use client';
import {useEffect, RefObject,useState} from 'react'
import { useGame } from '../context/GameContext';
import { shopItems } from './ShopItems';

interface ItemPlacementsProps {
  containerRef: RefObject<HTMLDivElement | null>;
}

const ItemPlacements: React.FC<ItemPlacementsProps> = ({ containerRef }) => {
  const { items } = useGame();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions(); // Initial call
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <>
      {items.map((itemName) => {
        const item = shopItems.find((i) => i.name === itemName);
        if (!item) return null;

        const left = item.x * dimensions.width;
        const top = item.y * dimensions.height;
        

        return (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              left:left,
              top:top,
              transform: `translate(-50%, -50%) scale(${item.scale ?? 1})`,
              transformOrigin: 'center center',
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
