import React from 'react';
import NumberFormat from 'react-number-format';
import { Dialog, DialogTitle, Table, TableBody, TableContainer, TableHead, TableCell, TableRow, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import service from '../services/services';
import { MdOutlineAdd } from 'react-icons/md';


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
      prefix='IDR '
    />
  );
});

const ProductPurchaseDialog = (props) => {
    const { close, products, open } = props;
    const [searchInput, setSearchInput] = useState('');
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);
  
    useEffect(() => {
      service.getData(`product`)
      .then((response) => {
        setProductList(response.data);
      });
      setSelectedProduct(products);
    }, [products]);
  
    const searchItems = e => {
      setSearchInput(e);
    };
  
    const items = productList.filter(productList => {
      if (searchInput == null) {
        return true;
      } else {
        if (productList.Name.toLowerCase().includes(searchInput.toLowerCase())) 
           return true;
        return false;
      }
    });
  
    const handleClose = () => {
      setSearchInput('');
      console.log(selectedProduct);
      close(selectedProduct);
    };
  
    const handleListItemClick = (value) => {
      let ab = selectedProduct.filter(item => {
        if (item.ProductId.toString().includes(value.ProductId.toString()))
          return true;
        return false;
      })
      if (ab.length===0) {
        selectedProduct.push({
          'ProductId': value.ProductId,
          'PurchasePrice': 0,
          'SalesPrice': value.SalesPrice,
          'Qty': 1,
          'product': {
            'Name': value.Name,
          }
        });
      }
    };
  
    return (
      <Dialog onClose={handleClose} open={open} maxWidth='md' fullWidth>
        <DialogTitle className='pb-2'>Product List</DialogTitle>
        <TextField className='px-2 mb-2' variant='standard' onChange={e => searchItems(e.target.value)} placeholder='Search...'/>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align='center'>Qty (PCS)</TableCell>
                <TableCell align='right'>Moving Price (IDR)</TableCell>
                <TableCell align='right'>Sale Price (IDR)</TableCell>
                <TableCell align='center'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { items.map((product) => (
                <TableRow key={product.ProductId}>
                  <TableCell scope='row'>{product.ProductId}</TableCell>
                  <TableCell>{product.Name}</TableCell>
                  <TableCell align='center'>{product.Qty}</TableCell>
                  <TableCell align='right'>{Number(product.MovingPrice).toLocaleString('id-ID', { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell align='right'>{Number(product.SalesPrice).toLocaleString('id-ID', { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell align='center'><MdOutlineAdd className='icon-action' onClick={() => handleListItemClick(product)}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    );
  }

const ProductSalesDialog = (props) => {
  const { close, products, open } = props;
  const [searchInput, setSearchInput] = useState('');
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);

  useEffect(() => {
    service.getData(`product`)
    .then((response) => {
      setProductList(response.data);
    });
    setSelectedProduct(products);
  }, [products]);

  const searchItems = e => {
    setSearchInput(e);
  };

  const items = productList.filter(productList => {
    if (searchInput == null) {
      return true;
    } else {
      if (productList.Name.toLowerCase().includes(searchInput.toLowerCase())) 
          return true;
      return false;
    }
  });

  const handleClose = () => {
    setSearchInput('');
    console.log(selectedProduct);
    close(selectedProduct);
  };

  const handleListItemClick = (value) => {
    let ab = selectedProduct.filter(item => {
      if (item.ProductId.toString().includes(value.ProductId.toString()))
        return true;
      return false;
    })
    if (ab.length===0) {
      selectedProduct.push({
        'ProductId': value.ProductId,
        'MovingPrice': value.MovingPrice,
        'SalesPrice': value.SalesPrice,
        'Qty': 1,
        'product': {
          'Name': value.Name,
        }
      });
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth='md' fullWidth>
      <DialogTitle className='pb-2'>Product List</DialogTitle>
      <TextField className='px-2 mb-2' variant='standard' onChange={e => searchItems(e.target.value)} placeholder='Search...'/>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align='center'>Qty (PCS)</TableCell>
              <TableCell align='right'>Moving Price (IDR)</TableCell>
              <TableCell align='right'>Sale Price (IDR)</TableCell>
              <TableCell align='center'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { items.map((product) => (
              <TableRow key={product.ProductId}>
                <TableCell scope='row'>{product.ProductId}</TableCell>
                <TableCell>{product.Name}</TableCell>
                <TableCell align='center'>{product.Qty}</TableCell>
                <TableCell align='right'>{Number(product.MovingPrice).toLocaleString('id-ID', { minimumFractionDigits: 2 })}</TableCell>
                <TableCell align='right'>{Number(product.SalesPrice).toLocaleString('id-ID', { minimumFractionDigits: 2 })}</TableCell>
                <TableCell align='center'><MdOutlineAdd className='icon-action' onClick={() => handleListItemClick(product)}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
}

const SupplierDialog = (props) => {
    const { close, supplier, open } = props;
    const [searchInput, setSearchInput] = useState('');
    const [supplierList, setSupplierList] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState([]);
  
    useEffect(() => {
      service.getData(`supplier`)
      .then((response) => {
        setSupplierList(response.data);
      });
      setSelectedSupplier(supplier);
    }, [supplier]);
  
    const searchItems = e => {
      setSearchInput(e);
    };
  
    const items = supplierList.filter(supplierList => {
      if (searchInput == null) {
        return true;
      } else {
        if (supplierList.Name.toLowerCase().includes(searchInput.toLowerCase())) 
           return true;
        return false;
      }
    });
  
    const handleClose = () => {
      setSearchInput('');
      close(selectedSupplier);
    };
  
    const handleListItemClick = (value) => {
      setSelectedSupplier([{
        'SupplierId': value.SupplierId,
        'Name': value.Name
      }]);
    };
  
    return (
      <Dialog onClose={handleClose} open={open} maxWidth='md' fullWidth>
        <DialogTitle className='pb-2'>Supplier List</DialogTitle>
        <TextField className='px-2 mb-2' variant='standard' onChange={e => searchItems(e.target.value)} placeholder='Search...'/>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align='center'>Company</TableCell>
                <TableCell align='center'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { items.map((supplier) => (
                <TableRow key={supplier.SupplierId}>
                  <TableCell scope='row'>{supplier.SupplierId}</TableCell>
                  <TableCell>{supplier.Name}</TableCell>
                  <TableCell align='center'>{supplier.Company}</TableCell>
                  <TableCell align='center'><MdOutlineAdd className='icon-action' onClick={() => handleListItemClick(supplier)}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    );
  }

const CustomerDialog = (props) => {
    const { close, customer, open } = props;
    const [searchInput, setSearchInput] = useState('');
    const [customerList, setCustomerList] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState([]);
  
    useEffect(() => {
      service.getData(`customer`)
      .then((response) => {
        setCustomerList(response.data);
      });
      setSelectedCustomer(customer);
    }, [customer]);
  
    const searchItems = e => {
      setSearchInput(e);
    };
  
    const items = customerList.filter(customerList => {
      if (searchInput == null) {
        return true;
      } else {
        if (customerList.Name.toLowerCase().includes(searchInput.toLowerCase())) 
           return true;
        return false;
      }
    });
  
    const handleClose = () => {
      setSearchInput('');
      close(selectedCustomer);
    };
  
    const handleListItemClick = (value) => {
      setSelectedCustomer([{
        'CustomerId': value.CustomerId,
        'Name': value.Name
      }]);
    };
  
  
    return (
      <Dialog onClose={handleClose} open={open} maxWidth='md' fullWidth>
        <DialogTitle className='pb-2'>Customer List</DialogTitle>
        <TextField className='px-2 mb-2' variant='standard' onChange={e => searchItems(e.target.value)} placeholder='Search...'/>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align='center'>Number</TableCell>
                <TableCell align='center'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { items.map((customer) => (
                <TableRow key={customer.CustomerId}>
                  <TableCell scope='row'>{customer.CustomerId}</TableCell>
                  <TableCell>{customer.Name}</TableCell>
                  <TableCell align='center'>{customer.Number}</TableCell>
                  <TableCell align='center'><MdOutlineAdd className='icon-action' onClick={() => handleListItemClick(customer)}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    );
}

const MakePaymentDialog = (props) => {
  const {open, close, section, data} = props;
  const [grandTotal, setGrandTotal] = useState('');
  const [amount, setAmount] = useState('');
  const [remain, setRemain] = useState('');
  const [subAmount, setSubAmount] = useState('');

  useEffect(() => {
    setGrandTotal(data.grandTotal);
    setAmount(data.amount);
    setRemain(data.remain);
  }, [data]);

  const handleClose = () => {
    setSubAmount('');
    close(0);
  };

  const handleConfirm = () => {
    let amountTemp = parseInt(amount)+parseInt(subAmount);
    let remainTemp = parseInt(remain)-parseInt(subAmount);
    let pay = {
      'Amount':amountTemp,
      'Remain': remainTemp
    }
    service.updateData(section, data.id, pay).then((response) => {
      setSubAmount('');
      close(response.data.status_code);
    }
    );
  }

  return (
    <Dialog onClose={handleClose} open={open} maxWidth='sm' fullWidth>
      <DialogTitle>Make Payment</DialogTitle>
      <TextField label='Grand Total' variant='standard' value={grandTotal} InputProps={{inputComponent: NumberFormatCustom}} className='mx-3 my-2'/>
      <TextField label='Amount' variant='standard' value={amount} InputProps={{inputComponent: NumberFormatCustom}} className='mx-3 my-2'/>
      <TextField label='Remain' variant='standard' value={remain} InputProps={{inputComponent: NumberFormatCustom}} className='mx-3 my-2'/>
      <TextField label='Sub-amount' variant='standard' value={subAmount} onChange={e => setSubAmount(parseInt(e.target.value))} InputProps={{inputComponent: NumberFormatCustom}} className='mx-3 my-2'/>
      <div className='mx-3 my-2' style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <Button style={{width: '100%'}} onClick={handleClose}>CANCEL</Button>
        <Button style={{width: '100%'}} onClick={handleConfirm}>CONFIRM</Button>
      </div>
    </Dialog>
  );

}

const ChangeDateDialog = (props) => {
  const {open, close, section, data} = props;
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('')

  useEffect(() => {
    setFromDate(data.fromDate);
    setToDate(data.fromDate);
  }, [data]);

  const handleClose = () => {
    close();
  }

  const handleConfirm = () => {
    let change = { 'DebtDue': toDate}
    service.updateData(section, data.id, change).then((response) => {
      setToDate(data.fromDate);
      close(response.data.status_code);
    })
  }

  return (
    <Dialog onClose={handleClose} open={open} maxWidth='sm' fullWidth>
      <DialogTitle>Change Due Date</DialogTitle>
      <TextField variant='standard' type='date' value={fromDate} label='Current Date' name='fromdate' id='fromdate' size='small' className='mx-3 my-2' InputProps={{readOnly: true}}/>
      <TextField variant='standard' type='date' value={toDate} label='To Date' onChange={e => setToDate(e.target.value)} name='todate' id='todate' size='small' className='mx-3 my-2'/>
      <div className='mx-3 my-2' style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <Button style={{width: '100%'}} onClick={handleClose}>CANCEL</Button>
        <Button style={{width: '100%'}} onClick={handleConfirm}>CONFIRM</Button>
      </div>
    </Dialog>
  )
}

  export {ProductPurchaseDialog, ProductSalesDialog, SupplierDialog, CustomerDialog, MakePaymentDialog, ChangeDateDialog};