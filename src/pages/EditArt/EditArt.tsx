import styles from "./EditArt.module.css";
import { artworks } from "../../MockUpData/ArtworkMock";
import ArtForm from "../../components/ArtForm/ArtForm";

function EditArt() {
  return (
    <div className={styles.Container}>
      <div className={styles.List}>
        <div className={styles.title}>Edit Art</div>
        <div className={styles.divider} />
        <ArtForm initialData={artworks[0]}></ArtForm>
      </div>
    </div>
  );
}

export default EditArt;
