import React from "react";
import { NavLink } from "react-router-dom";
import HeaderBack from '../../commons/header-back/HeaderBack';
import accepted from '../../../images/accepted.png'

const  OrderAccepted = () => {
  return (
    <section className="order-accepted-page">
        <HeaderBack text="Order is accepted" />
        <figure>
            <img src={accepted} alt="accepted"/>
        </figure>
        <NavLink className="follow-button"
                to="/currentOrder"
            >
            Follow order
        </NavLink>
    </section>
  );
}

export default OrderAccepted;