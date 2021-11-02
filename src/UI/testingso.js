import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import {
  Breadcrumb, Button, Card, Col, Form, Row
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { getUser } from '../services/AuthService';
import { createTrip } from '../services/TripService';
import Map from './Map';



function RiderRequest (props) {
  const [isSubmitted, setSubmitted] = useState(false);

  const [lat, setLat] = useState(10.781418);
  const [lng, setLng] = useState(106.698321);


  const [alo,setalo] = React.useState(''); 
  const [alo1,setalo1] = React.useState(''); 


 

  useEffect(() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }
  }, []);
  

  


  

const onSubmit = (values, actions) => {
  const rider = getUser();
  createTrip({
    pick_up_address: values.pickUpAddress,
    drop_off_address: values.dropOffAddress,
    cargo_weight : values.cargo_weight,
    cargo_note : values.cargo_note,
    get_cargo_name : values.get_cargo_name,
    phone_number_get_cargo: values.phone_number_get_cargo,
    rider: rider.id
  });
  try{
    setSubmitted(true)

  }
  catch{

  }
  

};

console.warn(alo)


  if (isSubmitted) {
    return <Redirect to='/rider' />
  }

  return (
    <Row>
      <Col lg={12}>
      <Card>
        <Breadcrumb>
          <LinkContainer to='/rider'>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>Request</Breadcrumb.Item>
        </Breadcrumb>
        </Card>
        <Card className='mb-3' bg = 'light' border="secondary">
          <Card.Header>Request Trip</Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                pickUpAddress: '',
                dropOffAddress: '',
                cargo_weight:'',
                cargo_note : 'None',
                get_cargo_name:'',
                phone_number_get_cargo:'',
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
                <Form  onSubmit={handleSubmit}>
                   <Form.Group controlId='get_cargo_name'>
                    <Form.Label>Name of consignee:</Form.Label>
                    <Form.Control
                      className={ 'get_cargo_name' in errors ? 'is-invalid' : '' }
                      name='get_cargo_name'
                      onChange={handleChange}
                      minLength = {2}
                      pattern='[a-zA-Z ]*$'
                      values={values.get_cargo_name}
                      
                      required 
                    />
                    {
                      'get_cargo_name' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.get_cargo_name }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <Form.Group controlId='phone_number_get_cargo'>
                    <Form.Label>Phone number of consignee:</Form.Label>
                    <Form.Control
                      className={ 'phone_number_get_cargo' in errors ? 'is-invalid' : '' }
                      name='phone_number_get_cargo'
                      onChange={handleChange}
                      minLength={8}
                      pattern='^\+?1?\d{8,15}$'
                      values={values.phone_number_get_cargo}
                      required 
                    />
                    {
                      'phone_number_get_cargo' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.phone_number_get_cargo }</Form.Control.Feedback>
                    }
                  </Form.Group>
                   <Form.Group controlId='cargo_weight'>
                    <Form.Label>cargo weight as kilogram:</Form.Label>
                    <Form.Control
                      className={ 'cargo_weight' in errors ? 'is-invalid' : '' }
                      name='cargo_weight'
                      onChange={handleChange}
                      maxLength={3}
                      pattern='^\d+(\.\d+)*$'
                      values={values.cargo_weight}
                      required 
                    />
                    {
                      'cargo_weight' in errors &&
                      <Form.Control.Feedback type='invalid'>{ errors.cargo_weight }</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <Form.Group controlId='group'>
                    <Form.Label>commodity type</Form.Label>
                    <Form.Control
                      as='select'
                      
                      name='cargo_note'
                      onChange={handleChange}
                      value={values.cargo_note}
                    >
                      <option value='None'>....................</option>
                      <option value='Fragile goods'>Fragile goods</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='pickUpAddress'>
                    <Form.Label>Pick up address:</Form.Label>
                    <Form.Control
                      data-cy='pick-up-address'
                      name='pickUpAddress'
                      onChange={handleChange}
                      minLength={6}
                      values={values.pickUpAddress}
                      
                      required
                    />
                  </Form.Group>
                
                    
                  <Form.Group controlId='dropOffAddress'>
                    <Form.Label>Drop off address:</Form.Label>
                    <Form.Control
                      data-cy='drop-off-address'
                      name='dropOffAddress'
                      onChange={handleChange}
                      minLength={6}
                      values={values.dropOffAddress}
                      
                      required
                      
                    />
                  </Form.Group>
                  <Card.Text></Card.Text>
                  <Button className="Butt" variant='warning'  block onClick={() => (setalo(values.dropOffAddress))+setalo1(values.pickUpAddress) + { once: true }}>Check map</Button>

                  <Map
                      lat={lat}
                      lng={lng}
                      zoom={13}
                      pickUpAddress={alo1}
                      dropOffAddress={alo}
                  
                      
                    />
                  
                  <Card.Text></Card.Text>
                  <Button className="Butt" block type='submit' variant='info' disabled={isSubmitting}>Let's Go</Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default RiderRequest;
