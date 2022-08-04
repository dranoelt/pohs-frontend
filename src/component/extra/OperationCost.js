import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import service from '../services/services';

const OperationCost = () => {
  const [operation, setOperation] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [sortvalue, setSortValue] = useState();
  const sortOptions = [];

  useEffect(() => {
    service.getData(`operating`)
      .then( response => {
        setOperation(response.data);
      })
  }, [])

  const searchItems = e => {
    setSearchInput(e);
  }

  const items = operation.filter(operation => {
    if (searchInput == null) {
      return true;
    } else {
      if (operation.OperatingId.includes(searchInput))
        return true;
      return false;
    }
  })

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    return await axios.get('http://localhost:4001/api/operating').then((response) => { setOperation(response.data);  }).catch((err) => console.log(err)); 
  };

  return (
    <div className='mt-4 mx-5'>
      <h4> <b>OPERATION COST LIST</b> </h4>
      <div className='divbox'>
        <div className="divbox-item divbox-item-left">
          <span>Sort by</span>
          <select style={{ borderRadius: '4px', marginLeft: '10px'}} onChange={handleSort} value={sortvalue}>
            <option value="ProductId">Purchase ID</option>
            <option value="UserId">User ID</option>
            {sortOptions.map((operation, index) => (
            <option value={operation} key={index}> {operation} </option> ))}
          </select>
        </div>
        <div className="divbox-item divbox-item-right">
          <input icon='Search' type='search' placeholder='Search' className='searchbar' onChange={(e) => searchItems(e.target.value)} />
          <Button as={Link} to='add-operation' size='sm' className='btn-fill ms-4'>Add Operation</Button>
        </div>
      </div>
    
      <div className='table responsive'>
        <Table bordered hover size="sm mt-2">
          <thead className='table1'>
            <tr>
              <th scope="col" className='text-center'>No.</th>
              <th scope="col" className='text-center'>ID</th>
              <th id='pad-10' scope="col">Category</th>
              <th id='pad-10' scope="col">Created At</th>
              <th id='pad-10' scope="col">Amount</th>
              <th id='pad-10' scope="col">Description</th>
              <th scope="col" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            { items.length > 0 ? (
            items.map((operation, index) => (
              <tr key={operation.OperatingId} className='operation'>
                <th className="text-center" scope='row'>{index+1}</th>
                <td id='pad-10' className="text-center">{operation.OperatingId}</td>
                <td id='pad-10'>{operation.Category}</td>
                <td id='pad-10'>{operation.CreatedAt}</td>
                <td id='pad-10'>{operation.Amount}</td>
                <td id='pad-10'>{operation.Description}</td>
                <td  className="text-center"><Link to={`${operation.OperatingId}`}><BiEditAlt/></Link></td>
              </tr>
            ))) : (
              <tr>
              <td colSpan={7} className="text-center mb-0">No Operation Cost Found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default OperationCost;