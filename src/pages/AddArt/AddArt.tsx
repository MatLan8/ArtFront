import styles from "./AddArt.module.css";
import ArtForm from "../../components/ArtForm/ArtForm";

function AddArt() {
  return (
    <div className={styles.Container}>
      <div className={styles.List}>
        <div className={styles.title}>Add Art</div>
        <div className={styles.divider} />
        <ArtForm></ArtForm>
      </div>
    </div>
  );
}

export default AddArt;
