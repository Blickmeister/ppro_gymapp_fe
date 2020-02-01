import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {Component} from "react";
import {updateEntranceUrl} from "../../constants";
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME,
    USER_NAME_SESSION_ATTRIBUTE_PASSWORD
} from "../../components/authentication/AuthenticationService";

class UpdateTicketEntrancePage extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            beginDate: '',
            endDate: '',
            ticketId:''
        }
    }

    componentDidMount() {
        const {beginDate, endDate} = this.props.location.entranceData;
        this.setState({
            beginDate: beginDate, endDate: endDate, ticketId:this.props.location.ticketId
        });
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    };

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        let beginDate = data.get('beginDate');
        let endDate = data.get('endDate');
        if(beginDate > endDate) {
            alert('Začátek kurzu nemůže být větší než konec kurzu');
        } else {

            let object = {};
            data.forEach(function (value, key) {
                object[key] = value;
            });

            let json = JSON.stringify(object);
            console.log(json);

            const ticketId = this.state.ticketId;
            const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
            const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
            fetch(updateEntranceUrl + this.props.match.params.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': '*',
                    'authorization': AuthenticationService.createBasicAuthToken(username, password)
                },
                body: json
            }).then(function (response) {
                if (response.ok) {
                    alert("Vstup byl upraven");
                    window.location = '/ticket/entrance/' + ticketId;
                } else {
                    alert("Vstup se nepodařilo upravit");
                }
            }).then(function (text) {
            }).catch(function (error) {
                console.error(error)
            });
        }
    }

    render() {
        return (
            <Form className="forms" onSubmit={this.handleSubmit}>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Začátek vstupu</Form.Label>
                    <Form.Control defaultValue={this.state.beginDate} name="beginDate" type="datetime-local"
                                  placeholder="Datum a čas začátku začátku vstupu"
                                  required onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Konec vstupu</Form.Label>
                    <Form.Control defaultValue={this.state.endDate} name="endDate" type="datetime-local"
                                  placeholder="Datum a čas konce vstupu" onChange={this.handleChange}
                                  required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Upravit
                </Button>
            </Form>
        );
    }
}

export default UpdateTicketEntrancePage;
