import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { userLogoutAsync } from "../../redux/actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./header/Header";
import promo1 from '../../images/Promo-1.jpg';
import promo2 from '../../images/Promo-2.jpg';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import pizza from '../../images/pizza.svg'
import hamburger from '../../images/hamburger.svg'
import chiken from '../../images/roast-chicken.png'
import iceCream from '../../images/ice-cream.png'
import Rating from '@mui/material/Rating';
import Footer from "../commons/footer/Footer";
import { getRestaurantActionAsync, getFilterRestaurantActionAsync } from '../../redux/actions/restaurantActions'

const  Home = () => {
  const [category, serCategory]=useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restaurants } = useSelector((store) => store.restaurants);

  useEffect(()=>{
    dispatch(getRestaurantActionAsync())
  },[])

  const logOut = () => {
    dispatch(userLogoutAsync());
  };

  const filterCategory = (item) =>{
    serCategory(item)
    dispatch(getFilterRestaurantActionAsync(item, 'category'));
  }
  
  return (
    <section className="home">
      <Header />
      <Carousel centerSlidePercentage={60} showIndicators={false} centerMode showArrows={false} showThumbs={false} showStatus={false} infiniteLoop={false} >
        <figure className="promo">
          <img src={promo1} alt="promo"/>
        </figure>
        <figure className="promo">
          <img src={promo2} alt="promo"/>
        </figure>
      </Carousel>
      <p className="title">Restaurants and cafes</p>
      <Carousel centerSlidePercentage={28} showIndicators={false} centerMode showArrows={false} showThumbs={false} showStatus={false} infiniteLoop={false} >
        <button className={category?"category":"category selected"} onClick={()=>filterCategory(null)}>
          All
        </button>
        <button className={category==='Fast food'?"category selected":"category"} onClick={()=>filterCategory('Fast food')}>
          <img src={hamburger} alt="logo"/>
          Fast food
        </button>
        <button className={category==='Pizza'?"category selected":"category"} onClick={()=>filterCategory('Pizza')}>
          <img src={pizza} alt="logo"/>
          Pizza
        </button>
        <button className={category==='Chiken'?"category selected":"category"} onClick={()=>filterCategory('Chiken')}>
          <img src={chiken} alt="logo"/>
          Chiken
        </button>
        <button className={category==='Ice Cream'?"category selected":"category"} onClick={()=>filterCategory('Ice Cream')}>
          <img src={iceCream} alt="logo"/>
          Ice Cream
        </button>
      </Carousel>
      <div className="cards">
        {restaurants &&
          restaurants.map(rest=>(
            <NavLink className="card-restaurant" key={rest.id}
                to={`/restaurant/${rest.id}`}
            >
              <figure>
                <img src={rest.photo} alt="restaurant" />
              </figure>
              <div className="information">
                <p className="title">{rest.name}</p>
                <Rating  size="small" value={rest.stars} readOnly />
                <p className="time">{rest.workTime}</p>
                <p className="money">{rest.price}</p>
              </div>
            </NavLink>
          ))
        }
      </div>
      <NavLink className="viewCard"
          to="/newOrder"
      >
        <span className="cant">4</span>
        <span>View card</span>
        <span>64.00$</span>
      </NavLink>
      <Footer/>
      <button onClick={logOut}>Logout</button>
    </section>
  );
}
  
  export default Home;
  