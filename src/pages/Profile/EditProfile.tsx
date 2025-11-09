import { useState } from 'react';
import styles from './Profile.module.css';

const EditProfile = () => {
  const [user, setUser] = useState({
    email: "john.doe@example.com",
    password: "********",
    phone: "+1234567890",
    name: "John",
    surname: "Doe",
    address: "123 Main Street, Springfield, USA",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Updated user information:", user);
  };

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Edit Profile Information</h1>
      <div className={styles.infoSection}>
        <label>Email Address:</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} />

        <label>Password:</label>
        <input type="password" name="password" value={user.password} onChange={handleChange} />

        <label>Phone Number:</label>
        <input type="tel" name="phone" value={user.phone} onChange={handleChange} />

        <label>Name:</label>
        <input type="text" name="name" value={user.name} onChange={handleChange} />

        <label>Surname:</label>
        <input type="text" name="surname" value={user.surname} onChange={handleChange} />

        <label>Address:</label>
        <input type="text" name="address" value={user.address} onChange={handleChange} />
      </div>
      <button className={styles.saveButton} onClick={handleSubmit}>Save Changes</button>
    </div>
  );
};

export default EditProfile;