import React from "react";
import { NavLink } from "react-router-dom";
import HeaderBack from '../../commons/header-back/HeaderBack';
import timer from '../../../images/timer.png'
import plate1 from '../../../images/plate1.png';
import plate2 from '../../../images/plate2.png';
import OrderInformation from "../../commons/orderInformation/OrderInformation";

const  CurrentOrder = () => {
  return (
    <section className="current-order-page">
        <HeaderBack text="Current order" />
        <div className="timer">
          <img src={timer} alt="timer"/>
          <span>15-20 min left</span>
          <div className="process">
            <figure>
              <div className="circle complete">
              </div>
              <p>Confirmed</p>
            </figure>
            <figure className="current">
              <div className="circle">
              </div>
              <p>Cooking</p>
            </figure>
            <figure>
              <div className="circle default">
              </div>
              <p>On the way</p>
            </figure>
            <figure>
              <div className="circle default">
              </div>
              <p>Delivered</p>
            </figure>
          </div>
        </div>
        <div className="all-order">
            <div className="card-order">
                <figure>
                    <img src={plate1} alt="rest" />
                </figure>
                <div className="information">
                    <div className="quantity">
                        x1
                    </div>
                    <div className="order">
                        <span>Vegetarian pizza</span>
                        <span className="price">$ 32.00</span>
                    </div>
                </div>
            </div>

            <div className="card-order">
                <figure>
                    <img src={plate2} alt="rest" />
                </figure>
                <div className="information">
                    <div className="quantity">
                        x2
                    </div>
                    <div className="order">
                        <span>Fresh with funcheza</span>
                        <span className="price">$ 28.45</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="bottom-info">
            <OrderInformation />
            <NavLink className="order-button"
                to="/"
            >
                new Order
            </NavLink>
        </div>
    </section>
  );
}

export default CurrentOrder;