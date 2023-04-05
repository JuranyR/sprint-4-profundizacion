import React, {useEffect, useState} from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from '@mui/material/Rating';
import HeaderBack from '../commons/header-back/HeaderBack';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import { getRestaurantByIdActionAsync } from '../../redux/actions/restaurantActions';
import { getPlateActionAsync, getFilterPlateActionAsync } from '../../redux/actions/plateActions';

const Restaurant = () => {
    const { restaurantId } = useParams();
    const [category, setCategory]=useState('')
    const dispatch = useDispatch();

    const { current } = useSelector((store) => store.restaurants);
    const { plates } = useSelector((store) => store.plates);

    useEffect(()=>{
        dispatch(getRestaurantByIdActionAsync(restaurantId))
        dispatch(getPlateActionAsync(restaurantId))
    },[])

    const filterCategory = (item) =>{
        setCategory(item)
        dispatch(getFilterPlateActionAsync(item, 'category', restaurantId));
    }

    return (
        <section className="restaurant-page">
            {current &&
                <>
                    <div className="logo">
                        <HeaderBack text="" />
                        <img src={current.logo} alt="logo" />
                    </div>
                    <div className="card-restaurant">
                        <figure>
                            <img src={current.photo} alt="restaurant" />
                        </figure>
                        <div className="information">
                            <p className="title">{current.name}</p>
                            <p className="description">{current.description}</p>
                            <div className="rating">
                                <Rating  size="small" value={current.stars} readOnly />
                                <span className="duration">{current.time}</span>
                            </div>
                            
                        </div>
                    </div>
                </>
            }
            <Carousel centerSlidePercentage={31} showIndicators={false} centerMode showArrows={false} showThumbs={false} showStatus={false} infiniteLoop={false} >
                <button className={category?"category":"category selected"} onClick={()=>filterCategory(null)}>
                    All
                </button>
                <button className={category==='Salads'?"category selected":"category"} onClick={()=>filterCategory('Salads')}>
                    Salads
                </button>
                <button className={category==='Pizza'?"category selected":"category"} onClick={()=>filterCategory('Pizza')}>
                    Pizza
                </button>
                <button className={category==='Chiken'?"category selected":"category"} onClick={()=>filterCategory('Chiken')}>
                    Chiken
                </button>
                <button className={category==='Ice Cream'?"category selected":"category"} onClick={()=>filterCategory('Ice Cream')}>
                    Ice Cream
                </button>
            </Carousel>
            <div className="plates">
                {plates  && 
                    plates.map(plate=>(
                        <NavLink className="card-plate"
                            to={`/plate/${restaurantId}/${plate?.id}`}
                            key={plate?.id}
                        >
                            <figure>
                                <img src={plate?.photo} alt="plate" />
                            </figure>
                            <div className="information">
                                <p className="name">{plate?.name}</p>
                                <p className="price">{plate?.price}</p>
                            </div>
                        </NavLink>
                    ))
                }

                {/*
                <NavLink className="card-plate"
                    to="/plate/2"
                >
                    <figure>
                        <img src={salad2} alt="plate" />
                    </figure>
                    <div className="information">
                        <p className="name">Salad with shrimp</p>
                        <p className="price">$ 19.05</p>
                    </div>
                </NavLink>

                <NavLink className="card-plate"
                    to="/plate/3"
                >
                    <figure>
                        <img src={salad3} alt="plate" />
                    </figure>
                    <div className="information">
                        <p className="name">Caesar salad without sauce</p>
                        <p className="price">$ 17.45</p>
                    </div>
                </NavLink>

                <NavLink className="card-plate"
                    to="/plate/4"
                >
                    <figure>
                        <img src={salad4} alt="plate" />
                    </figure>
                    <div className="information">
                        <p className="name">Fresh with funcheza</p>
                        <p className="price">$ 14.45</p>
                    </div>
                </NavLink>
                */}
            </div>
        </section>
    );
};

export default Restaurant;
