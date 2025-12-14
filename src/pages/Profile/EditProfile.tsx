import { useState } from "react";
import Modal from "../../components/Modals/Modal";

interface Props {
  client: any;
  onClose: () => void;
  onSaved: (c: any) => void;
}

export default function EditProfileModal({ client, onClose, onSaved }: Props) {
  const [form, setForm] = useState({ ...client });
  const clientId = localStorage.getItem("clientId");

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    await fetch(`https://localhost:5242/api/client/${clientId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    onSaved(form);
    onClose();
  };

  return (
    <Modal title="Edit profile" onClose={onClose}>
      <input name="firstName" value={form.firstName || ""} onChange={handleChange} placeholder="First name" />
      <input name="lastName" value={form.lastName || ""} onChange={handleChange} placeholder="Last name" />
      <input name="email" value={form.email || ""} onChange={handleChange} placeholder="Email" />
      <input name="phoneNumber" value={form.phoneNumber || ""} onChange={handleChange} placeholder="Phone" />
      <input name="address" value={form.address || ""} onChange={handleChange} placeholder="Address" />

      <button onClick={save}>Save</button>
    </Modal>
  );
}
