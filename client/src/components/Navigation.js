import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';


import LandingPage from './LandingPage/LandingPage';
import Registration from './Authentication/Registration';
import SendMail from './SendMail';
import Login from './Authentication/LogIn';
import GmailCredentials from './GmailCredentials';
import GetEmail from './GetEmail';

import Auth from './Auth';

export default class Routes extends Component {
   render() {
      return ( 
         <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route exact path='/gmail/credentials' component={GmailCredentials}/>
            
            {Auth.isUserAuthenticated() 
               ?
               <Route path='/email/get' exact={true} component={GetEmail} />
               : ''}
              

            {Auth.isUserAuthenticated() 
               ?
               ''
               :
               <Route path='/signup' exact={true} component={Registration} />}

            {Auth.isUserAuthenticated() 
               ? 
               <Route path='/send' exact={true} component={SendMail} /> 
               : 
               <Route path='/send' exact={true} component={Login} />}

            
            {Auth.isUserAuthenticated() 
               ?
               '' 
               :
               <Route path='/login' exact={true} component={Login} />}

            <Route path='*' exact={true} component={LandingPage} />
         </Switch>
        
      );
   }
}


