import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';

const Profile = () => {
  const navigate = useNavigate();

  // Mock user data
  const user = {
    email: 'john.doe@example.com',
    password: '********',
    phone: '+1234567890',
    name: 'John',
    surname: 'Doe',
    address: '123 Main Street, Springfield, USA',
  };

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Profile Information</h1>
      <div className={styles.infoSection}>
        <label>Email Address:</label>
        <p>{user.email}</p>

        <label>Password:</label>
        <p>{user.password}</p>

        <label>Phone Number:</label>
        <p>{user.phone}</p>

        <label>Name:</label>
        <p>{user.name}</p>

        <label>Surname:</label>
        <p>{user.surname}</p>

        <label>Address:</label>
        <p>{user.address}</p>
      </div>
      <div className={styles.buttonSection}>
        <button className={styles.likedArtButton} onClick={() => navigate('/Profile/LikedArt')}>Liked Art</button>
        <button className={styles.editProfileButton} onClick={() => navigate('/Profile/EditProfile')}>Edit Profile Information</button>
        <button className={styles.orderHistoryButton} onClick={() => navigate('/Profile/OrderHistory')}>Order History</button>
      </div>
    </div>
  );
};

export default Profile;