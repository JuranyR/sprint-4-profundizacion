import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderBack from '../../commons/header-back/HeaderBack';
import timer from '../../../images/timer.png'
import OrderInformation from "../../commons/orderInformation/OrderInformation";
import { useSelector, useDispatch } from "react-redux";
import { updateCurentOrderActionAsync} from '../../../redux/actions/orderActions';

const  CurrentOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { currentOrder } = useSelector((store) => store.orders);
  const [time,setTime]= useState(1);

  useEffect(()=>{
    setTimeout(() => {
      if(time<31){
        setTime(time+1)
      }
    }, 1000);
  })

  const newOrder=()=>{
    const updateOrder={...currentOrder};
    if(time>=31){
      updateOrder.state='Delivered';
      dispatch(updateCurentOrderActionAsync(updateOrder,orderId))
    }else{
      updateOrder.state='Canceled';
      dispatch(updateCurentOrderActionAsync(updateOrder,orderId))
    }
    navigate("/")
  }

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
            <figure className={time<=10?"current":""} >
              <div className={time<=10?"circle":"circle complete"}>
              </div>
              <p>Cooking</p>
            </figure>
            <figure className={time>10 && time<=20?"current":""}>
              <div className={time<=10?"circle default":time>10 && time<=20?"circle":"circle complete"}>
              </div>
              <p>On the way</p>
            </figure>
            <figure className={time>20 && time<=30?"current":""}>
              <div className={time<=20?"circle default":time>20 && time<=30?"circle":"circle complete"}>
              </div>
              <p>Delivered</p>
            </figure>
          </div>
        </div>
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
                        x{item.cant}
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
            <div className="bottom-info">
                <OrderInformation currentOrder={currentOrder} />
                {/*<NavLink className="order-button"
                    to="/"
                >
                    new Order
            </NavLink>*/}
                <button type="button" className="order-button" onClick={newOrder}>
                  new Order
                </button>
            </div>
          </>
        }
    </section>
  );
}

export default CurrentOrder;