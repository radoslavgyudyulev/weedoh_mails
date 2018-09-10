import React from 'react';

import FirstSection from './FirstSectionContent';
import SecondSection from './SecondSection';
import NavBar from '../Navbar/Navbar';

function LandingPage() {
   return (
      <div>
         <div className="App">
            <NavBar />
            <FirstSection />
         </div>   
         <SecondSection />
      </div>
       
   );
}

export default LandingPage;