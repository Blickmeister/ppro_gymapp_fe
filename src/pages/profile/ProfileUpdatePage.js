import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {Component} from "react";
import {updateAccountUrl} from "../../constants";
import AuthenticationService, {USER_NAME_SESSION_ATTRIBUTE_ID, USER_NAME_SESSION_ATTRIBUTE_NAME, USER_NAME_SESSION_ATTRIBUTE_PASSWORD,
    USER_NAME_SESSION_ATTRIBUTE_ROLE} from "../../components/authentication/AuthenticationService";

class ProfileUpdatePage extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
        }
    }

    componentDidMount() {
        const {firstName, lastName, email, phoneNumber} = this.props.location.profilesData;
        this.setState({firstName : firstName, lastName : lastName, phoneNumber : phoneNumber,
            email : email});
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    };

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        data.append('login','login');
        data.append('password','password');

        let object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });

        let json = JSON.stringify(object);

        const actualUserId = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ID);

        fetch(updateAccountUrl + this.props.match.params.id + "/" + actualUserId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization' : AuthenticationService.createBasicAuthToken(sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD))
            },
            body : json
        }).then(function (response) {
            if (response.ok) {
                alert("Účet byl upraven");
                window.location = "/profile";
            } else {
                alert("Účet se nepodařilo upravit");
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
                    <Form.Label>Jméno</Form.Label>
                    <Form.Control defaultValue={this.state.firstName} name="firstName" type="text" placeholder="firstName" required onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Příjmení</Form.Label>
                    <Form.Control defaultValue={this.state.lastName} name="lastName" type="text" placeholder="lastName" required onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control defaultValue={this.state.phoneNumber} name="phoneNumber" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" placeholder="phoneNumber" required onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control defaultValue={this.state.email} name="email" type="text" placeholder="email" required onChange={this.handleChange}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Upravit
                </Button>
            </Form>
        );
    }
}

export default ProfileUpdatePage;
