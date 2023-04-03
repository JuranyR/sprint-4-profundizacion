import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import clock from '../../../images/time.png'
import Quantity from "../../commons/quantity/Quantity";
import { useDispatch, useSelector } from "react-redux";
import { getPlateByIdActionAsync } from '../../../redux/actions/plateActions';

const Plate = () => {
    const dispatch = useDispatch();
    const { restaurantId, plateId } = useParams();
    const { current } = useSelector((store) => store.plates);

    useEffect(()=>{
        dispatch(getPlateByIdActionAsync(restaurantId,plateId))
    },[])

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
                            {
                                current.ingredients.map(ingredient =>(
                                    <div className="ingredients">
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    sx={{
                                                        '&.Mui-checked': {
                                                            color: "#FFE031",
                                                        },
                                                    }}
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
                                <Quantity />
                            </div>
                            <button className="add" type="button">
                                <span>Add</span>
                                <span>$14.00</span>
                            </button>
                        </div>
                    </div>   
                </>
            }
        </section>
    )
}

export default Plate;
