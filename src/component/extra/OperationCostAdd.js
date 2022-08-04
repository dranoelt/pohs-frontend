import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import service from '../services/services';
import authService from '../services/auth-service';
import { useSnackbar } from 'notistack';

const OperationCostAdd = () => {
  const [category, setCategory] = useState('');
  const [createAt, setCreatedAt] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const user = authService.getCurrentUser('user');

  const createOperation = async (e) => {
    e.preventDefault();
    await service.createData(`operating`, {
      OperatingId: '',
      UserId: user.UserId,
      Category: category,
      CreatedAt: createAt,
      Amount: amount,
      Description: desc
      }).then(() => {
        navigate('/operation');
        enqueueSnackbar('Operation cost added', {variant: 'success'});
      });
  }

  return (
    <div className="container ">
        <div className="crud shadow-lg p-5 mb-5 mt-5 bg-body rounded">
        <div className="row ">
        <div className="col-sm-3 mt-4 mb-4 text-gred"> 
            <div className="mr-sm-2 text-gred" style={{color:"black"}}><h2><b>ADD OPERATION COST</b></h2></div>
        </div> 
      </div>
      
      <Form onSubmit={ createOperation } className="mb-3">
      <Form.Group controlId="Operation Category" className="mb-3">
        <Form.Label>Operation Category</Form.Label>
        <Form.Control type="text" placeholder="Enter Category" value={category} onChange={ (e) => setCategory(e.target.value)} required/>
      </Form.Group>
      <Form.Group controlId="Operation CreatedAt" className="mb-3">
        <Form.Label>Operation CreatedAt</Form.Label>
        <Form.Control type="date" placeholder="Select Date" value={createAt} onChange={ (e) => setCreatedAt(e.target.value)} required/>
      </Form.Group>
      <Form.Group controlId="Operation Amount" className="mb-3">
        <Form.Label>Operation Amount</Form.Label>
        <Form.Control type="money" placeholder="Enter Amount" value={amount} onChange={ (e) => setAmount(e.target.value)} required/>
      </Form.Group>
      <Form.Group controlId="Operation Description" className="mb-5">
        <Form.Label>Operation Description</Form.Label>
        <Form.Control type="textarea" as="textarea" rows={3} placeholder="Enter Description" value={desc} onChange={ (e) => setDesc(e.target.value)} required/>
      </Form.Group>

        <div className='foo-btn'>
          <Button as={Link} to='../' size='sm' className='btn-fill'>CANCEL</Button>
          <Button type='submit' size='sm' className='btn-fill ms-4'>SAVE</Button>
        </div>
      </Form> 
        </div>  
    </div> 
  )
}

export default OperationCostAdd;