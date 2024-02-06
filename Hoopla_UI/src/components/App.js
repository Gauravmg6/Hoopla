import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from "./NavBar";
import Home from "./Home";
import LoginComponent from "./Login";
import RegisterComponent from "./Register"
import Cart from "./cart";
import Detailed from './Detailed';

class App extends Component {
  render() {
    return (
        <Router>
          <Fragment>
            <Navbar/>
            <Routes>
              <Route exact path='/dashboard' element={<Home />}/>
              <Route exact path='/' element={<Home />}/>
              <Route exact path='/login' element={<LoginComponent/>} />
              <Route exact path="/register" element={<RegisterComponent />}></Route>
              <Route exact path="/cart" element={<Cart />}></Route>
              <Route exact path="/details" element={<Detailed />}></Route>
              <Route path="*" element={<Home/>}></Route>
            </Routes>
          </Fragment>
        </Router>
    
    );
  }
}

export default App