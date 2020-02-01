import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../styles/Forms.css'
import {createCourseUrl, getAllTrainers} from '../../constants';
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME,
    USER_NAME_SESSION_ATTRIBUTE_PASSWORD
} from "../../components/authentication/AuthenticationService";

class CreateCoursePage extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            trainers : [],
            trainerId : '',
            name: '',
            description: '',
            price: '',
            maxCapacity : '',
            beginDate : '',
            endDate : '',
            count : ''
        }
    }

    componentDidMount() {
        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        fetch(getAllTrainers, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'authorization' : AuthenticationService.createBasicAuthToken(username, password)
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({trainers: jsonResponse})
                this.setState({trainerId : jsonResponse[0].id});
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        let beginDate = data.get('beginDate');
        let endDate = data.get('endDate');
        console.log(data.get('beginDate'));
        if(beginDate > endDate) {
            alert('Začátek kurzu nemůže být větší než konec kurzu');
        } else {
            let object = {};
            data.forEach(function (value, key) {
                object[key] = value;
            });
            let json = JSON.stringify(object);

            const trainerId = data.get("trainerId");


            const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
            const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
            fetch(createCourseUrl + trainerId, {
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
                    alert("Kurz byl vytvořen");
                    window.location = '/course';
                } else {
                    alert("Kurz se nepodařilo vytvořit");
                }
            }).then(function (text) {
            }).catch(function (error) {
                console.error(error)
            });
        }
    }


    render() {
        return(
            <Form className="forms" onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Název</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Název kurzu" required />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Popis</Form.Label>
                    <Form.Control name="description" type="text" placeholder="Popis kurzu" required />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Cena</Form.Label>
                    <Form.Control name="price" type="number" placeholder="Cena kurzu" required />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Kapacita</Form.Label>
                    <Form.Control name="maxCapacity" type="number" placeholder="Kapacita kurzu" required />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Začátek kurzu</Form.Label>
                    <Form.Control name="beginDate" type="datetime-local" placeholder="Datum a čas začátku kurzu" required />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Konec kurzu</Form.Label>
                    <Form.Control name="endDate" type="datetime-local" placeholder="Datum konce kurzu" required />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Počet konání</Form.Label>
                    <Form.Control name="count" type="number" placeholder="Počet konání" required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Výběr trenéra</Form.Label>
                    <Form.Control name="trainerId" as="select" onChange={this.handleChange} required>
                        {this.state.trainers.map((trainer, index) => {
                            return (
                                <option key={index} value={trainer.id}>{trainer.firstName} {trainer.lastName}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Vytvořit
                </Button>
            </Form>
        );

    }
}

export default CreateCoursePage;
