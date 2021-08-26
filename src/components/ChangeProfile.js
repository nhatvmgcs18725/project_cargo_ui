import React, { useState } from 'react';
import {
  Breadcrumb,Form,Button,Card,
} from 'react-bootstrap';
import {  Redirect } from 'react-router-dom';


import { getAccessToken,getUser } from '../services/AuthService';

function ChangeProfile (props) {
  const [isSubmitted, setSubmitted] = useState(false);
  const [email, setTitle] = useState('');
  const [phone_number, setBody] = useState('');
  const [images, setImages] = React.useState([]);
  

  
  const token = getAccessToken();
  const eaders1 = { 'Content-Type': 'application/json' ,Authorization: `Bearer ${token}` };
  const isauto = () => {
    const user = getUser();
      return user.id;
    };
  const handleSubmit = (e) => {
    e.preventDefault();
    const pass = { email,phone_number,images };

    fetch(`http://127.0.0.1:8000/api/Send_cargo/chang/${isauto()}`, {
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
          <Breadcrumb.Item active>Change Profile</Breadcrumb.Item>
        </Breadcrumb>
        </Card.Header>
        <Card.Body>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId='email'>
                        <Form.Label>new email</Form.Label>
                        <Form.Control
                          className='email'
                          name='email'
                          type='text'
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          values={email}
                          
                        />
        
                      </Form.Group>

                      <Form.Group controlId='phone_number'>
                        <Form.Label>new phone_number</Form.Label>
                        <Form.Control
                          className='phone_number'
                          name='phone_number'
                          type='text'
                          onChange={(e) => setBody(e.target.value)}
                          required
                          values={phone_number}
                          
                        />
        
                      </Form.Group>
                      
                      <Form.Group controlId='image'>
                    <Form.Label>image:</Form.Label>
                    <Form.Control
                      className='image'
                      name='image'
                      onChange={(e) => setImages(e.target.files[0])}
                      type='file'
                      required
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

export default ChangeProfile;
