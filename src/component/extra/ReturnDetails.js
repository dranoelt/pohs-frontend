import React, { useEffect, useState } from 'react'
import { useNavigate ,useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import service from '../services/services';
import { ChangeDateDialog, MakePaymentDialog } from '../subview/dialog';

const ReturnDetails = () => {
    const [openPayment, setOpenPayment] = useState(false);
    const [openChange, setOpenChange] = useState(false);
    const [returnId, setReturnId] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [payment, setPayment] = useState('');
    const [debtDue, setDebtDue] = useState('');
    const [totalItem, setTotalItem] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [remain, setRemain] = useState('');
    const [status, setStatus] = useState('');
    const [customer, setCustomer] = useState([]);
    const [returnDetail, setReturnDetail] = useState([]);
    const { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        getData(id);
    }, [id]);

    function getData(id) {
        service.getDataById(`return`, id)
        .then((response) => {
            let _ = response.data;
            setReturnId(_.ReturnId);
            setReturnDate(_.ReturnDate);
            setPayment(_.PaymentMethod);
            setDebtDue(_.DebtDue);
            setTotalItem(_.TotalItem);
            setTotalPrice(_.TotalPrice);
            setAmount(_.Amount);
            setRemain(_.Remain);
            setStatus(_.Status);
            setCustomer(_.customer);
            setReturnDetail(_.returndetails);
        })
    }

    const handleEdit = (e) => {
        e.preventDefault();
        navigate(`../add-return/${id}`, {replace: true});
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
            <h2>RETURN DETAIL</h2>
        </div>
        <div className='purc-info'>
            <div>
                <span className='info-text'>Number of Receipt</span>
                <span className='text1'>{returnId}</span>
            </div>
            <div className='mt-2'>
                <span className='info-text'>Date</span>
                <span className='text1'>{new Date(`${returnDate}`).toLocaleString("id-ID", {day: '2-digit', month: '2-digit', year:'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'})}</span>
            </div>
            <div className='mt-2'>
                <span className='info-text'>Customer</span>
                <span className='text1'>{customer.Name}</span>
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
                    { returnDetail.length > 0 ? (returnDetail.map((returns, index) => (
                        <tr key={returns.ProductId}>
                            <th scope='row'>{index+1}</th>
                            <td>{returns.ProductId}</td>
                            <td>{returns.product.Name}</td>
                            <td className='text-center'>pcs</td>
                            <td className='text-center'>{returns.Qty}</td>
                            <td>{(returns.SalesPrice == null) ? "IDR "+ 0:"IDR "+parseInt(returns.SalesPrice).toLocaleString('id-ID')}</td>
                        </tr>
                    ))) : (
                        <tr>
                            <td colSpan={8} className='text-center mb-0'>No Return Purchased</td>
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
                <MakePaymentDialog section='return/pay' data={handlePayment} open={openPayment} close={handleClosePayment}/>
                <Button onClick={handleOpenDebt} size='sm' className='btn-fill ms-4'>CHANGE DUE DATE</Button>
                <ChangeDateDialog section='return/pay' data={handleDebt} open={openChange} close={handleCloseChange}/>
            </div></>
        )}
           
    </div> 
  )
}

export default ReturnDetails;