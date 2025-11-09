import { useState } from "react";
import "./AdminPage.css";

interface Coupon {
  code: string;
  discount: number;
  validUntil: string;
  description: string;
}

export default function AdminPage() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [coupons, setCoupons] = useState<Coupon[]>([
    { code: "ART10", discount: 10, validUntil: "2025-12-31", description: "10% discount for artworks" },
  ]);

  const [selected, setSelected] = useState<Coupon | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleAccess = () => {
    const key = prompt("Enter staff access key:");
    if (key === "miau") {
      setAccessGranted(true);
    } else {
      alert("Access denied!");
    }
  };

  const addCoupon = () => {
    if (!code || !discount || !date) {
      alert("Please fill in all fields");
      return;
    }
    const newCoupon: Coupon = {
      code: code.toUpperCase(),
      discount: parseInt(discount),
      validUntil: date,
      description: description || "No description",
    };
    setCoupons([...coupons, newCoupon]);
    setShowForm(false);
    setCode("");
    setDiscount("");
    setDate("");
    setDescription("");
  };

  const removeCoupon = (code: string) => {
    setCoupons(coupons.filter((c) => c.code !== code));
    setSelected(null);
  };

  if (!accessGranted) {
    return (
      <div className="admin-container">
        <h1>Restricted Access</h1>
        <p>This page is for staff members only.</p>
        <button className="add-btn" onClick={handleAccess}>
          Enter Access Key
        </button>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1>Coupon Management</h1>

      <button className="add-btn" onClick={() => setShowForm(true)}>
        Add Coupon
      </button>

      <table className="coupon-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Discount</th>
            <th>Valid Until</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((c) => (
            <tr key={c.code}>
              <td className="link" onClick={() => setSelected(c)}>
                {c.code}
              </td>
              <td>{c.discount}%</td>
              <td>{c.validUntil}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selected.code}</h2>
            <p><b>Discount:</b> {selected.discount}%</p>
            <p><b>Valid Until:</b> {selected.validUntil}</p>
            <p><b>Description:</b> {selected.description}</p>

            <div className="modal-buttons">
              <button className="delete-btn" onClick={() => removeCoupon(selected.code)}>Remove</button>
              <button className="close-btn" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>New Coupon</h2>
            <input placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
            <input placeholder="Discount (%)" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
            <input placeholder="Valid Until" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

            <div className="modal-buttons">
              <button className="save-btn" onClick={addCoupon}>Save</button>
              <button className="close-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
