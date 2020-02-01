import React, { Component } from 'react'

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
