import styles from "./SellerList.module.css";
import { artworks } from "../../MockUpData/ArtworkMock";
import SellerCard from "../../components/SellerCard/SellerCard";
import { useNavigate } from "react-router-dom";

function SellerList() {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/add-art");
  };
  return (
    <div className={styles.Container}>
      <div className={styles.List}>
        <div className={styles.title}>My art</div>
        <div className={styles.divider} />
        <SellerCard artwork={artworks[0]} />
        <SellerCard artwork={artworks[1]} />
        <SellerCard artwork={artworks[2]} />
        <div className={styles.addButton}>
          <button onClick={handleAdd}>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default SellerList;
