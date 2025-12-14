import React, { useState } from "react";
import style from "./Register.module.css";
import { useRegister } from "../../api/Auth/useRegister";
import type { RegisterRequest } from "../../api/Auth/useRegister";

function Register() {
  const [form, setForm] = useState<RegisterRequest>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    address: "",
    role: "Client",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const registerMutation = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: RegisterRequest) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (form.password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  registerMutation.mutate(form);
};
  return (
    <div className={style.Container}>
      <span className={style.title}>Registration form</span>
      <div className={style.divider} />
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.row}>
          <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required/>
          <input type="text" name="lastName"  placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
        </div>
        <div className={style.row}>
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required/>
          <input type="text" pattern="\d{9}" name="phoneNumber" placeholder="Phone number" value={form.phoneNumber} onChange={handleChange} required/>
        </div>
        <div className={style.row}>
          <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        </div>
        <div className={style.row}>
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required/>
          <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
        </div>
        <button type="submit" className={style.registerButton}>Register</button>
        </form>
      {registerMutation.isError && <p style={{ color: "red" }}>{registerMutation.error.message}</p>}
      {registerMutation.isSuccess && <p style={{ color: "green" }}>Registered successfully!</p>}
    </div>
  );
}

export default Register;
