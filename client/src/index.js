
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Default from "./pages/Default";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage";
import WheelFortune from "./pages/WheelOfFortune";


import "./styles.css";

export default function App () {
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Default/>} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />  
          <Route path="spin" element={<WheelFortune />} />   
          <Route path="*" element={<NoPage />} />    
        </Route>
      </Routes>      
    </BrowserRouter>
  );
  
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    < App/>
);

/*
import React from 'react';
import {useState} from 'react';
import ReactDOM from 'react-dom/client';
//import Car from './Car.js';

function MyForm() {
  const [myCars, setMyCar] = useState({});
  //const availColors = ["Red", "Blue", "Yellow"];

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Your selected car is a(n): ${myCars.color} ${myCars.brand} ${myCars.model}`);
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setMyCar(values => ({...values, [name]:value}))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Input car brand:</label>
      <input type="text" value={myCars.brand || ""} name="brand" onChange={handleChange}/>
      <label>Input car model:</label>
      <input type="text" value={myCars.model || ""} name="model" onChange={handleChange}/>
      <label>Select color</label>
      <select value={myCars.color || "Red"} name="color" onChange={handleChange}>
        <option value="Red">Red</option>
        <option value="Blue">Blue</option>
        <option value="Yellow">Yellow</option>
      </select>
      <input type="submit"/>
    </form>
  )
  
}
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford ",
      model: "Mustang ",
      color: "red ",
      year: 1964
    };
  }
  /*
  changeColor = () => {
    this.setState({color: "blue"});
  }
  static getDerivedStateFromProps(props, state) {
    return {color: props.color, model: props.model, brand: props.brand}
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({color: "orange "})
    }, 1000);
  }
  
 getSnapshotBeforeUpdate(prevProp, prevState) {
   document.getElementById("firstDiv").innerHTML = prevProp.brand +
   "Your car was a " + prevState.color  + prevState.brand + prevState.model + "from" + prevState.year;
 }
 componentDidUpdate() {
  document.getElementById("secondDiv").innerHTML = 
  "Your car was a " + this.state.color  + this.state.brand + this.state.model + "from" + this.state.year;
 }
  render() {
    return (
      <div>
        <div id="firstDiv">
          <h1>My {this.state.brand}</h1>
          <p>
            It is a {this.state.color}
            {this.state.model}
            from {this.state.year}.
          </p>
          <button type = "button" onClick={this.changeColor}>
            Change color</button>
        </div>
        <div id="secondDiv">
        </div>
      </div>
    );
  }
}

function Garage() {
  return (
    <>
      <h1>
        Who lives in my garage?
      </h1>
      <Car />
    </>
  );
}
const myFirstElement = <h1>Hello React!</h1>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm/>);
*/
//root.render(<Car model="Stinger " brand="Kia " color="red "/>);
//root.render(<Garage/>);
//root.render(<Car color="red"/>);
//root.render(myFirstElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
