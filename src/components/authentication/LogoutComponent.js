import React, { Component } from 'react'
import {Redirect} from "react-router-dom";

class LogoutComponent extends Component {
    componentDidMount() {
        alert('Byl jste úspěšně odhlášen');
        window.location = '/';
    }

    render() {
        return null;

    }
}
export default LogoutComponent
