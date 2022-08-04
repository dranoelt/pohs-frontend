import { TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth-service';
import service from '../services/services';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const user = authService.getCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        setName(user.UserName);
        setEmail(user.UserEmail);
    }, [user.UserName, user.UserEmail]);

    const handleSave = (e) => {
        e.preventDefault();
        service.updateData(`user`, user.UserId, {
            code: 0, UserName: name, UserEmail: email
        }).then(() => {
            authService.changeProfile(name, email);
            navigate('/settings', {replace: true});
            enqueueSnackbar('User Updated', {variant: 'info'});
        }, (error) => console.log(error))
    }


  return (
    <div className='m-5'>
        <div>
            <span><b>Edit Profile</b></span>
            <form onSubmit={handleSave} className='container-set mt-2' autoComplete='off'>
                <TextField size='small' margin='normal' id="name" label="Username" value={name} onChange={(e) => setName(e.target.value)} required/>
                <TextField size='small' margin='normal' id="email" label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <div className='mt-3'>
                    <Button as={Link} to='..' replace className='btn-fill ms-4'>CANCEL</Button>
                    <Button type='submit' className='btn-fill ms-4'>SAVE</Button>
                </div>
            </form>
           
        </div>
    </div>
  )
};

export default EditProfile;