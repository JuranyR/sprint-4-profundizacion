import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HeaderBack from '../../commons/header-back/HeaderBack';
import next from '../../../images/next.png'
import location from '../../../images/location.jpg';
import cardIcon from '../../../images/card.png';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import Quantity from "../../commons/quantity/Quantity";
import OrderInformation from "../../commons/orderInformation/OrderInformation";
import {getPrice} from '../../../utils/general'
import {currentOrderAction, createOrderActionAsync} from '../../../redux/actions/orderActions';

const  NewOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [payment, setPayment]=useState('cash')
    const [note, setNote] = useState('')
    const { user } = useSelector((store) => store.login);
    const { currentOrder } = useSelector((store) => store.orders);

    const onChangeAmount=(amount, item)=>{
        const order={...currentOrder};
        const products= [...order.product]
        const indexOrder= products.findIndex(elm=> elm.id === item.id);
        if(indexOrder>-1){
            const newItem = {
                ...item,
                cant: amount,
                totalOrder: "$ "+(getPrice(item.price)*amount).toFixed(2),
            }
            products.splice(indexOrder, 1, newItem);
        }
        order.product=[...products,]
        dispatch(currentOrderAction(order))

    }

    const addNote= (e)=>{
        setNote(e.target.value)
    }

    const createOrder=()=>{
        const createOrder={...currentOrder};
        createOrder.note=note;
        createOrder.creationDate= new Date().toLocaleDateString('en-GB').replace(/[/]/g,".");
        dispatch(createOrderActionAsync(createOrder)).then(res=>{
            navigate(`/orderAccepted/${res.item.id}`)
        })
    }

    const filterCategory = (item) =>{
        setPayment(item)
    }

    return (
        <section className="new-order-page">
            <HeaderBack text="New order" />
            <div className="delivery">
                <p>Deliver to</p>
                <div className="delivery-address">
                    <img src={location} alt="position" />
                    <NavLink className="address-selected" to="/address">
                        <span>{user.location?user.location:"without address"}</span>
                        <img src={next} alt="arrow" />
                    </NavLink>
                </div>
            </div>
            <p>Payment</p>
            <Carousel centerSlidePercentage={31} showIndicators={false} centerMode showArrows={false} showThumbs={false} showStatus={false} infiniteLoop={false} >
                <button className={payment==='cash'?"payments selected":"payments"} onClick={()=>filterCategory("cash")}>
                    Cash
                </button>
                {user &&
                    user.cards.map((card,index)=>(
                        <button className={payment===card.TC?"payments selected":"payments"}  key={index} onClick={()=>filterCategory(card.TC)}>
                            <img src={cardIcon} alt="logo"/>
                            {card.TC.slice(0,4)+"...."+card.TC.slice(15)}
                        </button>
                    ))   
                }
            </Carousel>
            {currentOrder && Object.keys(currentOrder).length !== 0 &&
                <>
                    <div className="all-order">
                        {
                            currentOrder.product.map((item, index)=>(
                                <div className="card-order" key={index}>
                                    <figure>
                                        <img src={item?.photo} alt="rest" />
                                    </figure>
                                    <div className="information">
                                        <div className="quantity">
                                            <Quantity onChangeAmount={onChangeAmount} defaultValue={item.cant} item={item}/>
                                        </div>
                                        <div className="order">
                                            <span>{item.name}</span>
                                            <span className="price">{item.totalOrder}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <p>Note</p>
                    <input placeholder="Write something" className="note" onChange={addNote} />
                    <div className="bottom-info">
                        <OrderInformation currentOrder={currentOrder} />
                        <button type="button" className="order-button" onClick={createOrder}>
                            Order
                        </button>
                    </div>
                </>
            }
        </section>
    );
}

export default NewOrder;