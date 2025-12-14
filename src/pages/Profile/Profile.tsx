import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import EditProfileModal from "./EditProfile";
import { useNavigate } from "react-router-dom";

interface Client {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [showEdit, setShowEdit] = useState(false);

  const clientId = localStorage.getItem("Id");

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://localhost:5242/api/client/${clientId}`)
      .then(res => res.json())
      .then(setClient);
  }, [clientId]);

  if (!client) return <p>Loading...</p>;

  return (
    <div className={styles.profileContainer}>
      <h1>Profile</h1>

      <p><b>Email:</b> {client.email}</p>
      <p><b>Phone:</b> {client.phoneNumber}</p>
      <p><b>Name:</b> {client.firstName} {client.lastName}</p>
      <p><b>Address:</b> {client.address}</p>

      <div className={styles.buttonSection}>
        <button onClick={() => setShowEdit(true)}>Edit profile</button>
        <button onClick={() => navigate("/profile/liked")}>Liked art</button>
        <button onClick={() => navigate("/profile/orders")}>Orders</button>
      </div>

      {showEdit && (
        <EditProfileModal
          client={client}
          onClose={() => setShowEdit(false)}
          onSaved={setClient}
        />
      )}
    </div>
  );
};

export default Profile;
