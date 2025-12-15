import { useState } from "react";
import Modal from "../../components/Modals/Modal";
import styles from "./Profile.module.css";

interface Props {
  client: any;
  onClose: () => void;
  onSaved: (c: any) => void;
}

export default function EditProfileModal({ client, onClose, onSaved }: Props) {
  const [form, setForm] = useState({ ...client });

  const clientId = sessionStorage.getItem("userId") || "";

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    await fetch(`https://localhost:7224/api/client/UpdateClient/${clientId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form), // ⬅️ NO clientId here
    });

    onSaved(form);
    onClose();
  };

  return (
    <Modal title="Edit profile" onClose={onClose}>
      <div className={styles.formRow}>
        <label>First name</label>
        <input
          name="firstName"
          value={form.firstName || ""}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formRow}>
        <label>Last name</label>
        <input
          name="lastName"
          value={form.lastName || ""}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formRow}>
        <label>Email</label>
        <input name="email" value={form.email || ""} onChange={handleChange} />
      </div>

      <div className={styles.formRow}>
        <label>Phone number</label>
        <input
          name="phoneNumber"
          value={form.phoneNumber || ""}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formRow}>
        <label>Address</label>
        <input
          name="address"
          value={form.address || ""}
          onChange={handleChange}
        />
      </div>

      <button onClick={save}>Save</button>
    </Modal>
  );
}
