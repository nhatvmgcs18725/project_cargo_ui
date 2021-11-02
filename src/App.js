import React, { useState } from 'react';
import axios from 'axios';
import {
  Button, Container, Nav, Navbar, Card
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
import {Helmet} from "react-helmet";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './Home.css';



import Footer from './UI/Footer';




function App () {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return window.localStorage.getItem('taxi.auth') !== null;
  });

  const logIn = async (email, password) => {
    const url = `${process.env.REACT_APP_API_KEY}/api/Login/`;
    try {
      const response = await axios.post(url, { email, password });
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
      
    {!isLoggedIn ? ( <div>
      
      <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content />
        <meta name="author" content />
        <title>Let's Go</title>
        {/* Favicon*/}
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        {/* Bootstrap Icons*/}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        {/* Google fonts*/}
        <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />
        {/* SimpleLightbox plugin CSS*/}
        <link href="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.css" rel="stylesheet" />
        {/* Core theme CSS (includes Bootstrap)*/}
        <link href="css/styles.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.js"></script>
        {/* Navigation*/}
        <Helmet>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
        </Helmet>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
          <div className="container px-4 px-lg-5">
            <a className="navbar-brand" href="/">Let's go</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ms-auto my-2 my-lg-0">
                <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
                <li className="nav-item"><a className="nav-link" href="/sign-up">Sign up</a></li>
                <li className="nav-item"><a className="nav-link" href="/log-in">Login</a></li>
              </ul>
              
            </div>
          </div>
        </nav>
        {/* Masthead*/}
        
        <header className="masthead">
        <div> <Container className='pt-3'>
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
      </Container></div>
          <div className="container px-4 px-lg-5 h-100">
            
            <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
              
              <div className="col-lg-8 align-self-end">
                
                <h3 className="text-white font-weight-bold">Welcome to Let's go</h3>
                
                <hr className="divider" />
              </div>
              <div className="col-lg-8 align-self-baseline">
              
                
              </div>
            </div>
          </div>
        </header>
        {/* About*/}
        <section className="page-section bg-primary" id="about">
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-lg-8 text-center">
                <h2 className="text-white mt-0">The shipping cargo application</h2>
                <hr className="divider divider-light" />
                <p className="text-white-75 mb-4">Start  Line 29:23:  The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md  jsx-a11y/anchor-is-valid </p>
                
              </div>
            </div>
          </div>
        </section>
        {/* Services*/}
        
        {/* Portfolio*/}
        {/* Call to action*/}
        {/* Contact*/}
        <section className="page-section" id="contact">
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-lg-8 col-xl-6 text-center">
                <h2 className="mt-0">Let's Get In Touch!</h2>
                <hr className="divider" />
                <p className="text-muted mb-5">Ready to start your next project with us? Send us a 
                Line 29:23:  The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md  jsx-a11y/anchor-is-valid
                messages and we will get back to you as soon as possible!</p>
              </div>
            </div>
            <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
              <div className="col-lg-6">
                {/* * * * * * * * * * * * * * * **/}
                {/* * * SB Forms Contact Form * **/}
                {/* * * * * * * * * * * * * * * **/}
                {/* This form is pre-integrated with SB Forms.*/}
                {/* To make this form functional, sign up at*/}
                {/* https://startbootstrap.com/solution/contact-forms*/}
                {/* to get an API token!*/}
      
              </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
          </div>
        </section>
        {/* Footer*/}
        <Footer />
      </div>

        </div>
          
      ) :(
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
                      id='log'
                      className='btn btn-primary'
                      to='/log-in'
                    >Log in</Link>
                  </>
                )
              }
              {
                isRider() && (
                  <Redirect to="/rider"/>
                )
              }
              {
                isDriver() && (
                  <Redirect to="/driver"/>

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
                <Link
                      id='Tripre'
                      className='btn btn-info' 
                      to='/rider/request'
                    >Request a trip</Link>
                    &ensp;
                    <Link
                      id='Hisrid'
                      className='btn btn-success' 
                      to='/rider/history'
                    >My History</Link>
                    &ensp;
                    <Link
                      id='Prorid'
                      className='btn btn-warning' 
                      to='/rider/profile'
                    >My Profile</Link>
                    &ensp;
                    
              
            
              </Nav>
            )
          }
          {
            isDriver() && (
              <Nav className='mr-auto'>
              <Link
                      id='HisDrid'
                      className='btn btn-success' 
                      to='/driver/history'
                    >My History</Link>
                    &ensp;
              <Link
                      id='ProDrid'
                      className='btn btn-warning' 
                      to='/driver/profile'
                    >My Profile</Link>
                    &ensp;
              
                
            </Nav>
            )
          }
          {
            isLoggedIn && (
              <Nav inline className='mr-auto'>
                <Button
                  type='button'
                  className="btn-danger"
                  onClick={() => logOut()}
                >Log out</Button>
              </Nav>
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
      
      <div>
        <Card.Footer>
      <Footer />
    </Card.Footer>
      </div>
    </div>
    )}
    
    </div>
    
  );
}

export default App;