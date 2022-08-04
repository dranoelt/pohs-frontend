import React, { useState, useEffect } from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import service from '../services/services';
import { useSnackbar } from 'notistack';

const CustomerDetails = () => {
  const [customerid, setCustomerId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [datecreated, setDateCreated] = useState('');
  const [lasttransaction, setLastTransaction] = useState('');
  const [status, setStatus] = useState(true);
  const [nameTemp, setNameTemp] = useState('');
  const [numberTemp, setNumberTemp] = useState('');
  const [addressTemp, setAddressTemp] = useState('');
  const [editState, setEditState] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    service.getDataById(`customer`, id)
      .then((response) => {
        let _ = response.data
        setCustomerId(_.CustomerId);
        setName(_.Name);
        setNumber(_.Number);
        setAddress(_.Address);
        setDateCreated(_.DateCreated);
        setLastTransaction(_.lasttransaction);
        setStatus(_.Status ? true : false);
        setNameTemp(_.Name);
        setNumberTemp(_.Number);
        setAddressTemp(_.Address);
      })
  },[id]);

  function edit() {
    let customerName = document.querySelector('#customer_name');
    let customerNumber = document.querySelector('#customer_number');
    let customerAddress = document.querySelector('#customer_address')
    if (!editState) {
      customerName.removeAttribute('readonly');
      customerNumber.removeAttribute('readonly');
      customerAddress.removeAttribute('readonly');
    } else if (editState) {
      customerName.setAttribute('readonly', true);
      customerNumber.setAttribute('readonly', true);
      customerAddress.setAttribute('readonly', true);
    }
  }

  const handleEdit = (e) => {
    e.preventDefault();
    setEditState(prev => !prev);
    edit();
  }

  const handleSave = (e) =>{
    e.preventDefault();
    if (nameTemp !== '') {
      setEditState(prev => !prev);
      edit();
      let data = { 'Name': nameTemp, 'Number': numberTemp, 'Address': addressTemp};
      service.updateData(`customer`, id, data).then(() => 
        enqueueSnackbar('Customer updated', {variant: 'info'})
      );
    } else enqueueSnackbar('Please input name', {variant: 'error'});
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setEditState(prev => !prev);
    edit();
    setNameTemp(name);
    setNumberTemp(number);
    setAddressTemp(address);
  }

  const handleStatus = () => {
    setStatus(!status);
    service.updateData(`customer`, id, { 'Status': !status ? 1 : 0}).then(() => 
      enqueueSnackbar(!status ? 'Blacklisted' : 'Un-blacklist', {variant: 'info'})
    )
  }

  return (
    <div>
      <div className="container crud shadow-lg p-5 mb-5 mt-5 bg-body rounded">
        <div className="row ">
          <div className="col-sm-3 mb-4 text-gred"> 
            <div className="mr-sm-2 text-gred" style={{color:"black"}}><h4><b>CUSTOMER INFO</b></h4></div>
          </div> 
        </div>
        <Box component="form" sx={{ '& > :not(style)': { m: 2, width: '35ch' }, }} autoComplete="off">
            <TextField InputProps={{readOnly: true}} id="customer_id" label="Product ID" value={customerid}/>
            <TextField InputProps={{readOnly: true}} id="customer_name" label="Name" type='text' value={nameTemp} onChange={ e => setNameTemp(e.target.value)}/>
            <TextField InputProps={{readOnly: true}} id="customer_number" label="Number" type='tel' value={numberTemp} onChange={e => setNumberTemp(e.target.value)}/>
            <TextField InputProps={{readOnly: true}} id="customer_address" label="Address" type='text' value={addressTemp} onChange={e => setAddressTemp(e.target.value)}/>
            <TextField InputProps={{readOnly: true}} id="customer_datecreated" label="Date Created" value={datecreated}/>
            <TextField InputProps={{readOnly: true}} id="customer_lastrans" label="Last Transaction" value={lasttransaction}/>
        </Box>
        <FormControlLabel control={<Switch checked={status} onChange={handleStatus}/>} label='Blacklist' labelPlacement='start'/>
        { editState ? (
          <div className='foo-btn'>
            <Button onClick={e => handleCancel(e)} size='sm' className='btn-fill ms-4'>CANCEL</Button>
            <Button type='submit' onClick={e => handleSave(e)} size='sm' className='btn-fill ms-4'>SAVE</Button>
          </div>
           ) : (
          <div className='foo-btn'>
            <Button href='.' size='sm' className='btn-fill ms-4'>BACK</Button>
            <Button onClick={e => handleEdit(e)} size='sm' className='btn-fill ms-4'>EDIT</Button>
          </div>
          )}   
      </div>
    </div> 
  )
}

export default CustomerDetails;