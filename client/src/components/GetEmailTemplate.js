import React from 'react';


import ReactHtmlParser from 'react-html-parser';
import { Row, Col, Container } from 'reactstrap';
import NavBar from './Navbar/Navbar';

function GetEmailTemplate(props) {
   let { data } = props;
   return (
      <div>
         <Container>
         <NavBar />
            <Row>
               {data.map(item => {
                  return (
                     <Col lg={4}>
                        <div className="email-template" key={item._id}>
                           <p>{item.receivers}</p>
                           <p>{item.date}</p>
                           <div className="html-template">
                           { ReactHtmlParser(item.html) }
                           </div>
                        </div>
                     </Col>
              
                  );
               })}
            </Row>
         </Container>
      </div>
   );
}

export default GetEmailTemplate;