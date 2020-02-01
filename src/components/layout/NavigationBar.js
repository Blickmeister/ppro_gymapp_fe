import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';
import '../../styles/NavigationBar.css';
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME,
    USER_NAME_SESSION_ATTRIBUTE_ROLE
} from '../authentication/AuthenticationService';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a:hover {
      color: black;
    }
    .text-username {
    margin: 10px;
    
  }
`;

class NavigationBar extends Component {

    render() {
        const roleName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
        let isAdmin = false;
        if (roleName === 'Admin') {
            isAdmin = true;
        } else {
            isAdmin = false;
        }
        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <Styles>
                <Navbar expand="lg" className="main_navbar">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {!isUserLoggedIn &&
                            <Nav.Item>
                                <Link className="btn btn-outline-light" to="/account/create">Registrace</Link>
                            </Nav.Item>
                            }
                            {isUserLoggedIn && isAdmin &&
                            <div className="ml-auto row">
                                <p className="text-light text-username">Přihlášený uživatel: <b>{username}</b></p>
                                <Nav.Item>
                                    <Link className="btn btn-outline-light" to="/account/create">Registrace</Link>
                                </Nav.Item>
                                <Nav.Item>
                                <Link className="btn btn-outline-light" to="/logout"
                                      onClick={AuthenticationService.logout}>Odhlásit se</Link>
                                </Nav.Item>
                            </div>}
                            {isUserLoggedIn && !isAdmin &&
                            <div className="ml-auto row">
                                <p className="text-light text-username">Přihlášený uživatel: <b>{username}</b></p>
                                <Nav.Item>
                                    <Link className="btn btn-outline-light" to="/logout"
                                          onClick={AuthenticationService.logout}>Odhlásit se</Link>
                                </Nav.Item>
                            </div>}
                            {!isUserLoggedIn && <Link className="btn btn-outline-light" to="/login">
                                Přihlásit se</Link>}

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Styles>
        )
    }

}

export default withRouter(NavigationBar);
