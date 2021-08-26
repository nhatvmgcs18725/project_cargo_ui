import React from 'react';
import { Button,Image} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


function TripMedia({ trip, group, otherGroup }) {
  const user = trip[otherGroup];
  const photoUrl = new URL(user.image, `http://127.0.0.1:8000/media/Img_media/${user.image}`).href;
  const href = group ? `/${group}/${trip.id}` : undefined;

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
                            <h5> Name of Driver:    </h5>    
                                              
                          </strong>
                        </td>
                        <td className="text-primary">
                          <h5> {user.first_name} {user.last_name}  </h5>
                        </td>
                      </tr>
                      <tr>        
                        <td>
                          <strong>
                            <span className="glyphicon glyphicon-bookmark text-primary" /> 
                           <h6> Driver Phone number: </h6>                                           
                          </strong>
                        </td>
                        <td className="text-primary">
                        <h6> {user.phone_number} </h6> 
                        </td>
                      </tr>
                      <tr>        
                        <td>
                          <strong>
                            <span className="glyphicon glyphicon-eye-open text-primary" /> 
                            Name of Consignee:                                          
                          </strong>
                        </td>
                        <td className="text-primary">
                        {trip.get_cargo_name}  
                        </td>
                      </tr>
                      <tr>        
                        <td>
                          <strong>
                            <span className="glyphicon glyphicon-envelope text-primary" /> 
                            Consignee phone number:                                         
                          </strong>
                        </td>
                        <td className="text-primary">
                        {trip.phone_number_get_cargo}    
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
        
                  
    
      </div>
    );
}

export default TripMedia;
