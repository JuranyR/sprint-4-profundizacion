import React, {useEffect, useState} from "react";
import Footer from "../commons/footer/Footer";
import search from '../../images/Search.svg'
import trash from '../../images/trash.png'
import { NavLink } from "react-router-dom";
import repeat from '../../images/repeat.png'
import {getFilterPlatesActionAsync} from '../../redux/actions/plateActions'
import { useDispatch,useSelector } from "react-redux";

const  Search = () => {
  const dispatch = useDispatch();
  const [inputSearch,setInputSearh]= useState('')
  const [showResult,setShowResult]= useState(undefined)
  const [lastSearchs,setLastSearchs]= useState(undefined)
  const { plates } = useSelector((store) => store.plates);

  useEffect(()=>{
    const lastSearch= localStorage.getItem('lastSearh')?JSON.parse(localStorage.getItem('lastSearh')):[]
    setLastSearchs(lastSearch)
    doSearh(null,"")
  },[])

  const sendData= (e)  => {
    if(e) e.preventDefault()
    const lastSearch= localStorage.getItem('lastSearh')?JSON.parse(localStorage.getItem('lastSearh')):[]
    setLastSearchs(lastSearch)
    if(lastSearch.length===0 && inputSearch){
      lastSearch.push(inputSearch)
    }
    if(lastSearch.filter(item=> item.toLowerCase().includes(inputSearch.toLowerCase())).length===0 && inputSearch){
      lastSearch.push(inputSearch)
    }
    localStorage.setItem("lastSearh", JSON.stringify(lastSearch))
    dispatch(getFilterPlatesActionAsync(inputSearch))
    setShowResult(true)
  }
  const doSearh = (e,word)=>{
    setInputSearh(word)
    sendData(e)
  }

  return (
    <>
        <section className="search-page">
          <form className="search">
            <button type="submit" onClick={(e)=>sendData(e)}>
                <img src={search} alt="icon"/>
            </button>
            <input type="text" value={inputSearch} placeholder="Search for a dish" onChange={(e)=>{if(e.target.value===""){setShowResult(false)};setInputSearh(e.target.value)}} />
            <button type="button" onClick={()=>setInputSearh('')}>
                <img src={trash} alt="icon"/>
            </button>
          </form>
          <div className="food">
            {plates && showResult &&
              plates.map(plate=>(
                <NavLink className="card-food" key={plate.id}
                  to={`/plate/${plate.idParent}/${plate.id}`}
                >
                  <figure>
                    <img src={plate.photo} alt="food" />
                  </figure>
                  <div className="information">
                    <p className="name">{plate.name}</p>
                    <p className="price">{plate.price}</p>
                  </div>
                </NavLink>
              ))
            }
          </div>
          {
            inputSearch==="" && lastSearchs &&lastSearchs.length>0 &&
            <>
              <p className="title">Recent searches</p>
              <ul>
                {
                  lastSearchs.map((item,index)=>(
                    <li onClick={(e)=>doSearh(e,item)} key={index}>
                      <img src={repeat} alt="repeat"/>
                      {item}
                    </li>
                  ))
                }
              </ul>
            </>
          }
          {/*<p className="title">Recent searches</p>
          <ul>
            <li>
              <img src={repeat} alt="repeat"/>
              Pizza
            </li>
            <li>
              <img src={repeat} alt="repeat"/>
              Burger
            </li>
          </ul> */}

        </section>
        <Footer />
    </>
  );
}

export default Search;