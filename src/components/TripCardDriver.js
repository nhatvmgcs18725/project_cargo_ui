import React from 'react';
import { Card } from 'react-bootstrap';

import TripMediaDriver from './TripMediaDriver';

function TripCardDriver ({ title, trips, group, otherGroup }) {
  let cardBody;
  let mediaList;

  if (trips.length === 0) {
    cardBody = <>No trips.</>
  } else {
    mediaList = trips.map(trip =>
      <TripMediaDriver
        trip={trip}
        group={group}
        otherGroup={otherGroup}
        key={trip.id}
      />
    )
    cardBody = <ul className='list-unstyled mb-0'>{mediaList}</ul>
  }
  return (
    <Card className='center' bg = 'light' border="secondary">
      <Card.Text></Card.Text>
      <Card.Header>{title}</Card.Header>
      
      <Card.Body>{cardBody}</Card.Body>
      <Card.Text></Card.Text>
    </Card>
  )
}

export default TripCardDriver;
