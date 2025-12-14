import { memo } from 'react';
import Masonry from 'react-masonry-css';
import type { ArtworkWithFlag } from "../../types/Artwork";
import ArtCard from '../ArtCard/ArtCard';
import styles from './ArtCardHolder.module.css';

interface ArtCardHolderProps {
  artworks: ArtworkWithFlag[];
  likedIds?: Set<string>;
  onAddToCart?: (artwork: ArtworkWithFlag) => void;
  onToggleLike?: (artwork: ArtworkWithFlag) => void;
  isAuthenticated?: boolean;
}

function ArtCardHolder({ artworks, likedIds, onAddToCart, onToggleLike, isAuthenticated }: ArtCardHolderProps) {
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
            isLiked={artwork.id ? likedIds?.has(artwork.id) : false}
            onAddToCart={onAddToCart}
            onToggleLike={onToggleLike}
            isAuthenticated={isAuthenticated}
          />
        </div>
      ))}
    </Masonry>
  );
}

export default memo(ArtCardHolder);