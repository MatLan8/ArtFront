import { memo } from 'react';
import Masonry from 'react-masonry-css';
import type { Artwork } from "../../types/Artwork";
import ArtCard from '../ArtCard/ArtCard';
import styles from './ArtCardHolder.module.css';

interface ArtCardHolderProps {
  artworks: Artwork[];
  onAddToCart?: (artwork: Artwork) => void;
  onToggleLike?: (artwork: Artwork) => void;
}

function ArtCardHolder({ artworks, onAddToCart, onToggleLike }: ArtCardHolderProps) {
  const breakpointColumns = {
    default: 3,
    1600: 2,
    1100: 1
  };

  if (artworks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No artworks found with the selected filters.</p>
        <p>Try adjusting your filters to see more results.</p>
      </div>
    );
  }

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

export default memo(ArtCardHolder);