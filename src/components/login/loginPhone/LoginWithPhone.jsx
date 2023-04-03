import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import logo from '../../../images/logoSignIn.png'
import phone from '../../../images/phone.png'
import googleIcon from '../../../images/google.svg'
import facebookIcon from '../../../images/facebook.svg'
import emailIcon from '../../../images/mail.svg'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth, facebook, google } from "../../../firebase/FirebaseConfig";
import Swal from "sweetalert2";
import {
  userLoginProviderAsync,
  loginUser
} from "../../../redux/actions/loginActions";

const numRegex = /\x2b[0-9]+/;

const schema = yup
  .object({
    number: yup
      .string()
      .matches(numRegex, "El numero telefonico debe ser de 10 digitos y debe contener indicativo")
      .required("No ha ingresado el numero telefonico"),
  })
  .required();

const LoginWithPhone = () => {
  const [valueInput, setValueInput] = useState('')
  const { error, user, loading, isLogged } = useSelector((store) => store.login);
  const {register,handleSubmit,formState: { errors },} = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const generateRecaptch = () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          'size': 'invisible',
          'callback': (response) => {},
        },
        auth
      );
    } catch (error) {
      console.log(error);
    }
  };

  const sendSMS = (number, recaptchaVerifier) => {
    signInWithPhoneNumber(auth, `+57${number}`, recaptchaVerifier)
      .then((response) => {
        window.confirmationResult = response;
        console.log(`Enviamos el mensaje a ${number}`);
        navigate("/insertcode");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addIndicative = (value) =>{
    if(value.length===1 && value!=='+'){
      setValueInput('+57 '+value)
    }else{
      setValueInput(value)
    }
  }

  const onSubmit = (data) => {
    console.log(data);
    generateRecaptch();
    sendSMS(data.number.split(" ")[1], window.recaptchaVerifier);
  };

  const sesionProvider = (provider) => {
    dispatch(userLoginProviderAsync(provider));
  };

  return (
    <section className="login-phone-page">
      <figure>
        <img src={logo} alt="logo" />
      </figure>
      <p className="title">Sing in</p>
      <p className="description">Login or create an account with your
        phone number to start ordering
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-phone">
          <img src={phone} alt="icon"/>
          <input className="numberPhone"
            {...register("number")}
            maxLength={14}
            type="text"
            value={valueInput}
            placeholder="número de télefono"
            onChange={(e)=>addIndicative(e.target.value)}
          />
        </div>
        {errors.number ? (
          <span className="error">
            {errors.number.message}
          </span>
        ) : (
          <></>
        )}
        <div className="providers">
          <figure
            onClick={() => {
              sesionProvider(google);
            }}
          >
            <img src={googleIcon} alt="google"/>
          </figure>
          <figure
            onClick={() => {
              sesionProvider(facebook);
            }}
          >
            <img className="facebook" src={facebookIcon} alt="facebook"/>
          </figure>
          <NavLink className="button-item"
            to="/login"
          >
            <figure>
              <img src={emailIcon} alt="email"/>
            </figure>
          </NavLink>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div id="recaptcha-container"></div>
    </section>
  );
};

export default LoginWithPhone;
