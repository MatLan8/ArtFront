import { useEffect, useState } from "react";
import ArtCardHolder from "../../components/ArtCardHolder/ArtCardHolder";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import type { Artwork } from "../../components/ArtCard/ArtCard";
import styles from "./Gallery.module.css";

const artworks: Artwork[] = [
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
  },
  {
    id: 4,
    title: "Echoes of Spring",
    artist: "Sofia Chen",
    description: "Minimalist landscape inspired by Japanese gardens.",
    creationDate: new Date("2024-03-05"),
    price: 5600,
    dimensions: "56.5 x 30 in",
    imageUrl: "https://images.saatchiart.com/saatchi/503607/art/12550773/11612963-SCDWQLTH-7.jpg",
    style: "Minimalist",
    material: "Acrylic on Linen",
    technique: "Wash Technique",
  },
  {
    id: 5,
    title: "Industrial Dreams",
    artist: "Marcus Black",
    description: "Abstract interpretation of industrial landscapes.",
    creationDate: new Date("2024-02-28"),
    price: 6200,
    dimensions: "31.5 x 39.4 in",
    imageUrl: "https://images.saatchiart.com/saatchi/10537/art/6274605/5344377-TALPJGPL-7.jpg",
    style: "Industrial Abstract",
    material: "Acrylic on Canvas",
    technique: "Texture Building",
  },
  {
    id: 6,
    title: "Desert Whispers",
    artist: "Anna Rodriguez",
    description: "Atmospheric desert landscape at sunset.",
    creationDate: new Date("2024-03-15"),
    price: 4800,
    dimensions: "29.7 x 22.8 in",
    imageUrl: "https://images.saatchiart.com/saatchi/20336/art/13065075/12127213-HNQWYPAW-7.jpg",
    style: "Contemporary Landscape",
    material: "Oil on Canvas",
    technique: "Glazing",
  }
];

const filterOptions = {
  styles: ["Abstract", "Contemporary", "Minimalist", "Modern", "Traditional"],
  materials: ["Oil", "Acrylic", "Watercolor", "Mixed Media", "Digital"],
  techniques: ["Impasto", "Glazing", "Layered", "Collage", "Digital"],
  colorPalettes: ["Warm", "Cool", "Monochrome", "Vibrant", "Pastel"],
  artTypes: ["Painting", "Drawing", "Digital Art", "Mixed Media", "Photography"],
  periods: ["2020s", "2010s", "2000s", "1990s", "Pre-1990"]
};

const SIDEBAR_WIDTH = 280;       // px, same as your sidebar CSS
const MIN_CONTENT_WIDTH = 760;   // minimal space you want for cards area (tweak if needed)

export default function Gallery() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string | null>>({});
  const [sidebarFixed, setSidebarFixed] = useState(true);

  useEffect(() => {
    function updateLayout() {
      const avail = window.innerWidth - SIDEBAR_WIDTH;
      setSidebarFixed(avail >= MIN_CONTENT_WIDTH);
    }

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const handleFilterChange = (filterType: string, value: string | null) => {
    setSelectedFilters(prev => {
      const next = { ...prev };
      if (value == null) delete next[filterType];
      else next[filterType] = value;
      return next;
    });
  };

  // Filter artworks
  const filteredArtworks: Artwork[] = artworks.filter(artwork => {
    return Object.entries(selectedFilters).every(([key, value]) => {
      if (!value) return true;
      return (artwork as any)[key]?.toString() === value;
    });
  });

  return (
    <div className={styles.galleryLayout}>
      <div className={sidebarFixed ? styles.sidebarFixedWrapper : styles.sidebarInlineWrapper}>
        <FilterPanel
          options={filterOptions}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      </div>

      <main className={sidebarFixed ? `${styles.mainContent} ${styles.shifted}` : styles.mainContent}>
        <ArtCardHolder artworks={filteredArtworks} />
      </main>
    </div>
  );
}
