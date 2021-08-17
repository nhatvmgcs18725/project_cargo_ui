import React, { useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import {
  Breadcrumb, Button, Card, Col, Form, Row
} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

function ResetPassword (props)  {
    const [isSubmitted, setSubmitted] = useState(false);

  const onSubmit = async (values, actions) => {
    const url = `http://127.0.0.1:8000/api/password_reset/`;
    const formData = new FormData();
    formData.append('email', values.email);
    
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
    return <Redirect to='/ResetPasswordConfirm' />
  }

    return (
        <Row>
          <Col lg={12}>
            <Breadcrumb>
              <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
              
            </Breadcrumb>
            <Card className='mb-3'  bg='light' border='secondary'>
              <Card.Header>Reset your password</Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    email: '',
                    
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
                      <Button block type='submit' variant='primary'>Send</Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
              <p className='mt-3 text-center'>
                Already have an account? <Link to='/log-in'>Log in!</Link>
              </p>
              <p className='mt-3 text-center'>
                Create an account? <Link to='/sign-up'>Sign Up!</Link>
              </p>
            </Card>
          </Col>
        </Row>
      );
};

export default ResetPassword;