import React, { useEffect, useState } from 'react';
import {
  Breadcrumb, Button, Card, Col, Row
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import TripMedia from './TripMediaRider';
import { getUser } from '../services/AuthService';
import { getTrip, updateTrip } from '../services/TripService';
import '../UI/Bt.css';



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

  const updateTripStatus = (status) => {
    const driver = getUser();
    const updatedTrip = {...trip, driver, status};
    updateTrip({
      ...updatedTrip,
      driver: updatedTrip.driver.id,
      rider: updatedTrip.rider.id
    });
    setTrip(updatedTrip);
  };

  let tripMedia;

  if (trip === null) {
    tripMedia = <>Sorry this trip is not available!</>;
  } else {
    tripMedia = (
      <TripMedia
        trip={trip}
        otherGroup='rider'
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
          <Card.Body>{tripMedia}</Card.Body>
          <Card.Footer>
          
            {
              trip !== null && trip.status === 'STARTED' && (
                <Button
                  className="Butt"
                  data-cy='status-button'
                  block
                  variant='danger'
                  onClick={() => updateTripStatus('CANCELD')}
                >Cancel trip
                </Button>
              )
            }
            
            {
              trip !== null && !['REQUESTED', 'STARTED', 'IN_PROGRESS','COMPLETED'].includes(trip.status) && (
                <span className='text-center'>CANCELD</span>
              )
            }
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}

export default RiderDetail;
