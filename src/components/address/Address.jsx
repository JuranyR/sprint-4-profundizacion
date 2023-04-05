import React, { useState } from "react";
import HeaderBack from '../commons/header-back/HeaderBack';
import TextField from '@mui/material/TextField';
import location from '../../images/locationGray.png';
import send from '../../images/send.png'
import { useSelector,useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {updateDataUserActionAsync} from '../../redux/actions/loginActions'


const Address = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.login);
    const  [address, setAddress] = useState({})

    const selectedAdress=(item) =>{
        if(address[item]){
            let newUser= {...user};
            const newLocation=[]
            if(item==="address1"){
                newLocation[0]=address[item]
                newLocation[1]=newUser.location[1] || ''
            } else {
                newLocation[0]=newUser.location[0] || ''
                newLocation[1]=address[item]
            }
            newUser.location=[...newLocation]
            Swal.fire({
                icon: 'question',
                text: 'Está seguro de cambiar la dirección?',
                showCancelButton: true,
                confirmButtonText: 'Save',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    dispatch(updateDataUserActionAsync(newUser))
                }
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo no puede estar vacío'
              })
        }
    }
    return (
        <section className="address-page">
            <HeaderBack text="Manage adresses" />
            { user && user.location && 
                <>
                    <div className="address-input space-top">
                        <img src={location} alt="location" />
                        <TextField
                            required
                            label="Adress 1"
                            defaultValue={user.location[0] || ''}
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
                            defaultValue={user.location[1] || ''}
                            variant="standard"
                            fullWidth
                            onChange={(e)=>setAddress({...address, "address2": e.target.value})}
                        />
                        <button type="button" onClick={()=>selectedAdress("address2")}>
                            <img src={send} alt="icon"/>
                        </button>
                    </div>
                </>
            }
        </section>
    );
};

export default Address;
