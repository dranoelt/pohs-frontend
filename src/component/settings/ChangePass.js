import { TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth-service';
import service from '../services/services';

const ChangePass = () => {
  const { enqueueSnackbar } = useSnackbar();
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const handleSave = (e) => {
      e.preventDefault();
      if (e.target.pass.value !== e.target.pass1.value) {
        enqueueSnackbar('Password does not match', {variant: 'error'});
      } else {
        service.updateData(`user`, user.UserId, {
          code: 1, UserPassword: e.target.pass.value
        }).then(() => {
            navigate('/settings', {replace: true});
            enqueueSnackbar('Password has been updated', {variant: 'info'});
        }, (error) => console.log(error))
      }
  }


  return (
    <div className='m-5'>
        <div>
            <span><b>Edit Profile</b></span>
            <form onSubmit={handleSave} className='container-set mt-2' autoComplete='off'>
                <TextField size='small' margin='normal' type='password' name='pass' id="pass" label="Password" required/>
                <TextField size='small' margin='normal' type='password' name='pass1' id="repass" label="Password Confirm" required/>
                <div className='mt-3'>
                    <Button as={Link} to='..' replace className='btn-fill ms-4'>CANCEL</Button>
                    <Button type='submit' className='btn-fill ms-4'>SAVE</Button>
                </div>
            </form>
           
        </div>
    </div>
  )
}

export default ChangePass;