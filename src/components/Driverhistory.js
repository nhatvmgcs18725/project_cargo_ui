import React, { useEffect, useState } from 'react';
import {
  Breadcrumb, Col, Row
} from 'react-bootstrap';
import { toast } from 'react-toastify';

import TripCard from './TripCard';
import { connect, getTrips, messages } from '../services/TripService';

function Driverhistory (props) {
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

  const getCompletedTrips = () => {
    return trips.filter(trip => {
      return trip.status === 'COMPLETED';
    });
  };

  const updateToast = (trip) => {
    if (trip.driver === null) {
      toast.info(`Rider ${trip.rider.username} has requested a call.`);
    }
  };

  return (
    <Row>
      <Col lg={12}>
        <Breadcrumb>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <TripCard
          title='Recent Trips'
          trips={getCompletedTrips()}
          group='driver'
          otherGroup='rider'
        />

      </Col>
    </Row>
  );
}

export default Driverhistory;