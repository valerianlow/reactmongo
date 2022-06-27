import axios from "axios";
import { useEffect, useState, useRef } from "react";

export default function Account() {
    const [userSpins, setUserSpin] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const spinInfo = useRef(null);

    useEffect(() => {
        axios.post(`http://localhost:8000/api/spinResults/`, user).then(
            res => {
                console.log(res.data[0]);
                spinInfo.current = res.data.reverse();
                setUserSpin(true);
            });
    }, []);

    return (
        <>
            <div className="userInfoDiv">
                <h2>Account Details:</h2>
                <span className="userInfo">Name: {user.firstName + " " + user.lastName}</span>
                <span className="userInfo">Email: {user.email}</span>
                <span className="userInfo">Age: {user.age}</span>
                <span className="userInfo">Gender: {user.gender}</span>
                <span className="userInfo">Cash Balance: ${user.cash_balance}</span>
            </div>
            <div className="filler" />
            <div className="userInfoDiv">
                <h2>Spin History:</h2>
                {userSpins ? spinInfo.current.map((arr,index) => (
                    <div className="verticalDiv">
                        <div className="horizontalDiv">
                            <span className="resultsDiv"><h5>Result:</h5></span>
                            <span className="resultsDiv"><h5>Bet Amount:</h5></span>
                            <span className="resultsDiv"><h5>Date:</h5></span>
                        </div>
                        <div className="horizontalDiv">
                            <span className="resultsDiv">{arr.result}</span>
                            <span className="resultsDiv">${arr.amount}</span>
                            <span className="resultsDiv">{arr.date}</span>
                        </div>
                    </div>
                )) : null}
            </div>
        </>
    );
}