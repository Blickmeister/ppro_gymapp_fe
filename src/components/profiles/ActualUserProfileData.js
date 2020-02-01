import React, {Component} from 'react';
import '../../styles/Table.css';
import {Link} from "react-router-dom";

class ActualUserProfileData extends Component {

    render() {
        const profileData = this.props.profileData;
        console.log(this.props.profileData);
        return (
            <div className="container text-center">
                <h2>Váš účet </h2>
                <div className="align-items-center">
                    <div class="panel panel-info align-items-center text-center">
                        <div class="panel-body">
                            <div class="row">
                                <div class=" col-md-9 col-lg-9 ">
                                    <table class="table table-user-information">
                                        <tbody>
                                        <tr>
                                            <td><b>Jméno:</b></td>
                                            <td>{profileData.firstName} {profileData.lastName}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Login:</b></td>
                                            <td>{profileData.login}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Email:</b></td>
                                            <td>{profileData.email}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Telefon:</b></td>
                                            <td>{profileData.phoneNumber}</td>
                                        </tr>

                                        <tr>
                                            <td><b>Možnosti:</b></td>
                                            <td><Link to={{pathname : '/profile/update/' + profileData.id , profilesData : profileData}} className="btn btn-secondary btn-space">Upravit</Link></td>
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

export default ActualUserProfileData;
