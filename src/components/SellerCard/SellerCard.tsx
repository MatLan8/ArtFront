import type { Artwork } from "../../types/Artwork";
import style from "./SellerCard.module.css";
import { useNavigate } from "react-router-dom";

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
        <img src={artwork.imageUrl} alt={artwork.title} />
      </div>
      <div className={style.details1}>
        <span>{artwork.title}</span>
        <span>{artwork.description}</span>
        <span>{artwork.style}</span>
        <span>{artwork.technique}</span>
        <span>{artwork.creationDate.toDateString()}</span>
      </div>
      <div className={style.details2}>
        <span>{artwork.artist}</span>
        <span>{artwork.material}</span>
        <span></span>
        <span>{artwork.dimensions}</span>
        <span>{artwork.price} €</span>
      </div>
      <div className={style.editButton}>
        <button onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
}

export default SellerCard;
