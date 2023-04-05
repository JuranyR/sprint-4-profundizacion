import React, {useEffect, useRef, useState} from "react";
import HeaderBack from '../../commons/header-back/HeaderBack';
import { useParams, useNavigate } from "react-router-dom";
import camera from '../../../images/camera.png'
import edit from '../../../images/edit.png'
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form'
import {validateEmail} from '../../../utils/general'
import { fileUpload } from '../../../services/uploadFile'
import {updateProfileAsync } from '../../../redux/actions/loginActions'
import Swal from "sweetalert2";

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useParams();
    const { user } = useSelector((store) => store.login);
    const [canEditItem, setCanEditItemInput]= useState('')
    const [photo,setPhoto] = useState()
    const inputFile = useRef(null) 
    const { register, setValue , handleSubmit, formState: { errors } } = useForm();

    useEffect(()=>{
        setValue("name", user.name)
        setValue("birthday", user.birthday)
        setValue("email", user.email)
        setValue("cellphone", user.cellphone)
    },[])

    const onUploadFile = () => {
        inputFile.current.click();
    };
    const editItem = (item)=>{
        setCanEditItemInput(item)
    }

    const onEditItem=(event)=>{
        setPhoto(event.target.files[0])
    }

    const onSubmit = async  (data) => {
        if (photo){
            data.photo= await fileUpload(photo);
        } else{
            data.photo= user.photo
        }
        dispatch(updateProfileAsync({...user,...data,id:userId})).then((res)=>{
            
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'datos actualizados!',
                confirmButtonText: 'ok',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(-1)
                }
            })
        })
    }

    return (
        <section className="edit-profile-page">
            <HeaderBack text="Profile" />
            {user &&
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <figure>
                        <img src={photo?URL.createObjectURL(photo):user.photo} alt="profile" />
                        <div className="camera" onClick={onUploadFile}>
                            <img src={camera} alt="camera" />
                            <input name="photo" className="d-none" type="file" ref={inputFile} onChange={onEditItem}/>
                        </div> 
                    </figure>
                    <div className="edit-item">
                        <TextField  fullWidth variant="standard"
                            {...register('name', { required: 'Nombre requerido' })}
                            name="name"
                            className={`text-field ${errors.name ? 'border-red' : ''}`}
                            disabled={canEditItem==="name"?false:true}
                        />
                        <img src={edit} alt="next-arrow" onClick={()=> editItem('name')}/>
                    </div>
                    <div className="edit-item">
                        <TextField  fullWidth variant="standard" 
                            disabled={canEditItem==="email"?false:true}
                            className={`text-field ${errors.email ? 'border-red' : ''}`}
                            {...register('email', { required: 'Email es requerido', validate:validateEmail })}
                        />
                        
                    </div>
                    {errors.email ? <span className='text-red'>{errors.email.message}</span> : <></>}
                    <div className="edit-item">
                        <TextField  fullWidth variant="standard" 
                            {...register('cellphone', { required: 'Celular requerido' })}
                            disabled={canEditItem==="phone"?false:true}
                        />
                        
                    </div>
                    <div className="edit-item">
                        <TextField  fullWidth variant="standard" 
                            {...register('birthday', { required: 'fecha requerida' })}
                            disabled= {canEditItem==="date"?false:true}
                            className={`text-field ${errors.birthday ? 'border-red' : ''}`}
                        />
                        <img src={edit} alt="next-arrow" onClick={()=> editItem('date')}/>
                    </div>
                    {errors.birthday ? <span className='text-red'>{errors.birthday.message}</span> : <></>}
                    <button className="save" type='submit'>Save</button>
                </form>    
            }
        </section>
    );
};

export default EditProfile;