import React, {Component} from 'react';
import '../../styles/Table.css';
import '../../styles/Detail.css';
import {getTicketDetailUrl, removeTicketUrl} from "../../constants";
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME, USER_NAME_SESSION_ATTRIBUTE_PASSWORD
} from "../../components/authentication/AuthenticationService";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

class TicketDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticketData: [],
            loading: true,
            ticketType: {},
            account: {}
        };
    }

    componentDidMount() {
        console.log("ID: " + this.props.match.params.id)

        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        fetch(getTicketDetailUrl + this.props.match.params.id, {
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
                this.setState({
                    ticketData: jsonResponse, loading: false,
                    ticketType: jsonResponse.ticketType, account: jsonResponse.account
                })
            }).catch((err) => console.error(err));
    }

    handleDelete = () => {
        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        fetch(removeTicketUrl + this.props.match.params.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization' : AuthenticationService.createBasicAuthToken(username, password)
            }
        })
            .then(function (response) {
                if(response.ok) {
                    alert("Permanentka byla úspěšně smazána");
                    window.location = '/ticket';
                } else {
                    alert("Permanentku se nepodařilo smazat");
                }
            }).then(() => {
        }).catch((err) => console.error(err));

    }

    render() {
        const {ticketData, ticketType, account} = this.state;
        let validString = "";
        if (ticketData.valid) validString = "Platná";
        else validString = "Neplatná";
        return (
            <div className="container text-center">
                <h2>Detail permanentky </h2>
                <div className="align-items-center">
                    <div className="panel panel-info align-items-center text-center">
                        <table className="table table-user-information">
                            <tbody>
                            <tr>
                                <td><b>Název:</b></td>
                                <td>{ticketType.name}</td>
                            </tr>
                            <tr>
                                <td><b>Klient:</b></td>
                                <td>{account.login}</td>
                            </tr>
                            <tr>
                                <td><b>Datum nákupu:</b></td>
                                <td>{ticketData.beginDate}</td>
                            </tr>
                            <tr>
                                <td><b>Datum vypršení:</b></td>
                                <td>{ticketData.endDate}</td>
                            </tr>
                            <tr>
                                <td><b>Platnost:</b></td>
                                <td>{validString}</td>
                            </tr>

                            <tr>
                                <td><b>Možnosti:</b></td>
                                <td><Link to={{
                                    pathname: '/ticket/update/' + ticketData.id,
                                    ticketData: ticketData
                                }} className="btn btn-secondary btn-space">Upravit</Link>
                                    <Button onClick={this.handleDelete}
                                            className="btn btn-danger btn-space">Smazat</Button></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );

    }
}

export default TicketDetailPage;
