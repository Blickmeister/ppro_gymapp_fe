import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {Component} from "react";
import {updateTicketTypeUrl} from "../../constants";
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME,
    USER_NAME_SESSION_ATTRIBUTE_PASSWORD
} from "../../components/authentication/AuthenticationService";

class UpdateTicketTypePage extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: '',
            price: '',
            entrancesTotal: ''
        }
    }

    componentDidMount() {

        const {name, price, entrancesTotal} = this.props.location.ticketTypeData;
        this.setState({name : name, price : price, entrancesTotal : entrancesTotal});

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
        console.log(json);
        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        fetch(updateTicketTypeUrl + this.props.match.params.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization' : AuthenticationService.createBasicAuthToken(username, password)
            },
            body: json
        }).then(function (response) {
            if (response.ok) {
                alert("Typ permanentky byl upraven");
            } else {
                alert("Typ permanentky se nepodařilo upravit");
            }
        }).then(function (text) {
        }).catch(function (error) {
            console.error(error)
        });
    }

    render() {
        return (
            <Form className="forms" onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Název</Form.Label>
                    <Form.Control defaultValue={this.state.name} name="name" type="text" placeholder="Název kurzu" required onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Cena</Form.Label>
                    <Form.Control defaultValue={this.state.price} name="price" type="number" placeholder="Cena kurzu" required onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Kapacita</Form.Label>
                    <Form.Control defaultValue={this.state.entrancesTotal} name="entrancesTotal" type="number" placeholder="Počet možných vstupů" required onChange={this.handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Upravit
                </Button>
            </Form>
        );
    }
}

export default UpdateTicketTypePage;
