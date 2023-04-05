import React, { useState } from "react";
import HeaderBack from '../commons/header-back/HeaderBack';
import cardType from '../../images/cardType.png'
import showInfo from '../../images/showInfo.png'
import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {updateDataUserActionAsync} from '../../redux/actions/loginActions'

const PaymentMethod = () => {
    const { user } = useSelector((store) => store.login);
    const dispatch = useDispatch();
    const [selectedCard, setSelectedCard] = useState('')
    const [showNumberCard, setShowNumberCardd] = useState(false)

    const submitSelectedCard=(card)=>{
        let newUser= {...user};
        const newCards=[]
        newUser.cards.forEach(item=>{
            if(item.TC === card){
                newCards.push({...item,selected:true})
            } else{
                newCards.push({...item,selected:false})
            }
        })
        newUser.cards=[...newCards]
        Swal.fire({
            icon: 'question',
            text: 'Está seguro de cambiar tarjeta?',
            showCancelButton: true,
            confirmButtonText: 'Save',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setSelectedCard(card)
                dispatch(updateDataUserActionAsync(newUser))
            }
        })
    }

    return (
        <section className="payment-method-page">
            <HeaderBack text="Payment method" />
            {user && user.cards &&
                user.cards.map((card,index)=>(
                    <div className={card.selected || selectedCard === card.TC?"card selected":"card"} key={index}>
                        <button className="inputCard" onClick={()=> submitSelectedCard(card.TC)}>
                            <img src={cardType} alt="icon"/>
                            <input  disabled type="text"  placeholder={showNumberCard?card.TC:card.TC.slice(0,14).replace(/\d{1}/g,"*")+" "+card.TC.slice(15)}  maxLength="15" />
                        </button>
                        <button type="button" onClick={()=> setShowNumberCardd(!showNumberCard)}>
                            <img src={showInfo} alt="icon"/>
                        </button>
                    </div>
                ))
            }
            <NavLink className="addCard"
                to="/addNewCard"
            >
                Add new card
            </NavLink>
        </section>
    );
};

export default PaymentMethod;