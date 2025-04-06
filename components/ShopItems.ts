export interface ShopItem {
  id: string;
  name: string;
  cost: number;
  x: number; // 0.0 to 1.0 (percent of screen width)
  y: number; // 0.0 to 0.25 (percent of screen height)
  image: string; // public path to the image
}


export const shopItems: ShopItem[] = [
  { id: "alien", name: "Alien", cost: 150, x: 0.12, y: 0.18, image: "/Alien Figure.png" },
  { id: "astronaut", name: "Astronaut", cost: 200, x: 0.18, y: 0.20, image: "/AstronautFigure.png" },
  { id: "helmet", name: "Helmet", cost: 100, x: 0.52, y: 0.22, image: "/Helmet.png" },
  { id: "juicebox", name: "Juicebox", cost: 25, x: 0.30, y: 0.21, image: "/Juicebox.png" },
  { id: "pizza", name: "Pizza", cost: 40, x: 0.44, y: 0.23, image: "/Pizza.png" },
  { id: "plant", name: "Plant", cost: 60, x: 0.66, y: 0.24, image: "/Plant.png" },
  { id: "plantA1", name: "Spiky Grass", cost: 30, x: 0.10, y: 0.19, image: "/plant-A-1.png" },
  { id: "plantA2", name: "Purple Tree", cost: 50, x: 0.26, y: 0.16, image: "/plant-A-2.png" },
  { id: "plantA3", name: "Tulip Trio", cost: 45, x: 0.60, y: 0.20, image: "/plant-A-3.png" },
  { id: "plantA4", name: "Berry Shrub", cost: 40, x: 0.68, y: 0.22, image: "/plant-A-4.png" },
  { id: "plantA5", name: "Spotted Bulb", cost: 55, x: 0.32, y: 0.19, image: "/plant-A-5.png" },
  { id: "plantA6", name: "Pink Bloom", cost: 50, x: 0.48, y: 0.17, image: "/plant-A-6.png" },
  { id: "plantA7", name: "Rock Cotton", cost: 35, x: 0.74, y: 0.22, image: "/plant-A-7.png" },
  { id: "plantA8", name: "Droopy Tulip", cost: 38, x: 0.82, y: 0.20, image: "/plant-A-8.png" },
  { id: "solarPanel", name: "Solar Panel", cost: 100, x: 0.20, y: 0.18, image: "/solar_panel.png" },
  { id: "windTurbine", name: "Wind Turbine", cost: 120, x: 0.38, y: 0.14, image: "/wind_turbine.png" }
];