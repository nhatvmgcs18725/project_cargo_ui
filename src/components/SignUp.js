import React, { useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import {
  Breadcrumb, Button, Card, Col, Form, Row
} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

function SignUp (props) {
  const [isSubmitted, setSubmitted] = useState(false);

  const onSubmit = async (values, actions) => {
    const url = `http://127.0.0.1:8000/api/Signup/`;
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('email', values.email);
    formData.append('first_name', values.firstName);
    formData.append('last_name', values.lastName);
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
        <Breadcrumb>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Sign up</Breadcrumb.Item>
        </Breadcrumb>
        <Card className='mb-2' bg = 'light' border="secondary">
          <Card.Header>Sign up</Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                username: '',
                email: '',
                firstName: '',
                lastName: '',
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
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId='username'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      className={ 'username' in errors ? 'is-invalid' : '' }
                      name='username'
                      onChange={handleChange}
                      values={values.username}
                      required
                    />
                    {
                      'username' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.username }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <Form.Group controlId='email'>
                    <Form.Label>email:</Form.Label>
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
                  <Form.Group controlId='firstName'>
                    <Form.Label>First name:</Form.Label>
                    <Form.Control
                      className={ 'firstName' in errors ? 'is-invalid' : '' }
                      name='firstName'
                      onChange={handleChange}
                      values={values.firstName}
                      required
                    />
                    {
                      'firstName' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.firstName }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <Form.Group controlId='lastName'>
                    <Form.Label>Last name:</Form.Label>
                    <Form.Control
                      className={ 'lastName' in errors ? 'is-invalid' : '' }
                      name='lastName'
                      onChange={handleChange}
                      values={values.lastName}
                      required
                    />
                    {
                      'lastName' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.lastName }</Form.Control.Feedback>
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
                      required
                    />
                    {
                      'password1' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.password1 }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <Form.Group controlId='password2'>
                    <Form.Label>re input Password:</Form.Label>
                    <Form.Control
                      className={ 'password2' in errors ? 'is-invalid' : '' }
                      name='password2'
                      onChange={handleChange}
                      type='password'
                      value={values.password2}
                      required
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
                    <Form.Label>phone_number:</Form.Label>
                    <Form.Control
                      className={ 'phone_number' in errors ? 'is-invalid' : '' }
                      name='phone_number'
                      onChange={handleChange}
                      values={values.phone_number}
                      required isInvalid
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
                  <Button block type='submit' variant='primary'>Sign up</Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
          <p className='mt-3 text-center'>
            Already have an account? <Link to='/log-in'>Log in!</Link>
          </p>
          <p className='mt-3 text-center'>
            Forgot password <Link to='/reset-password'>reset password</Link>
          </p>
        </Card>
      </Col>
    </Row>
  );
}

export default SignUp;
