import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import service from '../services/services';

const Weekly = () => {
  const [weekly, setWeekly] = useState([]);
  const [products, setProduct] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const change = () => {
    let start = Date.parse(fromDate);
    let to = Date.parse(toDate);
    let dif = (to - start) / (1000*60*60*24);
    if (dif>=0 && dif<=6) {
      getReport(fromDate, toDate);
    } else {
      enqueueSnackbar("fromDate must be lower than toDate and within 7 days", {variant: 'error'});
    }
  }

  async function getReport(a, b) {
    await service.getDatabyData(`report-weekly`, {fromDate: a, toDate: b})
    .then((response) => {
      setWeekly(response.data);
      setProduct(response.data.Products);
    });
  }

  return (
    <div className='mt-4 mx-5'>
    <h4 className='mb-3'> <b>WEEKLY</b> </h4>
    <div className="datepicker">
      <span>Select Date : From</span>
      <input type="date" className='mx-2' value={fromDate} onChange={e => setFromDate(e.target.value)} />
      <span>To</span>
      <input type="date" className='mx-2' pattern='dd-mm-yyyy' value={toDate} onChange={e => setToDate(e.target.value)} />
      <Button onClick={change} className='btn-fill py-1 px-4 ms-2' style={{minWidth: '0'}}>OK</Button>
    </div>
    <div className='mt-4'>
      <b>Best Seller Product</b>
    </div>

    <div className='table-responsive'>
      <Table bordered hover size="sm">
        <thead>
          <tr className="tableBg">
            <th className='col-1'>No.</th>
            <th className='col-2'>Product_id</th>
            <th className='col-8'>Product_name</th>
            <th className='col-1 text-center'>Qty</th>
          </tr>
        </thead>
        <tbody>
        { products.length > 0 ? (
          products.map((product, index) => (
          <tr key={product.ProductId} className='product'>
          <th scope='row'>{index+1}</th>
          <td>{product.ProductId}</td>
          <td>{product.Name}</td>
          <td className='text-center'>{product.Qty}</td>
          </tr>
          ))
          ) : (
          <tr>
          <td colSpan={8} className="text-center mb-0">No Product Has Been Sale</td>
          </tr>
          )}
        </tbody>
      </Table>
    </div>
    <div className='mt-5'> 
      <Table bordered>
        <tbody>
          <tr>
            <th className='col-10'>Number of Sales</th>
            <td className='col-2 text-center'>{weekly.TotalTransaction}</td>
          </tr>
          <tr>
            <th>Revenue</th>
            <td className='text-center'>{weekly.TotalSales}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </div>
  )
}

export default Weekly;