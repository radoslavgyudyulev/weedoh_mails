import React, { Component } from 'react';

import { Input, Row, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import NavBar from '../Navbar/Navbar';

import config from '../../config';

import './Registration.css';


const axios = require('axios');

export default class LogIn extends Component {

   constructor(props) {
      super(props);

      this.state = {
         email : '',
         password : '',
         redirect : false
      };
      this.getInputValue = this.getInputValue.bind(this);
      this.sendUserData = this.sendUserData.bind(this);
   }

   sendUserData() {
      let { email, password } = this.state;
      let body = {
         email,
         password
      };
      axios.post(`${config.URL}/api/login`, {
         body : {body}
      }).then(response => {
         let token = response.data.token;
         window.localStorage.setItem('token', token);
         if(response.data.message === 'Success')
            this.setState({
               redirect: true
            }); 
      });
   }

   
   getInputValue(event) {
      let value = event.target.value;
      let name = event.target.name;
      this.setState({[name] : value});
   }

   render() {
      let column = 12;
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
               {this.state.redirect ? <Redirect to='/' /> : ''}
               <h3 className="sign-up">Login</h3>
               <Row>
                  <Input 
                     onChange={this.getInputValue} 
                     name="email" s={column} 
                     label="Email" 
                     validate="true"
                     placeholder="Email">
                     {/* <Icon>account_circle</Icon> */}
                  </Input>
                  <Input 
                     onChange={this.getInputValue} 
                     name="password" s={column} 
                     label="Password" 
                     type="password"
                     validate="true"
                     placeholder="Password">
                     {/* <Icon>https</Icon> */}
                  </Input>
               </Row>
               <Button onClick={this.sendUserData} waves='purple'>Submit</Button>
               {/* https://www.npmjs.com/package/react-google-login */}
               
            </div>
         </div>
      );
   }
}