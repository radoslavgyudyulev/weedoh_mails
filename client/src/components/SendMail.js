import React, { Component } from 'react';

import axios from 'axios';
import config from '../config';

import Auth from './Auth';

import NavBar from './Navbar/Navbar';
import EmailEditor from 'react-email-editor';

export default class SendMail extends Component {

   constructor() {
      super();

      this.state = {
         receivers : '',
         subject : '',
         html : '',
         isTemplateReady : false
      };

      this.getInputValue = this.getInputValue.bind(this);
      this.sendEmail = this.sendEmail.bind(this);
      this.exportHtml = this.exportHtml.bind(this);
   }

   sendEmail() {
      let token = Auth.getToken();
      let body = {
         receivers : this.state.receivers,
         subject : this.state.subject,
         html : this.state.html
      };
      axios(`${config.URL}/api/mails/send`, {
         method : 'POST',
         headers: {'Authorization': `Bearer ${token}`},
         data : {body}
      }).then(response => console.log(response))
         .catch(err => console.log(err));

   }


   getInputValue(event) {
      let value = event.target.value;
      let name = event.target.name;
      this.setState({[name] : value});
   }

   exportHtml() {
      this.editor.exportHtml(data => {
         const { html } = data;
         this.setState({html : html, isTemplateReady : true});
      });
   }

   render() {
      const { isTemplateReady } = this.state;
      return (
         <div className="send-email-wrapper">
            <NavBar />
            {!isTemplateReady
            ?
            <div>
            <h3>Build your template</h3>
            <EmailEditor
               ref={editor => this.editor = editor}
            />
            <button onClick={this.exportHtml}>I'm Ready</button>
            </div>
            :
            <div className="send-mail-inputs">
               <input 
                  placeholder="Receiver" 
                  type="text"
                  name="receivers"
                  onChange={this.getInputValue}
               />
               <input 
                  placeholder="Title" 
                  type="text"
                  name="subject"
                  onChange={this.getInputValue}
               />
               <button onClick={this.sendEmail}>Send</button>
            </div>}
         </div>
      );
   }
}
