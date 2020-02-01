import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import TicketPage from './pages/ticket/TicketPage';
import ProfilePage from './pages/profile/ProfilePage';
import ProfileDetail from './pages/profile/ProfileDetail';
import CoursePage from './pages/course/CoursePage';
import {NoMatchPage} from './pages/NoMatchPage';
import './styles/App.css';
import NavigationBar from "./components/layout/NavigationBar";
import {Layout} from "./components/layout/Layout";
import SideBar from "./components/layout/SideBar";
import CreateTicketPage from "./pages/ticket/CreateTicketPage";
import RegisterPage from './pages/auth/RegisterPage';
import CreateRole from "./pages/user/CreateRole";
import AuthenticatedRoute from "./components/authentication/AuthenticationRoute";
import LoginPage from "./pages/auth/LoginPage";
import LogoutComponent from "./components/authentication/LogoutComponent";
import AuthRouteAdmin from "./components/authentication/AuthRouteAdmin";
import CreateCoursePage from "./pages/course/CreateCoursePage";
import CourseDetailPage from "./pages/course/CourseDetailPage";
import UpdateCoursePage from "./pages/course/UpdateCoursePage";
import UpdateRole from "./pages/user/UpdateRole";
import ProfileUpdatePage from "./pages/profile/ProfileUpdatePage";
import AuthRouteTrainer from "./components/authentication/AuthRouteTrainer";
import StatisticsPage from "./pages/statistics/StatisticsPage";
import CreateTicketTypePage from "./pages/ticketType/CreateTicketTypePage";
import UpdateTicketTypePage from "./pages/ticketType/UpdateTicketTypePage";
import TicketDetailPage from "./pages/ticket/TicketDetailPage";
import TicketEntrancePage from "./pages/ticket/TicketEntrancePage";
import UpdateTicketPage from "./pages/ticket/UpdateTicketPage";
import AuthRouteEmployee from "./components/authentication/AuthRouteEmployee";
import UpdateTicketEntrancePage from "./pages/ticket/UpdateTicketEntrancePage";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <SideBar/>
                    <NavigationBar/>
                    <div className="Main-container">
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={HomePage}/>
                            <Route exact path="/account/create" component={RegisterPage}/>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/logout" exact component={LogoutComponent} />
                            <AuthRouteAdmin  exact path="/role/create" component={CreateRole}/>
                            <Route exact path="/course" component={CoursePage}/>
                            <AuthRouteAdmin exact path="/role/update" component={UpdateRole}/>
                            <Route exact path="/course/detail/:id" component={CourseDetailPage}/>
                            <AuthRouteTrainer exact path="/course/update/:id" component={UpdateCoursePage}/>
                            <AuthRouteTrainer exact path="/course/create" component={CreateCoursePage}/>
                            <AuthenticatedRoute exact path="/profile" component={ProfilePage}/>
                            <AuthenticatedRoute exact path="/profile/detail/:id" component={ProfileDetail}/>
                            <AuthenticatedRoute exact path="/profile/update/:id" component={ProfileUpdatePage}/>
                            <AuthenticatedRoute exact path="/ticket" component={TicketPage}/>
                            <AuthenticatedRoute exact path="/ticket/detail/:id" component={TicketDetailPage}/>
                            <AuthenticatedRoute exact path="/ticket/update/:id" component={UpdateTicketPage}/>
                            <AuthenticatedRoute exact path="/ticket/entrance/:id" component={TicketEntrancePage}/>
                            <AuthRouteEmployee exact path="/ticket/entrance/update/:id" component={UpdateTicketEntrancePage}/>
                            <AuthRouteEmployee exact path="/ticket/create" component={CreateTicketPage}/>
                            <AuthenticatedRoute path="/ticketType/create" component={CreateTicketTypePage}/>
                            <AuthenticatedRoute path="/ticketType/update/:id" component={UpdateTicketTypePage}/>
                            <AuthRouteAdmin path="/statistics" component={StatisticsPage}/>
                            <Route component={NoMatchPage}/>
                        </Switch>
                    </Layout>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
