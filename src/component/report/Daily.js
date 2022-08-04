import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import service from '../services/services';

const Daily = () => {
  const defdate = new Date().toLocaleString("id-ID", { month: "2-digit", day: "2-digit", year: "numeric"} );
  const defday = defdate.substr(0,2);
  const defmonth = defdate.substr(3,2);
  const defyear = defdate.substr(6,4);
  const newDate = `${defyear}-${defmonth}-${defday}`;
  
  const [Daily, setDaily] = useState([]);
  const [Products, setProduct] = useState([]);
  const [startDate, setStartDate] = useState(newDate);

  useEffect(() => {
    getReport(startDate);
  }, [startDate]);

  const handleDate = async e => {
    setStartDate(e);
    getReport(startDate);
  };

  async function getReport(a) {
    await service.getDatabyData(`report-daily`, {SalesDate: a})
    .then((response) => {
      setDaily(response.data);
      setProduct(response.data.Products);
    });
  }

  return (
    <div className='mt-4 mx-5'>
    <h4 className='mb-3'> <b>DAILY REPORT</b> </h4>
    <div className="datepicker">
      <span>Select Date : </span>
      <input type="date" pattern='dd-mm-yyyy' value={startDate} onChange={e => handleDate(e.target.value)} />
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
            <th className='col-1'>Qty</th>
          </tr>
        </thead>
        <tbody>
        { Products.length > 0 ? (
          Products.map((product, index) => (
          <tr key={product.ProductId} className='product'>
          <th scope='row'>{index+1}</th>
          <td>{product.ProductId}</td>
          <td>{product.Name}</td>
          <td>{product.Qty}</td>
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
            <td className='col-2 text-center'>{Daily.TotalTransaction}</td>
          </tr>
          <tr>
            <th>Revenue</th>
            <td className='text-center'>{Daily.TotalSales}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </div>
  )
}

export default Daily;