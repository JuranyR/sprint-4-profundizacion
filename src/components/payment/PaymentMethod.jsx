import React, { useState } from "react";
import HeaderBack from '../commons/header-back/HeaderBack';
import cardType from '../../images/cardType.png'
import showInfo from '../../images/showInfo.png'
import { NavLink } from "react-router-dom";

const PaymentMethod = () => {
    const [inputValue, setInputValue] = useState({})

    const hideCardValue = (element) =>{
        console.log()
        const tmpval = element.target.value;
        if(tmpval.length <12 && element.target.id === "cardNo"){
          setInputValue({...inputValue,[element.target.name]:tmpval.replace(/\d{1}/,"*")})   
        } else{
            setInputValue({...inputValue,[element.target.name]:tmpval})
        }
    }

    return (
        <section className="payment-method-page">
            <HeaderBack text="Payment method" />
            <div className="card selected">
                <button className="inputCard">
                    <img src={cardType} alt="icon"/>
                    <input id="cardNo" value={inputValue.card1} name="card1" type="text"  placeholder="Enter Card Number" onChange={hideCardValue} maxLength="15" />
                </button>
                <button type="button" onClick={()=>{}}>
                    <img src={showInfo} alt="icon"/>
                </button>
            </div>
            <div className="card">
                <button className="inputCard">
                    <img src={cardType} alt="icon"/>
                    <input id="cardNo" value={inputValue.card2} name="card2" type="text"  placeholder="Enter Card Number" onChange={hideCardValue} maxLength="15" />
                </button>
                <button type="button" onClick={()=>{}}>
                    <img src={showInfo} alt="icon"/>
                </button>
            </div>
            <NavLink className="addCard"
                to="/addNewCard"
            >
                Add new card
            </NavLink>
        </section>
    );
};

export default PaymentMethod;