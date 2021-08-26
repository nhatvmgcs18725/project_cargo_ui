import React, { useState } from 'react';
import axios from 'axios';
import {
  Button, Container, Form, Nav, Navbar, Card
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { isDriver, isRider } from './services/AuthService';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Driver from './components/Driver.js';
import Rider from './components/Rider.js';
import ResetPassword from'./components/ResetPassword';
import ResetPasswordConfirm from './components/ResetPasswordConfirm';
import Profile from './components/Profile';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';




import Footer from './UI/Footer';
import image1 from './asset/xa.png';



function App () {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return window.localStorage.getItem('taxi.auth') !== null;
  });

  const logIn = async (username, password) => {
    const url = `http://127.0.0.1:8000/api/Login/`;
    try {
      const response = await axios.post(url, { username, password });
      window.localStorage.setItem(
        'taxi.auth', JSON.stringify(response.data)
      );
      setLoggedIn(true);
      return { response, isError: false };
    }
    catch (error) {
      console.error(error);
      return { response: error, isError: true };
    }
  };

  const logOut = () => {
    window.localStorage.removeItem('taxi.auth');
    setLoggedIn(false);
  };

  return (
    <div>
    
    <div>
      <Navbar bg='light' expand='lg' variant='light'>
        <LinkContainer to='/'>
          <Navbar.Brand className='logo'>Let's go
          <Switch >
          <Route exact path='/' render={() => (
            <div className='middle-center' >
              
              {
                !isLoggedIn && (
                  <>
                    <Link
                      id='signUp'
                      className='btn btn-primary'
                      to='/sign-up'
                    >Sign up</Link>
                    <Link
                      id='logIn'
                      className='btn btn-primary'
                      to='/log-in'
                    >Log in</Link>
                  </>
                )
              }
              {
                isRider() && (
                  <Link
                    className='btn btn-primary'
                    to='/rider'
                  >Dashboard</Link>
                )
              }
              {
                isDriver() && (
                  <Link
                    className='btn btn-primary'
                    to='/driver'
                  >Dashboard</Link>
                )
              }
            </div>
          )} />
        </Switch>
          
          
          
          
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {
            isRider() && (
              <Nav className='mr-auto'>
                <LinkContainer to='/rider/request'>
                  <Nav.Link>Request a trip</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/rider/history'>
                <Nav.Link>History</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/rider/profile'>
                <Nav.Link>My Profile</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/rider/pass'>
                <Nav.Link>Change password</Nav.Link>
              </LinkContainer>
              
              </Nav>
            )
          }
          {
            isDriver() && (
              <Nav className='mr-auto'>
                
              <LinkContainer to='/driver/history'>
                  <Nav.Link>History</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/driver/profile'>
                <Nav.Link>My Profile</Nav.Link>
              </LinkContainer>
                <LinkContainer to='/driver/pass'>
                  <Nav.Link>Change password</Nav.Link>
                </LinkContainer>
                
                
            </Nav>
            )
          }
          {
            isLoggedIn && (
              <Form inline className='ml-auto'>
                <Button
                  type='button'
                  variant='danger'
                  onClick={() => logOut()}
                >Log out</Button>
              </Form>
            )
          }
        </Navbar.Collapse>
      </Navbar>
      <Container className='pt-3'>
        <Switch >
                
          <Route path='/sign-up' render={() => (
            isLoggedIn ? (
              <Redirect to='/' />
            ) : (
              <SignUp />
            )
          )} />
        <Route path='/reset-password' render={() => (
            isLoggedIn ? (
              <Redirect to='/' />
            ) : (
              <ResetPassword />
            )
          )} />
          <Route path='/ResetPasswordConfirm' render={() => (
            isLoggedIn ? (
              <Redirect to='/' />
            ) : (
              <ResetPasswordConfirm />
            )
          )} />
          <Route path='/log-in' render={() => (
            isLoggedIn ? (
              <Redirect to='/' />
            ) : (
              <LogIn logIn={logIn} />
            )
          )} />
          <Route path='/driver' render={() => (
            <Driver />
          )} />
          <Route path='/rider' render={() => (
            <Rider />
          )} />
        </Switch>
      </Container>
      <ToastContainer />
      
    </div>
    
    <Card.Footer>
      <Footer />
    </Card.Footer>
  
    </div>
    
  );
}

export default App;