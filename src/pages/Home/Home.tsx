import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import ArtCardHolder from "../../components/ArtCardHolder/ArtCardHolder";
import type { Artwork } from "../../types/Artwork";
import { useGetArtworkById } from "../../api/Artwork/useGetArtworkById";
import { useAddCartArtwork } from "../../api/Cart/useAddCartArtwork";


export default function Home() {
  const clientId = sessionStorage.getItem("userId");
  const { mutate: addToCart } = useAddCartArtwork();

  const artwork1 = useGetArtworkById("b97433f4-48a5-4833-a2ee-2660d5917a7c");
  const artwork2 = useGetArtworkById("23ba7a13-ecf0-4495-8c19-e11dd1f3fe1b");
  const artwork3 = useGetArtworkById("3798da86-5b19-4427-a2d4-d13d47630a72");

  // Combine data safely
  const featuredArtworks: Artwork[] = [
    artwork1.data,
    artwork2.data,
    artwork3.data,
  ].filter((a): a is Artwork => !!a); // filter out undefined

  const categories = [
    { label: "Abstract", filter: "style", value: "Abstract" },
    { label: "Contemporary", filter: "style", value: "Contemporary" },
    { label: "Minimalist", filter: "style", value: "Minimalist" },
    { label: "Oil", filter: "material", value: "Oil" },
    { label: "Acrylic", filter: "material", value: "Acrylic" },
    { label: "Impasto", filter: "technique", value: "Impasto" },
    { label: "Vibrant", filter: "colorPalette", value: "Vibrant" },
  ];

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.overlay}>
          <h1>MAKE YOUR SPACE A GIFT</h1>
          <p>Uncover New Art To Surprise And Inspire You</p>
          <Link to="/gallery" className={styles.heroLink}>
            FIND YOUR PIECE
          </Link>
        </div>
      </section>

      <section className={styles.categories}>
        <div className={styles.categoryGrid}>
          {categories.map(({ label, filter, value }) => (
            <Link
              key={label}
              to={`/gallery?${filter}=${encodeURIComponent(value)}`}
              className={styles.categoryCard}
            >
              <div className={styles.categoryOverlay}>{label.toUpperCase()}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.featured}>
        <h2>Featured Artworks</h2>
        <div className={styles.featuredWrapper}>
            <ArtCardHolder
            artworks={featuredArtworks}
            onAddToCart={(art) => {
              if (!clientId) return alert("Please log in to add items to cart");
              if (!art.id) return alert("Invalid artwork");
              addToCart({
                clientId: clientId,
                artworkId: art.id,
                count: 1,
                price: art.price,
              }, {
                onSuccess: () => {
                  alert(`"${art.name}" added to cart successfully!`);
                },
                onError: (error) => {
                  alert(`Failed to add to cart: ${error.message}`);
                },
              });
            }}
            onToggleLike={(a) => console.log("Like:", a.name)}
            />
        </div>
        </section>

      <footer className={styles.footer}>
        <p>© 2025 ArtFront. Curated with passion.</p>
      </footer>
    </div>
  );
}