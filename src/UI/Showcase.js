import React from 'react';
import { Media,Card ,Image,Col} from 'react-bootstrap';



function TripMediaRiderH({ trip, group, otherGroup }) {
  const user = trip[otherGroup];
  const photoUrl = new URL(user.image, `http://127.0.0.1:8000/media/Img_media/${user.image}`).href;
  

  return (
    <Card className='mb-3' bg = 'light' border="secondary" >
    <Media as='li'>
    <Card className='align-items-center'>
      <Card.Header className='align-items-center'>
    <Col xs={4} md={4}>
      <Image src= {photoUrl} width={150}
        height={130} roundedCircle />
        </Col>
        </Card.Header>
        </Card>
      <Media.Body>
        <h5 className='mt-0 mb-1'>Driver: {user.first_name} {user.last_name}</h5>
        Driver phone number:  {user.phone_number}<br />
        Name of consignee:  {trip.get_cargo_name}<br />
        Phone number of consignee: {trip.phone_number_get_cargo}<br />
        Note: {trip.cargo_note} <br />
        cargo weight: {trip.cargo_weight}  kilogram<br />
        <br />
        <h5>Send to address {trip.pick_up_address} to address {trip.drop_off_address}</h5>
        {trip.status} at: {trip.update_work}
        <br />
        
      </Media.Body>
    </Media>
    </Card>
  );
}

export default TripMediaRiderH;
