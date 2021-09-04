import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import DriverDashboard from './DriverDashboard';
import DriverDetail from './DriverDetail';

import Driverhistory from './Driverhistory';
import Profile from './Profile';
import ChangeProfile from './ChangeProfile';
import { isDriver } from '../services/AuthService';

function Driver (props) {
  if (!isDriver()) {
    return <Redirect to='/' />
  }

  return (
    <Switch>
      
      <Route path='/driver/Changeprofile' component={ChangeProfile} />
      <Route path='/driver/profile' component={Profile} />
      <Route path='/driver/history' component={Driverhistory} />
      <Route path='/driver/:id' component={DriverDetail} />
      <Route component={DriverDashboard} />
    </Switch>
  );
}

export default Driver;
