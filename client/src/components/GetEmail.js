import React, { Component } from 'react';

import axios from 'axios';

import config from '../config';

import Auth from './Auth';

import Template from './GetEmailTemplate';

export default class GetEmails extends Component {

    constructor() {
        super();

        this.state = {
            emails : [],
        }
        
    }
    

    componentDidMount() {
        this.getEmails();
    }

    getEmails() {
      let token = Auth.getToken();

      axios(`${config.URL}/api/getEmails`, {
        headers: {'Authorization': `Bearer ${token}`},
     }).then(response => this.setState({emails : response.data.allEmails}))
        .catch(err => console.log(err));
    }
    

    render() {
        let { emails } = this.state;
        console.log(emails)
        return (
            <div>
            <Template data={emails}/>
            </div>
        )
    }
}
