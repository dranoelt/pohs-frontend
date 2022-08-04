import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './component/Header';
import Home from './component/Home';
import Sale from './component/transaction/Sale';
import SaleAdd from './component/transaction/SaleAdd';
import SaleDetails from './component/transaction/SaleDetails';
import Product from './component/storage/Product';
import Purchase from './component/transaction/Purchase';
import PurchaseAdd from './component/transaction/PurchaseAdd';
import PurchaseDetails from './component/transaction/PurchaseDetails';
import ProductAdd from './component/storage/ProductAdd';
import ProductDetails from './component/storage/ProductDetails';
import Return from './component/extra/Return';
import ReturnAdd from './component/extra/ReturnAdd';
import ReturnDetails from './component/extra/ReturnDetails';
import OperationCost from './component/extra/OperationCost';
import OperationCostAdd from './component/extra/OperationCostAdd';
import OperationCostDetails from './component/extra/OperationCostDetails';
import Customer from './component/parties/Customer';
import CustomerAdd from './component/parties/CustomerAdd';
import CustomerDetails from './component/parties/CustomerDetails';
import Supplier from './component/parties/Supplier';
import SupplierAdd from './component/parties/SupplierAdd';
import SupplierDetails from './component/parties/SupplierDetails';
import Daily from './component/report/Daily';
import Weekly from './component/report/Weekly';
import Monthly from './component/report/Monthly';
import Login from './component/login/Login';
import Register from './component/login/Register';
import authService from './component/services/auth-service';
import Settings from './component/settings/Settings';
import ForgetPassword from './component/login/ForgetPassword';
import EditProfile from './component/settings/EditProfile';
import ChangePass from './component/settings/ChangePass';
// import { useEffect } from 'react';

function App() {
  const user = authService.getCurrentUser();
  const location = useLocation();
  // let date = Math.round( new Date().getTime()/1000);
  // const interval = setInterval(check(user.exp), 1000);
  // const interval = (user && user.Token && date<user.exp) ? setInterval(() => check(user.exp), 1000) : '';
  // useEffect(() => {
  //   if (user && user.Token && date>user.exp) {
  //     console.log(date + ' ' + user.exp);
  //     authService.logout();
  //     clearInterval(interval);
  //   }
  // })

  // function check(exp) {
  //   let date = Math.round( new Date().getTime()/1000);
  //   if (date > (exp - (30*60)) && date < exp) {
  //     console.log(false)
  //     // authService.refreshToken();
  //   }
  //   console.log('abc ' + date);
  // }
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ user ? <Header/> : <Navigate to='login' state={location}/>} >
          <Route index element={<Home/>}/>
          <Route path='purchase'>
            <Route index element={<Purchase/>}/>
            <Route path='add-purchase/:id'element={<PurchaseAdd/>}/>
            <Route path=':id' element={<PurchaseDetails/>}/>
          </Route>
          <Route path='sale'>
            <Route index element={<Sale/>}/>
            <Route path='add-sale/:id' element={<SaleAdd/>}/>
            <Route path=':id' element={<SaleDetails/>}/>
          </Route>
          <Route path='return'>
            <Route index element={<Return/>}/>
            <Route path='add-return/:id' element={<ReturnAdd/>}/>
            <Route path=':id' element={<ReturnDetails/>}/>
          </Route>
          <Route path='operation'>
            <Route index element={<OperationCost/>}/>
            <Route path='add-operation' element={<OperationCostAdd/>}/>
            <Route path=':id' element={<OperationCostDetails/>}/>
          </Route>
          <Route path='product'>
            <Route index element={<Product/>}/>
            <Route path='add-product' element={<ProductAdd/>}/>
            <Route path=':id' element={<ProductDetails/>}/>
          </Route>
          <Route path='customer'>
            <Route index element={<Customer/>}/>
            <Route path='add-customer' element={<CustomerAdd/>}/>
            <Route path=':id' element={<CustomerDetails/>}/>
          </Route>
          <Route path='supplier'>
            <Route index element={<Supplier/>}/>
            <Route path='add-supplier' element={<SupplierAdd/>}/>
            <Route path=':id' element={<SupplierDetails/>}/>
          </Route>
          <Route path='daily' element={<Daily/>}/>
          <Route path='weekly' element={<Weekly/>}/>
          <Route path='monthly' element={<Monthly/>}/>
          <Route path='settings'>
            <Route index element={<Settings/>}/>
            <Route path='edit-profile' element={<EditProfile/>}/>
            <Route path='change-pass' element={<ChangePass/>}/>
          </Route>
        </Route>
        <Route path='/login' element={ user ? <Navigate to='/' replace/> : <Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='*' element={ <Navigate to='/' replace/>}/>
      </Routes>
    </div>
  );
}

export default App;
