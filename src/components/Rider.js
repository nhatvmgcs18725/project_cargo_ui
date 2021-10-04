import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import RiderDashboard from './RiderDashboard';
import RiderDetail from './RiderDetail';
import RiderRequest from './RiderRequest';

import Riderhistory from './Riderhistory';
import Profile from './Profile';

import { isRider } from '../services/AuthService';

function Rider (props) {
  if (!isRider()) {
    return <Redirect to='/' />
  }

  return (
    <Switch>
      <Route path='/rider/request' component={RiderRequest} />
      <Route path='/rider/profile' component={Profile} />
     
      <Route path='/rider/history' component={Riderhistory} />
      <Route path='/rider/:id' component={RiderDetail} />
      <Route component={RiderDashboard} />
    </Switch>
  )
}

export default Rider;
