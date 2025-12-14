import { CircleMinus } from "lucide-react";
import { useState } from "react";
import type { CartArtwork } from "../../types/CartArtwork";
import style from "./CartCard.module.css";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { useDeleteCartArtwork } from "../../api/Cart/useDeleteCartArtwork";

type CartCardProps = {
  artwork: CartArtwork;
};

function CartCard({ artwork }: CartCardProps) {
  const clientId = sessionStorage.getItem("userId") || "";
  const deleteCartArtworkMutation = useDeleteCartArtwork(clientId);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    deleteCartArtworkMutation.mutate(artwork.id);
    setShowConfirm(false);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.imgContainer}>
          <img src={artwork.imageUrl} alt={artwork.name} />
        </div>
        <div className={style.details}>
          <div className={style.titleRow}>
            <span style={{ fontWeight: 700 }}>{artwork.name}</span>
            <CircleMinus
              size={25}
              className={style.deleteIcon}
              onClick={handleDeleteClick}
            />
          </div>

          <span style={{ fontWeight: 500 }}>{artwork.author}</span>
          <span>{artwork.dimensions}</span>
          <div className={style.quantityPriceContainer}>
            <span>Quantity: {artwork.count}</span>
            <span>Sum Total: {artwork.totalSum} €</span>
          </div>
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          title="Remove artwork"
          message="Are you sure you want to remove this artwork from your cart?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}

export default CartCard;
