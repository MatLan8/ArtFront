import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddArt.module.css";
import ArtForm from "../../components/ArtForm/ArtForm";
import type { Artwork } from "../../types/Artwork";

function AddArt() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (artData: Artwork) => {
    setLoading(true);
    setError(null);

    try {
      const vendorId =
        localStorage.getItem("userId") || sessionStorage.getItem("userId");

      if (!vendorId) {
        throw new Error("User ID not found. Please log in again.");
      }

      const payload = {
        ...artData,
        vendorId,
      };

      const response = await fetch("/api/art/addArt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to add art: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Art added successfully:", result);
      navigate("/Seller-view");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error adding art:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={styles.title}>Add Art</div>
        <div className={styles.divider} />
        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
        )}
        <ArtForm onSubmit={handleSubmit}></ArtForm>
        {loading && <div style={{ marginTop: "1rem" }}>Submitting...</div>}
      </div>
    </div>
  );
}

export default AddArt;
