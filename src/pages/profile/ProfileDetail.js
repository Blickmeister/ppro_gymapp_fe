import React, {Component} from 'react';
import '../../styles/Table.css';
import '../../styles/Detail.css';
import {getAccountDetailUrl} from "../../constants";
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME, USER_NAME_SESSION_ATTRIBUTE_PASSWORD,
    USER_NAME_SESSION_ATTRIBUTE_ROLE
}
from "../../components/authentication/AuthenticationService";
import {Link} from "react-router-dom";

class ProfileDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profileData: [],
            loading: true,
            isUnauthorised: false,
            role: "",

        };
    }

    componentDidMount() {
        console.log("ID: " + this.props.match.params.id)
        const role = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
        this.setState({role: role});


        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        fetch(getAccountDetailUrl + this.props.match.params.id, {
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
                this.setState({profileData: jsonResponse, loading: false})
            }).catch((err) => console.error(err));
    }

    render() {
        const profilesData = this.state.profileData;
        return (
            <div className="container text-center">
                <h2>Detail účtu </h2>
                <div className="align-items-center">
                    <div class="panel panel-info align-items-center text-center">
                        <div class="panel-heading">
                            <h3 class="panel-title">{this.props.location.firstName}</h3>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-md-2 col-lg-2 " align="center"></div>

                                <div class=" col-md-9 col-lg-9 ">
                                    <table class="table table-user-information">
                                        <tbody>
                                        <tr>
                                            <td><b>Jméno:</b></td>
                                            <td>{profilesData.firstName}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Příjmení:</b></td>
                                            <td>{profilesData.lastName}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Email:</b></td>
                                            <td>{profilesData.email}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Telefon:</b></td>
                                            <td>{profilesData.phoneNumber}</td>
                                        </tr>

                                        <tr>
                                            <td><b>Login:</b></td>
                                            <td>{profilesData.login}</td>
                                        </tr>

                                        <tr>
                                            <td><b>Možnosti:</b></td>
                                            <td><Link to={{pathname : '/profile/update/' + this.props.match.params.id , profilesData : profilesData}} className="btn btn-secondary btn-space">Upravit</Link></td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default ProfileDetail;
