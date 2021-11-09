import React, { useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import {
  Breadcrumb, Button, Card, Col, Form, Row
} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import '../UI/Bt.css';

function ResetPasswordConfirm (props)  {
    const [isSubmitted, setSubmitted] = useState(false);

    const [err,setErr] = useState('');

  const onSubmit = async (values, actions) => {
    const url = `${process.env.REACT_APP_API_KEY}/api/password_reset/confirm/`;
    const formData = new FormData();
    formData.append('password', values.password);
    formData.append('token', values.token);
    
    try {
      await axios.post(url, formData);
      setSubmitted(true);
    }
    catch (response) {
      if(response.response.data.detail==='Not found.'){
        setErr('Invalid key please check again')
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
       
        <Card className='taget' bg='light' border='secondary' >
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
                <Form  validated onSubmit={handleSubmit}>
                  <Card.Text>Please check your email to get key to reset password</Card.Text>
                    <Form.Group controlId='token'>
                    <Form.Label>key to reset password:</Form.Label>
                    <Form.Control
                      className={ 'token' in errors ? 'is-invalid' : '' }
                      name='token'
                      onChange={handleChange}
                      type='text'
                      value={values.token}
                      required
                      
                    />
                    {
                      'token' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.token }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <Card.Text><p className="err">{err}</p></Card.Text>
                  <Card.Text><li>Password must contains one digit from 0-9</li>
                  <li>Must contains at least one lowercase and one upper characters</li>
                  <li>length at least 10 characters</li></Card.Text>
                  
                  <Form.Group controlId='password'>
                    <Form.Label>New password:</Form.Label>
                    <Form.Control
                      className={ 'password' in errors ? 'is-invalid' : '' }
                      name='password'
                      onChange={handleChange}
                      type='password'
                      value={values.password}
                      pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
                      minLength={10}
                      
                      required
                      
                    />
                    {
                      'password' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.password }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <Card.Text></Card.Text>
                  <Button className="Butt"  block type='submit' variant='primary'>Send</Button>
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