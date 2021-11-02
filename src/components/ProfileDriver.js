import React, { useEffect, useState } from 'react';
import { Card,Breadcrumb,Form,Button,Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Image } from 'react-bootstrap';
import { getAccessToken,getUser } from '../services/AuthService';
import axios from "axios";
import './Login.css';
import { Formik } from 'formik';
import {toast} from 'react-toastify';

function ProfileDriver(props) {
  
  const [showFormz, setShowForm] = useState(false);

  const showForm = () => {
    setShowForm(!showFormz);
  }
  const [showFormzemail, setShowFormemail] = useState(false);

  const showFormemail = () => {
    setShowFormemail(!showFormzemail);
  }

  const [showFormzphone, setShowFormphone] = useState(false);

  const showFormphone = () => {
    setShowFormphone(!showFormzphone);
  }

  const [showFormzimage, setShowFormimage] = useState(false);

  const showFormimage = () => {
    setShowFormimage(!showFormzimage);
  }

  const isauto = () => {
  const user = getUser();
    return user.id;
  };

  const [isSubmitted, setSubmitted] = useState(false);
  const [old_password, setTitle] = useState('');
  const [new_password, setBody] = useState('');
  const [email, setemail] = useState('');
  const [phone_number, setphone] = useState('');


  const [post, setPost] = React.useState(null);
  const token = getAccessToken();
  const eaders1 = { 'Content-Type': 'application/json' ,Authorization: `Bearer ${token}` };

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_KEY}/api/Send_cargo/change/${isauto()}`,({headers:eaders1})).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const pass = { old_password, new_password };

    fetch(`${process.env.REACT_APP_API_KEY}/api/Send_cargo/change-password/`, {
      method: 'PUT',
      headers:  eaders1 ,
      body: JSON.stringify(pass)
      
      
    }).then(result => result.json()).then(response => {
        
        if(response.code == 400){
          toast.error(response.message)
        }
        else{
            toast.success(response.message)
            
        }
    });
    try{
      setSubmitted(true)
    }catch{}
}
const onSubmit = async (values, actions) => {
  const url = `${process.env.REACT_APP_API_KEY}/api/Send_cargo/change-image/${isauto()}`;
  const formData = new FormData();
  formData.append('image', values.image);
  
  try {
    await axios.put(url, formData,{headers:eaders1});
      setSubmitted(true)
    
  }
  catch (response) {
    const data = response.response.data;
    for (const value in data) {
      actions.setFieldError(value, data[value].join(' '));
    }
  }
};
const handleSubmit_e = async (values, actions) => {
  const url = `${process.env.REACT_APP_API_KEY}/api/Send_cargo/change-email/${isauto()}`;
  const formData = new FormData();
  formData.append('email', values.email);
  
  try {
    await axios.put(url, formData,{headers:eaders1});
    
      setSubmitted(true)
    
    
  }
  catch (response) {
    const data = response.response.data;
    for (const value in data) {
      actions.setFieldError(value, data[value].join(' '));
    }
  }
};
const handleSubmit_phone = async (values, actions) => {
  const url = `${process.env.REACT_APP_API_KEY}/api/Send_cargo/change-phone/${isauto()}`;
  const formData = new FormData();
  formData.append('phone_number', values.phone_number);
  
  try {
    await axios.put(url, formData,{headers:eaders1});
    setSubmitted(true)
    
  }
  catch (response) {
    if(response.message == null){
      toast.error("x")
    }
    
    const data = response.response.data;
    for (const value in data) {
      actions.setFieldError(value, data[value].join(' '));
    }
  }
};
const handleSubmit_password = async (values, actions) => {
  const url = `${process.env.REACT_APP_API_KEY}/api/Send_cargo/change-password/`;
  const formData = new FormData();
  formData.append('old_password', values.old_password);
  formData.append('new_password', values.new_password);
  
  try {
    await axios.put(url, formData,{headers:eaders1});
    setSubmitted(true)
    
  }
  catch (response) {
    const data = response.response.data;
    for (const value in data) {
      actions.setFieldError(value, data[value].join(' '));
    }
  }
};
if (isSubmitted) {
  return <Redirect to='/driver/profile' />
}

  return (
    <div className="container bootstrap snippets bootdey">
      <Card className='mb-3' bg='light' border='secondary'>
        <Card.Header>
      <Breadcrumb>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>My profile</Breadcrumb.Item>
        </Breadcrumb>
        </Card.Header>
        </Card>
        <div className="panel-body inf-content">
          <div className="row">
            <div className="col-md-4">
            <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img src={post.image}  className="img-fluid" />
              </div>
            </div>
          </div>
              <ul title="Ratings" className="list-inline ratings text-center">
                <li><a href="#"><span className="glyphicon glyphicon-star" /></a></li>
                <li><a href="#"><span className="glyphicon glyphicon-star" /></a></li>
                <li><a href="#"><span className="glyphicon glyphicon-star" /></a></li>
                <li><a href="#"><span className="glyphicon glyphicon-star" /></a></li>
                <li><a href="#"><span className="glyphicon glyphicon-star" /></a></li>
              </ul>
            </div>
            <div className="col-md-6">
              <strong>Information</strong><br />
              <div className="table-responsive">
                <table className="table table-user-information">
                  <tbody>
                    <tr>    
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-user  text-primary" />    
                         Your Name                                                
                        </strong>
                      </td>
                      <td className="text-primary">
                        {post.first_name} {post.last_name}
                      </td>
                    </tr>
                    <tr>        
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-bookmark text-primary" /> 
                          Username                                                
                        </strong>
                      </td>
                      <td className="text-primary">
                        {post.username}
                      </td>
                    </tr>
                    <tr>        
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-eye-open text-primary" /> 
                          Role                                                
                        </strong>
                      </td>
                      <td className="text-primary">
                        {post.group}
                      </td>
                    </tr>
                    <tr>        
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-envelope text-primary" /> 
                          Email                                                
                        </strong>
                      </td>
                      <td className="text-primary">
                        {post.email} <br></br> <Button onClick={showFormemail}>Change Email</Button>
                      </td>
                    </tr>
                    <tr>        
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-calendar text-primary" />
                          phone_number                                              
                        </strong>
                      </td>
                      <td className="text-primary">
                        {post.phone_number} <br></br><Button onClick={showFormphone}>Change Phone_number</Button>  
                      </td>
                    </tr>
                    <tr>        
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-calendar text-primary" />
                          Password                                                
                        </strong>
                      </td>
                      <td className="text-primary">
                      <Button onClick={showForm}>Change password</Button>
                      </td>
                    </tr>
                    <tr>        
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-calendar text-primary" />
                          Avatar Image                                                
                        </strong>
                      </td>
                      <td className="text-primary">
                      <Button onClick={showFormimage}>Change Avatar</Button>
                      </td>
                    </tr>                                     
                  </tbody>
                </table>
                
                
                {showFormz && (
       <div>
         <Card className='mb-3' bg='light' border='secondary'>
        <Card.Header>
      <Breadcrumb>
          <Breadcrumb.Item active>Change password</Breadcrumb.Item>
        </Breadcrumb>
        </Card.Header>
        <Card.Body>
        <Formik
              initialValues={{
                
                old_password: '',
                new_password: '',
                
              }}
              onSubmit={handleSubmit_password}
            >
              {({
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                values
              }) => (
                <Form onSubmit={handleSubmit}>
                  
                  <Form.Group controlId='old_password'>
                    <Form.Label>Old Password:</Form.Label>
                    <Form.Control
                      className={ 'old_password' in errors ? 'is-invalid' : '' }
                      name='old_password'
                      onChange={handleChange}
                      type='password'
                      value={values.old_password}
                      required
                    />
                    {
                      'old_password' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.old_password }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <Form.Group controlId='new_password'>
                    <Form.Label>New Password:</Form.Label>
                    <Form.Control
                      className={ 'new_password' in errors ? 'is-invalid' : '' }
                      name='new_password'
                      onChange={handleChange}
                      type='password'
                      value={values.new_password}
                      required
                    />
                    {
                      'new_password' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.new_password }</Form.Control.Feedback>
                    }
                  </Form.Group>
              
                  <Card.Text></Card.Text>
                  <Button block type='submit' variant='primary' >Save Change</Button>
                </Form>
              )}
            </Formik>
</Card.Body>
</Card>
       </div>
       
    )}
    {showFormzemail && (
      <div>
         <Card className='mb-3' bg='light' border='secondary'>
        <Card.Header>
      <Breadcrumb>
          
          <Breadcrumb.Item active>Change email</Breadcrumb.Item>
        </Breadcrumb>
        </Card.Header>
        <Card.Body>
        <Formik
              initialValues={{
                email: '',
                
              }}
              onSubmit={handleSubmit_e}
            >
              {({
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                values
              }) => (
                <Form validated onSubmit={handleSubmit}>
                  <Form.Group controlId='email'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      className={ 'email' in errors ? 'is-invalid' : '' }
                      name='email'
                      onChange={handleChange}
                      required 
                      values={values.email}
                      
                    />
                    {
                      'email' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.email }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  
                  <Card.Text></Card.Text>
                  <Button block type='submit' variant='primary' >Save Change</Button>
                </Form>
              )}
            </Formik>
</Card.Body>
</Card>
      </div>
    )}
    {showFormzphone && (
      <div>
         <Card className='mb-3' bg='light' border='secondary'>
        <Card.Header>
      <Breadcrumb>
          
          <Breadcrumb.Item active>Change Phone_number</Breadcrumb.Item>
        </Breadcrumb>
        </Card.Header>
        <Card.Body>
        <Formik
              initialValues={{
                phone_number: '',
                
              }}
              onSubmit={handleSubmit_phone}
            >
              {({
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                values
              }) => (
                <Form validated onSubmit={handleSubmit}>
                  <Form.Group controlId='phone_number'>
                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control
                      className={ 'phone_number' in errors ? 'is-invalid' : '' }
                      name='phone_number'
                      onChange={handleChange}
                      required 
                      values={values.phone_number}
                      
                    />
                    {
                      'phone_number' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.phone_number }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  
                  <Card.Text></Card.Text>
                  <Button block type='submit' variant='primary' >Save Change</Button>
                </Form>
              )}
            </Formik>
</Card.Body>
</Card>
      </div>
    )}
    {showFormzimage && (
     
      
        <Card className='mb-2' bg = 'light' border="secondary">
          <Card.Header>Change Avatar</Card.Header>
          <Card.Body>
            <Formik
              initialValues={{

                image: []
              }}
              onSubmit={onSubmit}
            >
              {({
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                values
              }) => (
                <Form validated onSubmit={handleSubmit}>
                  <Card.Text></Card.Text>
                  <Form.Group controlId='image'>
                    <Form.Label>Avatar : </Form.Label>
                    <Form.Control
                      className={ 'image' in errors ? 'is-invalid' : '' }
                      name='image'
                      onChange={event => {
                        setFieldValue('image', event.currentTarget.files[0]);
                      }}
                      type='file'
                      required
                    />
                    {
                      'image' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.image }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <Card.Text></Card.Text>
                  <Button block type='submit' variant='primary'>Save Change</Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
    )}
      
 
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProfileDriver;
