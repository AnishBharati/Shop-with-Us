import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { styled } from '@mui/material/styles';
import {Button, Grid, Paper, TextField} from '@mui/material';
import { Box } from "@mui/material";
import login3 from './login3.png';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const lockscreen= {padding: 20, height: '85vh', width: 500, margin: "20px 20px 20px 120px", screenLeft}
  const paperstyle= {padding: 20, height: '85vh', width: 450, margin: "20px 20px 20px 14px", backgroundColor:"pink"}


  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>           
    <Box sx={{ flexGrow: 1}}>
    <Grid container spacing={2}>
    <Grid item xs={5}>
      <Paper elevation={10} style={lockscreen}>
      <img height='450px' width='auto'  src={login3}></img>
      </Paper>
      </Grid>
      <Grid item xs={5} align='center'>
        <Paper elevation= {10} style={paperstyle}>
      <u><h1 align="center" color= "red">Shop With Us</h1></u>
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER</h4>
          <div className="mb-3">
            <TextField
                        sx={{margin:1, width: 300}}

              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <TextField
                        sx={{margin:1, width: 300}}

              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <TextField
                        sx={{margin:1, width: 300}}

              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <TextField
                        sx={{margin:1, width: 300}}
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <TextField
                        sx={{margin:1, width: 300}}

              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <Button 
          variant="contained"
          type="submit" className="btn btn-primary"
          sx={{marginTop: 2}}
          fullWidth>
            REGISTER
          </Button>
          <div style={{marginTop:30}}>
          If you have already registered, <Link to ="/login">Click here</Link> to login.
          </div>
        </form>
      </div>
      </Paper>
      </Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default Register;