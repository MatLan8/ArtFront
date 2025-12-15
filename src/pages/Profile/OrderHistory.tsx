import { useEffect, useState } from "react";
import styles from "./Profile.module.css";

interface Order {
  id: string;
  createdAt: string;
  totalSum: number;
  deliveryStatus: string;
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const clientId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://localhost:7224/api/client/${clientId}/orders`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setOrders)
      .catch(() => console.error("Failed to fetch orders"));
  }, []);

 return (
  <div className={styles.orderHistoryContainer}>
    
    <h1>Order history</h1>

    {orders.length === 0 && (
      <p className="noOrders">No orders</p>
    )}

    {orders.map(o => (
  <div className={styles.orderCard} key={o.id}>
    <div>
      <p><b>Order ID:</b> {o.id.slice(0, 8)}</p>
      <p><b>Date:</b> {new Date(o.createdAt).toLocaleDateString()}</p>
    </div>

    <div className={styles.orderMeta}>
  <p className={styles.orderTotal}>
    <span className={styles.label}>Total:</span> {o.totalSum} €
  </p>

  <p className={styles.orderStatus}>
    <span className={styles.label}>Status:</span> {o.deliveryStatus}
  </p>
</div>

  </div>
))}
  </div>
);

}
