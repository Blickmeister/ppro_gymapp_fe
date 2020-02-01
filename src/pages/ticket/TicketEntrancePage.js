import React, {Component} from 'react';
import {getEntrancesUrl,getEntranceValidationUrl} from '../../constants';
import '../../styles/Table.css'
import Loader from "react-loader-spinner";
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME, USER_NAME_SESSION_ATTRIBUTE_PASSWORD,
    USER_NAME_SESSION_ATTRIBUTE_ROLE
} from "../../components/authentication/AuthenticationService";
import EntrancesData from "../../components/tickets/EntrancesData";

class TicketEntrancePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entrances: [],
            loading: true,
            isValid : true,
            isEmployee : false,
        };
    }

    componentDidMount() {
        const roleName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
        if (roleName === 'Employee' || roleName === 'Admin') {
            this.setState({isEmployee: true})
        } else {
            this.setState({isEmployee: false})
        }
        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        fetch(getEntrancesUrl + this.props.match.params.id, {
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
                this.setState({entrances: jsonResponse, loading: false});
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));

        fetch(getEntranceValidationUrl + this.props.match.params.id, {
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
                this.setState({isValid: jsonResponse});
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));
    }


    render() {
        const {entrances, loading, isValid} = this.state;
        return (
            <div className="tables">
                <h2>
                    Přehled vstupů
                </h2>
                {loading ? <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000}/> :
                    <EntrancesData entrances={entrances} isValid={isValid} ticketId={this.props.match.params.id}/>}
            </div>
        );
    }
}

export default TicketEntrancePage;
