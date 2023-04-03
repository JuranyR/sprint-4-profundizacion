import React, {useState} from "react";
import Footer from "../commons/footer/Footer";
import search from '../../images/Search.svg'
import trash from '../../images/trash.png'
// import repeat from '../../images/repeat.png'
import pizza1 from '../../images/pizza-1.png';
import pizza2 from '../../images/pizza-2.png';

const  Search = () => {
  const [inputSearch,setInputSearh]= useState('')

  const sendData= (e)  => {
    e.preventDefault()
    alert("envia"+ inputSearch)
  }

  return (
    <>
        <section className="search-page">
          <form className="search">
            <button type="submit" onClick={(e)=>sendData(e)}>
                <img src={search} alt="icon"/>
            </button>
            <input type="text" placeholder="Search for a dish" onChange={(e)=>setInputSearh(e.target.value)} />
            <button type="submit" onClick={()=>{}}>
                <img src={trash} alt="icon"/>
            </button>
          </form>
          <div className="food">
            <div className="card-food">
              <figure>
                <img src={pizza1} alt="food" />
              </figure>
              <div className="information">
                <p className="name">Meat pizza</p>
                <p className="price">$ 29.00</p>
              </div>
            </div>

            <div className="card-food">
              <figure>
                <img src={pizza2} alt="food" />
              </figure>
              <div className="information">
                <p className="name">Combined pizza</p>
                <p className="price">$ 31.50</p>
              </div>
            </div>

            <div className="card-food">
              <figure>
                <img src={pizza2} alt="food" />
              </figure>
              <div className="information">
                <p className="name">Combined pizza</p>
                <p className="price">$ 31.50</p>
              </div>
            </div>

            <div className="card-food">
              <figure>
                <img src={pizza2} alt="food" />
              </figure>
              <div className="information">
                <p className="name">Combined pizza</p>
                <p className="price">$ 31.50</p>
              </div>
            </div>

          </div>
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