import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from "./authContext";
import { useNavigate , useLocation} from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';
const Form=()=>{
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
    const [errors, setError]=useState({})

    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
            email,
            password,
          });
          if (res && res.data.success) {
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token,
            });
            localStorage.setItem('auth', JSON.stringify(res.data));
            navigate(location.state || "/");
          } else {
          }
        } catch (error) {
          console.log(error);
        }
      };

       return (
<div>
<form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN</h4>

          <div className="mb-3">
            <TextField
            sx={{margin:3, width: 300}}
              type="email"
              autoFocus
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
              sx={{marginTop: 2, width: 300}}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <Button 
          variant="contained"
          type="submit" className="btn btn-primary" fullWidth
          sx={{marginTop: 5}}>
            LOGIN
          </Button>
          <br></br>
          <div style={{marginTop:30}}>
          If you haven't registered, <Link to ="/register">Click here</Link> to register.
          </div>
        </form>
    </div>
    );
}
export default Form;