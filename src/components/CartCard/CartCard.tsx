import React from "react";
import { CircleMinus } from "lucide-react";
import type { Artwork } from "../../types/Artwork";
import style from "./CartCard.module.css";

type CartCardProps = {
  artwork: Artwork;
};

function CartCard({ artwork }: CartCardProps) {
  const handleDelete = () => {};
  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img src={artwork.imageUrl} alt={artwork.title} />
      </div>
      <div className={style.details}>
        <div className={style.titleRow}>
          <span style={{ fontWeight: 700 }}>{artwork.title}</span>
          <CircleMinus
            size={25}
            className={style.deleteIcon}
            onClick={handleDelete}
          />
        </div>

        <span style={{ fontWeight: 500 }}>{artwork.artist}</span>
        <span>{artwork.dimensions}</span>
        <div className={style.quantityPriceContainer}>
          <span>Quantity: 2</span>
          <span>Sum Total: {artwork.price} €</span>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
