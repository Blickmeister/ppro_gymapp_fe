import React, {Component} from 'react';
import '../../styles/Table.css';
import {Link} from "react-router-dom";
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME, USER_NAME_SESSION_ATTRIBUTE_PASSWORD,
    USER_NAME_SESSION_ATTRIBUTE_ROLE
} from "../authentication/AuthenticationService";
import {Button} from "react-bootstrap";
import {createEntranceUrl, removeEntranceUrl, updateEntranceEndDateUrl} from "../../constants";

class EntrancesData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            canAddEntrance: true,
        }
    }

    componentDidMount() {
        const entrances = this.props.entrances;
        let openEntrance = {};
        if (entrances.length === 0) {
            openEntrance = {};
        } else {
            for (let i = 0; i < entrances.length; i++) {
                if (entrances[i].endDate === null) {
                    openEntrance = entrances[i];
                }
            }
        }
        console.log(openEntrance);
        let isMyObjectEmpty = !Object.keys(openEntrance).length;
        if (isMyObjectEmpty) {
            this.setState({canAddEntrance: true})
        } else {
            this.setState({canAddEntrance: false})
        }
    }

    header = ["Začátek vstupu", "Konec vstupu", "Možnosti"];

    renderTableHeader(isEmployee) {
        if (!isEmployee) {
            const headerForClient = this.header.filter((h, i) => {
                return h !== 'Možnosti';
            });
            return headerForClient.map((h, i) => {
                return (
                    <th key={i}>{h}</th>
                )
            })
        } else {
            return this.header.map((h, i) => {
                return (
                    <th key={i}>{h}</th>
                )
            })
        }
    }

    renderTableData(isEmployee) {
        return this.props.entrances.map((entrance, index) => {
            let isActualEntrance = false;
            if (index === this.props.entrances.length - 1) {
                isActualEntrance = true;
            } else {
                isActualEntrance = false;
            }
            const {id, beginDate, endDate} = entrance;
            const newTo = {
                pathname: "/ticket/entrance/update/" + id,
                entranceData: entrance,
                ticketId: this.props.ticketId
            };
            return (
                <tr key={id}>
                    <td>{beginDate}</td>
                    <td>{endDate}</td>
                    {isEmployee && <td>
                        {isActualEntrance && !this.state.canAddEntrance &&
                        <Button onClick={() => this.handleEndEntrance(id)} className="btn btn-primary">
                            Zapsat odchod</Button>
                        }
                        <Link to={newTo} className="btn btn-secondary  btn-space">Upravit</Link>
                        <Button onClick={() => this.handleDelete(id)}
                                className="btn btn-danger">Smazat</Button>
                    </td>
                    }
                </tr>
            )
        })
    }

    handleAddEntrance = () => {
        let actualDateTime = new Date();
        let object = {};
        object["beginDate"] = actualDateTime;
        let json = JSON.stringify(object);
        console.log(this.props.ticketId);

        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        fetch(createEntranceUrl + this.props.ticketId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization' : AuthenticationService.createBasicAuthToken(username, password)
            },
            body: json
        }).then(function (response) {
            if (response.ok) {
                alert("Vstup byl zapsán");
                window.location.reload();
            } else {
                response.json().then(function (res) {
                    alert(res.message)
                })
            }
        }).then(function (text) {
        }).catch(function (error) {
            console.error(error)
        });


    };

    handleEndEntrance = (id) => {
        let actualDateTime = new Date();
        let object = {};

        object["endDate"] = actualDateTime;
        let json = JSON.stringify(object);

        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        fetch(updateEntranceEndDateUrl + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization' : AuthenticationService.createBasicAuthToken(username, password)
            },
            body: json
        }).then(function (response) {
            if (response.ok) {
                alert("Odchod byl zapsán");
                window.location.reload();
            } else {
                alert("Odchod se nepodařilo zapsat");
            }
        }).then(function (text) {
        }).catch(function (error) {
            console.error(error)
        });
    };

    handleDelete = (id) => {
        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        const password = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        fetch(removeEntranceUrl + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization' : AuthenticationService.createBasicAuthToken(username, password)
            }
        })
            .then(function (response) {
                if (response.ok) {
                    alert("Vstup byla úspěšně smazán");
                    window.location.reload();
                } else {
                    alert("Vstup se nepodařilo smazat");
                }
            }).then((text) => {
        }).catch((err) => console.error(err));

    }

    render() {
        const canAddEntrance = this.state.canAddEntrance;
        console.log(canAddEntrance);
        let isEmployee = false;
        const roleName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
        if (roleName === 'Employee' || roleName === 'Admin') {
            isEmployee = true;
        } else {
            isEmployee = false;
        }
        if (this.props.entrances.length === 0) {
            return (
                <div>
                    <p className="text-danger">Nejsou k dispozici žádné vstupy</p>
                    {isEmployee && canAddEntrance && this.props.isValid &&
                    <Button onClick={this.handleAddEntrance} className="btn btn-primary">
                        Zapsat vstup</Button>}
                </div>
            );
        } else {
            return (
                <div>
                    <h3>Vstupy:</h3>
                    {isEmployee && canAddEntrance && this.props.isValid &&
                    <Button onClick={this.handleAddEntrance} className="btn btn-primary">
                        Zapsat vstup</Button>}
                    {isEmployee && !canAddEntrance && <p className="text-danger">Pro zapsání dalšího vstupu nejprve zapište odchod</p>}
                    {isEmployee && !this.props.isValid && <p className="alert-info">Nelze zapsat vstup - permanentka není platná</p>}
                    <table id='tables'>
                        <tbody>
                        <tr>{this.renderTableHeader(isEmployee)}</tr>
                        {this.renderTableData(isEmployee)}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default EntrancesData;
