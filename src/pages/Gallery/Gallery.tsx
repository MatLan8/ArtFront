import { useState, useEffect } from "react";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import ArtCardHolder from '../../components/ArtCardHolder/ArtCardHolder';
import type { Artwork } from "../../components/ArtCard/ArtCard";
import styles from "./Gallery.module.css";
import { useLocation, useSearchParams } from "react-router-dom";
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
    colorPalette: "Pastel",
    artType: "Painting",
    period: "2020s"
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
    colorPalette: "Warm",
    artType: "Painting",
    period: "2010s"
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
    colorPalette: "Warm",
    artType: "Painting",
    period: "2020s"
  },
  {
    id: 7,
    title: "Silent Forest",
    artist: "Liam Carter",
    description: "A moody forest scene with misty light.",
    creationDate: new Date("2023-11-12"),
    price: 3800,
    dimensions: "40 x 30 in",
    imageUrl: "https://images.saatchiart.com/saatchi/385897/art/5429511/4499323-HSC00001-7.jpg",
    style: "Minimalist",
    material: "Watercolor",
    technique: "Wash Technique",
    colorPalette: "Cool",
    artType: "Painting",
    period: "2020s"
  },
  {
    id: 8,
    title: "Neon Streets",
    artist: "Hana Kim",
    description: "Urban night scene in neon lights.",
    creationDate: new Date("2023-10-01"),
    price: 4900,
    dimensions: "24 x 36 in",
    imageUrl: "https://images.saatchiart.com/saatchi/9021/art/10277523/9340147-CGQOAKTO-7.jpg",
    style: "Contemporary",
    material: "Mixed Media",
    technique: "Collage",
    colorPalette: "Vibrant",
    artType: "Painting",
    period: "2010s"
  },
  {
    id: 9,
    title: "Golden Horizon",
    artist: "Elise Martin",
    description: "Sunset over minimalist hills.",
    creationDate: new Date("2024-01-05"),
    price: 5200,
    dimensions: "50 x 30 in",
    imageUrl: "https://images.saatchiart.com/saatchi/878841/art/10936021/9998431-SRKLTNYH-7.jpg",
    style: "Minimalist",
    material: "Oil on Canvas",
    technique: "Glazing",
    colorPalette: "Warm",
    artType: "Painting",
    period: "2020s"
  },
  {
    id: 10,
    title: "Digital Dreams",
    artist: "Kevin Liu",
    description: "Futuristic digital landscape.",
    creationDate: new Date("2024-03-01"),
    price: 4100,
    dimensions: "30 x 20 in",
    imageUrl: "https://images.saatchiart.com/saatchi/403549/art/11828501/10890741-UHTFOJRA-7.jpg",
    style: "Modern",
    material: "Digital",
    technique: "Digital",
    colorPalette: "Vibrant",
    artType: "Digital Art",
    period: "2020s"
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

// Map filter panel keys to artwork properties
const keyMap: Record<string, keyof Artwork> = {
  styles: "style",
  materials: "material",
  techniques: "technique",
  colorPalettes: "colorPalette",
  artTypes: "artType",
  periods: "period"
};


export default function Gallery() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);

  // Apply filters from query params
  useEffect(() => {
    const paramsObj: Record<string, string[]> = {};
    searchParams.forEach((value, key) => {
      if (!paramsObj[key]) paramsObj[key] = [];
      paramsObj[key].push(value);
    });
    setSelectedFilters(paramsObj);
  }, [location.search]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleFilterChange(filterKey: string, values: string[]) {
    setSelectedFilters(prev => {
      const next = { ...prev };
      if (!values || values.length === 0) delete next[filterKey];
      else next[filterKey] = values;
      return next;
    });
  }

  const filteredArtworks: Artwork[] = artworks.filter(artwork =>
    Object.entries(selectedFilters).every(([filterKey, values]) => {
      const artworkProp = keyMap[filterKey];
      if (!artworkProp) return true;
      const artworkValue = (artwork as any)[artworkProp];
      return artworkValue && values.includes(artworkValue);
    })
  );

  return (
    <div>
    {/* Heading on top of everything */}
    <div className={styles.galleryHeading}>
      Original Paintings for Sale
    </div>
    <div className={styles.galleryLayout}>

      {isMobile && isFilterCollapsed && (
        <button
          className={styles.expandButton}
          onClick={() => setIsFilterCollapsed(false)}
        >
          Show Filters
        </button>
      )}

      {(!isMobile || !isFilterCollapsed) && (
        <FilterPanel
          options={filterOptions}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          isMobile={isMobile}
          onClose={() => setIsFilterCollapsed(true)}
        />
      )}

      <main className={styles.mainContent}>
        <ArtCardHolder
          artworks={filteredArtworks}
          onAddToCart={(art) => console.log("Add to cart:", art.title)}
          onToggleLike={(art) => console.log("Toggle like:", art.title)}
        />
      </main>
    </div>
    </div>
  );
}