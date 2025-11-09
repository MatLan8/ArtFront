import styles from "./AddArt.module.css";
import ArtForm from "../../components/ArtForm/ArtForm";

function AddArt() {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={styles.title}>Add Art</div>
        <div className={styles.divider} />
        <ArtForm></ArtForm>
      </div>
    </div>
  );
}

export default AddArt;
