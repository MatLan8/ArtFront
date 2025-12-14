export type Artwork = {
  id?: string; //TODO make non-optional
  name: string;
  author: string;
  description: string;
  price: number;
  dimensions: string;
  createdAt: Date;
  imageUrl: string;
  style: number;
  material: number;
  technique: number;
  colorPalette: number;
  artType: number;
  period: number;
};

export type ArtworkWithFlag = Artwork & {
  recommended?: boolean;
};
