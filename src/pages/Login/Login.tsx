import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import style from "./Login.module.css";
import { useLogin } from "../../api/Auth/useLogin";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      { username: form.username, password: form.password },
      {
        onSuccess: (data) => {
          sessionStorage.setItem("userId", data.id);
          sessionStorage.setItem("userRole", data.role);
          window.dispatchEvent(new Event("storage"));
          toast.success("Login successful!");
          navigate("/");
        },
        onError: () => {
          toast.error(
            "Login failed. Please check your credentials and try again."
          );
        },
      }
    );
  };

  return (
    <div className={style.Container}>
      <span className={style.title}>Enter login information</span>
      <div className={style.divider} />
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit" className={style.registerButton}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
