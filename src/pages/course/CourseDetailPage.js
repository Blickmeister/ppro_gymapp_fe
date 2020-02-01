import React, {Component} from 'react';
import '../../styles/Table.css';
import '../../styles/Detail.css';
import {getCourseDetailUrl, removeCourseUrl, signCourseUrl, signOutCourseUrl} from "../../constants";
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME, USER_NAME_SESSION_ATTRIBUTE_PASSWORD,
    USER_NAME_SESSION_ATTRIBUTE_ROLE
} from "../../components/authentication/AuthenticationService";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

class CourseDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseData: [],
            loading: true,
            trainer: {},
            accountSignedCourses: [],
            isTrainer: false,
            canSignedCourse: false,
            isUnauthorised: false,
            role: "",
            actualDateTime: {},
            isSigned: false
        };
    }

    componentDidMount() {
        console.log("ID: " + this.props.match.params.id)

        this.setState({actualDateTime: new Date()});

        const role = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
        this.setState({role: role});
        if (role === 'Trainer') {
            this.setState({isTrainer: true})
        } else {
            this.setState({isTrainer: false})
        }
        if (role === 'Client') {
            this.setState({canSignedCourse: true})
        } else {
            this.setState({canSignedCourse: false})
        }
        if (role === null) {
            this.setState({isUnauthorised: true})
        } else {
            this.setState({isUnauthorised: false})
        }

        this.setState({isSigned: this.props.location.isSigned});

        fetch(getCourseDetailUrl + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({courseData: jsonResponse, loading: false})
                this.setState({trainer: jsonResponse.trainer})
                this.setState({accountSignedCourses: jsonResponse.accountSignedCourses})
            }).catch((err) => console.error(err));
    }

    handleSigned = () => {
        let json = JSON.stringify(this.state.actualDateTime);
        console.log(this.state.actualDateTime);
        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        fetch(signCourseUrl + this.props.match.params.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization': AuthenticationService.createBasicAuthToken(username, password)
            },
            body: json
        }).then(function (response) {
            if (response.ok) {
                alert("Kurz byl zapsán");
                window.location = '/course';
            } else {
                response.json().then(function (res) {
                    alert(res.message)
                })
            }
        }).then(function (text) {
        }).catch(function (error) {
            console.error(error)
        });

    }

    handleSignOut = () => {
        let json = JSON.stringify(this.state.actualDateTime);
        console.log(this.state.actualDateTime);
        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        fetch(signOutCourseUrl + this.props.match.params.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization': AuthenticationService.createBasicAuthToken(username, password)
            },
            body: json
        }).then(function (response) {
            if (response.ok) {
                alert("Kurz byl odepsán");
                window.location = '/course';
            } else {
                response.json().then(function (res) {
                    alert(res.message)
                })
            }
        }).then(function (text) {
        }).catch(function (error) {
            console.error(error)
        });
    }

    handleDelete = () => {
        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        fetch(removeCourseUrl + this.props.match.params.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization': AuthenticationService.createBasicAuthToken(username, password)
            }
        })
            .then(function (response) {
                if (response.ok) {
                    alert("Kurz byl úspěšně smazán");
                    window.location = '/course';
                } else {
                    alert("Kurz se nepodařilo smazat");
                }
            }).then(() => {
        }).catch((err) => console.error(err));

    }

    render() {
        const coursesData = this.state.courseData;
        const {firstName, lastName} = this.state.trainer;
        const occupancy = this.state.accountSignedCourses.length;
        const {isTrainer, canSignedCourse, isUnauthorised, isSigned} = this.state;

        return (
            <div className="container text-center">
                <h2>Detail kurzu </h2>
                <div className="align-items-center">
                    <div class="panel panel-info align-items-center text-center">
                        <div class="panel-heading">
                            <h3 class="panel-title">Název: {coursesData.name}</h3>
                        </div>
                        <div class="panel-body">
                            <table class="table table-user-information">
                                <tbody>
                                <tr>
                                    <td><b>Popis:</b></td>
                                    <td>{coursesData.description}</td>
                                </tr>
                                <tr>
                                    <td><b>Trenér:</b></td>
                                    <td>{firstName} {lastName}</td>
                                </tr>
                                <tr>
                                    <td><b>Počet konání:</b></td>
                                    <td>{coursesData.count}</td>
                                </tr>
                                <tr>
                                    <td><b>Cena:</b></td>
                                    <td>{coursesData.price}</td>
                                </tr>
                                <tr>
                                    <td><b>Obsazenost:</b></td>
                                    <td>{occupancy}/{coursesData.maxCapacity}</td>
                                </tr>
                                <tr>
                                    <td><b>Od:</b></td>
                                    <td>{coursesData.beginDate}</td>
                                </tr>
                                <tr>
                                    <td><b>Do:</b></td>
                                    <td>{coursesData.endDate}</td>
                                </tr>
                                </tbody>
                            </table>
                            {isTrainer &&
                            <div>
                                <div className="text-center">
                                    <Link to={{
                                        pathname: '/course/update/' + this.props.match.params.id,
                                        courseData: coursesData
                                    }} className="btn btn-secondary btn-space">Upravit</Link>
                                    <Button onClick={this.handleDelete}
                                            className="btn btn-danger btn-space">Smazat</Button>
                                </div>
                            </div>}
                            {canSignedCourse && !isSigned &&
                            <Button onClick={this.handleSigned} className="btn btn-primary">
                                Přihlásit se na kurz</Button>}
                            {canSignedCourse && isSigned &&
                            <Button onClick={this.handleSignOut} className="btn btn-primary">
                                Odhlásit se z kurzu</Button>}
                            {isUnauthorised &&
                            <Link to={{pathname: '/login', message: 'Pro přihlášení se na kurz je nutné se přihlásit'}}
                                  className="btn btn-primary">Přihlásit se na kurz</Link>}
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default CourseDetailPage;
