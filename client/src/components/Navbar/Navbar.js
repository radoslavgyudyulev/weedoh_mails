import React from 'react';
import { Navbar, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdbreact';

import Auth from '../Auth';


class NavBar extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         collapse: false,
         isWideEnough: false,
      };
      this.onClick = this.onClick.bind(this);
   }

   onClick() {
      this.setState({
         collapse: !this.state.collapse,
      });
   }
   render() {
      return (
         <Navbar className="navbar-wrapper"  sticky="top" expand="lg" scrolling >
            { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
            <Collapse isOpen = { this.state.collapse } navbar>
               <NavbarNav center="true">
                  <NavItem>
                     <NavLink className="link" to="/">Home</NavLink>
                  </NavItem>
                  {Auth.isUserAuthenticated()
                     ?
                     ''
                     :
                     <NavItem>
                        <NavLink className="link" to="/signup">Sign up</NavLink>
                     </NavItem>}


                     
                  {Auth.isUserAuthenticated()
                     ?
                     ''
                     :
                     <NavItem>
                        <NavLink className="link" to="/login">Login</NavLink>
                     </NavItem>}

                  {Auth.isUserAuthenticated()
                     ?
                     <NavItem>
                        <NavLink className="link" to="/email/get">Templates</NavLink>
                     </NavItem>
                     :
                     ''}

                  {Auth.isUserAuthenticated()
                     ?
                     <NavItem>
                        <NavLink className="link" to="/send">Send</NavLink>
                     </NavItem>
                     :
                     ''}

                  {Auth.isUserAuthenticated() 
                     ?
                     <NavItem> 
                        <NavLink onClick={Auth.deauthenticateUser} className="link" to="#">Logout</NavLink>
                     </NavItem>
                     : ''}


               </NavbarNav>
            </Collapse>
         </Navbar>
      );
   }
}

export default NavBar;





