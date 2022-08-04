import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import service from '../services/services';

const Supplier = () => {
  const [supplier, setSupplier] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [sortvalue, setSortValue] = useState();
  const sortOptions = [];

  useEffect(() => {
    service.getData(`supplier`)
      .then((response) => {
        setSupplier(response.data);
      })
  }, [])

  const searchItems = e => {
    setSearchInput(e);
  }

  const items = supplier.filter(supplier => {
    if (searchInput == null) {
      return true;
    } else {
      if (supplier.Name.toLowerCase().includes(searchInput.toLowerCase())) 
         return true;
      return false
    }
  })

  const handleSort = async (e) => {
      let value = e.target.value;
      setSortValue(value);
      return await axios.get('http://localhost:4001/api/supplier').then((response) => { setSupplier(response.data);  }).catch((err) => console.log(err)); 
  };

  return (
    <div className='mt-5 mx-5'>
      <h4> <b>SUPPLIER LIST</b> </h4>
      <div className='divbox'>
        <div className="divbox-item divbox-item-left">
          <span>Sort by</span>
          <select style={{ borderRadius: '4px', marginLeft: '10px'}} onChange={handleSort} value={sortvalue}>
            <option value="ProductId">Purchase ID</option>
            <option value="UserId">User ID</option>
            {sortOptions.map((supplier, index) => (
            <option value={supplier} key={index}> {supplier} </option> ))}
          </select>
        </div>
        <div className="divbox-item divbox-item-right">
          <input icon='Search' type='search' placeholder='Search' className='searchbar' onChange={(e) => searchItems(e.target.value)} />
          <Button as={Link} to='add-supplier' size='sm' className='btn-fill ms-4'>Add Supplier</Button>
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
              <th id='pad-10' scope="col">Company</th>
              <th id='pad-10' scope="col">Last Order</th>
              <th scope="col" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            { items.length > 0 ? (
            items.map((supplier, index) => (
              <tr key={supplier.SupplierId} className='supplier'>
                <th className="text-center" scope='row'>{index+1}</th>
                <td id='pad-10' className="text-center">{supplier.SupplierId}</td>
                <td id='pad-10'>{supplier.Name}</td>
                <td id='pad-10'>{supplier.Address}</td>
                <td id='pad-10'>{supplier.Number}</td>
                <td id='pad-10'>{supplier.Company}</td>
                <td id='pad-10'>{supplier.LastOrder}</td>
                <td  className="text-center"><Link to={`${supplier.SupplierId}`}><BiEditAlt/></Link></td>
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

export default Supplier;