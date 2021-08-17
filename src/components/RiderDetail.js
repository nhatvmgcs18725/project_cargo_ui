import React, { useEffect, useState } from 'react';
import {
  Breadcrumb, Card, Col, Row
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

import TripMediaRider from './TripMediaRider';
import { getTrip } from '../services/TripService';

function RiderDetail ({ match }) {
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const loadTrip = async (id) => {
      const { response, isError } = await getTrip(id);
      if (isError) {
        setTrip(null);
      } else {
        setTrip(response.data);
      }
    }
    loadTrip(match.params.id);
  }, [match]);

  let TripMediaRider;

  if (trip === null) {
    TripMediaRider = <>Loading...</>;
  } else {
    TripMediaRider = (
      <TripMediaRider
        trip={trip}
        otherGroup='driver'
      />
    )
  }

  return (
    <Row>
      <Col lg={12}>
        <Breadcrumb>
          <LinkContainer to='/rider'>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>Trip</Breadcrumb.Item>
        </Breadcrumb>
        <Card className='mb-3' data-cy='trip-card'>
          <Card.Header>Trip</Card.Header>
          <Card.Body>{TripMediaRider}</Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default RiderDetail;
