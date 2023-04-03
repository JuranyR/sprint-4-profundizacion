import React from "react";
import { NavLink } from "react-router-dom";
import Footer from "../commons/footer/Footer";
import order1 from '../../images/order1.png'
import order2 from '../../images/order2.png'
import arrow from '../../images/arrow.png'

const  Orders = () => {
  return (
    <>
        <section className="orders-page">
            <p className="title">All orders</p>
            <div className="rest">
                <NavLink
                    to="/orders/1"
                >
                    <div className="card-rest">
                        <figure>
                        <img src={order1} alt="rest" />
                        </figure>
                        <div className="information">
                        <p className="name">Pardes restaurant</p>
                        <p className="price">$ 132.00</p>
                        </div>
                        <figure className="status">
                            <p className="delivered">Delivered</p>
                            <img src={arrow} alt="arrow" />
                        </figure>
                    </div>
                </NavLink>
                <NavLink
                    to="/orders/2"
                >
                    <div className="card-rest">
                        <figure>
                        <img src={order2} alt="rest" />
                        </figure>
                        <div className="information">
                        <p className="name">Coffee place</p>
                        <p className="price">$ 55.20</p>
                        </div>
                        <figure className="status">
                            <p className="canceled">Canceled</p>
                            <img src={arrow} alt="arrow" />
                        </figure>
                    </div>
                </NavLink>
            </div>
        </section>
        <Footer />
    </>
  );
}

export default Orders;