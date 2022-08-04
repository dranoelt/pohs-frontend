import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import service from '../services/services';
import authService from '../services/auth-service';
import { useSnackbar } from 'notistack';

const ProductAdd = () => {
    const [Name, setName] = useState('');
    const [Company, setCompany] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const user = authService.getCurrentUser();
    let navigate = useNavigate();

    const createProduct = async (e) => {
      e.preventDefault();
      await service.createData(`product`,{
        UserId: user.UserId,
        Name: Name,
        Company: Company
      }).then(() => {
        navigate('/Product');
        enqueueSnackbar('Product Added', {variant: 'success'});
      });
    }

  return (
    <div>
      <div className="container crud shadow-lg p-5 mb-5 mt-5 bg-body rounded">
        <div className="row">
          <div className="col-sm-3 mt-4 mb-4 text-gred"> 
            <div className="mr-sm-2 text-gred" style={{color:"black"}}><h2><b>ADD PRODUCT</b></h2></div>
          </div> 
        </div>  
        <Form onSubmit={ createProduct} autoComplete='off'>
          <Form.Group className="mb-3" controlId="Product Name">
            <Form.Label>product Name</Form.Label>
            <Form.Control type="name" placeholder="Name" value={Name} onChange={ (e) => setName(e.target.value)} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Product Company">
            <Form.Label>Product Comapany</Form.Label>
            <Form.Control type="company" placeholder="Company" value={Company} onChange={ (e) => setCompany(e.target.value)} />
          </Form.Group>
          <div className='foo-btn'>
            <Button href='.' size='sm' className='btn-fill ms-4'>CANCEL</Button>
            <Button type='submit' size='sm' className='btn-fill ms-4'>SAVE</Button>
          </div>
        </Form>
      </div>  
    </div>     
  )
}

export default ProductAdd;