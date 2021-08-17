import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import RiderDashboard from './RiderDashboard';
import RiderDetail from './RiderDetail';
import RiderRequest from './RiderRequest';
import Change_pass from './Changepass';
import Riderhistory from './Riderhistory';
import { isRider } from '../services/AuthService';

function Rider (props) {
  if (!isRider()) {
    return <Redirect to='/' />
  }

  return (
    <Switch>
      <Route path='/rider/request' component={RiderRequest} />
      <Route path='/rider/pass' component={Change_pass} />
      <Route path='/rider/history' component={Riderhistory} />
      <Route path='/rider/:id' component={RiderDetail} />
      <Route component={RiderDashboard} />
    </Switch>
  )
}

export default Rider;
