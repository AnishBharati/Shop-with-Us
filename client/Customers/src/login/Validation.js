import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
const Validation=(Input)=>{
    let errors={}

    if(!Input.username){
        errors.username="Username Required"
    }
    else if(Input.username.length<5){
        errors.username="Username must be more than 5 characters"
    }

    if(!Input.password){
        errors.password="Password Required"
    }
    else if(Input.password.length<5){
        errors.password="Password must be more than 5 characters"
    }
    return errors;
 }

 export default Validation;