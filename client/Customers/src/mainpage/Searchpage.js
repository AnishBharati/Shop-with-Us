import { Box } from '@mui/material'
import React from 'react'
import { useSearch } from './Search'
import Navbar from './Navbar'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useCart } from './Cart';

const Searchpage = () => {
   const navigate = useNavigate();
   const [cart, setCart] = useCart();

    const [values, setValues]= useSearch()
  return (
   <Box>
    <title>Search Results</title>
    <div>
        <Navbar/>
        <div align="center">
            <h1>Search Results</h1>
            <h4>{values?.results.length<1 ? "No Products found" : `Found ${values?.results.length}`}</h4>
        </div>
        <div>
        <Grid container spacing={1}>
        {values?.results.map((p)=>(
                     <Card sx={{ maxWidth: 320, height: 350, margin: '2em', marginLeft:'2em' }}>
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
                              <strong>$ {p.price}</strong>
                           </Typography>
                        </CardContent>
                        <CardActions>
                           <Button size="small" 
                           onClick={()=>navigate(`/product/${p._id}`)}>See Description</Button>
                              <Button size="small" 
                              onClick={()=>{
                                 setCart([...cart, p]);
                              }}>Add to Cart</Button>
                        </CardActions>
                     </Card>
                     ))}
                    </Grid>
        </div>
    </div>
   </Box>
  )
}

export default Searchpage