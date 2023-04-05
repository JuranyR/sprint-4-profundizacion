import React from "react";
import {getTotalOrder, getPrice} from '../../../utils/general'

const OrderInformation = ({currentOrder}) => {
    const total= getTotalOrder(currentOrder.product);
    const costDelivery= getPrice(currentOrder.costDelivery)
    return (
        <>
            <div className="order-information">
                <span className="product">Products</span>
                <span>{total} $</span>
            </div>
            <div className="order-information">
                <span className="product">Delivery</span>
                <span>{costDelivery} $</span>
            </div>
            <hr />
            <div className="order-information space-top">
                <span className="product">Total</span>
                <span className="total">{costDelivery+Number(total)}$</span>
            </div>
        </>
    );
};

export default OrderInformation;