import React, {Component} from 'react';
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME, USER_NAME_SESSION_ATTRIBUTE_PASSWORD
}
    from "../../components/authentication/AuthenticationService";
import {getAverageNumberOFEntrancesUrl, getCountOfEntrancesUrl, getFavouriteDayUrl} from "../../constants";

class StatisticsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statisticsData: [],
            statisticsData2: [],
            statisticsData3: [],
            loading : true,
        };
    }

    componentDidMount() {
        fetch(getCountOfEntrancesUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization' : AuthenticationService.createBasicAuthToken(sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD))
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({statisticsData: jsonResponse, loading : false})
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));
        fetch(getFavouriteDayUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization' : AuthenticationService.createBasicAuthToken(sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD))
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({statisticsData2: jsonResponse, loading : false})
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));
        fetch(getAverageNumberOFEntrancesUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization' : AuthenticationService.createBasicAuthToken(sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD))
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({statisticsData3: jsonResponse, loading : false})
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));
    }

    render() {
        const { statisticsData,statisticsData2,statisticsData3 } = this.state;

        return (
            <div className="tables">
                <h1>
                    Statistiky
                </h1>
                <div>
                    <table id='tables'>
                        <tbody>
                        <tr>Počet vstupů (dnes)</tr>
                        <td>{statisticsData}</td>
                        <tr>Nejoblíbenější den</tr>
                        <td>{statisticsData2}</td>
                        <tr>Průměrná děnní návštěvnost (posledních 30dní)</tr>
                        <td>{statisticsData3}</td>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default StatisticsPage;
