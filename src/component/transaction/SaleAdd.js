import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Slide, TextField, OutlinedInput, FormControl, Radio, RadioGroup, FormControlLabel, TableFooter } from '@mui/material';
import React, { useEffect ,useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import NumberFormat from 'react-number-format';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../services/services';
import { ProductSalesDialog, CustomerDialog } from '../subview/dialog.js';
import authService from '../services/auth-service';
import { useSnackbar } from 'notistack';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="IDR "
    />
  );
});

const SaleAdd = () => {
  const [openProduct, setOpenProduct] = useState(false);
  const [openCustomer, setOpenCustomer] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [products, setProducts] = useState([]);
  const [debtDue, setDebtDue] = useState('');
  const [grandTotal, setGrandTotal] = useState('0');
  const [totalItem, setTotalItem] = useState(0);
  const [payment, setPayment] = useState('CASH');
  const [slideIn, setSlideIn] = useState(true);
  const [slideContent, setSlideContent] = useState(true);
  const [amount, setAmount] = useState('0');
  const [status, setStatus] = useState(1);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (id !== '0') {
      getData(id);
    }
  }, [id]);

  async function getData(id) {
    await service.getDataById(`sales`, id).then((response) => {
      let _ = response.data;
      setCustomer([{ 'CustomerId': _.CustomerId, 'Name': _.customer.Name}]);
      setProducts(_.salesdetails);
      setDebtDue(_.DebtDue);
      setGrandTotal(_.TotalPrice);
      setTotalItem(_.TotalItem);
      setPayment(_.PaymentMethod);
      setAmount(_.Amount);
      setStatus(_.Status);
    })
  }

  const createSale = async (e) => {
    e.preventDefault();
    if (payment === 'CASH') {
      let defdate = new Date().toLocaleString("id-ID", { month: "2-digit", day: "2-digit", year: "numeric"} );
      let defday = defdate.substr(0,2);
      let defmonth = defdate.substr(3,2);
      let defyear = defdate.substr(6,4);
      let newDate = `${defyear}-${defmonth}-${defday}`;
      if (amount < grandTotal) {
        enqueueSnackbar('Please input amount cash', {variant: 'error'});
      } else {
        if (id === '0') {
          create(newDate, amount, '0');
        } else update(debtDue, amount, id);
      }
    } else if (payment === 'DEBT') {
      if (debtDue === '') {
        enqueueSnackbar('Please select due date', {variant: 'error'});
      } else {
        setAmount('0');
        if (id === '0') {
          create(debtDue, '0', grandTotal);
        } else update(debtDue, '0', id);
      }
    }
  }

  async function create(a, b, c) {
    await service.createData(`sales`, {
      SalesId: '',
      UserId: user.UserId,
      CustomerId: customer[0].CustomerId,
      PaymentMethod: payment,
      DebtDue: a,
      TotalItem: totalItem,
      TotalPrice: grandTotal,
      Amount: b,
      Remain: c,
      Status: status,
      salesdetails: products
    }).then((response) => {
      navigate(`/sale/${response.data.SalesId}`);
      enqueueSnackbar('Sales added', {variant: 'success'});
    })
  }

  async function update(a, b, c) {
    await service.updateData(`sales`, c, {
      SalesId: id,
      CustomerId: customer[0].CustomerId,
      PaymentMethod: payment,
      DebtDue: a,
      TotalItem: totalItem,
      TotalPrice: grandTotal,
      Amount: b,
      Status: status,
      salesdetails: products
    }).then((response) => {
      navigate(`/sale/${response.data.SalesId}`);
      enqueueSnackbar('Sales updated', {variant: 'info'})
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleBack = (e) => {
    e.preventDefault();
    navigate(`/sale/${id}`, {replace: true});
  }

  const handleOpenCustomer = () => {
    setOpenCustomer(true);
  };
  
  const handleCloseCustomer = (value) => {
    setCustomer(value);
    setOpenCustomer(false);
  };
  
  const handleOpenProduct = () => {
    setOpenProduct(true);
  };
  
  const handleCloseProduct = (value) => {
    setProducts(value);
    setOpenProduct(false);
  };
  
  const handleDeleteItem = (e) => {
    setProducts((item) => item.filter(item => item !== e));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (customer.length === 0) {
      enqueueSnackbar('Please select customer', {variant: 'error'});
    } else if (products.length === 0) {
      enqueueSnackbar('Please select product', {variant: 'error'});
    } else if (customer.length && products.length>0 && check()) {
      console.log(products);
      setSlideContent(false);
      if (!status) {
        setSlideIn((prev) => !prev);
      }
      countGrand();
    }
  }

  function check() {
    for (let i in products) {
      if (products[i].SalesPrice === 0 ||isNaN( products[i].SalesPrice)) {
        enqueueSnackbar(`Please input ${products[i].product.Name} sales price`, {variant: 'error'});
        return false
      } 
    }
    return true
  }

  async function countGrand() {
    let count = 0;
    let item = 0;
    for await (let i of products) {
      count+=(i.Qty*i.SalesPrice);
      item+=i.Qty;
    }
    setGrandTotal(count);
    setTotalItem(item)
  }

  const handlePayment = (event) => {
    setPayment(event.target.value);
    if (status) {
      setStatus(0);
    } else setStatus(1);
    setSlideIn((prev) => !prev);
  };

  return (
    <div ref={containerRef}>
      <Slide direction='right' in={slideContent} mountOnEnter unmountOnExit>
        <div className="container shadow-lg mt-4 mb-4 p-4">
          <div>
            <h2>SALE ADD</h2>
          </div>
          <div className='mb-3 divbox'>
            <div className='divbox-item divbox-item-left'>
              <div className="fl-start-cv">
                <span className='info-text'>Customer</span>
                <TextField hiddenLabel value={(customer.length > 0) ? customer[0].Name : "Select Customer"} onClick={handleOpenCustomer} InputProps={{readOnly: true}} size='small'/>
                <CustomerDialog customer={customer} open={openCustomer} close={handleCloseCustomer}/>
              </div>
            </div>
            <div className='divbox-item divbox-item-right'>
              <Button type='submit' className='btn-fill' onClick={handleOpenProduct}>Add Product</Button>
              <ProductSalesDialog products={products} open={openProduct} close={handleCloseProduct}/>
            </div>
          </div>
          <TableContainer className='table-min mb-5'>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell width='5%' align='center'>Id</TableCell>
                  <TableCell width='55%'>Name</TableCell>
                  <TableCell width='20%' align='left'>Sale Price</TableCell>
                  <TableCell width='10%' align='center'>Qty</TableCell>
                  <TableCell width='10%' align='center'>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { (products.length>0) ? (products.map((product) => (
                  <TableRow key={product.ProductId}>
                    <TableCell component='th' scope='row' align='center'>{product.ProductId}</TableCell>
                    <TableCell>{product.product.Name}</TableCell>
                    <TableCell align='left'><TextField defaultValue={product.SalesPrice.toString()} onChange={(e) => product.SalesPrice = parseInt(e.target.value)} name='numberformat' id='formatted-numberformat-input' InputProps={{inputComponent: NumberFormatCustom}} size='small' variant='standard'/></TableCell>
                    <TableCell align='center'><input type='number' defaultValue={product.Qty} min='1' max='999' onChange={(e) => product.Qty=parseInt(e.target.value)}/></TableCell>
                    <TableCell align='center'><MdDelete onClick={() => handleDeleteItem(product)}/></TableCell>
                  </TableRow>
                ))) : (
                  <TableRow>
                    <TableCell colSpan={6} align='center'>No Product</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div className='foo-btn mt-5'>
          { (id === '0' ? (
              <Button href='..' size='sm' className='btn-fill ms-4'>CANCEL</Button>
            ) : (
              <Button onClick={ e => handleBack(e)} size='sm' className='btn-fill ms-4'>CANCEL</Button>
            ))}
            <Button onClick={e => handleCheckout(e)} type='submit' size='sm' className='btn-fill ms-4'>CHECKOUT</Button>
          </div>
        </div>
      </Slide>
      <Slide direction='left' in={!slideContent} mountOnEnter unmountOnExit>
        <div className="container shadow-lg mt-4 mb-4 p-4 abbba">
          <div>
            <h2>SALE CONFIRM</h2>
          </div>
          <div className='mb-3 divbox'>
            <div className='divbox-item divbox-item-left'>
              <div className="fl-start-cv">
                <span className='info-text'>Customer</span>
                <TextField hiddenLabel value={(customer.length > 0) ? customer[0].Name : "Select customer"} InputProps={{readOnly: true}} size='small'/>
              </div>
            </div>
          </div>
          <TableContainer className='table-min mb-5'>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell width='5%' align='center'>Id</TableCell>
                  <TableCell width='65%'>Name</TableCell>
                  <TableCell width='10%' align='center'>Qty</TableCell>
                  <TableCell width='20%' align='right'>Sale Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { (products.length>0) ? (products.map((product) => (
                  <TableRow key={product.ProductId}>
                    <TableCell component='th' scope='row' align='center'>{product.ProductId}</TableCell>
                    <TableCell>{product.product.Name}</TableCell>
                    <TableCell align='center'>{product.Qty + ' pcs'}</TableCell>
                    <TableCell align='right'>{parseInt(product.SalesPrice).toLocaleString('id-ID')}</TableCell>
                  </TableRow>
                ))) : (
                  <TableRow>
                    <TableCell colSpan={6} align='center'>No Product</TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                
              </TableFooter>
            </Table>
          </TableContainer>
          <div className='divbox mb-3 btm-stick'>
            <div className='divbox-item divbox-item-left'></div>
            <div className='divbox-item divbox-item-right'>
              <div className='fl-end-cv'>
                <span className='info-text text-start'>Grand Total</span>
                <TextField value={grandTotal} name='numberformat' id='formatted-numberformat-input' InputProps={{inputComponent: NumberFormatCustom, readOnly: true}} size='small'/>
              </div>
              <div className='mt-2 fl-end-cv'>
                <span className='info-text text-start'>Payment Method</span>
                <FormControl>
                  <RadioGroup row className='text-box1' value={payment} onChange={handlePayment} >
                    <FormControlLabel value='CASH' control={<Radio/>} label='CASH'/>
                    <FormControlLabel value='DEBT' control={<Radio/>} label='DEBT'/>
                  </RadioGroup>
                </FormControl>
              </div>
              <div className='over-hidden' ref={containerRef}>
                <Slide direction='left' in={slideIn} mountOnEnter unmountOnExit container={containerRef.current}>
                  <div className='mt-2 fl-end-cv'>
                    <span className='info-text text-start'>Amount</span>
                    <TextField value={amount} onChange={e => setAmount(e.target.value)} name='numberformat' id='formatted-numberformat-input' InputProps={{inputComponent: NumberFormatCustom}} size='small'/>
                  </div>
                </Slide>
                <Slide direction='left' in={!slideIn} mountOnEnter unmountOnExit container={containerRef.current}>
                  <div className='mt-2 fl-end-cv'>
                    <span className='info-text text-start'>Debt Due</span>
                    <OutlinedInput type='date' value={debtDue} onChange={e => setDebtDue(e.target.value)} name='date' id='date' size='small' style={{width: '207px'}}/>
                  </div>
                </Slide>
              </div>
            </div>
          </div>
          <div className='foo-btn'>
            <Button onClick={e => setSlideContent(true)} size='sm' className='btn-fill ms-4'>CANCEL</Button>
            <Button onClick={createSale} type='submit' size='sm' className='btn-fill ms-4'>CONFIRM</Button>
          </div>
        </div>
      </Slide>
    </div>
  )
}

export default SaleAdd;