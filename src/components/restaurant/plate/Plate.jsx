import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import clock from '../../../images/time.png'
import Quantity from "../../commons/quantity/Quantity";
import { useDispatch, useSelector } from "react-redux";
import { getPlateByIdActionAsync } from '../../../redux/actions/plateActions';
import {currentOrderAction} from '../../../redux/actions/orderActions';
import Swal from "sweetalert2";
import {getPrice} from '../../../utils/general'


const Plate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { current } = useSelector((store) => store.plates);
    const { currentOrder } = useSelector((store) => store.orders);
    const [ subtotal, setSubTotal ] = useState();
    const [ total, setTotal ] = useState();
    const [ currentAmount, setCurrentAmount ] = useState(1);
    const { restaurantId, plateId } = useParams();

    useEffect(()=>{
        dispatch(getPlateByIdActionAsync(restaurantId,plateId))
    },[])


    useEffect(()=>{
        if(current.price){
            setSubTotal(getPrice(current.price))
            setTotal(getPrice(current.price))
        }
    },[current])

    const onChangeAmount=(amout)=>{
        setTotal((subtotal*amout).toFixed(2))
        setCurrentAmount(amout)
    }

    const addIngredients = (event) => {
        if(event.target.checked){
            const sum= subtotal+getPrice(event.target.value)
            setSubTotal(sum)
            setTotal((sum*currentAmount).toFixed(2))
        } else {
            const res= subtotal-getPrice(event.target.value)
            setSubTotal(res)
            setTotal((res*currentAmount).toFixed(2))
        }
        
    }

    const addOrder = () =>{
        let order= {...currentOrder};
        if(!order || order.restaurant !== restaurantId){
            order = {
                restaurant: restaurantId,
                state: "In Process",
                costDelivery:"$ 8.00",
                product:[
                    {
                        id:1,
                        name: current.name,
                        cant: currentAmount,
                        price: "$ "+total/currentAmount,
                        totalOrder: "$ "+total,
                        photo: current.photo
                    }
                ]
            }
        } else{
            order.product=[
                ...order.product,
                {
                    id:order.product.length+1,
                    name: current.name,
                    cant: currentAmount,
                    price: "$ "+total/currentAmount,
                    totalOrder: "$ "+total,
                    photo: current.photo
                }
            ]
        }
        dispatch(currentOrderAction(order))
        Swal.fire({
            icon: 'success',
            title: 'Genial',
            text: 'producto agregado exitosamente!',
            confirmButtonText: 'ok',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(-1)
            }
        })
    }

    return (
        <section className="plate-page">
            {current &&
                <>
                    <figure>
                        <img src={current.photo} alt="plate"/>
                    </figure>
                    <div className="content">
                        <div className="title">
                            <p>{current.name}</p>
                            <figure>
                                <img src={clock} alt="clock" />
                                <span>{current.time}</span>
                            </figure>
                        </div>
                        <p className="description">{current.description}</p>
                        <p className="ingredient-title">Additional Ingredients</p>
                        <FormGroup>
                            {current.ingredients && 
                                current.ingredients.map((ingredient, index) =>(
                                    <div className="ingredients" key={index}>
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    name={ingredient.name}
                                                    value={ingredient.price}
                                                    sx={{
                                                        '&.Mui-checked': {
                                                            color: "#FFE031",
                                                        },
                                                    }}
                                                    onChange={addIngredients}
                                                />
                                            } 
                                            label={ingredient.name}
                                        />
                                        <span className="selected">+{ingredient.price}</span>
                                    </div>
                                ))
                            }
                        </FormGroup>
                        <div className="buttons">
                            <div className="addAmount">
                                <Quantity onChangeAmount={onChangeAmount}/>
                            </div>
                            <button className="add" type="button" onClick={()=>addOrder()}>
                                <span>Add</span>
                                <span>$ {total}</span>
                            </button>
                        </div>
                    </div>   
                </>
            }
        </section>
    )
}

export default Plate;
