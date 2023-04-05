import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../commons/footer/Footer";
import arrow from '../../images/arrow.png'
import { useDispatch, useSelector } from "react-redux";
import {getOrdersActionAsync} from '../../redux/actions/orderActions'
import {getTotalOrder} from '../../utils/general'

const  Orders = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((store) => store.orders);
    const { restaurants } = useSelector((store) => store.restaurants);

    useEffect(()=>{
      dispatch(getOrdersActionAsync())
    },[])

    return (
        <>
            <section className="orders-page">
                <p className="title">All orders</p>
                <div className="rest">
                    {orders.length>0 && restaurants.length>0 && 
                        orders.map(order=>{
                            const restaurant= restaurants.find(res=> res.id === order.restaurant);
                            
                            return(
                                <NavLink
                                    key={order.id}
                                    to={`/order/${order.restaurant}/${order.id}`}
                                >
                                    <div className="card-rest">
                                        <figure className="logo">
                                            <img src={restaurant.logo} alt="rest" />
                                        </figure>
                                        <div className="information">
                                        <p className="name">{restaurant.name}</p>
                                        <p className="price">$ {getTotalOrder(order.product)}</p>
                                        </div>
                                        <figure className="status">
                                            <p className={order.state==="Delivered"?"delivered":order.state==="Canceled"?"canceled":"inProcess"}>{order.state}</p>
                                            <img src={arrow} alt="arrow" />
                                        </figure>
                                    </div>
                                </NavLink>
                            )
                        })
                    }
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Orders;