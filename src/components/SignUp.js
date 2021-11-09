import React, { useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import {
  Breadcrumb, Button, Card, Col, Form, Row
} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import '../UI/Bt.css';

function SignUp (props) {
  const [isSubmitted, setSubmitted] = useState(false);
  const [err,setErr] = useState('');

  const onSubmit = async (values, actions) => {
    const url = `${process.env.REACT_APP_API_KEY}/api/Signup/`;
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('password1', values.password1);
    formData.append('password2', values.password2);
    formData.append('group', values.group);
    formData.append('phone_number', values.phone_number);
    formData.append('image', values.image);
    try {
      await axios.post(url, formData);
      setSubmitted(true);
    }
    catch (response) {
      if (response.response.data.non_field_errors =='Password must match!') {
        setErr('Please check password (Confirm Password must match with Password)!')
        
      }
      const data = response.response.data;
      for (const value in data) {
        actions.setFieldError(value, data[value].join(' '));
      }
    }
  };

  if (isSubmitted) {
    return <Redirect to='/log-in' />
  }

  return (
    <Row>
      <Col lg={12}>
        <Card className='taget'>
        <Breadcrumb>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Sign up</Breadcrumb.Item>
        </Breadcrumb>
        </Card>
        <Card className='taget' bg = 'light' border="secondary" size='sm'>
          
          <Card.Body>
            <Formik
              initialValues={{
                
                email: '',
                first_name: '',
                last_name: '',
                password1: '',
                password2: '',
                group: 'rider',
                phone_number: '',
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
                  
                  <Form.Group controlId='email'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      className={ 'email' in errors ? 'is-invalid' : '' }
                      name='email'
                      onChange={handleChange}
                      required 
                      values={values.email = values.email.toLowerCase()}
                      size = "sm"
                      
                    />
                    {
                      'email' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.email }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <Form.Group controlId='first_name'>
                    <Form.Label>First name:</Form.Label>
                    <Form.Control
                      className={ 'first_name' in errors ? 'is-invalid' : '' }
                      name='first_name'
                      minLength={2}
                      onChange={handleChange}
                      values={values.firs_tName}
                      required 
                      size = "sm"
                    />
                    {
                      'first_name' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.first_name }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <Form.Group controlId='last_name'>
                    <Form.Label>Last name:</Form.Label>
                    <Form.Control
                      className={ 'last_name' in errors ? 'is-invalid' : '' }
                      name='last_name'
                      minLength={2}
                      onChange={handleChange}
                      values={values.last_name}
                      required 
                      size = "sm"
                    />
                    {
                      'last_name' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.last_name }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <Form.Group controlId='password1'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      className={ 'password1' in errors ? 'is-invalid' : '' }
                      name='password1'
                      onChange={handleChange}
                      type='password'
                      value={values.password1}
                      minLength={10}
                      required
                      size = "sm"
                    />
                    {
                      'password1' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.password1 }</Form.Control.Feedback>
                    }
                  </Form.Group>

                  <Card.Text><p className="err">{err}</p></Card.Text>

                  <Form.Group controlId='password2'>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                      className={ 'password2' in errors ? 'is-invalid' : '' }
                      name='password2'
                      onChange={handleChange}
                      type='password'
                      value={values.password2}
                      minLength={10}
                      required
                      size ="sm"
                    />
                    {
                      'password2' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.password2 }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <Form.Group controlId='group'>
                    <Form.Label>Group:</Form.Label>
                    <Form.Control
                      as='select'
                      className={ 'group' in errors ? 'is-invalid' : '' }
                      name='group'
                      onChange={handleChange}
                      value={values.group}
                      size ="sm"
                    >
                      <option value='rider'>Rider</option>
                      <option value='driver'>Driver</option>
                    </Form.Control>
                    {
                      'group' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.group }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <Form.Group controlId='phone_number'>
                    <Form.Label>Phone_number:</Form.Label>
                    <Form.Control
                      className={ 'phone_number' in errors ? 'is-invalid' : '' }
                      name='phone_number'
                      onChange={handleChange}
                      values={values.phone_number}
                      maxLength ={15}
                      required
                      size ="sm"
                    />
                    {
                      'phone_number' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.phone_number }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <Card.Text></Card.Text>
                  <Form.Group controlId='image'>
                    <Form.Label>image:</Form.Label>
                    <Form.Control
                      className={ 'image' in errors ? 'is-invalid' : '' }
                      name='image'
                      size="sm"
                      onChange={event => {
                        setFieldValue('image', event.currentTarget.files[0]);
                      }}
                      type='file'
                      
                      
                    />
                    {
                      'image' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.image }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <Card.Text></Card.Text>
                  <Button className="Butt" block type='submit' variant='primary' >Sign up</Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
          <p className='mt-1 text-center'>
            Already have an account? <Link to='/log-in'>Log in!</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Forgot password? <Link to='/reset-password'>Reset password!</Link>
          </p>
         
        </Card>
      </Col>
    </Row>
  );
}

export default SignUp;
