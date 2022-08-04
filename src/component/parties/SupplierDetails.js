import React, { useState, useEffect } from 'react';
import { Box, TextField, FormControlLabel, Switch } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import service from '../services/services';
import { useSnackbar } from 'notistack';

const SupplierDetails = () => {
  const [supplierid, setSupplierId] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [datecreated, setDateCreated] = useState('');
  const [lastorder, setLastOrder] = useState('');
  const [status, setStatus] = useState(true);
  const [nameTemp, setNameTemp] = useState('');
  const [companyTemp, setCompanyTemp] = useState('');
  const [numberTemp, setNumberTemp] = useState('');
  const [addressTemp, setAddressTemp] = useState('');
  const [editState, setEditState] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
   service.getDataById(`supplier`, id)
      .then((response) => {
        let _ = response.data
        setSupplierId(_.SupplierId);
        setName(_.Name);
        setCompany(_.Company);
        setNumber(_.Number);
        setAddress(_.Address);
        setDateCreated(_.DateCreated);
        setLastOrder(_.LastOrder);
        setStatus(_.Status ? true : false);
        setNameTemp(_.Name);
        setCompanyTemp(_.Company);
        setNumberTemp(_.Number);
        setAddressTemp(_.Address);
      })
  },[id]);

  function edit() {
    let supplierName = document.querySelector('#supplier_name');
    let supplierNumber = document.querySelector('#supplier_number');
    let supplierAddress = document.querySelector('#supplier_address');
    let supplierCompany = document.querySelector('#supplier_company');
    if (!editState) {
      supplierName.removeAttribute('readonly');
      supplierCompany.removeAttribute('readonly');
      supplierNumber.removeAttribute('readonly');
      supplierAddress.removeAttribute('readonly');
    } else if (editState) {
      supplierName.setAttribute('readonly', true);
      supplierCompany.setAttribute('readonly', true);
      supplierNumber.setAttribute('readonly', true);
      supplierAddress.setAttribute('readonly', true);
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
      let data = { 'Name': nameTemp, 'Company': companyTemp, 'Number': numberTemp, 'Address': addressTemp};
      service.updateData(`supplier`, id, data).then(() =>
        enqueueSnackbar('Supplier updated', {variant: 'info'}))
    } else enqueueSnackbar('Please input name', {variant: 'error'});
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setEditState(prev => !prev);
    edit();
    setNameTemp(name);
    setCompanyTemp(company);
    setNumberTemp(number);
    setAddressTemp(address);
  }

  const handleStatus = () => {
    setStatus(!status);
    service.updateData(`supplier`, id, { 'Status': !status ? 1 : 0}).then(() => 
      enqueueSnackbar(!status ? 'Blacklisted' : 'Un-blacklist', {variant: 'info'})
    )
  }

  return (
    <div>
      <div className="container crud shadow-lg p-5 mb-5 mt-5 bg-body rounded">
        <div className="row ">
          <div className="col-sm-3 mb-4 text-gred"> 
            <div className="mr-sm-2 text-gred" style={{color:"black"}}><h4><b>SUPPLIER INFO</b></h4></div>
          </div> 
        </div>
        <Box component="form" sx={{ '& > :not(style)': { m: 2, width: '35ch' }, }} noValidate autoComplete="off">
            <TextField InputProps={{readOnly: true}} id="supplier_id" label="Product ID" value={supplierid}/>
            <TextField InputProps={{readOnly: true}} id="supplier_name" label="Name" value={nameTemp} onChange={ e => setNameTemp(e.target.value)} required/>
            <TextField InputProps={{readOnly: true}} id="supplier_company" label="Company" value={companyTemp} onChange={e => setCompanyTemp(e.target.value)}/>
            <TextField InputProps={{readOnly: true}} id="supplier_number" label="Number" value={numberTemp} onChange={e => setNumberTemp(e.target.value)}/>
            <TextField InputProps={{readOnly: true}} id="supplier_address" label="Address" value={addressTemp} onChange={e => setAddressTemp(e.target.value)}/>
            <TextField InputProps={{readOnly: true}} id="supplier_datecreated" label="Date Created" value={datecreated}/>
            <TextField InputProps={{readOnly: true}} id="supplier_lasttrans" label="Last Transaction" value={lastorder}/>
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

export default SupplierDetails;