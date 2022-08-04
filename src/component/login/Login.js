import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth-service';
import { useSnackbar } from 'notistack';

const Login = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;
        authService.login(email, password).then(() => {
            navigate('/', {replace: true});
            enqueueSnackbar('Login success', {variant: 'success'});
        }, (error) => {
            let resMessage = error.response;
            enqueueSnackbar(resMessage.data.message, {variant: 'error'});
        })
    }

    const register = (e) => {
        e.preventDefault();
        navigate('/register', {replace: true});        
    }
  return (
    <div className="box">
        <div className='text-center'>
            <div>
                <h1 style={{color: '#FFFFFF', letterSpacing: '25px', marginRight: '-25px'}}>WELCOME</h1>
                <span style={{color: '#009688', fontSize: '1.5rem', fontWeight: '600'}}>PRO ONE </span>
                <span style={{color: '#FFFFFF', fontSize: '1.5rem', fontWeight: '600'}}>HOME SHOP</span>
            </div>
            <form onSubmit={login}>
                <div className='formBox mt-3 mb-3'>
                    <input className='mt-1 mb-1 px-3 py-1 input-outline' type="email" placeholder='email address' name='email' required/>
                    <input className='mt-1 mb-1 px-3 py-1 input-outline' type="password" name="password" id="password" placeholder='password' required/>
                    <Link to='/forgetpassword' className='text-start' style={{color: 'white'}}>forget password?</Link>
                    <div className='mt-3 mb-3'/>
                    <button type='submit' className='mt-1 mb-1 px-3 py-1 btn-fill-outline' style={{color: '#FFFFFF', fontWeight: '600'}}>LOGIN</button>
                    <button type='register' onClick={register} variant='outline' className='mt-1 mb-1 px-3 py-1  btn-outline-2' style={{color: '#009688', fontWeight: '600'}}>REGISTER</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login;