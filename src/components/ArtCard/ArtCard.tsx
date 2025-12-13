import { useState, memo } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import styles from "./ArtCard.module.css";
import type { Artwork } from "../../types/Artwork";

interface ArtCardProps {
  artwork: Artwork;
  onAddToCart?: (artwork: Artwork) => void;
  onToggleLike?: (artwork: Artwork) => void;
}

/** --- Component --- */
function ArtCard({ artwork, onAddToCart, onToggleLike }: ArtCardProps) {
  const [liked, setLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    if (onToggleLike) onToggleLike(artwork);
  };

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(artwork);
  };

  const priceFormatted = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(artwork.price);
  
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageFailed(true);
    e.currentTarget.src = "/fallback-image.svg";
  };

  const handleImgLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.imageWrapper} ${imageLoaded || imageFailed ? styles.loaded : ''}`}>
        <img
          src={artwork.imageUrl}
          alt={`${artwork.name} — ${artwork.author}`}
          onError={handleImgError}
          onLoad={handleImgLoad}
          className={styles.image}
          loading="lazy"
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
          {artwork.name}
        </div>

        <div className={styles.artist}>
          {artwork.author}
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

export default memo(ArtCard);
