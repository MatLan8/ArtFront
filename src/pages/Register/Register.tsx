import React, { useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
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
      toast.error("Passwords do not match");
      return;
    }

    // Simple phone validation: 9 digits
    if (!/^\d{9}$/.test(form.phoneNumber)) {
      toast.error("Phone number must be 9 digits long");
      return;
    }

    registerMutation.mutate(form, {
      onSuccess: () => {
        toast.success("Registered successfully!");
      },
      onError: (error) => {
        const axErr = error as AxiosError;
        const raw = axErr.response?.data as any;
        const serverMsg = (raw && (raw.message || raw.error || raw.title)) as string | undefined;

        // Friendly message mapping
        let msg = serverMsg || axErr.message || "Failed to register";

        if (serverMsg?.toLowerCase().includes("username")) {
          msg = "This username is already taken. Please choose another.";
        } else if (serverMsg?.toLowerCase().includes("email")) {
          msg = "This email is already registered. Try logging in.";
        } else if (axErr.response?.status === 500) {
          msg = "This username is already taken. Please choose another.";
        }

        toast.error(msg);
      },
    });
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
          <input
            type="text"
            pattern="\d{9}"
            title="Enter 9 digits"
            name="phoneNumber"
            placeholder="Phone number"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />
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
      {/* Success and error messages handled via toasts */}
    </div>
  );
}

export default Register;
