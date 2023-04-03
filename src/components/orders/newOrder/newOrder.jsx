import React from "react";
import { NavLink } from "react-router-dom";
import HeaderBack from '../../commons/header-back/HeaderBack';
import next from '../../../images/next.png'
import location from '../../../images/location.jpg';
import card from '../../../images/card.png';
import plate1 from '../../../images/plate1.png';
import plate2 from '../../../images/plate2.png';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import Quantity from "../../commons/quantity/Quantity";
import OrderInformation from "../../commons/orderInformation/OrderInformation";

const  NewOrder = () => {
  return (
    <section className="new-order-page">
        <HeaderBack text="New order" />
        <div className="delivery">
            <p>Deliver to</p>
            <div className="delivery-address">
                <img src={location} alt="position" />
                <NavLink className="address-selected" to="/address">
                    <span>882 Well St, New-York</span>
                    <img src={next} alt="arrow" />
                </NavLink>
            </div>
        </div>
        <p>Payment</p>
        <Carousel centerSlidePercentage={31} showIndicators={false} centerMode showArrows={false} showThumbs={false} showStatus={false} infiniteLoop={false} >
            <button className="payments selected">
                Cash
            </button>
            <button className="payments">
                <img src={card} alt="logo"/>
                2344.... 4589
            </button>
            <button className="payments">
                <img src={card} alt="logo"/>
                2344.... 4589
            </button>
            <button className="payments">
                <img src={card} alt="logo"/>
                2344.... 4589
            </button>
        </Carousel>
        <div className="all-order">
            <div className="card-order">
                <figure>
                    <img src={plate1} alt="rest" />
                </figure>
                <div className="information">
                    <div className="quantity">
                        <Quantity />
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
                        <Quantity />
                    </div>
                    <div className="order">
                        <span>Fresh with funcheza</span>
                        <span className="price">$ 28.45</span>
                    </div>
                </div>
            </div>
        </div>
        <p>Note</p>
        <input placeholder="Write something" className="note" />
        <div className="bottom-info">
            <OrderInformation />
            <NavLink className="order-button"
                to="/orderAccepted"
            >
                Order
            </NavLink>
        </div>

    </section>
  );
}

export default NewOrder;