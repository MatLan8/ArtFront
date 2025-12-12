import Masonry from 'react-masonry-css';
import type { Artwork } from "../../types/Artwork";
import ArtCard from '../ArtCard/ArtCard';
import styles from './ArtCardHolder.module.css';

interface ArtCardHolderProps {
  artworks: Artwork[];
  onAddToCart?: (artwork: Artwork) => void;
  onToggleLike?: (artwork: Artwork) => void;
}

export default function ArtCardHolder({ artworks, onAddToCart, onToggleLike }: ArtCardHolderProps) {
  const breakpointColumns = {
    default: 3,
    1600: 2,
    1100: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className={styles.masonryGrid}
      columnClassName={styles.masonryColumn}
    >
      {artworks.map((artwork) => (
        <div key={artwork.id} className={styles.masonryItem}>
          <ArtCard
            artwork={artwork}
            onAddToCart={onAddToCart}
            onToggleLike={onToggleLike}
          />
        </div>
      ))}
    </Masonry>
  );
}