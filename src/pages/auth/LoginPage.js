import React, {Component} from 'react'
import AuthenticationService from '../../components/authentication/AuthenticationService';
import {Link} from "react-router-dom";
import '../../styles/App.css'

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
                window.location = '/';
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
        if (this.props.location.message !== undefined) {
            renderMessage = true;
        }
        return (
            <div>
                <h1>Přihlášení</h1>
                {renderMessage && this.state.isActive &&
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>{this.props.location.message}</strong>
                    <button onClick={() => this.handleDismiss()} type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}
                <div className="login-form">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Nesprávné přihlašovací údaje</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}

                        <div className="form-group">
                            <input type="text" name="username" value={this.state.username} className="form-control" onChange={this.handleChange} placeholder="Uživatelské jméno" required="required"/>
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" value={this.state.password} className="form-control" onChange={this.handleChange} placeholder="Heslo" required="required"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" onClick={this.loginClicked}>Přihlásit se</button>
                        </div>

                    <p className="text-center"><Link to="/account/create">Vytvořit účet</Link></p>
                </div>
            </div>
        )
    }
}

export default LoginComponent
