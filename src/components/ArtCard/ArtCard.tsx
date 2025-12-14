import { useState, useEffect, memo } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import styles from "./ArtCard.module.css";
import type { ArtworkWithFlag } from "../../types/Artwork";

interface ArtCardProps {
  artwork: ArtworkWithFlag;
  isLiked?: boolean;
  onAddToCart?: (artwork: ArtworkWithFlag) => void;
  onToggleLike?: (artwork: ArtworkWithFlag) => void;
  isAuthenticated?: boolean;
}

/** --- Component --- */
function ArtCard({ artwork, isLiked = false, onAddToCart, onToggleLike, isAuthenticated = true }: ArtCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleLike = () => {
    // If not authenticated, don't toggle the heart, but still trigger handler for alert
    if (!isAuthenticated) {
      onToggleLike?.(artwork);
      return;
    }

    // Keep liked visual state; still trigger handler for feedback
    if (!liked) {
      setLiked(true);
    }
    onToggleLike?.(artwork);
  };

  const handleAddToCart = () => {
    onAddToCart?.(artwork);
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
        {artwork.recommended && <div className={styles.badge}>Recommended</div>}
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
            className={`${styles.btn} ${liked ? styles.liked : ""}`}
          >
            <Heart
              size={20}
              color={liked ? "#e63946" : "#555"}
              fill={liked ? "#e63946" : "none"}
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
