import React, { useEffect, useState } from 'react';
import {
  Breadcrumb, Col, Row,Card
} from 'react-bootstrap';
import { toast } from 'react-toastify';

import TripCardDriver from './TripCardDriver';
import { connect, getTrips, messages } from '../services/TripService';

import '../UI/Bt.css';

function DriverDashboard (props) {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const loadTrips = async () => {
      const { response, isError } = await getTrips();
      if (isError) {
        setTrips([]);
      } else {
        setTrips(response.data);
      }
    }
    loadTrips();
  }, []);

  useEffect(() => {
    connect();
    const subscription = messages.subscribe((message) => {
      setTrips(prevTrips => [
        ...prevTrips.filter(trip => trip.id !== message.data.id),
        message.data
      ]);
      updateToast(message.data);
    });
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  }, [setTrips]);

  const getCurrentTrips = () => {
    return trips.filter(trip => {
      return trip.driver !== null && trip.status !== 'COMPLETED';
    });
  };

  const getRequestedTrips = () => {
    return trips.filter(trip => {
      return trip.status === 'REQUESTED';
    });
  };

  const updateToast = (trip) => {
    if (trip.driver === null) {
      toast.info(`Rider ${trip.rider.first_name} has requested a call.`);
    }
    else if (trip.status === 'CANCELD') {
      toast.error(`Rider ${trip.rider.first_name} has CANCELD.`);
    }
    
  };
  
  return (
    <Row>
      <Col lg={12}>
      
        <Breadcrumb>
          
          <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        

        <TripCardDriver
          title='Current Trip'
          trips={getCurrentTrips()}
          group='driver'
          otherGroup='rider'
        />

        <TripCardDriver
          title='Requested Trips'
          trips={getRequestedTrips()}
          group='driver'
          otherGroup='rider'
        />


      </Col>
    </Row>
  );
}

export default DriverDashboard;
