import React from "react";
import HeaderBack from '../../commons/header-back/HeaderBack';
import { useForm } from "react-hook-form";
import showInfo from '../../../images/showInfo.png'
import { useSelector, useDispatch } from "react-redux";
import {updateDataUserActionAsync} from '../../../redux/actions/loginActions'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const NewCard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.login);

    const {register,handleSubmit,watch, formState: { errors }} = useForm({
        defaultValues: {
        TC: "",
        ED: "",
        },
    });

    //Function to validate complete name
    const validateName = (value) => {
        if (value.split(' ').length <= 1) {
            return 'El nombre completo es requerido'
        }
        return true
    }

    //Function to validate TC number
    const validateTC = (value) => {
        if (value.length < 19) {
            return 'Número de TC no puede ser menor a 16 dígitos'
        }
        return true
    }

    //Function to validate expiration date
    const validateED = (value) => {
        if (value.length < 5) {
            return 'Fecha invalida'
        }
        return true
    }

    const validateCvv = (value) => {
        if (value.length < 3) {
            return 'Se requieren 3 dígitos.'
        }
        return true
    }

    //Format the credit card number
    const formattedTC = watch("TC").replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
    //Format de expiration date
    const formattedED = watch("ED").replace(/\D/g, "")
    .replace(/^(\d{2})\/?(\d{0,2})/, (_, a, b) => a + (b ? `/${b}` : "")).trim();

    const onSubmitPaymentForm = async (formData) => {
        let newUser= {...user};
        const newCard={
            ...formData,
                selected:false
        }
        newUser.cards=[
            ...newUser.cards,
            {
                ...newCard
            }
        ]
        dispatch(updateDataUserActionAsync(newUser)).then(data=>{
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'tarjeta agregada exitosamente!',
                confirmButtonText: 'ok',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(-1)
                }
            })
        })

    };
    return (
        <section className="new-card-page">
            <HeaderBack text="Add new card" />
            <form className="paymentForm_form" onSubmit={handleSubmit(onSubmitPaymentForm)}>
                <input
                    type="text"
                    placeholder="Card name"
                    {...register("name", { 
                        required: {
                            value: true,
                            message: 'El nombre es requerido.'
                        }, validate: validateName })}
                />
                { errors.name ? <span className="paymentForm_errors">{errors.name.message}</span> : <></>}
                <div className="inputCard">
                    <input
                        type="text"
                        maxLength="19"
                        placeholder="Card number"
                        {...register("TC", { required: {
                                value: true,
                                message: 'El número de TC es obligatorio.'
                            }, validate: validateTC })}
                        value={formattedTC}
                    />
                    <button type="button" onClick={()=>{}}>
                        <img src={showInfo} alt="icon"/>
                    </button>
                </div>
                { errors.TC ? <span className="paymentForm_errors">{errors.TC.message}</span> : <></>}
                <div className="two-fields">
                    <div>
                        <input
                            type="text"
                            maxLength="5"
                            placeholder="Expires"
                            {...register("ED", { required: {
                                value: true,
                                message: 'La fecha de vencimiento es obligatoria.'
                            }, validate: validateED })}
                            value={formattedED}
                        />
                        { errors.ED ? <span className="paymentForm_errors">{errors.ED.message}</span> : <></>}
                    </div>
                    <div>
                        <input
                        type="tel"
                        placeholder="Cvv"
                        maxLength={3}
                        {...register("Cvv", { required: {
                            value: true,
                            message: 'El Cvv es obligatorio.'
                        }, validate: validateCvv })}
                        />
                        { errors.Cvv ? <span className="paymentForm_errors">{errors.Cvv.message}</span> : <></>}
                    </div>
                </div>
                <button className="save" type="submit">Save</button>
            </form>
        </section>
    );
};

export default NewCard;