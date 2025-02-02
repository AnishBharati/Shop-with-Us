import React from 'react';
import Navbar from './Navbar';
import { useCart } from './Cart';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardMedia, Grid } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import { useEffect } from 'react';
import { useAuth } from '../login/authContext';
import Cookies from 'js-cookie';

export const Cartpage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [instance, setInstance] = useState('');
  const [loading, setLoading] = useState(false);
  const [clientToken, setClientToken] = useState('');
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map(item => {
        total = total + item.price;
      });
      return total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = pid => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex(item => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      Cookies.set('cart', JSON.stringify(myCart), {expires: 7});
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8080/api/v1/customers/braintree/token'
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
    const cartData = Cookies.get('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        'http://localhost:8080/api/v1/customers/payment',
        { nonce, cart }
      );
      setLoading(false);
      Cookies.remove('cart');
      setCart([]);
      navigate('/orders');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div align="center">
        <h1>Your Cart</h1>
        <h4>
          {cart?.length > 0
            ? `You have ${cart.length}  items in your cart `
            : 'Your cart is empty'}
        </h4>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div>
            {cart?.map(p => (
              <Card
              key={p._id} 
                sx={{ maxWidth: 1000, height: 180, margin: '2em', marginLeft: '2em' }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <CardMedia
                      sx={{ height: 180, width: 200, marginBottom: 10 }}
                      image={p.photo}
                      margin="2"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <h4>{p.title}</h4>

                    <p>{p.description.substring(0,30)}</p>
                    <h4>Price: {p.price}</h4>
                    <Button variant = 'contained'
                    onClick={()=>removeCartItem(p._id)}>
                        Remove
                    </Button>
                </Grid>
            </Grid>
            </Card>
            
           ))}
        </div>
        </Grid>
        <Grid
        item xs = {5} >
        <Grid>
            <Grid boxShadow={3} marginBottom={3}>
        <div>
            <h1 sx={{marginRight: 30}}>Cart Summary</h1>
        </div>
        <div style={{marginBottom : 40, marginTop:40, marginLeft: 30}}>
            Total  ||||| Checkout  |||||   Payment
        </div>
        </Grid>
        <Grid>
        <div >
            <h2>Total: {totalPrice()}</h2>
        </div>
        </Grid>
        <div>
            <h3>Address: {auth?.user?.address}</h3>
            {!clientToken || auth?.token ? (
                    ""
                  ) : (
                    <Button
                    style={{margin: 5, width: 500, paddin: 5, marginTop: 50}}
                    variant='contained'
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </Button>
                  )}
        </div>
        <div>
                
            {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                  <h4>Do you want to change Address, then <Link to="/profile">Click here</Link></h4>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <Button
                    variant='contained'
                      onClick={handlePayment}
                      disabled={ !auth?.user?.address}
                      style={{margin: 5, width: 500, paddin: 5, marginTop: 50}}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </Button>
                  </>
                )}
        </div>
        </Grid>
        </Grid>
        </Grid>
    </div>
  )
}

export default Cartpage;