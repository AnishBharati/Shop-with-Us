import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Box, Button, Grid, colors } from '@mui/material'
import {CardMedia} from '@mui/material'
import './index.css';
import { useCart } from './Cart'
const Productdetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);  

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/customers/get-product/${params.slug}`);
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
      setProduct({});
    }
  };
  

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Box display="grid">
          <Grid container spacing={-10}>
            <Grid item xs={5}>
          
              <div>
                <CardMedia sx={{ height: 500, width: 500 }} image={product.photo} />
              
                </div>
            </Grid>
            <Grid item xs={5}>
              <div>
                <h1 align="center">Product Details</h1>
                
                  <p style={{ marginBottom: "30px", marginLeft: "20px", fontSize: "20px" }}>
                    <strong>Name: </strong>
                    {product.title}
                  </p>
                
                  <p style={{ marginBottom: "30px", marginLeft: "20px", fontSize: "20px" }}>
                    <strong>Description: </strong>
                    {product.description}
                  </p>
                
                  <p style={{ marginBottom: "30px", marginLeft: "20px", fontSize: "20px" }}>
                    <strong>Price: </strong>
                    {product.price}
                  </p>
                
                  <p style={{ marginBottom: "30px", marginLeft: "20px", fontSize: "20px" }}>
                    <strong>Category: </strong>
                    {product.propertyType}
                  </p>
                
                <div class="container">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "pink",
                      color: "black",
                      borderRadius: "10px",
                      width: "300px",
                      height: "50px",
                      marginLeft: "200px",
                    }}
                    onClick={()=>{
                      setCart([...cart, product]);
                      localStorage.setItem('cart', JSON.stringify([...cart,product]));
                   }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Grid>
          
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Productdetails;
