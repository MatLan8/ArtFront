export type Artwork = {
  id?: number;
  name: string;
  author: string;
  description: string;
  price: number;
  dimensions: string;
  creationDate: Date;
  imageUrl: string;
  style: number;
  material: number;
  technique: number;
  colorPalette: number;
  artType: number;
  period: number;
};
