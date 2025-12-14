import { useEffect, useState } from "react";

interface Artwork {
  artworkId: string;
  title: string;
}

export default function LikedArt() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const clientId = localStorage.getItem("clientId");

  const load = async () => {
    const res = await fetch(
      `https://localhost:5242/api/client/${clientId}/liked-artworks`
    );
    setArtworks(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (artworkId: string) => {
    await fetch(
      `https://localhost:5242/api/client/${clientId}/liked-artworks/${artworkId}`,
      { method: "DELETE" }
    );
    load();
  };

  return (
    <div>
      <h1>Liked artworks</h1>

      {artworks.map(a => (
        <div key={a.artworkId}>
          <span>{a.title}</span>
          <button onClick={() => remove(a.artworkId)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
