import { useNavigate } from "react-router-dom";
import styles from "./AddArt.module.css";
import ArtForm from "../../components/ArtForm/ArtForm";
import type { Artwork } from "../../types/Artwork";
import { useCreateArtwork } from "../../api/Artwork/useCreateArtwork";

function AddArt() {
  const navigate = useNavigate();
  const { mutate: createArtwork, isPending, error } = useCreateArtwork();

  const handleSubmit = (artData: Artwork) => {
    const vendorId =
      localStorage.getItem("userId") || sessionStorage.getItem("userId");

    if (!vendorId) {
      console.error("User ID not found. Please log in again.");
      return;
    }

    const payload = {
      ...artData,
      vendorId,
    };

    createArtwork(payload, {
      onSuccess: () => {
        console.log("Art added successfully");
        navigate("/Seller-view");
      },
      onError: (err) => {
        console.error("Error adding art:", err.message);
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={styles.title}>Add Art</div>
        <div className={styles.divider} />
        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>
            {error.message}
          </div>
        )}
        <ArtForm onSubmit={handleSubmit}></ArtForm>
        {isPending && <div style={{ marginTop: "1rem" }}>Submitting...</div>}
      </div>
    </div>
  );
}

export default AddArt;
