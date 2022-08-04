import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import service from '../services/services';

const Customer = () => {
  const [customer, setCustomer] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [sortvalue, setSortValue] = useState();
  const sortOptions = [];

  useEffect(() => {
    service.getData(`customer`)
      .then((response) => {
        setCustomer(response.data);
      })
}, [])

const searchItems = e => {
  setSearchInput(e);
}

const items = customer.filter(customer => {
  if (searchInput == null) {
    return true;
  } else {
    if (customer.Name.toLowerCase().includes(searchInput.toLowerCase())) 
       return true;
    return false
  }
})

const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    return await axios.get('http://localhost:4001/api/customer').then((response) => { setCustomer(response.data);  }).catch((err) => console.log(err)); 
};

  return (
    <div className='mt-4 mx-5'>
      <h4> <b>CUSTOMER LIST</b> </h4>
      <div className='divbox'>
        <div className="divbox-item divbox-item-left">
          <span>Sort by</span>
          <select style={{ borderRadius: '4px', marginLeft: '10px'}} onChange={handleSort} value={sortvalue}>
            <option value="ProductId">Purchase ID</option>
            <option value="UserId">User ID</option>
            {sortOptions.map((customer, index) => (
            <option value={customer} key={index}> {customer} </option> ))}
          </select>
        </div>
        <div className="divbox-item divbox-item-right">
          <input icon='Search' type='search' placeholder='Search' className='searchbar' onChange={(e) => searchItems(e.target.value)} />
          <Button as={Link} to='add-customer' size='sm' className='btn-fill ms-4'>Add Customer</Button>
        </div>
      </div>
    
      <div className='table responsive'>
        <Table bordered hover size="sm mt-2">
          <thead className='table1'>
            <tr>
              <th scope="col" className='text-center'>No.</th>
              <th scope="col" className='text-center'>ID</th>
              <th id='pad-10' scope="col">Name</th>
              <th id='pad-10' scope="col">Address</th>
              <th id='pad-10' scope="col">Number</th>
              <th id='pad-10' scope="col">Date_Created</th>
              <th id='pad-10' scope="col">Last_Transaction</th>
              <th scope="col" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            { items.length > 0 ? (
            items.map((customer, index) => (
              <tr key={customer.CustomerId} className='customer'>
                <th className="text-center" scope='row'>{index+1}</th>
                <td id='pad-10' className="text-center">{customer.CustomerId}</td>
                <td id='pad-10'>{customer.Name}</td>
                <td id='pad-10'>{customer.Address}</td>
                <td id='pad-10'>{customer.Number}</td>
                <td id='pad-10'>{customer.DateCreated}</td>
                <td id='pad-10'>{customer.LastTransaction}</td>
                <td  className="text-center"><Link to={`${customer.CustomerId}`}><BiEditAlt/></Link></td>
              </tr>
            ))) : (
              <tr>
              <td colSpan={8} className="text-center mb-0">No Purchase Found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Customer;