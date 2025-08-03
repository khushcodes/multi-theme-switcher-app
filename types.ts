
export enum Theme {
  MINIMALIST = 'minimalist',
  DARK = 'dark',
  COLORFUL = 'colorful',
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
