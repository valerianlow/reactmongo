import React, { useState, useRef, useEffect } from 'react';
import {  useNavigate } from "react-router-dom";
import { Wheel } from 'react-custom-roulette';
import axios from 'axios';

const data = [
    { option: 'LOSE' },
    { option: 'WIN' },
]

export default function WheelFortune() {
    const navigate = useNavigate();       
    const [mustSpin, setMustSpin] = useState(false);
    const [inputVal, setInputVal] = useState(0);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [lackOfBalance, setLackOfBalance] = useState(false);
    const [accBalance, setAccBalance] = useState(0);
    const id = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
    const currBalance = useRef(0);    

    useEffect(() => {
        if (!localStorage.getItem("user")) {   
            alert("PLEASE LOG IN");         
            navigate("/login", {replace: true});
        }
        else{
            axios.post(`http://localhost:8000/api/user/${id}`).then((response) => {
                console.log(response.data);
                currBalance.current = response.data.cash_balance;
                setAccBalance(currBalance.current)
            }
            ).catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                }
            });
        }
    }, [])

    const handleSpinClick = () => {
        if (inputVal > currBalance.current) {
            setLackOfBalance(true);
        }
        else {
            setMustSpin(true);
            let newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setLackOfBalance(false);
            const spinInfo = { 
                email: JSON.parse(localStorage.getItem('user')).email,
                amount: parseInt(inputVal),
                result: data[newPrizeNumber].option,
                date: new Date().toString().substring(4,21)
            }
            console.log(spinInfo);
            newPrizeNumber ? currBalance.current += parseInt(inputVal) : currBalance.current -= parseInt(inputVal)
            axios.post(`http://localhost:8000/api/spinResults/insert/`, spinInfo).then(res => console.log(res))
            axios.put(`http://localhost:8000/api/user/${id}/`, { cash_balance: currBalance.current })
                .then((response) => {
                    console.log(response.data);
                }
                ).catch((error) => {
                    if (error.response) {
                        console.log(error.response.data);
                    }
                });
        }

    }
    const checkWinLose = () => {
        setMustSpin(false);
        setAccBalance(currBalance.current);
        prizeNumber ? console.log(`YOU WIN $${inputVal}!`) : console.log(`YOU LOSE $${inputVal}!`)
        console.log(`YOUR CURRENT BALANCE: $${currBalance.current}!`);

    }

    return (
        <div className="centeredDiv" style={{ width: '70%' }}>
            <div style={{ marginBottom: '15px' }}>
                <p style={{ color: 'white' }}>Account balance: ${accBalance}</p>
            </div>
            <div className="centeredDiv">
                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    outerBorderColor={'white'}
                    innerBorderColor={'black'}
                    outerBorderWidth={1}
                    innerBorderWidth={5}
                    radiusLineWidth={3}
                    radiusLineColor={'black'}
                    perpendicularText={true}
                    textDistance={50}
                    data={data}
                    backgroundColors={['#00FF00', '#df3428']}
                    onStopSpinning={checkWinLose}
                />
                <div id="amt">
                    <label style={{ color: 'white' }}>Enter amount ($):</label>
                    <input id="amtField" type="text" defaultValue="0" onChange={event => setInputVal(event.target.value)}></input>

                </div>
                {lackOfBalance && <span style={{ margin: 'auto' }}>YOUR ACCOUNT DOES NOT HAVE ENOUGH MONEY!</span>}
                <button id="wheelSpin" onClick={handleSpinClick}>SPIN</button>
            </div>
        </div>
    )
}