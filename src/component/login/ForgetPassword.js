import { Slide } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth-service';

const ForgetPassword = () => {
    const [slideIn, setSlideIn] = useState(true);
    const [emailTemp, setEmailTemp] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const handleConfirm = (e) => {
        e.preventDefault();
        authService.check(e.target.email.value).then(() => {
            setSlideIn(prev => !prev);
            setEmailTemp(e.target.email.value);
        }, (error) => {
            enqueueSnackbar(error.response.data.message, {variant: 'error'});
        })
    }
    const handleBack = (e) => {
        e.preventDefault();
        navigate('/login', {replace: true});
    }

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.password.value === e.target.password1.value) {
            authService.forgetpass(emailTemp, e.target.password.value).then((response) => {
                enqueueSnackbar(response.data.message, {variant: 'success'});
                navigate('/login', {replace: true});
            }, (error) => {
                enqueueSnackbar(error.response.data, {variant: 'error'});
            })
        } else {
            enqueueSnackbar('Password does not match', {variant: 'error'});
        }
    }

    const handleBack1 = (e) => {
        e.preventDefault();
        setSlideIn(prev => !prev);
        setEmailTemp('');
    }
  return (
    <div className="box" ref={containerRef}>
        <Slide direction='right' in={slideIn} mountOnEnter unmountOnExit container={containerRef.current}>
            <div style={{backgroundColor: 'white', borderRadius: '15px', padding: '2rem', minWidth: '30%'}}>
                <div className='text-center'>
                    <div>
                        <span style={{color: '#009688', fontSize: '1.5rem', fontWeight: '600'}}>PRO ONE </span>
                        <span style={{color: '#009688', fontSize: '1.5rem', fontWeight: '600'}}>HOME SHOP</span>
                    </div>
                    <form onSubmit={handleConfirm} autoComplete='off'>
                        <div className='formBox mt-3 mb-3'>
                            <label className='text-start'>Please confirm your email address here</label>
                            <input autoComplete='off' className='mt-1 mb-1 px-3 py-1 input-outline' type="email" placeholder='email address' name='email' required/>
                            <div className='mt-3 mb-3'/>
                            <button type='submit' className='mt-1 mb-1 px-3 py-1 btn-fill-outline' style={{color: '#FFFFFF', fontWeight: '600'}}>CONFIRM</button>
                            <button onClick={handleBack} className='mt-1 mb-1 px-3 py-1  btn-outline-2' style={{color: '#009688', fontWeight: '600'}}>BACK</button>
                        </div>
                    </form>
                </div>
            </div>
        </Slide>
        <Slide direction='left' in={!slideIn} mountOnEnter unmountOnExit container={containerRef.current}>
            <div style={{backgroundColor: 'white', borderRadius: '15px', padding: '2rem', minWidth: '30%'}}>
                <div className='text-center'>
                    <div>
                        <span style={{color: '#009688', fontSize: '1.5rem', fontWeight: '600'}}>PRO ONE </span>
                        <span style={{color: '#009688', fontSize: '1.5rem', fontWeight: '600'}}>HOME SHOP</span>
                    </div>
                    <form onSubmit={handleChange}>
                        <div className='formBox mt-3 mb-3'>
                            <label className='text-start'>Please confirm your email address here</label>
                            <input className='mt-1 mb-1 px-3 py-1 input-outline' type="password" name="password" id="password" placeholder='password' required/>
                            <input className='mt-1 mb-1 px-3 py-1 input-outline' type="password" name="password1" id="password1" placeholder='password confirm' required/>
                            <div className='mt-3 mb-3'/>
                            <button type='submit' className='mt-1 mb-1 px-3 py-1 btn-fill-outline' style={{color: '#FFFFFF', fontWeight: '600'}}>CHANGE</button>
                            <button onClick={handleBack1} className='mt-1 mb-1 px-3 py-1  btn-outline-2' style={{color: '#009688', fontWeight: '600'}}>BACK</button>
                        </div>
                    </form>
                </div>
            </div>
        </Slide>
    </div>
  )
}

export default ForgetPassword;