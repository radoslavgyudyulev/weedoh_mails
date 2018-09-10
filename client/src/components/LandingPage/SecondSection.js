import React from 'react';

import { Row, Col } from 'reactstrap';

function SecondSection() {
   return (
      <div className="second-section-wrapper">
         <Row>
            <Col lg={6}>
               <div className="first-para">
                  <h3>Our Specialty</h3>
                  <h4>Create beautiful emails, fast.</h4>
                  <br/>
                  <p>Weedoh is the easiest, quickest way to design elegant, mobile responsive emails.</p>
                  <br/>
                  <p>Start with a blank canvas to build your email from scratch
                  or kickstart your design process with one of our ready-to-go email templates. </p>
                  <a href="/send">Start now</a>
               </div>
            </Col>
            <Col lg={6}>
               <div>
                  <img style={{width : '100%'}} src="img/mailtemp.png" alt="Mails Template"/>
               </div>
            </Col>
         </Row>
      </div>
   );
}

export default SecondSection;