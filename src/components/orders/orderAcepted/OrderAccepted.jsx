import React from "react";
import { NavLink, useParams } from "react-router-dom";
import HeaderBack from '../../commons/header-back/HeaderBack';
import accepted from '../../../images/accepted.png'

const  OrderAccepted = () => {
  const { orderId } = useParams();

  return (
    <section className="order-accepted-page">
        <HeaderBack text="Order is accepted" />
        <figure>
            <img src={accepted} alt="accepted"/>
        </figure>
        <NavLink className="follow-button"
                to={`/currentOrder/${orderId}`}
            >
            Follow order
        </NavLink>
    </section>
  );
}

export default OrderAccepted;