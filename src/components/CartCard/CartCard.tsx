import React from "react";
import type { Artwork } from "../../types/Artwork";
import style from "./CartCard.module.css";

type CartCardProps = {
  artwork: Artwork;
};

function CartCard({ artwork }: CartCardProps) {
  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img src={artwork.imageUrl} alt={artwork.title} />
      </div>
      <div className={style.details}>
        <span>{artwork.title}</span>
        <span>{artwork.artist}</span>
        <span>{artwork.material}</span>
        <span>{artwork.dimensions}</span>
        <span>{artwork.price} €</span>
      </div>
    </div>
  );
}

export default CartCard;
