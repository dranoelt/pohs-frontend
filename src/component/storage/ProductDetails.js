import React from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import service from '../services/services';
import { useSnackbar } from 'notistack';


const ProductDetails = () => {
    const [productid, setProductId] = useState('');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [movingprice, setMovingPrice] = useState('');
    const [salesprice, setSalesPrice] = useState('');
    const [datecreated, setDateCreated] = useState('');
    const [lastorder, setLastOrder] = useState('');
    const [lastpurch, setLastPurch] = useState('');
    const [nameTemp, setNameTemp] = useState('');
    const [companyTemp, setCompanyTemp] = useState('');
    const [status, setStatus] = useState(true);
    const [editState, setEditState] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();

    useEffect( () => {
        service.getDataById(`product`,id).then( response => {
          let _ = response.data;
            setProductId(_.ProductId);
            setName(_.Name);
            setCompany(_.Company);
            setMovingPrice(_.MovingPrice);
            setSalesPrice(_.SalesPrice);
            setDateCreated(_.datecreated);
            setLastOrder(_.lastorder);
            setLastPurch(_.lastpurch);
            setStatus(_.Status ? true : false);
            setNameTemp(_.Name);
            setCompanyTemp(_.Company);     
        })
    },[id]);

  function edit() {
    let productName = document.querySelector('#product_name');
    let productCompany = document.querySelector('#product_company');
    if (!editState) {
      productName.removeAttribute('readonly');
      productCompany.removeAttribute('readonly');
    } else if (editState) {
      productName.setAttribute('readonly', true);
      productCompany.setAttribute('readonly', true);
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
      let data = { 'Name': nameTemp, 'Company': companyTemp};
      service.updateData(`product`, id, data).then(() => 
        enqueueSnackbar('Product updated', {variant: 'info'}));
    } else enqueueSnackbar('Please input name', {variant: 'error'});
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setEditState(prev => !prev);
    edit();
    setNameTemp(name);
    setCompanyTemp(company);
  }

  const handleStatus = () => {
    setStatus(!status);
    service.updateData(`product`, id, { 'Status': !status ? 1 : 0}).then(() =>
      enqueueSnackbar(!status ? 'Available' : 'Un-available', {variant: 'info'})
    )
  }


  return (
    <div>
      <div className="container shadow-lg p-5 mb-5 mt-5 bg-body rounded">
        <div className="row ">
          <div className="col-sm-3 mb-4 text-gred"> 
            <div className="mr-sm-2 text-gred" style={{color:"black"}}><h4><b>PRODUCT INFO</b></h4></div>
          </div> 
        </div>
        <Box component="form" sx={{ '& > :not(style)': { m: 2, width: '35ch' }, }} noValidate autoComplete="off">
            <TextField id="product_id" label="Product ID" value={productid} InputProps={{readOnly: true}}/>
            <TextField id="product_name" label="Name" InputProps={{readOnly: true}} value={nameTemp} onChange={ (e) => setNameTemp(e.target.value)}/>
            <TextField id="product_company" label="Company" InputProps={{readOnly: true}} value={companyTemp} onChange={(e) => setCompanyTemp(e.target.value)}/>
            <TextField id="product_cost" label="Cost" value={movingprice} InputProps={{readOnly: true}}/>
            <TextField id="product_saleprice" label="Sale Price" value={salesprice} InputProps={{readOnly: true}}/>
            <TextField id="product_datecreated" label="Date Created" value={datecreated} InputProps={{readOnly: true}}/>
            <TextField id="product_lastorder" label="Last Order" value={lastorder} InputProps={{readOnly: true}}/>
            <TextField id="product_lasttrans" label="Last Transaction" value={lastpurch} InputProps={{readOnly: true}}/>
        </Box>
        <FormControlLabel control={<Switch checked={status} onChange={handleStatus}/>} label='Available' labelPlacement='start'/>
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

export default ProductDetails;