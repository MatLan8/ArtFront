import styles from "./SellerList.module.css";
import { artworks } from "../../MockUpData/ArtworkMock";
import SellerCard from "../../components/SellerCard/SellerCard";

function SellerList() {
  return (
    <div className={styles.Container}>
      <div className={styles.List}>
        <div className={styles.title}>My art</div>
        <div className={styles.divider} />
        <SellerCard artwork={artworks[0]} />
        <SellerCard artwork={artworks[1]} />
        <SellerCard artwork={artworks[2]} />
        <div className={styles.addButton}>
          <button>Add Art</button>
        </div>
      </div>
    </div>
  );
}

export default SellerList;
