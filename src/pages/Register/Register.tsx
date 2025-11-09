import React from "react";
import style from "./Register.module.css";

function Register() {
  return (
    <div className={style.Container}>
      <span className={style.title}>Registration form</span>
      <div className={style.divider} />
      <div className={style.form}>
        <div className={style.row}>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <div className={style.row}>
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Phone number" />
        </div>
        <div className={style.row}>
          <input type="text" placeholder="Password" />
          <input type="text" placeholder="Confirm password" />
        </div>
        <button className={style.registerButton}>Register</button>
      </div>
    </div>
  );
}

export default Register;
