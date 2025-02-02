import * as React from 'react';
import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import Searchinput from './Searchinput';
import { useCart } from './Cart';
import { useAuth } from '../login/authContext';
import Cookies from 'js-cookie';
import LogoutIcon from '@mui/icons-material/Logout';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
function Navbar(){
  const navigate=useNavigate();

  const [cart] = useCart();
  const navigateLogin=()=>{
    navigate('/login');
  }
  const navigateCart=()=>{
    navigate('/cart');
  }
  const navigatehome=()=>{
    navigate('/');
  }
  const navigateorder=()=>{
    navigate('/orders');
  }
  const navigateRegister=()=>{
    navigate('/register');
  }
  const navigateProfile=()=>{
    navigate('/profile')
  }
  const [auth, setAuth] = useAuth();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  function handleClick() {
    setIsButtonDisabled(true);
  }
    return (
      <div>
        <Box sx={{ flexGrow: 0.5}}>
      <AppBar position="static" style={{background: "pink"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ':hover': {
              bgcolor: 'whitesmoke', 
              color: 'black',
            } }}
            onClick={navigatehome}
          >
            <Avatar sx={{width: 80, height: 80}}><img src={logo} height='80' width= '80' align="center"></img></Avatar>
          </IconButton>
          <Typography variant="h6" component="div"sx={{ flexGrow: 1}}>
           <Box
           display="grid"
           gridTemplateColumns="repeat(30, minmax(0, 1fr))"
          
           >
            <Box
          gridColumn="span 4"
          margin={4}
          width={800}
          backgroundColor="pink"
          align='center'
          >
            <Searchinput/>
          </Box>
          </Box>
          </Typography>
          <Button
              sx={{padding: 2, borderRadius: 10, width: 400, marginRight:3, color:"black",':hover': {
                bgcolor: 'whitesmoke', 
                color: 'black',
              },}}
              title='Home'
              endIcon={<HomeIcon/>}
              onClick={() => { navigatehome(); handleClick(); }}
              disabled={isButtonDisabled}
              >
                <strong></strong>
            </Button>
            <Button onClick={navigateorder}
              sx={{padding: 2,  borderRadius: 10,width: 500, marginRight:3, color: "black", ':hover': {
                bgcolor: 'whitesmoke', 
                color: 'black',
              },}}
              title='Order Status'
              endIcon={<ReceiptLongIcon/>}>
                <strong></strong>
            </Button>
            <Button onClick={navigateCart}
              sx={{padding: 2,  borderRadius: 10,width: 400, marginRight:3, color: "black", ':hover': {
                bgcolor: 'whitesmoke', 
                color: 'black',
              },}}
              title='Add to Cart'
              startIcon={<ShoppingCartIcon/>}>
            </Button>
          {!auth?.user ? (
                <>
                 
                    <Button 
                     sx={{padding: 2,  borderRadius: 10,width: 10, marginRight:3, color: "black", ':hover': {
                      bgcolor: 'whitesmoke', 
                      color: 'black',
                    },}}
                    onClick={navigateRegister} 
                    className="nav-link"
                    endIcon={<HowToRegIcon/>}
                    title = 'Register'
                    >
                     
                    </Button>
  

                    <Button 
                     sx={{padding: 2,  borderRadius: 10,width: 10, marginRight:3, color: "black", ':hover': {
                      bgcolor: 'whitesmoke', 
                      color: 'black',
                    },}}
                    onClick={navigateLogin}
                    endIcon={<LoginIcon/>}
                    title = 'Login'
                   >
                    </Button>
                </>
              ) : (
<>
                      <Button
                        sx={{padding: 2,  borderRadius: 10,width: 10, marginRight:3, color: "black", ':hover': {
                         bgcolor: 'whitesmoke', 
                         color: 'black',
                       },}}
                       title="My Profile"
                        onClick={navigateProfile}
                         endIcon={<AccountBoxIcon/>}
                       >
                       </Button>
                        <Button
                         sx={{padding: 2,  borderRadius: 10,width: 10, marginRight:3, color: "black", ':hover': {
                          bgcolor: 'whitesmoke', 
                          color: 'black',
                        },}}
                          onClick={handleLogout}
                          to="/login"
                          endIcon={<LogoutIcon/>}
                          title='Log Out'
                        >
                        </Button>
                       </>
              )}
             </Toolbar>
             
      </AppBar>
    </Box>
    
               </div>      
    );
}

export default Navbar;