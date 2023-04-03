import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/FirebaseConfig";
import { verifyCodeAsync, loginUser } from "../../../redux/actions/loginActions";
import logo from '../../../images/logoSignIn.png'
import ReactInputVerificationCode from 'react-input-verification-code';
import Swal from "sweetalert2";

const InsertCode = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, user, loading, isLogged } = useSelector((store) => store.login);

    useEffect(()=>{
        if (error.status) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
            const err = { status: false, message: ''}
            dispatch(loginUser({}, err))
        }
        if (isLogged && loading=== false  && error.status === false){
            if (user.name &&  user.photo) {
              navigate("/");
            } else{
              navigate("/register", { state: {
                "email": auth.currentUser.email,
                "phone": auth.currentUser.phoneNumber
              }})
            }
        }
    },[error, loading, isLogged])

    const onCompleteCode = (code) =>{
        dispatch(verifyCodeAsync(code));
    }

    return (
        <section className="login-phone-page">
            <figure>
                <img src={logo} alt="logo" />
            </figure>
            <p className="title">Verification</p>
            <p className="description">Enter the six-digit code from SMS
                SMS not received. Send again?
            </p>
            <div className="code-verification">
                <ReactInputVerificationCode
                    autoFocus
                    placeholder=""
                    length={6}
                    onCompleted={onCompleteCode}
                />
            </div>
        </section>
    );
};

export default InsertCode;


/*

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/FirebaseConfig";
import { verifyCodeAsync, loginUser } from "../../../redux/actions/loginActions";
import logo from '../../../images/logoSignIn.png'
import ReactInputVerificationCode from 'react-input-verification-code';
import Swal from "sweetalert2";

const InsertCode = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, user, loading, isLogged} = useSelector((store) => store.login);

    useState(()=>{
        if (error.status) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
            const err = { status: false, message: ''}
            dispatch(loginUser({}, err))
        }
        if (isLogged && loading=== false  && error.status === false){
            if (user.name &&  user.photo) {
              navigate("/");
            } else{
              navigate("/register", { state: {
                "email": auth.currentUser.email,
                "phone": auth.currentUser.phoneNumber
              }})
            }
        }
    },[error, loading, isLogged])


    const onCompleteCode = (code) =>{
        dispatch(verifyCodeAsync(code));
    }

    */