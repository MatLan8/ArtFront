import styles from "./SellerView.module.css";
import { artworks } from "../../MockUpData/ArtworkMock";
import SellerCard from "../../components/SellerCard/SellerCard";
import { useNavigate } from "react-router-dom";

function SellerView() {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/Add-art");
  };

  const handleReport = () => {
    navigate("/Profits-report");
  };

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={styles.title}>My art</div>
        <div className={styles.divider} />
        <SellerCard artwork={artworks[0]} />
        <SellerCard artwork={artworks[1]} />
        <SellerCard artwork={artworks[2]} />
        <div className={styles.addButton}>
          <button onClick={handleAdd}>Add Art</button>
        </div>
        <div className={styles.addButton}>
          <button onClick={handleReport}>Generate Profits Report</button>
        </div>
      </div>
    </div>
  );
}

export default SellerView;
