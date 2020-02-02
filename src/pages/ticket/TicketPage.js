import React, {Component} from 'react';
import TicketsData from '../../components/tickets/TicketsData';
import {getTicketsByAccountUrl, getTicketsUrl} from '../../constants';
import '../../styles/Table.css'
import Loader from "react-loader-spinner";
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_ID, USER_NAME_SESSION_ATTRIBUTE_NAME, USER_NAME_SESSION_ATTRIBUTE_PASSWORD,
    USER_NAME_SESSION_ATTRIBUTE_ROLE
} from "../../components/authentication/AuthenticationService";
import {Link} from "react-router-dom";

class TicketPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticketsData: [],
            loading: true,
            isEmployee: false,
            isTrainer : false,
            isAdmin : false
        };
    }

    componentDidMount() {
        const roleName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);

        if (roleName === 'Employee' || roleName === 'Admin') {
            this.setState({isEmployee: true})
        } else {
            this.setState({isEmployee: false})
        }
        if (roleName === 'Trainer') {
            this.setState({isTrainer: true})
        } else {
            this.setState({isTrainer: false})
        }
        if (roleName === 'Admin') {
            this.setState({isAdmin: true})
        } else {
            this.setState({isAdmin: false})
        }
        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        if (roleName === 'Employee' || roleName === 'Admin' || roleName === 'Trainer') {
            fetch(getTicketsUrl, {
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
                    this.setState({ticketsData: jsonResponse, loading: false})
                    console.log("response: " + jsonResponse)
                }).catch((err) => console.error(err));
        } else {

            const userId = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ID);
            fetch(getTicketsByAccountUrl + userId + "/all", {
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
                    this.setState({ticketsData: jsonResponse, loading: false})
                    console.log("response: " + jsonResponse)
                }).catch((err) => console.error(err));
        }
    }

    render() {
        const {ticketsData, loading, isEmployee, isTrainer, isAdmin} = this.state;
        return (
            <div className="tables">
                {isEmployee &&
                <div>
                    <h2>Přehled permanentek</h2>
                    {!isAdmin &&
                    <Link to="/ticket/create" className="btn btn-primary btn-create">Vytvořit novou permanentku</Link>}
                </div>}
                {isTrainer && <h2>Přehled permanentek</h2>}
                {!isEmployee && !isTrainer && <h2>
                    Přehled vašich permanentek
                </h2>}
                {loading ? <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000}/> :
                    <TicketsData ticketsData={ticketsData}/>}
            </div>
        );
    }
}

export default TicketPage;
