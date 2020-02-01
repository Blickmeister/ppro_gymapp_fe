import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME,
    USER_NAME_SESSION_ATTRIBUTE_PASSWORD
} from "../../components/authentication/AuthenticationService";

class UpdateRole extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        let object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });
        let json = JSON.stringify(object);
        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        fetch('http://localhost:8080/roles/update/4', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization' : AuthenticationService.createBasicAuthToken(username, password)
            },
            body: json
        }).then(function (response) {
            if(!response.ok) {
                alert("Roli se nepodařilo vytvořit");
            } else {
                alert("Role byla úspěšně vytvořena");
            }
            console.log(json);
            return response.text();
        }).then(function (text) {
            console.log(text)
        }).catch(function (error) {
            alert("Roli se nepodařilo vytvořit");
            console.error(error)
        });
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Název role</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Zadejte název role" required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Vytvořit roli
                </Button>
            </Form>

        )
    }
}

export default UpdateRole;
