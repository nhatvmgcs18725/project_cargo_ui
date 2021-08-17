import React from 'react';
import { Button, Media } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function TripMediaRider ({ trip, group, otherGroup }) {
  const user = trip[otherGroup];
  const photoUrl = new URL(user.image, `http://127.0.0.1:8000/media/Img_media/${user.image}`).href;
  const href = group ? `/${group}/${trip.id}` : undefined;

  return (
    <Media as='li'>
      <img
        alt={user}
        className='mr-3 rounded-circle'
        src={photoUrl}
        width={80}
        height={80}
      />
      <Media.Body>
        <h5 className='mt-0 mb-1'>Driver: {user.first_name} {user.last_name}</h5>
        Driver phone number  {user.phone_number}<br />
        Name of consignee  {trip.get_cargo_name}<br />
        Phone number of consignee: {trip.phone_number_get_cargo}<br />
        Note {trip.cargo_note} <br />
        cargo weight: {trip.cargo_weight}<br />
        <br />
        <h5>Send to address {trip.pick_up_address} to address {trip.drop_off_address}</h5>
        {trip.status} at {trip.update_work}
        <br />
        {
          href &&
          <LinkContainer to={href}>
            <Button variant='primary' block>Detail</Button>
          </LinkContainer>
        }
      </Media.Body>
    </Media>
  );
}

export default TripMediaRider;
