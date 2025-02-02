import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginpage from "./login/Login";
import Homepage from "./mainpage/Homepage";
import Searchpage from "./mainpage/Searchpage";
import Productdetails from "./mainpage/Productdetails";
import Cartpage from "./mainpage/Cartpage";
import Orderpage from "./mainpage/Orderpage";
import Register from './login/Register';
import Profile from "./mainpage/Profile";
function App(){
    return(
        <div>
                <Routes>
                    <Route path = "/login" element = {<Loginpage/>} />
                    <Route path = "/" element = {<Homepage/>}/>
                    <Route path = "/search" element = {<Searchpage/>}/>
                    <Route path="/product/:slug" element= {<Productdetails/>}/>
                    <Route path="/cart" element ={<Cartpage/>}/>
                    <Route path='/orders' element={<Orderpage/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path="/profile" element = {<Profile/>}/>
                </Routes>

        </div>
    );

    };
export default App;