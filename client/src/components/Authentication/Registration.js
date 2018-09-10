import React, { Component } from 'react';

import { Input, Row, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import Auth from '../Auth';
import NavBar from '../Navbar/Navbar';

import config from '../../config';

import './Registration.css';

const axios = require('axios');

export default class Registration extends Component {

   constructor(props) {
      super(props);
        
      this.state = {
         email : '',
         password : '',
         confirmedPassword : '',
         errorMsg: '',
         isError : false,
         redirect : false
      };

      this.getInputValue = this.getInputValue.bind(this);
      this.sendRegistrationData = this.sendRegistrationData.bind(this);
   }
   

   getInputValue(event) {
      let value = event.target.value;
      let name = event.target.name;
      this.setState({[name] : value});
   }

   // ValidateEmail(mail) {
   //     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
   //     {
   //         return (true);
   //     }
   //     alert("You have entered an invalid email address!");
   //     return (false);
   // }

   validateInputs() {
      let { password, confirmedPassword } = this.state;
      if(password !== confirmedPassword) {
         this.setState({isError : true, errorMsg : 'Password does not match'});
      } else {

      }
        
   }

   sendRegistrationData() {
      this.validateInputs();
      let { email,password,confirmedPassword } = this.state;
      let registrationData = {
         email,
         password,
         confirmedPassword
      };
      axios.post(`${config.URL}/api/register`, {
         body: {registrationData}
      }).then(response => {
            if(response.data.message === 'Success') {
                  let token = response.data.token;
                  Auth.authenticateUser(token);
                  this.setState({
                     redirect: true,
                  });
            } else {
                  this.setState({errorMsg : response.data.message});
            }
        
      });

   }
   
   render() {
      let { isError, errorMsg } = this.state;
      let column = 6;
      let margin = '150px';
      for (var i = 100; !window.matchMedia('(max-device-width: ' + i + 'px)').matches; i++) {}
      let deviceWidth = i;
      if(deviceWidth < 400) {
         column = 12;
         margin = '15px';
      }
      return (
         <div>
            <NavBar />
            <div style={{marginLeft : margin, marginRight: margin}} className="registration-wrapper">
               {this.state.redirect ? <Redirect to='/profile' /> : ''}
               <h3 className="sign-up">Sign up</h3>
               <Row>
                  <Input 
                     placeholder="Email" 
                     onChange={this.getInputValue} 
                     name="email" s={column} 
                     label="Email" 
                     validate="true"></Input>
               </Row>

               <Row>
                  <Input 
                     placeholder="Password" 
                     onChange={this.getInputValue} 
                     name="password" s={column} 
                     label="Password" 
                     type="password"
                     validate="true"></Input>
                  <Input 
                     placeholder="Confirm Password" 
                     onChange={this.getInputValue} 
                     name="confirmedPassword" 
                     type="password"
                     s={column} 
                     label="Confirm Password" 
                     validate="true"></Input>
                  {isError ? errorMsg : ''}
               </Row>
                
               <Button onClick={this.sendRegistrationData} waves='purple'>Sign up</Button>
            </div>
         </div>
      );
   }
}
