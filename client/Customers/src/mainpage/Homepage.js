import Box from '@mui/material/Box';
import Navbar from './Navbar';
import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {  useNavigate } from 'react-router-dom';
import { useCart } from './Cart';
import { toast } from 'react-hot-toast';
function Homepage() {   
   const [properties, setProperties] = useState([]);
   const [checked, setChecked]=useState([]);
   const [total, setTotal] = useState(0);
   const navigate = useNavigate();
   const [cart, setCart] = useCart();
   const [page, setPage] = useState(1);
   const[loading, setLoading] = useState(false);
   
    //getting all products from database
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/v1/products/`); // connecting database 
        setProperties(data);
      } 
      catch (error) {
        console.log(error);
      }
    };
    
    useEffect(()=>{
      getAllProducts();
    }, [])


    const handleFilter=(value,id)=>{
      let all=[...checked]
      if(value){
         all.push(id);
      }
      else{
         all=all.filter(c=>c!==id)
      }
      setChecked(all);
   }
  

   return (
      <div>
         <div className="navbar">
            <Navbar/> 
         </div>
         <div>
            <Box
               component="div"
               display="grid"
               gridTemplateColumns="repeat(20, minmax(0, 1fr))"
               sx={{ height: '50vh', padding: 2}}>
               <Box 
                  gridColumn="span 1"
                  padding="2"
                  bgcolor="white">
                  <Box boxShadow={3}>
                  
                     
                  </Box>      

               </Box>
               <Box
                  gridColumn="span 19"
                  marginTop="4"
                  bgcolor="white">
                  <Grid container spacing={3}>
                     {properties?.map((p)=>(
                        <Card sx={{ maxWidth: 320, height: 350, margin: '2em', marginLeft:'2em' }} key={p._id}>
                           <CardMedia
                              sx={{ height: 180}}
                              image={p.photo}
                              margin="2"
                           />
                           <CardContent>
                              <Typography gutterBottom variant="h5" component="div" align="center">
                                 {p.title}
                              </Typography>
                              <Typography>
                                 {p.description}
                              </Typography>
                              <Typography>   
                                 <strong>$ {p.price}</strong>
                              </Typography>
                           </CardContent>
                           <CardActions>
                              <Button size="small" 
                           onClick={()=>navigate(`/product/${p._id}`)}
                           >See Description</Button>
                              <Button size="small"
                               onClick={()=>{
                                 setCart([...cart, p]);
                                 localStorage.setItem('cart', JSON.stringify([...cart,p]));
                                 toast.success("Item is added to cart");
                              }}>Add to Cart</Button>
                           </CardActions>
                        </Card>
                     ))}
                  </Grid>
                  { <div>
                     {properties && properties.length<total && (
                        <Button onClick={(e)=>{
                           e.preventDefault()
                           setPage(page+1);
                        }}> 
                           {loading ? "Loading ..." : "Loadmore"}
                        </Button>
                     )}
                  </div>}
               </Box>
            </Box>
         </div>
      </div>
   );
}

export default Homepage;
