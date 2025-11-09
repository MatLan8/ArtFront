import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import ArtCardHolder from "../../components/ArtCardHolder/ArtCardHolder";
import type { Artwork } from "../../components/ArtCard/ArtCard";

const featuredArtworks: Artwork[] = [
  {
    id: 1,
    title: "A Thousand Oceans Deep Painting",
    artist: "Nestor Toro",
    description: "Abstract seascape capturing the movement of ocean depths.",
    creationDate: new Date("2024-03-10"),
    price: 7180,
    dimensions: "66 × 44 in",
    imageUrl: "https://images.saatchiart.com/saatchi/574303/art/3918777/2988654-HSC00001-7.jpg",
    style: "Abstract",
    material: "Acrylic on Canvas",
    technique: "Layered Brushwork",
    colorPalette: "Cool",
    artType: "Painting",
    period: "2020s"
  },
  {
    id: 2,
    title: "Up Dreams",
    artist: "Elena Martinez",
    description: "Vibrant composition in deep blues and a woman.",
    creationDate: new Date("2024-02-15"),
    price: 4500,
    dimensions: "38.2 x 57.5 in",
    imageUrl: "https://images.saatchiart.com/saatchi/750261/art/11133205/10195481-MZNGPNTT-7.jpg",
    style: "Contemporary",
    material: "Oil on Canvas",
    technique: "Impasto",
    colorPalette: "Vibrant",
    artType: "Painting",
    period: "2020s"
  },
  {
    id: 3,
    title: "Urban Rhythm",
    artist: "James Wilson",
    description: "Geometric interpretation of city architecture.",
    creationDate: new Date("2024-01-20"),
    price: 3200,
    dimensions: "18 x 21 in",
    imageUrl: "https://images.saatchiart.com/saatchi/292357/art/2195234/1273586-HXLLLPFX-7.jpg",
    style: "Geometric Abstract",
    material: "Mixed Media",
    technique: "Acrylic on Canvas",
    colorPalette: "Monochrome",
    artType: "Painting",
    period: "2010s"
  },
];

const categories = [
  { label: "Abstract", filter: "styles", value: "Abstract" },
  { label: "Contemporary", filter: "styles", value: "Contemporary" },
  { label: "Landscape", filter: "styles", value: "Landscape" },
  { label: "Minimalist", filter: "styles", value: "Minimalist" },
  { label: "Oil", filter: "materials", value: "Oil" },
  { label: "Acrylic", filter: "materials", value: "Acrylic" },
  { label: "Impasto", filter: "techniques", value: "Impasto" },
  { label: "Vibrant", filter: "colorPalettes", value: "Vibrant" },
];



export default function Home() {
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
        <ArtCardHolder
          artworks={featuredArtworks}
          onAddToCart={(a) => console.log("Add to cart:", a.title)}
          onToggleLike={(a) => console.log("Like:", a.title)}
        />
      </section>

      <footer className={styles.footer}>
        <p>© 2025 ArtFront. Curated with passion.</p>
      </footer>
    </div>
  );
}