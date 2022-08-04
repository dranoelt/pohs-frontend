import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import service from '../services/services';
import { ChangeDateDialog, MakePaymentDialog } from '../subview/dialog';

const PurchaseDetails = () => {
    const [openPayment, setOpenPayment] = useState(false);
    const [openChange, setOpenChange] = useState(false);
    const [purchaseId, setPurchaseId] = useState('');
    // const [supplierId, setSupplierId] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [payment, setPayment] = useState('');
    const [debtDue, setDebtDue] = useState('');
    const [totalItem, setTotalItem] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [remain, setRemain] = useState('');
    const [status, setStatus] = useState('');
    const [supplier, setSupplier] = useState([]);
    const [purchaseDetail, setPurchaseDetail] = useState([]);
    const { id } = useParams();
    let navigate = useNavigate();

    useEffect( () => {
        getData(id);
    },[id]);

    function getData(id) {
        service.getDataById(`purchase`, id).then( response => {
            let _ = response.data;
            setPurchaseId(_.PurchaseId);
            // setSupplierId(response.data.SupplierId);
            setPurchaseDate(_.PurchaseDate);
            setPayment(_.PaymentMethod);
            setDebtDue(_.DebtDue);
            setTotalItem(_.TotalItem);
            setTotalPrice(_.TotalPrice);
            setAmount(_.Amount);
            setRemain(_.Remain);
            setStatus(_.Status);
            setSupplier(_.supplier);
            setPurchaseDetail(_.purchasedetails);
        })
    }

    const handleEdit = (e) => {
        e.preventDefault();
        navigate(`../add-purchase/${id}`, {replace: true});
    }

    const handlePayment = {
        'id': id,
        'grandTotal': totalPrice,
        'amount': amount,
        'remain': remain
    }

    const handleOpenPayment = () => {
        setOpenPayment(true);
    }

    const handleClosePayment = (value) => {
        setOpenPayment(false);
        if (value==='200') {
            getData(id);
        }
    }

    const handleDebt = {
        'id': id,
        'fromDate': debtDue
    }

    const handleOpenDebt = () => {
        setOpenChange(true);
    }
    
    const handleCloseChange = (value) => {
        setOpenChange(false);
        if (value==='200') {
            getData(id);
        }
    }

  return (
    <div className="container responsive shadow-lg mb-5 mt-5 p-5 content">
        <div>
            <Button variant='outlined-primary' href='.' size='sm' className='btn-outline'>BACK</Button>
            <Button size='sm' className='btn-fill ms-4' onClick={ e => handleEdit(e)}>EDIT</Button>
        </div>
        <div className="mb-3 mt-3">
            <h2>PURCHASE DETAIL</h2>
        </div>
        <div className='purc-info'>
            <div>
                <span className='info-text'>Number of Receipt</span>
                <span className='text1'>{purchaseId}</span>
            </div>
            <div className='mt-2'>
                <span className='info-text'>Date</span>
                <span className='text1'>{new Date(`${purchaseDate}`).toLocaleString("id-ID", {day: '2-digit', month: '2-digit', year:'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'})}</span>
            </div>
            <div className='mt-2'>
                <span className='info-text'>Supplier</span>
                <span className='text1'>{supplier.Name}</span>
            </div>
        </div>
        <div className='mt-3'>
            <Table bordered className='table-pad'>
                <thead className='table1'>
                    <tr>
                        <th className='col-1'>No.</th>
                        <th className='col-2'>Product Id</th>
                        <th className='col-5'>Name</th>
                        <th className='col-1 text-center'>Unit</th>
                        <th className='col-1 text-center'>Qty</th>
                        <th className='col-2'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    { purchaseDetail.length > 0 ? (purchaseDetail.map((product, index) => (
                        <tr key={product.ProductId}>
                            <th scope='row'>{index+1}</th>
                            <td>{product.ProductId}</td>
                            <td>{product.product.Name}</td>
                            <td className='text-center'>pcs</td>
                            <td className='text-center'>{product.Qty}</td>
                            <td>{(product.PurchasePrice == null) ? "IDR "+ 0:"IDR "+parseInt(product.PurchasePrice).toLocaleString('id-ID')}</td>
                        </tr>
                    ))) : (
                        <tr>
                            <td colSpan={8} className='text-center mb-0'>No Product Purchased</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope='row' colSpan={4} className='text-end pe-5'>Total</th>
                        <td className='text-center'>{totalItem}</td>
                        <td>{(totalPrice == null) ? "IDR "+ 0:"IDR "+parseInt(totalPrice).toLocaleString('id-ID')}</td>
                    </tr>
                </tfoot>
            </Table>
        </div>
        { (status === 1) ? (
            <div className='divbox mt-5 btm-stick'>
                <div className='divbox-item divbox-item-left'><h3>PAID</h3></div>
                <div className='divbox-item divbox-item-right'>
                    <div><span className='info-text text-start'>Payment Method</span><span className='text-box'>{payment}</span></div>
                    <div className='mt-2'><span className='info-text text-start'>Grand Total</span><span className='text-box'>{totalPrice}</span></div>
                    <div className='mt-2'><span className='info-text text-start'>Amount</span><span className='text-box'>{amount}</span></div>
                </div>
            </div>
        ) : (
            <><div className='divbox mt-5 btm-stick'>
                <div className='divbox-item divbox-item-left'><h3>{debtDue}</h3></div>
                <div className='divbox-item divbox-item-right'>
                    <div><span className='info-text text-start'>Payment Method</span><span className='text-box'>{payment}</span></div>
                    <div className='mt-2'><span className='info-text text-start'>Grand Total</span><span className='text-box'>{totalPrice}</span></div>
                    <div className='mt-2'><span className='info-text text-start'>Amount</span><span className='text-box'>{amount}</span></div>
                </div>
            </div>
            <div className='foo-btn'>
            <Button onClick={handleOpenPayment} size='sm' className='btn-fill ms-4'>MAKE PAYMENT</Button>
            <MakePaymentDialog section='purchase/pay' data={handlePayment} open={openPayment} close={handleClosePayment}/>
            <Button onClick={handleOpenDebt} size='sm' className='btn-fill ms-4'>CHANGE DUE DATE</Button>
            <ChangeDateDialog section='purchase/pay' data={handleDebt} open={openChange} close={handleCloseChange}/>
            </div></>
        )}
           
    </div> 
  )
}

export default PurchaseDetails;