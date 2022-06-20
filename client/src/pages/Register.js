import React, { Component, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';

export default function Register() {
  const { register, getValues, setError, handleSubmit, watch, formState: { errors } } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [hideForm, setFormHidden] = useState(0);
  const [togglePassword, setTogglePassword] = useState(true);

  const onSubmit = data => {
    setDisabled(true);
    console.log(data);
    const pw = getValues("password");
    const cfnPw = getValues("confirmPassword");
    if (pw !== cfnPw) {
      setDisabled(false);
      setError("confirmPassword", { type: "focus", message: "Passwords do not match!" },
        { shouldFocus: true });
    }
    else {
      let newUser = {
        firstName: getValues("firstName").toUpperCase(),
        lastName: getValues("lastName").toUpperCase(),
        age: getValues("age"),
        email: getValues("email").toLowerCase(),
        password: getValues("password"),
        gender: getValues("gender").toUpperCase(),
        cash_balance: 50
      };

      axios.post(`http://localhost:8000/api/user/register/`, newUser).then(
        res => {
          res.status === 200 && setFormHidden(1);
        });

      //axios.post(`http://localhost:8000/api/user/`).then(res => console.log(res));
    }
  }

  const togglePw = () => {
    setTogglePassword(!togglePassword);
  }

  console.log(watch("email"));

  return (
    <div className="forms">
      <div id="registerSuccess" style={{ display: (hideForm ? "flex" : "none") }}>
        <h2 style={{ textAlign: "center" }}>Account successfully registered!</h2>
        <button id="loginButton">
          <Link to="/Login">Return to Login Page</Link>
        </button>
      </div>
      <div id="registerForm" style={{ display: (hideForm ? "none" : "block") }}>
        <div className="toggleForm">
          <div id="register-active" className="option-with-link">
            <Link className="disabled" to="/Register">REGISTER</Link>
          </div>
          <div id="login-inactive" className="option-with-link">
            <Link to="/Login">SIGN IN</Link>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>FIRST NAME:</label>
          <input {...register("firstName", {
            required: {
              value: true,
              message: 'First Name is required'
            },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: 'Enter only alphabets'
            }
          })} />

          <label>LAST NAME:</label>
          <input {...register("lastName", {
            required: {
              value: true,
              message: 'Last Name is required'
            },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: 'Enter only alphabets'
            }
          })} />
          {errors.lastName?.message && <span>{errors.lastName?.message}</span>}
          <label>AGE:</label>
          <input {...register("age", {
            required: {
              value: true,
              message: 'Age is required'
            },
            pattern: {
              value: /[0-9][0-9]?$/,
              message: 'Enter only numbers'
            }
          })} />
          {errors.age?.message && <span>{errors.age?.message}</span>}
          <label>EMAIL:</label>
          <input {...register("email", {
            required: {
              value: true,
              message: "Email is required"
            },
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email"
            }
          })} />
          {errors.email?.message && <span>{errors.email?.message}</span>}
          <div>
            <label>CREATE PASSWORD (At least 8 characters):</label>
            <input type={togglePassword ? "password" : "text"}
              {...register("password", {
                required: {
                  value: true,
                  message: 'Password is required'
                },
                validate: {
                  lengthCheck: v => v.length >= 8 || 'Password must be longer than 8 characters',
                  checkValid: v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/.test(v) ||
                    'Password needs at least one UPPERCASE, one SYMBOL and one NUMBER and one LOWERCASE'
                }
              })} />
            <i className={togglePassword ? "fa fa-eye-slash icon" : "fa fa-eye icon"} onClick={togglePw}></i>
            {errors.password?.message && <span>{errors.password?.message}</span>}
          </div>
          <div>
            <label>CONFIRM PASSWORD:</label>
            <input type={togglePassword ? "password" : "text"}
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: 'Password is required'
                }
              })} />
            <i className={togglePassword ? "fa fa-eye-slash icon" : "fa fa-eye icon"} onClick={togglePw}></i>
            {errors.confirmPassword?.message && <span>{errors.confirmPassword?.message}</span>}
          </div>
          <label>GENDER:</label>
          <select {...register("gender")}>
            <option value="male">MALE</option>
            <option value="female">FEMALE</option>
            <option value="other">OTHER</option>
          </select>
          <input type="submit" disabled={disabled} value="REGISTER ACCOUNT" />
        </form>
      </div>
    </div>
  );
}