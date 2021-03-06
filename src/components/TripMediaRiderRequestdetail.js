import React from 'react';
import { Button,Image} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../UI/RiDiDe.css';

function TripMediaRiderRequestD({ trip, group, otherGroup }) {
  const user = trip[otherGroup];
  const href = group ? `/${group}/${trip.id}` : undefined;

  return (
      <div>
        <div className="container bootstrap snippets bootdey">
          <div className="panel-body inf-content">
            <div className="row">
              <div className="col-md-4">
              <div className="card">
            <div className="card-body">
            </div>
            </div>
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
                            Distance                                              
                          </strong>
                        </td>
                        <td className="text-primary">
                        {trip.cargo_distance}  Km
                        </td>
                      </tr>
                      <tr>        
                        <td>
                          <strong>
                            <span className="glyphicon glyphicon-calendar text-primary" />
                            Price                                            
                          </strong>
                        </td>
                        <td className="text-primary">
                        <h4>{trip.cargo_price} VND</h4>
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

export default TripMediaRiderRequestD;
