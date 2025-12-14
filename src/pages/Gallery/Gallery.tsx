import { useState, useEffect } from "react";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import ArtCardHolder from '../../components/ArtCardHolder/ArtCardHolder';
import { useGetAllArtworks } from "../../api/Artwork/useGetAllArtworks";
import { useGetAllArtworksWithRecommendations } from "../../api/Artwork/useGetAllArtworksWithRecommendations";
import styles from "./Gallery.module.css";
import { useLocation, useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useAddCartArtwork } from "../../api/Cart/useAddCartArtwork";
import { useAddLikedArtwork } from "../../api/Client/useAddLikedArtwork";
import { useGetAllClientLikedArtworks } from "../../api/Client/useGetAllClientLikedArtworks";

import { Style } from "../../data/StyleEnum";
import { Material } from "../../data/MaterialEnum";
import { Technique } from "../../data/TechniqueEnum";
import { ColorPalette } from "../../data/ColorPaletteEnum";
import { ArtType } from "../../data/ArtTypeEnum";
import { Period } from "../../data/PeriodEnum";

const enumMap: Record<string, any> = {
  style: Style,
  material: Material,
  technique: Technique,
  colorPalette: ColorPalette,
  artType: ArtType,
  period: Period
};

const filterOptions = {
  style: Object.values(Style),
  material: Object.values(Material),
  technique: Object.values(Technique),
  colorPalette: Object.values(ColorPalette),
  artType: Object.values(ArtType),
  period: Object.values(Period),
};

export default function Gallery() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);
  const clientId = sessionStorage.getItem("userId");

  // recomendations logic
  const { data: recommendedData } = useGetAllArtworksWithRecommendations(clientId ?? "");
  const { data: artworksFallback = [] } = useGetAllArtworks();
  const artworks = (clientId && (recommendedData?.length ?? 0) > 0 ? recommendedData : artworksFallback) ?? [];
  const { mutate: addToCart } = useAddCartArtwork();
  const { mutate: Like } = useAddLikedArtwork();
  const { data: likedArtworks = [] } = useGetAllClientLikedArtworks(clientId ?? "");
  const likedIds = new Set(likedArtworks.map((a) => a.id).filter(Boolean) as string[]);

  // filters 
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

  const filteredArtworks = artworks.filter(artwork =>
  Object.entries(selectedFilters).every(([filterKey, values]) => {
    const map = enumMap[filterKey];
    if (!map) return true;
    const artworkValue = map[artwork[filterKey as keyof typeof artwork] as number];
    return values.includes(artworkValue);
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
          likedIds={likedIds}
          isAuthenticated={!!clientId}
          onAddToCart={(art) => {
          if (!clientId) return toast.error("Please log in to add items to cart");
          if (!art.id) return toast.error("Invalid artwork");
          addToCart({
            clientId: clientId,
            artworkId: art.id,
            count: 1,
            price: art.price,
          }, {
            onSuccess: () => {
              toast.success(`${art.name} added to cart`);
            },
            onError: (error) => {
              toast.error(`Failed to add to cart: ${error.message}`);
            },
          });
        }}
        onToggleLike={(art) =>{          
          if (!clientId) return toast.error("Please log in to like artworks");
          if (!art.id) return toast.error("Invalid artwork");
          Like({
            clientId: clientId,
            artworkId: art.id,},{
            onSuccess: () => {
              toast.success(`You liked ${art.name}!`); 
            },
            onError: (error: AxiosError) => {
              const msg = (error.response?.data as any)?.message || error.response?.data || "Failed to like artwork";
              toast.error(msg);
            },
          });
            }}
        />
      </main>
    </div>
    </div>
  );
}