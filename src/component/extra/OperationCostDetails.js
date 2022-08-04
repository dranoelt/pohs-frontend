import { Box, TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import service from '../services/services';
import { useSnackbar } from 'notistack';

const OperationCostDetails = () => {
  const [opeartionId, setOperationId] = useState('');
  const [category, setCategory] = useState('');
  const [createAt, setCreatedAt] = useState('');
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [categoryTemp, setCategoryTemp] = useState('');
  const [amountTemp, setAmountTemp] = useState('');
  const [descTemp, setDescTemp] = useState('');
  const [editState, setEditState] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    service.getDataById(`operating`, id)
      .then( response => {
        let _ = response.data
        setOperationId(_.OperatingId);
        setCategory(_.Category);
        setCreatedAt(_.CreatedAt);
        setAmount(_.Amount);
        setDesc(_.Description);
        setCategoryTemp(_.Category);
        setAmountTemp(_.Amount);
        setDescTemp(_.Description);
      })
  }, [id]);

  function edit() {
    let oCategory = document.querySelector('#operation_category');
    let oAmount = document.querySelector('#operation_amount');
    let oDesc = document.querySelector('#operation_desc');
    if (!editState) {
      oCategory.removeAttribute('readonly');
      oAmount.removeAttribute('readonly');
      oDesc.removeAttribute('readonly');
    } else if (editState) {
      oCategory.setAttribute('readonly', true);
      oAmount.setAttribute('readonly', true);
      oDesc.setAttribute('readonly', true);
    }
  }

  const handleEdit = (e) => {
    e.preventDefault();
    setEditState(prev => !prev);
    edit();
  }

  const handleSave = (e) =>{
    e.preventDefault();
    setEditState(prev => !prev);
    edit();
    let data = { 'Category': categoryTemp, 'Amount': amountTemp, 'Description': descTemp};
    service.updateData(`operating`, id, data).then(() => enqueueSnackbar('Operation cost updated', {variant: 'info'}));
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setEditState(prev => !prev);
    edit();
    setCategoryTemp(category);
    setAmountTemp(amount);
    setDescTemp(desc);
  }

  return (
    <div>
      <div className="container crud shadow-lg p-5 mb-5 mt-5 bg-body rounded">
        <div className="row ">
          <div className="col-sm-3 mb-4 text-gred"> 
            <div className="mr-sm-2 text-gred" style={{color:"black"}}><h4><b>OPERATION COST INFO</b></h4></div>
          </div> 
        </div>
        <Box component="form" sx={{ '& > :not(style)': { m: 2, width: '35ch' }, }} noValidate autoComplete="off">
            <TextField InputProps={{readOnly: true}} id="operation_id" label="Operation Cost ID" value={opeartionId}/>
            <TextField InputProps={{readOnly: true}} id="operation_category" label="Category" value={categoryTemp} onChange={ e => setCategoryTemp(e.target.value)}/>
            <TextField InputProps={{readOnly: true}} id="operation_createdAt" label="CreatedAt" value={createAt}/>
            <TextField InputProps={{readOnly: true}} id="operation_amount" label="Amount" value={amountTemp} onChange={e => setAmountTemp(e.target.value)}/>
            <TextField InputProps={{readOnly: true}} id="operation_desc" label="Description" value={descTemp} onChange={e => setDescTemp(e.target.value)}/>
        </Box>
        { editState ? (
          <div className='foo-btn'>
            <Button href='' onClick={e => handleCancel(e)} size='sm' className='btn-fill ms-4'>CANCEL</Button>
            <Button href='' onClick={e => handleSave(e)} size='sm' className='btn-fill ms-4'>SAVE</Button>
          </div>
           ) : (
          <div className='foo-btn'>
            <Button href='.' size='sm' className='btn-fill ms-4'>BACK</Button>
            <Button href='' onClick={e => handleEdit(e)} size='sm' className='btn-fill ms-4'>EDIT</Button>
          </div>
          )}    
      </div>
    </div> 
  )
}

export default OperationCostDetails;