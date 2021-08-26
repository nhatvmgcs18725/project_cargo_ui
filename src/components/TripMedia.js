import React,{useEffect,useState} from 'react';
import { Button, Media,Col,Card,Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Map from './Map';

function TripMedia ({ trip, group, otherGroup }) {
  const user = trip[otherGroup];
  const photoUrl = new URL(user.image, `http://127.0.0.1:8000/media/Img_media/${user.image}`).href;
  const href = group ? `/${group}/${trip.id}` : undefined;
  const [lat, setLat] = useState(38.897957);
  const [lng, setLng] = useState(-77.036560);

  useEffect(() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }
  }, []);


  return (
    <div>
      <div className="container bootstrap snippets bootdey">
        <div className="panel-body inf-content">
          <div className="row">
            <div className="col-md-4">
            <Image src= {user.image} width={300}
        height={250} roundedCircle fluid/>
              <ul title="Ratings" className="list-inline ratings text-center">
                <li><a href="#"><span className="glyphicon glyphicon-star" /></a></li>
                <li><a href="#"><span className="glyphicon glyphicon-star" /></a></li>
                <li><a href="#"><span className="glyphicon glyphicon-star" /></a></li>
                <li><a href="#"><span className="glyphicon glyphicon-star" /></a></li>
                <li><a href="#"><span className="glyphicon glyphicon-star" /></a></li>
              </ul>
            </div>
            <div className="col-md-6">
              <strong>Information</strong><br />
              <div className="table-responsive">
                <table className="table table-user-information">
                  <tbody>
                    <tr>    
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-user  text-primary" />
                          <h5> Name of consignee:    </h5>    
                                            
                        </strong>
                      </td>
                      <td className="text-primary">
                        <h5>{trip.get_cargo_name} </h5>
                      </td>
                    </tr>
                    <tr>        
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-bookmark text-primary" /> 
                         <h6> Consignee Phone number: </h6>                                           
                        </strong>
                      </td>
                      <td className="text-primary">
                      <h6>{trip.phone_number_get_cargo} </h6> 
                      </td>
                    </tr>
                    <tr>        
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-eye-open text-primary" /> 
                          Name of consignor:                                          
                        </strong>
                      </td>
                      <td className="text-primary">
                      {user.first_name} {user.last_name}    
                      </td>
                    </tr>
                    <tr>        
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-envelope text-primary" /> 
                          Consignor phone number:                                         
                        </strong>
                      </td>
                      <td className="text-primary">
                      {user.phone_number}    
                      </td>
                    </tr>
                    <tr>        
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-calendar text-primary" />
                          Cargo weight:                                              
                        </strong>
                      </td>
                      <td className="text-primary">
                      {trip.cargo_weight}  kilogram   
                      </td>
                    </tr>
                    <tr>        
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-calendar text-primary" />
                          Note:                                             
                        </strong>
                      </td>
                      <td className="text-primary">
                      {trip.cargo_note} 
                      </td>
                    </tr>
                    <tr>    
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-user  text-primary" />
                          <h4>Address: </h4>    
                                            
                        </strong>
                      </td>
                      <td className="text-primary">
                      <h5>From: {trip.pick_up_address} <br></br> To: {trip.drop_off_address}</h5>
                      </td>
                    </tr>
                    <tr>        
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-calendar text-primary" />
                          Status                                              
                        </strong>
                      </td>
                      <td className="text-primary">
                      {trip.status} at: {trip.update_work}
                      </td>
                    </tr>                               
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
                  <Map
                    lat={lat}
                    lng={lng}
                    zoom={13}
                    pickUpAddress={trip.pickUpAddress}
                    dropOffAddress={trip.dropOffAddress}
                  />
  
    </div>
  );
}

export default TripMedia;
