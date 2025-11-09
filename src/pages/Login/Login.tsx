import React from "react";
import style from "./Login.module.css";

function Login() {
  return (
    <div className={style.Container}>
      <span className={style.title}>Enter login information</span>
      <div className={style.divider} />

      <input type="text" placeholder="Email" />
      <input type="text" placeholder="Password" />

      <button className={style.registerButton}>Login</button>
    </div>
  );
}

export default Login;
