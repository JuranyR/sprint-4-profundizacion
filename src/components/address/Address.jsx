import React, { useState } from "react";
import HeaderBack from '../commons/header-back/HeaderBack';
import TextField from '@mui/material/TextField';
import location from '../../images/locationGray.png';
import send from '../../images/send.png'

const Address = () => {
    const  [address, setAddress] = useState({})

    const selectedAdress=(item) =>{
        console.log(address[item])
    }
    return (
        <section className="address-page">
            <HeaderBack text="Manage adresses" />
            <div className="address-input space-top">
                <img src={location} alt="location" />
                <TextField
                    required
                    label="Adress 1"
                    defaultValue="882 Well St, New-York"
                    variant="standard"
                    fullWidth
                    onChange={(e)=>setAddress({...address, "address1": e.target.value})}
                />
                <button type="button" onClick={()=>selectedAdress("address1")}>
                    <img src={send} alt="icon"/>
                </button>
            </div>
            <div className="address-input">
                <img src={location} alt="location" />
                <TextField
                    label="Adress 2"
                    defaultValue="882 Well St, New-York"
                    variant="standard"
                    fullWidth
                    onChange={(e)=>setAddress({...address, "address2": e.target.value})}
                />
                <button type="button" onClick={()=>selectedAdress("address2")}>
                    <img src={send} alt="icon"/>
                </button>
            </div>
        </section>
    );
};

export default Address;
