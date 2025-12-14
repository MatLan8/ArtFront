import { useEffect, useState } from "react";
import Modal from "../../components/Modals/Modal";
import "./AdminPage.css";


interface DiscountCoupon {
  id: string;
  couponCode: string;
  description: string;
  discountAmount: number;
  startingPrice: number;
  beginAt: string;
  expireAt: string;
  isActive: boolean;
}

type ModalMode = "create" | "view" | "edit";

const API_BASE = "http://localhost:5242/api/Discountcoupon";

export default function AdminPage() {
  const [coupons, setCoupons] = useState<DiscountCoupon[]>([]);
  const [selected, setSelected] = useState<DiscountCoupon | null>(null);
  const [mode, setMode] = useState<ModalMode | null>(null);


  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState<number | "">("");
  const [beginAt, setBeginAt] = useState("");
  const [expireAt, setExpireAt] = useState("");
  const [description, setDescription] = useState("");

  const [touched, setTouched] = useState({
    couponCode: false,
    discountAmount: false,
    dates: false
  });

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    const res = await fetch(`${API_BASE}/GetAll`);
    if (res.ok) setCoupons(await res.json());
  };


  const computeStatus = (c: DiscountCoupon) => {
    const now = new Date();
    const begin = new Date(c.beginAt);
    const expire = new Date(c.expireAt);

    if (!c.isActive) return "inactive";
    if (expire < now) return "expired";
    if (begin > now) return "pending";
    return "active";
  };

  const codeValid = couponCode.trim().length >= 3;

  const discountValid =
    typeof discountAmount === "number" &&
    discountAmount > 0 &&
    discountAmount <= 100;

  const datesProvided = beginAt !== "" && expireAt !== "";

  const dateOrderValid =
    datesProvided && new Date(expireAt) > new Date(beginAt);

  const formValid =
    codeValid &&
    discountValid &&
    datesProvided &&
    dateOrderValid;


  const resetForm = () => {
    setCouponCode("");
    setDiscountAmount("");
    setBeginAt("");
    setExpireAt("");
    setDescription("");
    setSelected(null);
    setTouched({
      couponCode: false,
      discountAmount: false,
      dates: false
    });
  };

  const closeModal = () => {
    resetForm();
    setMode(null);
  };

  const openCreate = () => {
    resetForm();
    setMode("create");
  };

  const openView = (c: DiscountCoupon) => {
    setSelected(c);
    setMode("view");
  };

  const openEdit = () => {
    if (!selected) return;

    setCouponCode(selected.couponCode);
    setDiscountAmount(selected.discountAmount);
    setBeginAt(selected.beginAt.split("T")[0]);
    setExpireAt(selected.expireAt.split("T")[0]);
    setDescription(selected.description);
    setTouched({
      couponCode: false,
      discountAmount: false,
      dates: false
    });
    setMode("edit");
  };


  const createCoupon = async () => {
    if (!formValid) return;

    await fetch(`${API_BASE}/Create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        couponCode,
        description,
        discountAmount,
        beginAt,
        expireAt,
        startingPrice: 0,
        isActive: true
      })
    });

    closeModal();
    loadCoupons();
  };

  const updateCoupon = async () => {
    if (!selected || !formValid) return;

    await fetch(`${API_BASE}/Update`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selected.id,
        couponCode,
        description,
        discountAmount,
        beginAt,
        expireAt,
        isActive: selected.isActive
      })
    });

    closeModal();
    loadCoupons();
  };

  const toggleActive = async () => {
    if (!selected) return;

    await fetch(`${API_BASE}/Update`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...selected,
        isActive: !selected.isActive
      })
    });

    closeModal();
    loadCoupons();
  };


  return (
    <div className="admin-container">
      <h1>Coupon Management</h1>

      <button className="add-btn" onClick={openCreate}>
        Add Coupon
      </button>

      <table className="coupon-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Discount</th>
            <th>Valid</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map(c => (
            <tr key={c.id}>
              <td className="link" onClick={() => openView(c)}>
                {c.couponCode}
              </td>
              <td>{c.discountAmount}%</td>
              <td>
                {new Date(c.beginAt).toLocaleDateString()} –{" "}
                {new Date(c.expireAt).toLocaleDateString()}
              </td>
              <td>
                <span className={`badge ${computeStatus(c)}`}>
                  {computeStatus(c)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {mode && (
        <Modal
          title={
            mode === "create"
              ? "Create Coupon"
              : mode === "edit"
              ? "Edit Coupon"
              : `Coupon ${selected?.couponCode}`
          }
          onClose={closeModal}
        >
          {(mode === "create" || mode === "edit") && (
            <>
              <input
                placeholder="Coupon Code"
                value={couponCode}
                disabled={mode === "edit"}
                onBlur={() =>
                  setTouched(t => ({ ...t, couponCode: true }))
                }
                onChange={e =>
                  setCouponCode(e.target.value.toUpperCase())
                }
              />
              {touched.couponCode && !codeValid && (
                <div className="error">
                  Coupon code must be at least 3 characters
                </div>
              )}

              <input
                type="number"
                placeholder="Discount (1–100)"
                value={discountAmount}
                onBlur={() =>
                  setTouched(t => ({ ...t, discountAmount: true }))
                }
                onChange={e =>
                  setDiscountAmount(Number(e.target.value))
                }
              />
              {touched.discountAmount && !discountValid && (
                <div className="error">
                  Discount must be between 1 and 100
                </div>
              )}

              <label>Begin at</label>
              <input
                type="date"
                value={beginAt}
                onBlur={() =>
                  setTouched(t => ({ ...t, dates: true }))
                }
                onChange={e => setBeginAt(e.target.value)}
              />

              <label>Expire at</label>
              <input
                type="date"
                value={expireAt}
                onBlur={() =>
                  setTouched(t => ({ ...t, dates: true }))
                }
                onChange={e => setExpireAt(e.target.value)}
              />

              {touched.dates && !datesProvided && (
                <div className="error">
                  Both begin and expire dates are required
                </div>
              )}

              {touched.dates &&
                datesProvided &&
                !dateOrderValid && (
                  <div className="error">
                    Expire date must be after begin date
                  </div>
                )}

              <textarea
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />

              <button
                className="save-btn"
                disabled={!formValid}
                onClick={
                  mode === "edit" ? updateCoupon : createCoupon
                }
              >
                Save
              </button>
            </>
          )}

          {mode === "view" && selected && (
            <>
              <p><b>Discount:</b> {selected.discountAmount}%</p>
              <p><b>Begin:</b> {new Date(selected.beginAt).toLocaleDateString()}</p>
              <p><b>Expire:</b> {new Date(selected.expireAt).toLocaleDateString()}</p>
              <p><b>Description:</b> {selected.description || "—"}</p>

              <div className="modal-buttons">
                <button className="save-btn" onClick={openEdit}>
                  Edit
                </button>
                <button
                  className={selected.isActive ? "delete-btn" : "save-btn"}
                  onClick={toggleActive}
                >
                  {selected.isActive ? "Deactivate" : "Activate"}
                </button>
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}
