import React from 'react';
import styles from './Profile.module.css';

const LikedArt = () => {
  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Liked Art</h1>
      <p>Here you can view all the artworks you have liked.</p>
    </div>
  );
};

export default LikedArt;