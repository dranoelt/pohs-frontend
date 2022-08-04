import React, { useEffect, useRef, useState } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { MdAccountCircle } from 'react-icons/md';
import logo from '../image/Logo.svg';
import authService from '../component/services/auth-service';
import { useSnackbar } from 'notistack';



const Header = () => {
  const [state, setState] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();
  
  let user = authService.getCurrentUser();
  let date = Math.round( new Date().getTime()/1000);
  const intervalId = useRef();


  useEffect(() => {
    if (user&&user.Token&&(date>user.exp)) {
      handleLogout();
    } else if (user&&user.Token&&(date<(user.exp - (30*60)))) {
      intervalId.current = setInterval(() => check(user.exp), (30*60*1000));
    } else if (user&&user.Token&&(date>(user.exp - (30*60)))) {
      check(user.exp);
    }
  })
  
  useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
    }
  })

  function check(exp) {
    let date = Math.round( new Date().getTime()/1000);
    if (date > (exp - (30*60)) && date < exp) {
          authService.refreshToken();
          clearInterval(intervalId.current);
          user = authService.getCurrentUser();
          intervalId.current = setInterval(() => check(user.exp), (30*60*1000));
    }
  }
  
  window.onclick = function (event) {
    if (!event.target.matches('path') && !event.target.matches('.dropdown-icon') && (!state)) {
      const menu = document.getElementById('nav-dropdown-menu');
      menu.classList.remove('show-menu');
      setState(true);
    }
  }
  const handleClick = (e) => {
    e.preventDefault();
    const menu = document.getElementById('nav-dropdown-menu');
    if (state) {
      menu.classList.add('show-menu');
    } else menu.classList.remove('show-menu');
    setState((prev) => !prev);
  }

  const handleLogout = () => {
    authService.logout();
    window.onclick = '';
    navigate('/login', {replace: true});
    enqueueSnackbar('Logged Out', {variant: 'info'})
  }

  return (
    
    <div>
      <Navbar className='navbar'>
        <Navbar.Brand as={Link} to="/" id="nav-brand">
          <img src={logo} alt="logo" style={{height: '30px', marginRight: '1rem'}}/>
          <span>PRO ONE HOME SHOP</span>
          </Navbar.Brand>
          <Nav className='navbar-box'>
            <NavDropdown title="TRANSACTION" id='navbar-dropdown'>
              <NavDropdown.Item id='navbar-dropdown-item' as={Link} to='/sale'>SALE</NavDropdown.Item>
              <NavDropdown.Item id='navbar-dropdown-item' as={Link} to='/purchase'>PURCHASE</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="EXTRA" id='navbar-dropdown'>
                <NavDropdown.Item id='navbar-dropdown-item' as={Link} to='/operation'>OPERATION COST</NavDropdown.Item>
                <NavDropdown.Item id='navbar-dropdown-item' as={Link} to='/return'>RETURN</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link id='navbar-dropdown' as={Link} to='/product'>STORAGE</Nav.Link>
            <NavDropdown title="PARTIES" id='navbar-dropdown'>
              <NavDropdown.Item id='navbar-dropdown-item' as={Link} to='/customer'>CUSTOMER</NavDropdown.Item>
              <NavDropdown.Item id='navbar-dropdown-item' as={Link} to='/supplier'>SUPPLIER</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="REPORT" id='navbar-dropdown'>
              <NavDropdown.Item id='navbar-dropdown-item' as={Link} to='/daily'>DAILY</NavDropdown.Item>
              <NavDropdown.Item id='navbar-dropdown-item' as={Link} to='/weekly'>WEEKLY</NavDropdown.Item>
              <NavDropdown.Item id='navbar-dropdown-item' as={Link} to='/monthly'>MONTHLY</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className='menu-icon'>
            <div className='dropdown-icon'>
              <MdAccountCircle className='dropdown-icon' style={{width: '35px', height: '40px', display: 'block'}} onClick={(e) => handleClick(e)}/>
            </div>
            <div id='nav-dropdown-menu' className='dropdown-menus'>
              <div className='dropdown-items'><Link to='/settings' style={{color: 'black'}}>Settings</Link></div>
              <div className='dropdown-items'><Link to='/' replace style={{color: 'black'}} onClick={handleLogout}>LogOut</Link></div>
            </div>
          </div>
    </Navbar>

    <Outlet/>
    </div>
  )
}

export default Header;