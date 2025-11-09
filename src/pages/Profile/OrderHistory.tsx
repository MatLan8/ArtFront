import styles from './Profile.module.css';

const OrderHistory = () => {
  const orders = [
    {
      orderDate: "2025-10-01",
      sum: "$150.00",
      address: "123 Main Street, Springfield, USA",
      paymentMethod: "Credit Card",
      deliveryDate: "2025-10-05",
      trackingNumber: "TRACK12345",
      orderComment: "Leave at the front door.",
      discountPercent: 10,
    },
    {
      orderDate: "2025-09-15",
      sum: "$200.00",
      address: "456 Elm Street, Springfield, USA",
      paymentMethod: "PayPal",
      deliveryDate: "2025-09-20",
      trackingNumber: "TRACK67890",
      orderComment: "Ring the bell upon delivery.",
      discountPercent: 5,
    },
  ];

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Order History</h1>
      {orders.map((order, index) => (
        <div key={index} className={styles.orderCard}>
          <p><strong>Order Date:</strong> {order.orderDate}</p>
          <p><strong>Sum:</strong> {order.sum}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
          <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>
          <p><strong>Order Comment:</strong> {order.orderComment}</p>
          <p><strong>Discount Percent:</strong> {order.discountPercent}%</p>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;