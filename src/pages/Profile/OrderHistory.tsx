import { useEffect, useState } from "react";

interface Order {
  id: string;
  total: number;
  createdAt: string;
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const clientId = localStorage.getItem("clientId");

  useEffect(() => {
    fetch(`https://localhost:5242/api/client/${clientId}/orders`)
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <div>
      <h1>Order history</h1>

      {orders.map(o => (
        <div key={o.id}>
          <p>Total: {o.total} €</p>
          <p>Date: {new Date(o.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
