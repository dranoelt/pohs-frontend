import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/esm/Table';
import { Link } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import { Button } from 'react-bootstrap';
import service from '../services/services';


const Purchase = () => {
  const [purchase, setPurchase] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [sortvalue, setSortValue] = useState();
  const sortOptions = [];

  useEffect(() => {
    service.getData(`purchase`)
      .then((response) => {
        setPurchase(response.data);
      })
  }, [])

  const searchItems = e => {
    setSearchInput(e);
  }

  const items = purchase.filter(purchase => {
    if (searchInput == null) {
      return true;
    } else {
      if (purchase.supplier.Name.toLowerCase().includes(searchInput.toLowerCase())) 
         return true;
      return false;
    }
  })

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    return await axios.get('http://localhost:4001/api/purchase').then((response) => { setPurchase(response.data);  }).catch((err) => console.log(err)); 
  };

  return (
    <div className='mt-4 mx-5'>
      <h4> <b>LIST PURCHASE</b> </h4>
      <div className='divbox'>
        <div className="divbox-item divbox-item-left">
          <span>Sort by</span>
          <select style={{ borderRadius: '4px', marginLeft: '10px'}} onChange={handleSort} value={sortvalue}>
            <option value="PurchaseId">Purchase ID</option>
            <option value="UserId">User ID</option>
            {sortOptions.map((purchaseheader, index) => (
            <option value={purchaseheader} key={index}> {purchaseheader} </option> ))}
          </select>
        </div>
        <div className="divbox-item divbox-item-right">
          <input icon='Search' type='search' placeholder='Search' className='searchbar' onChange={(e) => searchItems(e.target.value)} />
          <Button as={Link} to='add-purchase/0' size='sm' className='btn-fill ms-4'>Add Purchase</Button>
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
            <th scope='col' className='text-end'>Total</th>
            <th scope='col' className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            { items.length > 0 ? (
            items.map((purchase, index) => (
              <tr key={purchase.PurchaseId} className='purchase'>
              <th scope='row'>{index+1}</th>
              <td>{purchase.PurchaseId}</td>
              <td>{purchase.supplier.Name}</td>
              <td>{(purchase.Status === 1) ? "PAID":purchase.DebtDue}</td>
              <td align='right'>{"IDR "+ parseInt(purchase.TotalPrice).toLocaleString('id-ID')}</td>
              <td align='center'><Link to={`${purchase.PurchaseId}`} className="editpurchase"><BiEditAlt/></Link></td>
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

export default Purchase;