import React, {Component} from 'react';
import '../../styles/NavigationBar.css'
import {USER_NAME_SESSION_ATTRIBUTE_ROLE} from "../authentication/AuthenticationService";
import {Link} from "react-router-dom";

class SideBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const roleName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
        let isAdmin = false;
        if(roleName === 'Admin') {
            isAdmin = true;
        } else {
            isAdmin = false;
        }
        return (
            <div className="sidebar">
                <Link className="btn btn-outline-dark btn-menu" to="/"><b>Domovská stránka</b></Link>
                <Link className="btn btn-outline-dark btn-menu" to="/ticket"><b>Permanentky</b></Link>
                <Link className="btn btn-outline-dark btn-menu" to="/course"><b>Kurzy</b></Link>
                <Link className="btn btn-outline-dark btn-menu" to="/profile"><b>Profil</b></Link>
                {isAdmin && <Link className="btn btn-outline-dark btn-menu" to="/statistics"><b>Statistiky</b></Link>}
            </div>
        );
    }
}

export default SideBar;
