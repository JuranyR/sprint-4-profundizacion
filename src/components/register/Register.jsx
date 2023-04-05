import React, { useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { userCreateAsync } from '../../redux/actions/loginActions'
import { fileUpload } from '../../services/uploadFile'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  const { error, loading, isLogged, user } = useSelector((state) => state.login)

  const { register, setValue , handleSubmit, formState: { errors } } = useForm();

  const validateEmail= (value) =>{
    const re = /\S+@\S+\.\S+/;
    if (!re.test(value)) {
      return 'Email invalid'
    }
    return true
  }
  const onSubmit = async  (data) => {
    const photo = await fileUpload(data.photo[0]);
    dispatch(userCreateAsync({...data,update:location.state?true:false, photo}))
  }

  useEffect(()=>{
    if(location.state && location.state.email){
      setValue("email", location.state.email)
    }
  },[location])

  useEffect(()=>{
    if(error.status){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      })
    }
    if (isLogged && loading=== false && error.status === false){
      if (user.name &&  user.photo) {
        navigate("/");
      }
    }
    
  },[error, loading, isLogged])

  return (
    <section className="register-page">
      <h1>Create account</h1>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <label className='input-form' >
          <span>
            Name
          </span>
          <input className={`text-field ${errors.name ? 'border-red' : ''}`} type="text"  {...register('name', { required: 'Nombre requerido' })} />
        </label>
        {errors.name ? <span className='text-red'>{errors.name.message}</span> : <></>}
        
        <label className='input-form' >
          <span>
            cellphone
          </span>
          <input className={`text-field ${errors.cellphone ? 'border-red' : ''}`} type="text"  {...register('cellphone', { required: 'Celular requerido' })} />
        </label>
        {errors.cellphone ? <span className='text-red'>{errors.cellphone.message}</span> : <></>}
        
        <label className='input-form' >
          <span>
            Email
          </span>
          <input disabled={location?.state?.email?true:false} className={`text-field ${errors.email ? 'border-red' : ''}`} type="text" {...register('email', { required: 'Email es requerido', validate:validateEmail })} />
        </label>
        {errors.email ? <span className='text-red'>{errors.email.message}</span> : <></>}
        {!location.state &&
          <>
            <label className='input-form'>
              <span>
                Password
              </span>
              <input className={`text-field ${errors.password ? 'border-red' : ''}`} type="password" {...register('password', { required: 'Contraseña requerida' })} />
            </label>
            {errors.password ? <span className='text-red'>{errors.password.message}</span> : <></>}
          </>
        }
        <label className='input-form'>
          <span>
            Birthday
          </span>
          <input className={`text-field ${errors.birthday ? 'border-red' : ''}`} type="date" {...register('birthday', { required: 'fecha requerida' })} />
        </label>
        {errors.birthday ? <span className='text-red'>{errors.birthday.message}</span> : <></>}
        
        <label className='input-form'>
          <span>
            Photo
          </span>
          <input className={`text-field ${errors.photo ? 'border-red' : ''}`} type="file" {...register('photo', { required: 'foto requerida' })} />
        </label>
        {errors.photo ? <span className='text-red'>{errors.photo.message}</span> : <></>}
        
        <button className='save-data-user' disabled={loading} type='submit'>Sing In</button>
      </form>
      {error.status ? <span className='text-red'>{error.message}</span> : <></>}
    </section>
  )
}

export default Register
