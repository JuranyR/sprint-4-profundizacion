import React from "react";

const OrderInformation = () => {
    return (
        <>
            <div className="order-information">
                <span className="product">Products</span>
                <span>60.45$</span>
            </div>
            <div className="order-information">
                <span className="product">Delivery</span>
                <span>4.5$</span>
            </div>
            <hr />
            <div className="order-information space-top">
                <span className="product">Total</span>
                <span className="total">64.95$</span>
            </div>
        </>
    );
};

export default OrderInformation;