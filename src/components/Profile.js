import React, { useEffect, useState } from 'react';

import { Image } from 'react-bootstrap';
import { getAccessToken,getUser } from '../services/AuthService';
import axios from "axios";
import './Login.css'


function Profile(props) {

  const isauto = () => {
  const user = getUser();
    return user.id;
  };


  const [post, setPost] = React.useState(null);
  const token = getAccessToken();
  const eaders1 = { 'Content-Type': 'application/json' ,Authorization: `Bearer ${token}` };
  React.useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/Send_cargo/change/${isauto()}`,({headers:eaders1})).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  return (
    <div className="container bootstrap snippets bootdey">
        <div className="panel-body inf-content">
          <div className="row">
            <div className="col-md-4">
            <Image src= {post.image} width={300}
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
                         Your Name                                                
                        </strong>
                      </td>
                      <td className="text-primary">
                        {post.first_name} {post.last_name}
                      </td>
                    </tr>
                    <tr>        
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-bookmark text-primary" /> 
                          Username                                                
                        </strong>
                      </td>
                      <td className="text-primary">
                        {post.username}
                      </td>
                    </tr>
                    <tr>        
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-eye-open text-primary" /> 
                          Role                                                
                        </strong>
                      </td>
                      <td className="text-primary">
                        {post.group}
                      </td>
                    </tr>
                    <tr>        
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-envelope text-primary" /> 
                          Email                                                
                        </strong>
                      </td>
                      <td className="text-primary">
                        {post.email}
                      </td>
                    </tr>
                    <tr>        
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-calendar text-primary" />
                          phone_number                                                
                        </strong>
                      </td>
                      <td className="text-primary">
                        {post.phone_number}
                      </td>
                    </tr>
                    <tr>        
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-calendar text-primary" />
                          create                                                
                        </strong>
                      </td>
                      <td className="text-primary">
                        {post.date_joined}
                      </td>
                    </tr>                                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Profile;
