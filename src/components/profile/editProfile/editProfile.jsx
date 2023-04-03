import React, {useRef, useState} from "react";
import HeaderBack from '../../commons/header-back/HeaderBack';
import photo from '../../../images/photo.png'
import camera from '../../../images/camera.png'
import edit from '../../../images/edit.png'
import TextField from '@mui/material/TextField';

const EditProfile = () => {
    const [editItemInput, setEditItemInput]= useState(true)
    const inputFile = useRef(null) 

    const onUploadFile = () => {
        inputFile.current.click();
    };
    const editItem = (item)=>{
        setEditItemInput(!editItemInput)
    }
    return (
        <section className="edit-profile-page">
            <HeaderBack text="Profile" />
            <figure>
                <img src={photo} alt="profile" />
                <button className="camera" onClick={onUploadFile}>
                    <img src={camera} alt="camera" />
                    <input className="d-none" type="file" ref={inputFile} />
                </button> 
            </figure>
            <div className="edit-item">
                <TextField  fullWidth variant="standard"
                    defaultValue="Jenny Wilson"
                    disabled={editItemInput?true:false}
                />
                <img src={edit} alt="next-arrow" onClick={()=> editItem()}/>
            </div>
            <div className="edit-item">
                <TextField  fullWidth variant="standard" 
                    defaultValue="jennywilson@gmail.com"
                    disabled
                />
            </div>
            <div className="edit-item">
                <TextField  fullWidth variant="standard" 
                    defaultValue="+1 903 354 43 43"
                    disabled
                />
            </div>
            <div className="edit-item">
                <TextField  fullWidth variant="standard" 
                    defaultValue="03.05.1995"
                    disabled
                />
            </div>
            <button className="save" type="button">Save</button>
        </section>
    );
};

export default EditProfile;