export interface ShopItem {
    id: string;
    name: string;
    cost: number;
    x: number; // 0.0 to 1.0 (percent of screen width)
    y: number; // 0.0 to 1.0 (percent of screen height)
    image: string; // public path to the image
  }

export const shopItems : ShopItem[] = [
    { id: 'shield', name: 'Shield', cost: 10, x: 0.1, y: 0.3, image:'images/shield.png' },
    { id: 'engine', name: 'Engine Boost', cost: 15, x: 0.2, y:0.3, image:'images/engine.png' },
    { id: 'power', name: 'Power', cost: 15,x: 0.3, y: 0.3, image:'images/power.png' },
    { id: 'plant', name: 'Plant', cost: 15,x: 0.4, y: 0.3, image:'images/plant.png' },
    // add more items as needed
  ];