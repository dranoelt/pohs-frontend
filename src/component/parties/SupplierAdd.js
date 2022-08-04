import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth-service';
import service from '../services/services';

const SupplierAdd = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [company, setCompany] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const createCustomer = async (e) => {
    e.preventDefault();
    if (name !== '') {
      await service.createData(`supplier`, {
        UserId: user.UserId,
        Name: name,
        Company: company,
        Number: number,
        Address: address
      });
      navigate('/supplier');
      enqueueSnackbar('Supplier added', {variant: 'success'});
    } else {
      enqueueSnackbar('Please input supplier name', {variant: 'error'});
    }
  }

  return (
    <div>
        <div className="container crud shadow-lg p-5 mb-5 mt-5 bg-body rounded">
        <div className="row ">
        <div className="col-sm-3 mt-4 mb-4 text-gred"> 
            <div className="mr-sm-2 text-gred" style={{color:"black"}}><h2><b>ADD SUPPLIER</b></h2></div>
        </div> 
      </div>
      
      <Form onSubmit={ createCustomer } className="mb-3">
      <Form.Group controlId="Supplier Name" className="mb-3">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control type="name" placeholder="Enter Name" value={name} onChange={ (e) => setName(e.target.value)} required/>
      </Form.Group>
      <Form.Group controlId="Supplier Company" className="mb-3">
        <Form.Label>Customer Address</Form.Label>
        <Form.Control type="company" placeholder="Enter Company" value={company} onChange={ (e) => setCompany(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="Supplier Number" className="mb-3">
        <Form.Label>Customer Number</Form.Label>
        <Form.Control type="phone" placeholder="Enter Number" value={number} onChange={ (e) => setNumber(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="Supplier Address" className="mb-5">
        <Form.Label>Customer Address</Form.Label>
        <Form.Control type="address" placeholder="Enter Address" value={address} onChange={ (e) => setAddress(e.target.value)} />
      </Form.Group>

        <div className='foo-btn'>
          <Button as={Link} to='/supplier' size='sm' className='btn-fill'>CANCEL</Button>
          <Button type='submit' size='sm' className='btn-fill ms-4'>SAVE</Button>
        </div>
      </Form> 
        </div>  
    </div> 
  )
}

export default SupplierAdd;