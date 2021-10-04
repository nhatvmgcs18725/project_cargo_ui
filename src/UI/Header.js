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
import { toast } from 'react-toastify';
import Geocode from "react-geocode";
import { convertDistance, getDistance,getPreciseDistance } from 'geolib';
import {
  
  LoadScript,

  DistanceMatrixService
} from '@react-google-maps/api';


function RiderRequest (props) {
  const [isSubmitted, setSubmitted] = useState(false);

  const [lat, setLat] = useState(10.781418);
  const [lng, setLng] = useState(106.698321);


  const [la, setLatitude] = useState(10.781418);
  const [lang, setLang] = useState(106.698321);
  const [la1, setLatitude1] = useState(10.78238101998759);
  const [lang1, setLang1] = useState(106.69606188685304);
  const [distancee , setDistanc] = useState('');
  const [inpu,setInpu ] = useState('Nhà thờ Đức Bà, Công xã Paris, Bến Nghé, Quận 1, Sài Gòn');
  const [inpu1, setInpu1] = useState('Nhà thờ Đức Bà, Công xã Paris, Bến Nghé, Quận 1, Sài Gòn');
  const [weight, setWeight] = useState('');
  const [notee, setNote] = useState('None');


  Geocode.setApiKey('AAA');

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
      pick_up_address: inpu,
      drop_off_address: inpu1,
      cargo_weight : weight,
      cargo_note : notee,
      get_cargo_name : values.get_cargo_name,
      phone_number_get_cargo: values.phone_number_get_cargo,
      rider: rider.id
    });
    try {
      setSubmitted(true)
      
    }
    catch (response) {
      toast.error(response.status)
      const data = response.response.data;
      for (const value in data) {
        actions.setFieldError(value, data[value].join(' '));
      }
    }
  };

  Geocode.fromAddress(inpu).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      setLatitude(lat);
      setLang(lng);
    },
    error => {
      console.error(error);
    }
  );
  Geocode.fromAddress(inpu1).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      setLatitude1(lat);
      setLang1(lng);
    },
    error => {
      console.error(error);
    }
  );
const Convert_distance = convertDistance(distancee,'km',10)
let a = 0;
 if(notee === 'Fragile goods'){
  a=  (parseFloat(weight) * 3000 * 1.5 * parseFloat(Convert_distance));
 }
 else{
   a=  (parseFloat(weight) * 3000 * parseFloat(Convert_distance));
   
 }
const b = String(a)
console.warn(b)

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
                      onChange={e => setWeight(e.target.value)}
                      maxLength={3}
                      pattern='^\+?1?\d{1,5}$'
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
                      onChange={e => setNote(e.target.value)}
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
                      onChange={e => setInpu(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Map
                      lat={lat}
                      lng={lng}
                      zoom={13}
                      pickUpAddress={inpu}
                      dropOffAddress={inpu1}
                    />
                  <Form.Group controlId='dropOffAddress'>
                    <Form.Label>Drop off address:</Form.Label>
                    <Form.Control
                      data-cy='drop-off-address'
                      name='dropOffAddress'
                      onChange={e => setInpu1(e.target.value)}
                      values={values.dropOffAddress}
                    />
                  </Form.Group>
                  <LoadScript 
  googleMapsApiKey='AAA'
  >
    
    <DistanceMatrixService
options={{
         destinations: [{lat : la1, lng : lang1}],
         origins: [{lat: la, lng : lang}],
         travelMode: "DRIVING",
       }}
callback = {(response) => {const distance = response.rows[0].elements[0].distance.value; setDistanc(distance)}}
/>

  </LoadScript>
  <Form.Group controlId='distance'>
                    <Form.Label>Distance:</Form.Label>
                    <Form.Control
                      
                      name='distance'
                      
                      value = {Convert_distance}
                      disabled
                      
                    />
                  </Form.Group>
                  <Form.Group controlId='price'>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                      
                      name='Price'
                      
                      value = {b}
                      disabled
                      
                    />
                  </Form.Group>
                  <Card.Text></Card.Text>
                  <Button className="Butt" block type='submit' variant='primary' disabled={isSubmitting}>Send cargo</Button>
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
