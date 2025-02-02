import React from 'react';
import login1 from './login1.png';
import login3 from './login3.png';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import {Grid, Paper} from '@mui/material';
import { Box } from "@mui/material";
import Form from './Form';

function Login(){
  const paperstyle= {padding: 20, height: '85vh', width: 450, margin: "20px 20px 20px 14px", backgroundColor:"pink"}
  const avatarstyle={height:'20vh', width: 150, align:"center"}
  const lockscreen= {padding: 20, height: '85vh', width: 500, margin: "20px 20px 20px 120px", screenLeft}
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


    return(
        <div>           
      <Box sx={{ flexGrow: 1}}>
      <Grid container spacing={2}>
      <Grid item xs={5}>
        <Paper elevation={10} style={lockscreen}>
        <img height='450px' width='auto' src={login3}></img>
        </Paper>
        </Grid>
        <Grid item xs={5} align='center'>
        <Paper elevation= {10} style={paperstyle}>
                  <u><h1 align="center" color= "red">Shop With Us</h1></u>
                  <Avatar style={avatarstyle}><img src={login1} height='120vh' width= '150' align="center"></img></Avatar>
        <Form/>
        </Paper>
      </Grid>
      </Grid>
    </Box>
      </div>
);
}

export default Login;
