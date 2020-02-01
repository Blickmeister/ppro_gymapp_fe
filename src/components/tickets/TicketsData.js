import React, {Component} from 'react';
import '../../styles/Table.css';
import {Link} from "react-router-dom";
import {USER_NAME_SESSION_ATTRIBUTE_ROLE
} from "../authentication/AuthenticationService";

class TicketsData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            renderValidTickets: true,
            renderInValidTickets: true
        }
    }

    componentDidMount() {
        const tickets = this.props.ticketsData;
        let validTickets = [];
        let validTicketsIndex = 0;
        let inValidTickets = [];
        let inValidTicketsIndex = 0;
        for(let i = 0; i < tickets.length; i++) {
            if(tickets[i].valid) {
                validTickets[validTicketsIndex] = tickets[i];
            } else {
                inValidTickets[inValidTicketsIndex] = tickets[i];
            }
        }
        if(validTickets.length === 0) {
            this.setState({renderValidTickets:false})
        } else {
            this.setState({renderValidTickets:true})
        }
        if(inValidTickets.length === 0) {
            this.setState({renderInValidTickets:false})
        } else {
            console.log("jsem tuuu")
            this.setState({renderInValidTickets:true})
        }

    }

    header = ["Název", "Klient", "Datum nákupu", "Datum vypršení", "Platnost", "Detail", "Vstupy"];

    renderTableHeader(isEmployee) {
        if(!isEmployee) {
            const headerForClient = this.header.filter((h,i) => {
                return h !== 'Detail';
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

    renderTableValidTicket(isEmployee) {
        return this.props.ticketsData.map((ticket, index) => {
            const {id, beginDate, endDate, valid, ticketType, account} = ticket;
            let validString = "";
            if (valid) validString = "Platná";
            else validString = "Neplatná";
            const newTo = {
                pathname: "/ticket/detail/" + id,
            };
            const newTo2 = {
                pathname: "/ticket/entrance/" + id,
            };
            if (valid) {
                return (
                    <tr key={id}>
                        <td>{ticketType.name}</td>
                        <td>{account.login}</td>
                        <td>{beginDate}</td>
                        <td>{endDate}</td>
                        <td>{validString}</td>
                        {isEmployee && <td><Link to={newTo}>{"zobrazit"}</Link></td>}
                        <td><Link to={newTo2}>{"zobrazit"}</Link></td>
                    </tr>
                )
            }
        })
    }

    renderTableInValidTicket(isEmployee) {
        console.log(isEmployee)
        return this.props.ticketsData.map((ticket, index) => {
            const {id, beginDate, endDate, valid, ticketType, account} = ticket;
            let validString = "";
            if (valid) validString = "Platná";
            else validString = "Neplatná";
            const newTo = {
                pathname: "/ticket/detail/" + id,
            };
            const newTo2 = {
                pathname: "/ticket/entrance/" + id,
            };
            if (!valid) {
                return (
                    <tr key={id}>
                        <td>{ticketType.name}</td>
                        <td>{account.login}</td>
                        <td>{beginDate}</td>
                        <td>{endDate}</td>
                        <td>{validString}</td>
                        {isEmployee && <td><Link to={newTo}>{"zobrazit"}</Link></td>}
                        <td><Link to={newTo2}>{"zobrazit"}</Link></td>
                    </tr>
                )
            }
        })
    }

    render() {
        let isEmployee = false;
        const roleName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
        const {renderValidTickets, renderInValidTickets} = this.state;
        if (roleName === 'Employee' || roleName === 'Admin') {
            isEmployee = true;
        } else {
            isEmployee = false;
        }
        if (this.props.ticketsData.length === 0) {
            if (isEmployee) {
                return <p className="text-danger">Nejsou k dispozici žádné permanentky</p>;
            } else {
                return <p className="text-danger">Nemáte žádné permanentky</p>;
            }
        } else {
            return (
                <div>
                    <h3>Platné permanentky</h3>
                    {renderValidTickets &&
                    <table id='tables'>
                        <tbody>
                        <tr>{this.renderTableHeader(isEmployee)}</tr>
                        {this.renderTableValidTicket(isEmployee)}
                        </tbody>
                    </table>
                    }
                    {!renderValidTickets && <p className="text-danger">Nic nenalezeno</p>}
                    <h3>Neplatné permanentky</h3>
                    {renderInValidTickets &&
                    <table id='tables'>
                        <tbody>
                        <tr>{this.renderTableHeader(isEmployee)}</tr>
                        {this.renderTableInValidTicket(isEmployee)}
                        </tbody>
                    </table>
                    }
                    {!renderInValidTickets && <p className="text-danger">Nic nenalezeno</p>}
                </div>
            );
        }
    }
}

export default TicketsData;
