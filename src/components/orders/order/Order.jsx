import React, {useEffect} from "react";
import Footer from "../../commons/footer/Footer";
import HeaderBack from '../../commons/header-back/HeaderBack';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {getOrderByIdActionAsync} from '../../../redux/actions/orderActions'
import {getTotalOrder,getPrice} from '../../../utils/general'

const  Order = () => {
  const { orderId, restaurantId } = useParams();
  const dispatch = useDispatch();
  const { currentOrder } = useSelector((store) => store.orders);

  useEffect(()=>{
    dispatch(getOrderByIdActionAsync(restaurantId,orderId))
  },[])

  return (
    <>
        <section className="order-page">
          {currentOrder &&   Object.keys(currentOrder).length !== 0 &&
            <>
              <HeaderBack text={currentOrder.creationDate} />
              {
                currentOrder.product.map(order=>(
                  <div className="voucher-product" key={order.id}>
                    <div>
                      <span className="cant">{order.cant}x</span>
                      <span className="product">{order.name}</span>
                    </div>
                    <span>{order.totalOrder}</span>
                  </div>
                ))
              }
              <div className="voucher-info  space-top">
                <span className="product">Production cost</span>
                <span>${getTotalOrder(currentOrder.product)}</span>
              </div>
              <div className="voucher-info">
                <span className="product">Сost of delivery</span>
                <span>{currentOrder.costDelivery}</span>
              </div>
              <hr />
              <div className="total">
                <span>Total</span>
                <span>${Number(getTotalOrder(currentOrder.product))+ getPrice(currentOrder.costDelivery)}</span>
              </div>
            </>
          }
        </section>
        <Footer />
    </>
  );
}

export default Order;