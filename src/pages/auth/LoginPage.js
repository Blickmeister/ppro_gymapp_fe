import React, {Component} from 'react'
import AuthenticationService from '../../components/authentication/AuthenticationService';
import {CloseButton} from "react-bootstrap";

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            role: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            message: '',
            isActive : true
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    componentDidMount() {
        this.setState({message: this.props.location.message})
        console.log(this.props.location.message)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked() {
        AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
                this.props.history.push(`/`)
            }).catch(() => {
            this.setState({showSuccessMessage: false})
            this.setState({hasLoginFailed: true})
        })
    }

    handleDismiss() {
        this.setState({isActive: false})
    }

    render() {
        let renderMessage = false;
        if (this.props.location.message != undefined) {
            renderMessage = true;
        }
        return (
            <div>
                <h1>Login</h1>
                {renderMessage && this.state.isActive &&
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>{this.props.location.message}</strong>
                    <button onClick={() => this.handleDismiss()} type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Nesprávné přihlašovací údaje</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    User Name: <input type="text" name="username" value={this.state.username}
                                      onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password}
                                     onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

export default LoginComponent
