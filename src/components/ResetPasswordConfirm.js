import React, { useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import {
  Breadcrumb, Button, Card, Col, Form, Row
} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

const ResetPasswordConfirm = ({match}) =>  {
    const [isSubmitted, setSubmitted] = useState(false);

  const onSubmit = async (values, actions) => {
    const url = `http://127.0.0.1:8000/api/password_reset/confirm/`;
    const formData = new FormData();
    formData.append('password', values.password);
    formData.append('token', values.token);
    
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

        </Breadcrumb>
        <Card className='mb-3' bg='light' border='secondary' >
          <Card.Header>Create your new password</Card.Header>
          <Card.Body>
            <Formik
            
              initialValues={{
                
                password: '',
                token: '',
                
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
                    <Form.Group controlId='token'>
                    <Form.Label>key to reset password:</Form.Label>
                    <Form.Control
                      className={ 'token' in errors ? 'is-invalid' : '' }
                      name='token'
                      onChange={handleChange}
                      type='password'
                      value={values.token}
                      required
                      
                    />
                    {
                      'token' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.token }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  
                  <Form.Group controlId='password'>
                    <Form.Label>password:</Form.Label>
                    <Form.Control
                      className={ 'password' in errors ? 'is-invalid' : '' }
                      name='password'
                      onChange={handleChange}
                      type='password'
                      value={values.password}
                      required
                      
                    />
                    {
                      'email' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.password }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <Card.Text></Card.Text>
                  <Button block type='submit' variant='primary'>Send</Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
          <p className='mt-3 text-center'>
            Already have an account? <Link to='/log-in'>Log in!</Link>
          </p>
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPasswordConfirm;