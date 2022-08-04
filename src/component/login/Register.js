import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth-service';
import { useSnackbar } from 'notistack';

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let confirm = e.target.confirmpassword.value;
    if (password !== confirm) {
      enqueueSnackbar('Password does not match', {variant: 'error'});
    } else {
      authService.register(username, email, password).then(() => {
        navigate('/login', {replace: true});
        enqueueSnackbar('Register success', {variant: 'success'});
      }, (error) => {
        let respMessage = error.response;
        enqueueSnackbar(respMessage.data, {variant: 'error'});
      })
    }
  }

  const login = (e) => {
    e.preventDefault();
    navigate('/login', {replace: true});
  }

  return (
    <div className="box">
        <div className='text-center'>
            <div>
                <h1 style={{color: '#FFFFFF', letterSpacing: '25px', marginRight: '-25px'}}>WELCOME</h1>
                <span style={{color: '#009688', fontSize: '1.5rem', fontWeight: '600'}}>PRO ONE </span>
                <span style={{color: '#FFFFFF', fontSize: '1.5rem', fontWeight: '600'}}>HOME SHOP</span>
            </div>
            <form onSubmit={register}>
                <div className='formBox mt-3 mb-3'>
                    <input className='mt-1 mb-1 px-3 py-1 input-outline' type="text" placeholder='username' name='username' required/>
                    <input className='mt-1 mb-1 px-3 py-1 input-outline' type="email" placeholder='email address' name='email' required/>
                    <input className='mt-1 mb-1 px-3 py-1 input-outline' type="password" name="password" id="password" placeholder='password' required/>
                    <input className='mt-1 mb-1 px-3 py-1 input-outline' type="password" name="confirmpassword" id="password1" placeholder='password confirm' required/>
                    <div className='mt-3 mb-3'/>
                    <button type='submit' className='mt-1 mb-1 px-3 py-1 btn-fill-outline' style={{color: '#FFFFFF', fontWeight: '600'}}>REGISTER</button>
                    <button type='cancel' onClick={login} variant='outline' className='mt-1 mb-1 px-3 py-1  btn-outline-2' style={{color: '#009688', fontWeight: '600'}}>LOGIN</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register;