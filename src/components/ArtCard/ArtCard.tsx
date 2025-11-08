import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import styles from "./ArtCard.module.css";


export interface Artwork {
  id?: number;
  title: string;
  artist: string;
  description: string;
  creationDate: Date;
  price: number;
  dimensions: string;
  imageUrl: string;
  style: string;
  material: string;
  technique: string;
  colorPalette: string;
  artType: string;
  period: string;
}

interface ArtCardProps {
  artwork: Artwork;
  onAddToCart?: (artwork: Artwork) => void;
  onToggleLike?: (artwork: Artwork) => void;
}

/** --- Component --- */
export default function ArtCard({ artwork, onAddToCart, onToggleLike }: ArtCardProps) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    if (onToggleLike) onToggleLike(artwork);
  };

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(artwork);
  };

  const priceFormatted = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(artwork.price);
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/fallback-image.png";
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          src={artwork.imageUrl}
          alt={`${artwork.title} — ${artwork.artist}`}
          onError={handleImgError}
          className={styles.image}
        />
      </div>

     
      <div className={styles.header}>
        <div className={styles.price}>{priceFormatted}</div>

        <div className={styles.actions}>
          <button onClick={handleAddToCart} className={styles.btn} type="button" aria-label="Add to cart">
            <ShoppingBag size={20} />
          </button>

          <button
            onClick={handleLike}
            type="button"
            aria-label={liked ? "Unlike artwork" : "Like artwork"}
            aria-pressed={liked}
            className={styles.btn}
          >
            <Heart
              size={20}
              className={liked ? "text-red-500 fill-red-500" : "text-gray-600"}
            />
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.title}>
          {artwork.title}
        </div>

        <div className={styles.artist}>
          {artwork.artist}
        </div>

        <div className={styles.dims}>
          {artwork.dimensions}
        </div>

        <div className={styles.meta}>
          {artwork.style} • {artwork.technique}
        </div>
      </div>
    </div>
  );
}
