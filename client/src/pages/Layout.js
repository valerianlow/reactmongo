import { Outlet, Link, useNavigate, Navigate } from "react-router-dom";
import { Navbar, Dropdown } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from "react";
import LoadingBar from 'react-top-loading-bar';
import 'bootstrap/dist/css/bootstrap.css';

export default function Layout() {
  const [isLoggedIn, setisLoggedIn] = useState(JSON.parse(localStorage.getItem("user")) ? true : false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  //const [isTimeout, setIsTimeout] = useState(false);

  const isTimeout = useRef(false);
  const updateTimer = useRef();
  const timeout = 5 * 60;


  const eventHandler = () => {
    if (updateTimer.current) {
      //console.log(Date.now() + timeout * 1000);
      clearTimeout(updateTimer.current);
    }

    updateTimer.current =
      setTimeout(() => {
        let updatedTimeout = Date.now() + timeout * 1000;
        localStorage.setItem("expiredTime", updatedTimeout);
      }, 200);
  }

  window.addEventListener("mousemove", eventHandler);
  window.addEventListener("scroll", eventHandler);
  window.addEventListener("keydown", eventHandler);

  while (document.readyState === 'loading') {
    setProgress(progress += 20);
  }

  useEffect(() => {
    setProgress(100);
    var timer;
    console.log(isLoggedIn);
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      console.log("looping");
      if (!isLoggedIn && JSON.parse(localStorage.getItem("user"))) {
        //console.log("logged in");
        setisLoggedIn(true);
      }
      if (localStorage.getItem("user") && localStorage.getItem("expiredTime")
        && (Date.now() > localStorage.getItem("expiredTime"))) {
        setisLoggedIn(false);
        localStorage.clear();
        //localStorage.setItem("expired", true);
        isTimeout.current = true;
        console.log("Timed out");
        setTimeout(() => {
          alert("Session Timed out! Please log in again!");
        }, 100);
        navigate('/', {
          state: {
            expired: true,
          }, replace: true
        });
      } else {
        isTimeout.current = false;
      }
    }, 1000);
    return () => { clearInterval(timer) }
  }, [isLoggedIn]);

  const logOut = () => {
    localStorage.clear();
    setisLoggedIn(false);
  }

  return (
    <>
      <Navbar className="navBar" bg="black">
        <Link className="navButtons" to="/">HOME</Link>
        <Link className="navButtons" to={localStorage.getItem("user") ? "spin" : "login"}>GAME</Link>
        <Dropdown id="account">          
          <Dropdown.Toggle id="dropdown-autoclose-true"><i className="fa fa-user fa-lg"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdownBox">
            <Link className="dropdownItems" to="account">ACCOUNT</Link>
            {isLoggedIn ? <Link className="dropdownItems" to="topup">TOP-UP</Link> : null}
            {isLoggedIn ? <Link className="dropdownItems" to="login" onClick={logOut}>LOGOUT</Link> :
              <Link className="dropdownItems" to="login">LOGIN/REGISTER</Link>
            }
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Outlet />

    </>
  );
}

