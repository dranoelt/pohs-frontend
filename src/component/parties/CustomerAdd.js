import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import service from '../services/services';
import authService from '../services/auth-service';
import { useSnackbar } from 'notistack';

const CustomerAdd = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const createCustomer = async (e) => {
    e.preventDefault();
    if (name !== '') {
      await service.createData(`customer`, {
        UserId: user.UserId,
        Name: name,
        Number: number,
        Address: address
        }).then(() => {
          navigate('/customer');
          enqueueSnackbar('Customer added', {variant: 'success'});
        });
      
    } else {
      enqueueSnackbar('Please input customer name', {variant: 'error'});
    }
  }

  return (
    <div>
        <div className="container crud shadow-lg p-5 mb-5 mt-5 bg-body rounded">
        <div className="row ">
        <div className="col-sm-3 mt-4 mb-4 text-gred"> 
            <div className="mr-sm-2 text-gred" style={{color:"black"}}><h2><b>ADD CUSTOMER</b></h2></div>
        </div> 
      </div>
      
      <Form onSubmit={ createCustomer } className="mb-3">
      <Form.Group controlId="CustomerName" className="mb-3">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control type="name" placeholder="Enter Name" value={name} onChange={ (e) => setName(e.target.value)} required/>
      </Form.Group>
      <Form.Group controlId="CustomerNumber" className="mb-3">
        <Form.Label>Customer Number</Form.Label>
        <Form.Control type="" placeholder="Enter Number" value={number} onChange={ (e) => setNumber(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-5" controlId="CustomerAddress">
        <Form.Label>Customer Address</Form.Label>
        <Form.Control type="address" placeholder="Enter Address" value={address} onChange={ (e) => setAddress(e.target.value)} />
      </Form.Group>

        <div className='foo-btn'>
          <Button as={Link} to='/customer' size='sm' className='btn-fill'>CANCEL</Button>
          <Button type='submit' size='sm' className='btn-fill ms-4'>SAVE</Button>
        </div>
      </Form> 
        </div>  
    </div> 
  )
}

export default CustomerAdd;