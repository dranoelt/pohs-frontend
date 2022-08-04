import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { BiEditAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import service from '../services/services';

const Product = () => {
  const [products, setProduct] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [sortvalue, setSortValue] = useState();
  const sortOptions = [];

  useEffect(() => {
    service.getData(`product`).then((response) => {
      setProduct(response.data);
    });
  }, []);

  const searchItems = e => {
    setSearchInput(e);
  }

  const items = products.filter(product => {
    if (searchInput == null) {
      return true;
    } else {
      if (product.Name.toLowerCase().includes(searchInput.toLowerCase())) 
         return true;
      return false
    }
  })

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    return await axios.get('http://localhost:4001/api/product').then((response) => { setProduct(response.data);  }).catch((err) => console.log(err)); 
  };

  return (
    <div className='mt-4 mx-5'>
      <h4> <b>LIST PRODUCT</b> </h4>
      <div className='divbox'>
        <div className='divbox-item divbox-item-left'>
          <span>Filter</span>
          <select style={{ borderRadius: '4px', marginLeft: '10px'}} onChange={handleSort} value={sortvalue}>
            <option >All</option>
            {sortOptions.map((product, index) => (
            <option value={product} key={index}> {product} </option> ))}
          </select> <span></span>
          <span>Sort by</span>
          <select style={{ borderRadius: '4px', marginLeft: '10px'}} onChange={(e) => handleSort (e.target.value)}>
            <option value="ProductId">Product ID</option>
            <option value="UserId">User ID</option>
            {sortOptions.map((product, index) => (
            <option value={product} key={index}> {product} </option> ))}
          </select>
        </div>
        <div className="divbox-item divbox-item-right">
          <input icon='Search' type='search' placeholder='Search' className='searchbar' onChange={ e => searchItems(e.target.value)} />
          <Button as={Link} to='add-product' size='sm' className='btn-fill ms-4'>Add Product</Button>
        </div>
      </div>
    
      <div>
        <Table bordered hover size="sm mt-2">
          <thead className='table1'>
            <tr>
            <th scope='col'>No.</th>
            <th scope='col'>Product_Id</th>
            <th scope='col'>Product_Name</th>
            <th scope='col'>Product_Company</th>
            <th scope='col'>Stock</th>
            <th scope='col'>Cost</th>
            <th scope='col'>Price</th>
            <th scope='col' className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
          { items.length > 0 ? (
            items.map((product, index) => (
            <tr key={product.ProductId} className='product'>
            <th scope='row'>{index+1}</th>
            <td>{product.ProductId}</td>
            <td>{product.Name}</td>
            <td>{product.Company}</td>
            <td>{(product.Qty == null) ? 0:product.Qty}</td>
            <td>{(product.MovingPrice == null) ? "IDR "+ 0:"IDR "+parseInt(product.MovingPrice).toLocaleString('id-ID')}</td>
            <td>{(product.SalesPrice == null) ? "IDR "+ 0:"IDR "+parseInt(product.SalesPrice).toLocaleString('id-ID')}</td>
            <td align='center'><Link to={`${product.ProductId}`} className="edit"><BiEditAlt/></Link></td>
            </tr>
            ))
            ) : (
            <tr>
            <td colSpan={8} className="text-center mb-0">No Storage Found</td>
            </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Product;