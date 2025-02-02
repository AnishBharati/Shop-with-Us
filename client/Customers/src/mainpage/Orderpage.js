import { useState, useEffect } from 'react'
import React from 'react'
import Cookies from 'js-cookie'
import Navbar from './Navbar'
import axios from 'axios'
import { Card, CardMedia, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import moment from 'moment'
import { useAuth } from '../login/authContext'
const Orderpage = () => {
  const [orders, setOrders] = useState([])
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/v1/auth/orders`);
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
    
    useEffect(() => {
      if (auth?.token) getOrders();
    }, [auth?.token]);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <h1>All Orders</h1>
        {orders?.map((o, i) => {
          console.log('Order:', o)
          return (
            <div key={i}>
              <TableContainer sx={{display: "flex", justifyContent: "center", alignItems: "center" }} component={Paper}>
                <Table sx={{ width: 1000, marginBottom: 5}} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Buyer's Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{o?.status}</TableCell>
                      <TableCell>{o?.buyer?.name}</TableCell>
                      <TableCell>{moment(o?.createdAt).fromNow()}</TableCell>
                      <TableCell>{o.products?.length}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <div>
 {o?.products?.map((p) => (
    <Card sx={{ maxWidth: 1000, height: 180, margin: '2em', marginLeft:'2em', align:"center" }}>
        <Grid container spacing = {2}>
            <Grid item xs={4}>
            <CardMedia
                       sx={{ height: 180, width: 200}}
                       image={p.photo}
                       margin="2"
                    />
            </Grid>
            <Grid item xs = {8}>
                <h4>{p.title}</h4>
                <p>{p.description}</p>
                <h4>Price: {p.price}</h4>
            </Grid>
        </Grid>
    </Card> 
))} 
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orderpage
