import { useEffect, useState } from "react";
import styles from "./Profile.module.css";

interface LikedArtwork {
  artworkId: string;
}

interface Artwork {
  id: string;
  name: string;
  author: string;
  price: number;
  imageUrl: string;
}

export default function LikedArt() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const clientId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!clientId) return;

    const load = async () => {
      // 1. get liked artwork ids
      const res = await fetch(
        `https://localhost:7224/api/client/${clientId}/liked-artworks`
      );
      if (!res.ok) throw new Error("Failed to load liked artworks");

      const liked: LikedArtwork[] = await res.json();

      // 2. fetch artwork details by id
      const artworkPromises = liked.map(l =>
        fetch(`https://localhost:7224/api/Artwork/GetById?id=${l.artworkId}`)
          .then(r => r.json())
      );

      const fullArtworks = await Promise.all(artworkPromises);
      setArtworks(fullArtworks);
    };

    load().catch(console.error);
  }, [clientId]);

  const remove = async (artworkId: string) => {
    await fetch(
      `https://localhost:7224/api/client/${clientId}/liked-artworks/${artworkId}`,
      { method: "DELETE" }
    );

    setArtworks(prev => prev.filter(a => a.id !== artworkId));
  };

  return (
  <div className={styles.likedContainer}>
    <h1>Liked artworks</h1>

    {artworks.length === 0 && <p>No liked artworks</p>}

    <div className={styles.artworkGrid}>
      {artworks.map(a => (
        <div key={a.id} className={styles.artworkCard}>
          <img
            src={a.imageUrl}
            alt={a.name}
            className={styles.artworkImage}
          />

          <p className={styles.artworkName}>{a.name}</p>
          <p className={styles.artworkAuthor}>{a.author}</p>
          <p className={styles.artworkPrice}>{a.price} €</p>

          <button
            className={styles.removeButton}
            onClick={() => remove(a.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  </div>
);


}
