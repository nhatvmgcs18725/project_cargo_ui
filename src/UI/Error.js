import React from 'react';
import { Button, Media ,Image,Col} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../UI/Driver.css'
function TripMediaDriver({ trip, group, otherGroup }) {
  const user = trip[otherGroup];
  const photoUrl = new URL(user.image, `http://127.0.0.1:8000/media/Img_media/${user.image}`).href;
  const href = group ? `/${group}/${trip.id}` : undefined;
  

  return (
    <div>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
        <div className="container profile-page">
          <div className="row">
            <div className="col-xl-6 col-lg-7 col-md-12">
              <div className="card profile-header">
                <div className="body">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-12">
                      <div className="profile-image float-md-right"> <img src={photoUrl} alt="" /> </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-12">
                      <h5 className="m-t-0 m-b-0">Send to: {trip.pick_up_address} to {trip.drop_off_address}</h5>
                      <span className="job_post">Name of consignor: {user.first_name} {user.last_name}</span>
                      <br />
                      <p>consignor phone number:  {user.phone_number}</p>
                      <div>
                      {
          href &&
          <LinkContainer to={href}>
            <Button variant='primary' block>Detail</Button>
          </LinkContainer>
        }
                      </div>
                    </div>                
                  </div>
                </div>                    
              </div>
            </div>
            </div>
           
          
        </div>
      
    

  </div>

   

  );
}

export default TripMediaDriver;
