import React, { Component } from 'react';

import axios from 'axios';
import Auth from './Auth';

import config from '../config';

export default class GmailCredentials extends Component {

   constructor() {
      super();
        
      this.state = {
         gmail : '',
         password : ''
      };

      this.getInputValue = this.getInputValue.bind(this);
      this.sendData = this.sendData.bind(this);
   }



   getInputValue(event) {
      let value = event.target.value;
      let name = event.target.name;
      this.setState({[name] : value});
   }

   sendData() {
      let token = Auth.getToken();
      let body = {
         gmail : this.state.gmail,
         password : this.state.password,
      };
      axios(`${config.URL}/api/gmail/credentials`, {
         method : 'POST',
         headers: {'Authorization': `Bearer ${token}`},
         data : {body}
      }).then(response => console.log(response))
         .catch(err => console.log(err));
   }

    
   render() {
      return (
         <div>
            <h1>Gmail</h1>
            <input 
               name="gmail" 
               onChange={this.getInputValue}
               placeholder="email" 
               type="text"/>
            <input 
               name="password" 
               onChange={this.getInputValue}
               placeholder="password" 
               type="password"/>
            <button onClick={this.sendData}>Send</button>
         </div>
      );
   }
}
