import React from 'react'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import { useAuth } from '../login/authContext'
import axios from 'axios'
import Box  from '@mui/material/Box'
import  TextField  from '@mui/material/TextField'
import { Button } from '@mui/material'

const Profile = () => {
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    if (auth && auth?.user) {
      const { email, name, phone, address } = auth.user;
      setName(name);
      setPhone(phone);
      setEmail(email);
      setAddress(address);
    }
  }, [auth?.user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("http://localhost:8080/api/v1/auth/profile", {
        password,
        address,
      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
        <h1>My Profile</h1>
        <Box sx={{display: 'flex' , justifyContent:'center'}}>
        <div>
            <h2>{`Name: ${name}`}</h2>
            <br></br>
            <div className="mb-3">
                <h2>{`Password: `}
                  <TextField
                        variant='outlined'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Enter Your Password"
                    /></h2>
                </div>
                <br></br>
            <h2>{`Phone: ${phone} `}</h2>
<br></br>
            <h2>{`Email: ${email}`}</h2>
<br></br>
<h2>{`Address: `}
        <TextField
        variant='outlined'
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
            id="exampleInputAddress"
            placeholder="Enter Your Address"
        /></h2>
<br></br>
<Button type="submit" 
        variant='contained'
        display="flex"
        justifyContent='center'
        sx={{borderRadius: 10}}>
                   UPDATE
        </Button>
        </div>
        
        </Box>
        </form>
      </div>
    </div>
  )
}

export default Profile;

