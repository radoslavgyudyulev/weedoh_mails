import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';

import { Container } from 'mdbreact';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

class App extends Component {
   render() {
      return (
         <Router>
            <div>
               <img className="logo"  src="img/logo.png" alt="Weedoh" />
               <Container>
                  <Navigation />
                  <Footer />
               </Container>
    
            </div>
         </Router>
      );
   }
}

export default App;
