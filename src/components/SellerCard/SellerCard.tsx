import type { Artwork } from "../../types/Artwork";
import style from "./SellerCard.module.css";
import { useNavigate } from "react-router-dom";
import { Style } from "../../data/StyleEnum";
import { Material } from "../../data/MaterialEnum";
import { Technique } from "../../data/TechniqueEnum";

type SellerCardProps = {
  artwork: Artwork;
};

function SellerCard({ artwork }: SellerCardProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/edit-art", { state: { artwork } });
  };

  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img src={artwork.imageUrl} alt={artwork.name} />
      </div>
      <div className={style.details1}>
        <span>{artwork.name}</span>
        <span>{artwork.description}</span>
        <span>{Style[artwork.style as keyof typeof Style]}</span>
        <span>{Technique[artwork.technique as keyof typeof Technique]}</span>
        <span>{new Date(artwork.createdAt).toLocaleDateString("lt-LT")}</span>
      </div>
      <div className={style.details2}>
        <span>{artwork.author}</span>
        <span>{Material[artwork.material as keyof typeof Material]}</span>
        <span></span>
        <span>{artwork.dimensions}</span>
        <span>{artwork.price} €</span>
      </div>
      <div className={style.removeButton}>
        <button onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
}

export default SellerCard;
