import React from 'react';
import { Button, Media } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function TripMedia ({ trip, group, otherGroup }) {
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
        <h5 className='mt-0 mb-1'>{user.first_name} {user.last_name}</h5>
        phone number  {user.phone_number}<br />
        {trip.pick_up_address} to {trip.drop_off_address}<br />
        {trip.status} {trip.update_work}
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

export default TripMedia;
