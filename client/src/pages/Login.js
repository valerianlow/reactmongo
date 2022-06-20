import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';



export default function Login() {

  const { register, getValues, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorLogin, setErrors] = useState(0);
  const [togglePassword, setTogglePassword] = useState(true);
  
  const togglePw = () => {
    setTogglePassword(!togglePassword);
  }
  const handleChange = e => {
    setErrors(0);
  }
  const onSubmit = data => {
    setErrors(0);
    //console.log(data);
    let loginDetails = {
      email: getValues('email'),
      password: getValues('password')
    };

    axios.post(`http://localhost:8000/api/user/login/`, loginDetails
    ).then((response) => {
      console.log(response.data);
      //if (response.data.accessToken) {
        //localStorage.setItem("expired", false);
      if (response.data) {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      setTimeout(() => {
        navigate('/Home', { replace: true });
      },1000);
    }
    ).catch((error) => {
      if (error.response) {
        setErrors(1);
        console.log(error.response.data);
      }
    });
  }

  console.log(watch("email"));

  return (
    <div className="forms">
      <div className="toggleForm">
        <div id="register-inactive" className="option-with-link">
          <Link to="/Register">REGISTER</Link>
        </div>
        <div id="login-active" className="option-with-link">
          <Link className="disabled" to="/Login">SIGN IN</Link>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>EMAIL:</label>
        <input defaultValue="" onClick={handleChange} {...register("email", { required: true })} />
        <span style={{ display: (errorLogin ? 'block' : 'none') }}>Wrong username/password!</span>
        {errors.email && <span>This field is required</span>}
        <div>
          <label>PASSWORD:</label>
          <input type={togglePassword ? "password" : "text"}
            {...register("password", { required: true })} />
          <i className={togglePassword ? "fa fa-eye-slash icon" : "fa fa-eye icon"} onClick={togglePw}></i>
          {errors.password && <span>This field is required</span>}
        </div>
        <input value="Sign in" type="submit" />
      </form>
      <div id="forgotPw">
        <Link to="/ForgotPw">Forgot Password?</Link>
      </div>
    </div>
  );
}

/*
const Login = () => {
    return <h1>Login</h1>;
  };
  
export default Login;
*/