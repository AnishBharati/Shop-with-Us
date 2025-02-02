import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import { SearchProvider } from './mainpage/Search';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './mainpage/Cart';
import { AuthProvider } from './login/authContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
        <SearchProvider>
        <CartProvider>
            <BrowserRouter>
                <App/>
          </BrowserRouter>
        </CartProvider>
    </SearchProvider>
    </AuthProvider>
    
)