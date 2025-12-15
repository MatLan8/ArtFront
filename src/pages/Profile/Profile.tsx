import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import EditProfileModal from "./EditProfile";
import { useNavigate } from "react-router-dom";

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clientId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://localhost:7224/api/client/${clientId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load profile");
        return res.json();
      })
      .then(setClient)
      .catch(err => setError(err.message));
  }, [clientId]);

  const handleSaved = (updatedClient: Client) => {
    setClient(updatedClient);
    setShowEdit(false);
    setSuccessMessage("Profile information updated");

    // pranešimas dingsta po 3 s
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  if (error) return <p className={styles.error}>{error}</p>;
  if (!client) return <p>Loading...</p>;

  return (
    <div className={styles.profileContainer}>
      <h1>Profile</h1>

      {successMessage && (
        <p className={styles.success}>{successMessage}</p>
      )}

      <p><b>Email:</b> {client.email}</p>
      <p><b>Phone:</b> {client.phoneNumber || "-"}</p>
      <p><b>Name:</b> {client.firstName} {client.lastName}</p>
      <p><b>Address:</b> {client.address || "-"}</p>

      <div className={styles.buttonSection}>
        <button onClick={() => setShowEdit(true)}>Edit profile</button>
        <button onClick={() => navigate("/Profile/LikedArt")}>Liked art</button>
        <button onClick={() => navigate("/Profile/OrderHistory")}>Orders</button>
      </div>

      {showEdit && (
        <EditProfileModal
          client={client}
          onClose={() => setShowEdit(false)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
};

export default Profile;
