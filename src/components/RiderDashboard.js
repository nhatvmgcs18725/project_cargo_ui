import React, { useEffect, useState } from 'react';
import {
  Breadcrumb, Col, Row,Card
} from 'react-bootstrap';
import { toast } from 'react-toastify';

import '../UI/Bt.css';

import TripCardRiderH from './TripCardRiderhistory';
import TripCardRiderR from './TripCardRiderRequest';
import { connect, getTrips, messages } from '../services/TripService';

function RiderDashboard (props) {
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
      return (
        trip.driver !== null &&
        trip.status !== 'REQUESTED' &&
        trip.status !== 'COMPLETED' &&
        trip.status !=='CANCELD'
      );
    });
  };
  const getRequestTrips = () => {
    return trips.filter(trip => {
      return (
        trip.driver === null &&
        trip.status === 'REQUESTED'
      );
    });
  };

  const updateToast = (trip) => {
    if (trip.status === 'STARTED') {
      toast.success(`Driver ${trip.driver.first_name} is coming to Send your cargo.`);
    } else if (trip.status === 'IN_PROGRESS') {
      toast.warning(`Driver ${trip.driver.first_name} is headed to your destination.`);
    } else if (trip.status === 'COMPLETED') {
      toast.success(`Driver ${trip.driver.first_name} has dropped cargo off.`);
    }
    else if (trip.status === 'CANCELD') {
      toast.info(`Rider ${trip.rider.first_name} has CANCELD.`);
    }
  };

  return (
    <Row>
      <Col lg={12}>
      <Card>
        <Breadcrumb>
          
          <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        </Card>
        <TripCardRiderH
          title='Current Trip To send'
          trips={getCurrentTrips()}
          group='rider'
          otherGroup='driver'
        />
        <TripCardRiderR
          title='Request Trip'
          trips={getRequestTrips()}
          group='rider'
          otherGroup='driver'
        />
       
       

      </Col>
    </Row>
  );
}

export default RiderDashboard;
