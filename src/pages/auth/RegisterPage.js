import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {createAccountAdminUrl, createAccountUrl, getRolesUrl} from "../../constants";
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME, USER_NAME_SESSION_ATTRIBUTE_PASSWORD,
    USER_NAME_SESSION_ATTRIBUTE_ROLE
} from "../../components/authentication/AuthenticationService";

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            roles: [],
            role: '',
            isAdmin : false
        };
    }

    componentDidMount() {
        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        fetch(getRolesUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization' : AuthenticationService.createBasicAuthToken(username, password)
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({roles: jsonResponse})
                //console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));

        const roleName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
        if(roleName === 'Admin') {
            this.setState({isAdmin : true})
        } else {
            this.setState({isAdmin : false})
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        let object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });

        let json = JSON.stringify(object);

        const roleName = data.get("roleName");
        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        if(this.state.isAdmin) {
            fetch(createAccountAdminUrl + roleName, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': '*',
                    'authorization' : AuthenticationService.createBasicAuthToken(username, password)
                },
                body: json
            }).then(function (response) {
                if(response.ok) {
                    alert("Účet byl vytvořen");
                    window.location = '/';
                } else {
                    alert("Účet se nepodařilo vytvořit");
                }
            }).then(function (text) {
                console.log(text)
            }).catch(function (error) {
                console.error(error)
            });
        } else {
            fetch(createAccountUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': '*',
                },
                body: json
            }).then(function (response) {
                if(response.ok) {
                    alert("Účet byl vytvořen");
                    window.location = '/';
                } else {
                    alert("Účet se nepodařilo vytvořit");
                }
            }).then(function (text) {
                console.log(text)
            }).catch(function (error) {
                console.error(error)
            });
        }
    }

    render() {
        const isAdmin = this.state.isAdmin;
        return (
            <Form onSubmit={this.handleSubmit} className="forms">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Jméno</Form.Label>
                    <Form.Control name="firstName" type="text" placeholder="Vaše jméno" required/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Přijmení</Form.Label>
                    <Form.Control name="lastName" type="text" placeholder="Vaše přijmení" required/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Login</Form.Label>
                    <Form.Control name="login" type="text" placeholder="Váš login" required/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Heslo</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Zadejte Vaše heslo" required/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Zadejte Váš email" required/>
                    <Form.Text className="text-muted">
                        Váš e-mail nikdy nebudeme sdílet s nikým jiným.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Telefonní číslo</Form.Label>
                    <Form.Control name="phoneNumber" type="tel" placeholder="Zadejte Telefoní číslo" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" required/>
                    <Form.Text className="text-muted">
                        Zadejte ve formátu 000-000-000
                    </Form.Text>
                </Form.Group>

                {isAdmin &&  <Form.Group>
                    <Form.Label>Role</Form.Label>
                    <Form.Control name="roleName" as="select" required>
                        {this.state.roles.map((role, index) => {
                            return (
                                <option key={index}>{role.name}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>}

                <Button variant="primary" type="submit">
                    Vytvořit účet
                </Button>
            </Form>

        )
    }
}

export default RegisterPage;
