import { Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import service from '../services/services';

const Monthly = () => {
  const defdate = new Date().toLocaleString("id-ID", { month: "2-digit", day: "2-digit", year: "numeric"} );
  const defmonth = defdate.substr(3,2);
  const defyear = defdate.substr(6,4);
  const newDate = `${defyear}-${defmonth}`;

  const [monthly, setMonthly] = useState([]);
  const [products, setProduct] = useState([]);
  const [startDate, setStartDate] = useState(newDate);

  useEffect(() => {
    getReport(startDate);
  },[startDate]);

  const handleDate = async e => {
    setStartDate(e);
    getReport(startDate);
  }

  async function getReport(a) {
    let b = a.substr(0,4);
    let c = a.substr(5,2)
    await service.getDatabyData(`report-monthly`, { Month: c, Year: b})
      .then((response) => {
        setMonthly(response.data);
        setProduct(response.data.Products);
      });
  }

  return (
    <div className='mt-4 mx-5'>
      <h4 className='mb-3'> <b>MONTHLY REPORT</b> </h4>
    <div className="datepicker">
      <span>Select Date : </span>
      <input type="month" name="month" id="monthyear" value={startDate} onChange={e => handleDate(e.target.value)}/>
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
        { products.length > 0 ? (
          products.map((product, index) => (
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
            <td className='col-2 text-center'>{monthly.NumberOfSales}</td>
          </tr>
          <tr>
            <th>Revenue</th>
            <td className='text-center'>{monthly.Revenue}</td>
          </tr>
          <tr>
            <th>Cost</th>
            <td className='text-center'>{monthly.Cost}</td>
          </tr>
          <tr>
            <th>Operation</th>
            <td className='text-center'>{monthly.Operation}</td>
          </tr>
          <tr>
            <th>Profit</th>
            <td className='text-center'>{monthly.Profit}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </div>
  )
}

export default Monthly;