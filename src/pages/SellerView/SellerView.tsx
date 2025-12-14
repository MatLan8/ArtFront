import styles from "./SellerView.module.css";
import SellerCard from "../../components/SellerCard/SellerCard";
import { useNavigate } from "react-router-dom";
import { useGetAllArtworksByVendorId } from "../../api/Artwork/useGetAllArtworksByVendorId";

function SellerView() {
  const navigate = useNavigate();
  const vendorId = sessionStorage.getItem("userId") || "";

  const { data: artworks = [] } = useGetAllArtworksByVendorId(vendorId || "");

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
        {artworks.map((artwork) => (
          <SellerCard key={artwork.id} artwork={artwork} />
        ))}
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
