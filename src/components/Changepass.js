import React, { useState } from 'react';
import {
  Breadcrumb,Form,Button,Card,
} from 'react-bootstrap';
import {  Redirect } from 'react-router-dom';

import { getAccessToken } from '../services/AuthService';


function Change_pass (props) {
  const [isSubmitted, setSubmitted] = useState(false);
  const [old_password, setTitle] = useState('');
  const [new_password, setBody] = useState('');
  
  const token = getAccessToken();
  const eaders1 = { 'Content-Type': 'application/json' ,Authorization: `Bearer ${token}` };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pass = { old_password, new_password };

    fetch(`${process.env.REACT_APP_API_KEY}/api/Send_cargo/change-password/`, {
      method: 'PUT',
      headers:  eaders1 ,
      body: JSON.stringify(pass)
      
    })
    try {
      setSubmitted(true);
    }
    catch{

    }
    
  };
  
  if (isSubmitted) {
    return <Redirect to='/' />
  }

  return (
    
    <div>
      <Card className='mb-3' bg='light' border='secondary'>
        <Card.Header>
      <Breadcrumb>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Change passwordss</Breadcrumb.Item>
        </Breadcrumb>
        </Card.Header>
        <Card.Body>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId='old password'>
                        <Form.Label>old password</Form.Label>
                        <Form.Control
                          className='old password'
                          name='passwor'
                          type='password'
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          values={old_password}
                          
                        />
        
                      </Form.Group>

                      <Form.Group controlId='new password'>
                        <Form.Label>new password</Form.Label>
                        <Form.Control
                          className='new password'
                          name='password'
                          type='password'
                          onChange={(e) => setBody(e.target.value)}
                          required
                          values={new_password}
                          
                        />
        
                      </Form.Group>
                      <Card.Text></Card.Text>
                  <Button block type='submit' variant='primary'>Send</Button>

</Form>
</Card.Body>
</Card>
        </div>
  );
}

export default Change_pass;
