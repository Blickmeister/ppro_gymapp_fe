import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {createTicketTypeUrl} from "../../constants";
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME,
    USER_NAME_SESSION_ATTRIBUTE_PASSWORD
} from "../../components/authentication/AuthenticationService";

class CreateTicketTypePage extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name:'',
            price:'',
            entrancesTotal:'',
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    };

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
        fetch(createTicketTypeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization' : AuthenticationService.createBasicAuthToken(username, password)
            },
            body: json
        }).then(function (response) {
            if(!response.ok) {
                alert("Typ permanentky se nepodařilo vytvořit");
            } else {
                alert("Typ permanentky byl úspěšně vytvořen");
            }
            console.log(json);
            return response.text();
        }).then(function (text) {
            console.log(text)
        }).catch(function (error) {
            console.error(error)
        });
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Název typu permanentky</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Zadejte název typu permanentky" onChange={this.handleChange} required />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Cena</Form.Label>
                    <Form.Control name="price" type="number" placeholder="Cena typu permanentky" onChange={this.handleChange} required />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Počet možných vstupů</Form.Label>
                    <Form.Control name="entrancesTotal" type="number" placeholder="Počet možných vstupů" onChange={this.handleChange} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Vytvořit typ permanentky
                </Button>
            </Form>

        )
    }
}

export default CreateTicketTypePage;
