import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/FirebaseConfig";
import Swal from "sweetalert2";
import {
  loginUserAsync,
  loginUser
} from "../../../redux/actions/loginActions";
import logo from '../../../images/logoSignIn.png'
import { NavLink } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, user, loading, isLogged } = useSelector((store) => store.login);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitForm = (data) => {
    dispatch(loginUserAsync(data));
  };

  useEffect(()=>{
    if(error.status){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      })
      const err = { status: false, message: ''}
      dispatch(loginUser({}, err))
    }
    if (isLogged && loading=== false && error.status === false){
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

  return (
    <section className="login-page">
      <figure>
        <img src={logo} alt="logo" />
      </figure>
      <p className="title">Sing in</p>
      <p className="description">Login or create an account with your
        phone number to start ordering
      </p>
      <form className="formLogin" onSubmit={handleSubmit(onSubmitForm)}>
        <input
          type="text"
          placeholder="email"
          {...register("email", { required: "Ingresa un email" })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="password"
          placeholder="password"
          {...register("password", { required: "Ingresa una contraseña" })}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <NavLink className="button-register"
          to="/register"
        >Register new user</NavLink>
        <button className="login-button" type="submit">Login</button>
      </form>
      {error.status ? <span>usuario o contraseña invalida</span> : <></>}
    </section>
  );
};

export default Login;
