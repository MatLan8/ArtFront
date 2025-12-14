import React, { useState } from "react";
import style from "./Login.module.css";
import { useLogin } from "../../api/Auth/useLogin";

function Login() {

  const [form, setForm] = useState({ username: "", password: "" });
  const loginMutation = useLogin();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
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
          // store user ID for later
          sessionStorage.setItem("userId", data.id);
          console.log("Logged in as:", data.username);
        },
        onError: (error) => {
          alert(error.message);
        },
      }
    );
  };

  return (
    <div className={style.Container}>
      <span className={style.title}>Enter login information</span>
      <div className={style.divider} />
      <form className={style.form} onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange}/>
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}/>
        <button type="submit" className={style.registerButton}>Login</button>
      </form>
      {loginMutation.isError && <p style={{ color: "red" }}>{loginMutation.error.message}</p>}
      {loginMutation.isSuccess && <p style={{ color: "green" }}>Logged in successfully!</p>}
    </div>
  );
}

export default Login;
