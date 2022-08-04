import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import service from '../services/services';

const Return = () => {
  const [returns, setReturns] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [sortvalue, setSortValue] = useState();
  const sortOptions = [];

  useEffect(() => {
    service.getData(`return`)
    .then((response) => {
      setReturns(response.data);
    })
  }, []);

  const searchItems = e => {
    setSearchInput(e);
  };

  const items = returns.filter(returns => {
    if (searchInput == null) {
      return true;
    } else {
      if (returns.customer.Name.toLowerCase().includes(searchInput.toLowerCase()))
        return true;
      return false;
    }
  });

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    return await axios.get(`http://localhost:4001/api/sales`).then((response) => { setReturns(response.data);  }).catch((err) => console.log(err));
  };
  
  return (
    <div className='mt-4 mx-5'>
      <h4> <b>RETURN LIST</b> </h4>
      <div className='divbox'>
        <div className="divbox-item divbox-item-left">
          <span>Sort by</span>
          <select style={{ borderRadius: '4px', marginLeft: '10px'}} onChange={handleSort} value={sortvalue}>
            <option value="PurchaseId">Purchase ID</option>
            <option value="UserId">User ID</option>
            {sortOptions.map((returns, index) => (
            <option value={returns} key={index}> {returns} </option> ))}
          </select>
        </div>
        <div className="divbox-item divbox-item-right">
          <input icon='Search' type='search' placeholder='Search' className='searchbar' onChange={(e) => searchItems(e.target.value)} />
          <Button as={Link} to='add-return/0' size='sm' className='btn-fill ms-4'>Add Return</Button>
        </div>
      </div>
    
      <div className='table responsive'>
        <Table bordered hover size="sm mt-2">
          <thead className='table1'>
            <tr>
            <th scope='col'>No.</th>
            <th scope='col'>Transaction_Id</th>
            <th scope='col'>Name</th>
            <th scope='col'>Status</th>
            <th scope='col'>Total</th>
            <th scope='col' className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            { items.length > 0 ? (
            items.map((returns, index) => (
              <tr key={returns.ReturnId} className='purchase'>
              <th scope='row'>{index+1}</th>
              <td>{returns.ReturnId}</td>
              <td>{returns.customer.Name}</td>
              <td>{(returns.Status === 1) ? "PAID":returns.DebtDue}</td>
              <td>{"IDR "+ parseInt(returns.TotalPrice).toLocaleString('id-ID')}</td>
              <td><Link to={`${returns.ReturnId}`} className="editpurchase"><BiEditAlt/></Link></td>
              </tr>
            ))) : (
              <tr>
              <td colSpan={8} className="text-center mb-0">No Return Found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Return;