import React from "react";
import Footer from "../../commons/footer/Footer";
import HeaderBack from '../../commons/header-back/HeaderBack';

const  Order = () => {
  return (
    <>
        <section className="order-page">
            <HeaderBack text="26.11.2022" />
            <div className="voucher-product">
              <div>
                <span className="cant">1x</span>
                <span className="product">Meat Pizza(medium)</span>
              </div>
              <span>$35.50</span>
            </div>
            <div className="voucher-product">
              <div>
                <span className="cant">1x</span>
                <span className="product">Combined pizza (small)</span>
              </div>
              <span>$30.99</span>
            </div>
            <div className="voucher-info  space-top">
              <span className="product">Production cost</span>
              <span>$66.49</span>
            </div>
            <div className="voucher-info">
              <span className="product">Сost of delivery</span>
              <span>$8.00</span>
            </div>
            <hr />
            <div className="total">
              <span>Total</span>
              <span>$74.49</span>
            </div>
        </section>
        <Footer />
    </>
  );
}

export default Order;