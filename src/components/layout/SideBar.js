import React, {Component} from 'react';
import '../../styles/NavigationBar.css'
import {USER_NAME_SESSION_ATTRIBUTE_ROLE} from "../authentication/AuthenticationService";
import {Link} from "react-router-dom";

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAdmin : false
        };
    }

    componentDidMount() {
        const roleName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
        if(roleName === 'Admin') {
            this.setState({isAdmin : true})
        } else {
            this.setState({isAdmin : false})
        }
    }

    render() {
        const isAdmin = this.state.isAdmin;
        return (
            <div className="sidebar">
                <Link className="btn btn-outline-dark" to="/">Domovská stránka</Link>
                <Link className="btn btn-outline-dark" to="/ticket">Permanentky</Link>
                <Link className="btn btn-outline-dark" to="/course">Kurzy</Link>
                <Link className="btn btn-outline-dark" to="/profile">Profil</Link>
                {isAdmin && <Link className="btn btn-outline-dark" to="/statistics">Statistiky</Link>}
            </div>
        );
    }
}

export default SideBar;
