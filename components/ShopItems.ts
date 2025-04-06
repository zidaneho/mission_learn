export interface ShopItem {
    id: string;
    name: string;
    cost: number;
    x: number; // 0.0 to 1.0 (percent of screen width)
    y: number; // 0.0 to 1.0 (percent of screen height)
    image: string; // public path to the image
    scale: number; // how large the image should be
  }

export const shopItems : ShopItem[] = [
    { id: 'shield', name: 'Shield', cost: 10, x: 0.1, y: 0.3,  scale: 1.0,image:'images/shield.png' },
    { id: 'engine', name: 'Engine Boost', cost: 15, x: 0.2, y:0.3,  scale: 1.0,image:'images/engine.png' },
    { id: 'power', name: 'Power', cost: 15,x: 0.3, y: 0.3,  scale: 1.0,image:'images/power.png' },
    { id: 'plant', name: 'Plant', cost: 15,x: 0.4, y: 0.3,  scale: 1.0,image:'images/plant.png' },

    //new items
    {id:'house1',name:'House 1',cost: 50,x: 0.8, y: 0.7, scale: 2.5, image:'/House.png'}

    // add more items as needed
  ];