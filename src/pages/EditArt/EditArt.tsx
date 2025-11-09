import styles from "./EditArt.module.css";
import ArtForm from "../../components/ArtForm/ArtForm";
import type { Artwork } from "../../types/Artwork";
import { useLocation } from "react-router-dom";

function EditArt() {
  const location = useLocation();
  const artwork = location.state?.artwork as Artwork;

  const handleUpdate = (updatedArtwork: Artwork) => {
    console.log("Updated artwork:", updatedArtwork);
  };

  const handleDelete = (deletedArtwork: Artwork) => {
    console.log("Delete artwork:", deletedArtwork);
  };

  if (!artwork) return <p>No artwork data provided!</p>;
  return (
    <div className={styles.Container}>
      <div className={styles.List}>
        <div className={styles.title}>Edit Art</div>
        <div className={styles.divider} />
        <ArtForm
          initialData={artwork}
          onSubmit={handleUpdate}
          onDelete={handleDelete}
        ></ArtForm>
      </div>
    </div>
  );
}

export default EditArt;
