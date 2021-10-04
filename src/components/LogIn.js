import React,{useState} from 'react';
import { Formik } from 'formik';
import {
  Alert, Breadcrumb, Button, Card, Col, Form, Row
} from 'react-bootstrap';
import { Link } from 'react-router-dom';


function LogIn ({ logIn }) {
  const [err,setErr] = useState('');
  const onSubmit = async (values, actions) => {
    try {
      const { response, isError } = await logIn(
        values.email,
        values.password
      );
      if (isError) {

        if (response.response.data.email =='This field may not be blank.') {
          setErr('Email can not blank')
          
        }
        if (response.response.data.password =='This field may not be blank.') {
          setErr('Password can not blank')
          
        }
        if (response.message ==="Request failed with status code 401") {
          setErr('Please check your password and email agian!!!')
          
        }
        
        const data = response.response.data;
        for (const value in data) {
          actions.setFieldError(value, data[value].join(' '));
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <Row>
      <Col lg={12}>
        <Card>
        <Breadcrumb>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Log in</Breadcrumb.Item>
        </Breadcrumb>
        </Card>
        <Card border="secondary" >
          <Card.Header>Log in</Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              onSubmit={onSubmit} 
            >
              {({
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
                values
              }) => (
                <>
                  {
                    '__all__' in errors &&
                    <Alert variant='danger'>
                      { errors['__all__'] }
                    </Alert>
                  }
                  <Form  onSubmit={handleSubmit}>
                    <Form.Group controlId='email'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name='email'
                        onChange={handleChange}
                        value={values.email}
                      />
                    </Form.Group>
                    <Form.Group controlId='password'>
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        name='password'
                        onChange={handleChange}
                        type='password'
                        value={values.password}
                      />
                    </Form.Group>
                    <Card.Text><a className="err">{err}</a></Card.Text>
                    <Card.Text></Card.Text>
                    <Button
                      className="Butt"
                      variant="success"
                      block
                      disabled={isSubmitting}
                      type='submit'
                      
                    >Log in</Button>
                    
                  </Form>
                </>
              )}
            </Formik>
          </Card.Body>
          <p className='mt-3 text-center'>
            Don't have an account? <Link to='/sign-up'>Sign up!</Link>
          </p>
          <p className='mt-3 text-center'>
            Forgot password? <Link to='/reset-password'>Reset password!</Link>
          </p>
        </Card>
      </Col>
    </Row>
  );
}

export default LogIn;
