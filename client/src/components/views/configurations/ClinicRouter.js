import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Route } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { gridStyles } from '../DashboardStyles';

import BreadcrumbBar from '../../bars/BreadcrumbBar';
import ClinicView from './ClinicView';
import DentistForm from '../../forms/dentist/DentistForm';
import UserForm from '../../forms/user/UserForm';

// 'ClinicRouter' will manage the routes inside the patient module
class ClinicRouter extends Component {
    constructor(props) { 
		super(props); 

		this.getLinks = this.getLinks.bind(this);

		this.state = { 
			links: []
		} 
    }
    
    componentDidMount() {
        const { location } = this.props;
        
        this.getLinks(location.pathname);
    }

    componentWillReceiveProps(nextProps) {
        const { location, selectedUser, selectedDentist } = this.props;

        if (location.pathname !== nextProps.location.pathname) {
            this.getLinks(nextProps.location.pathname);
        }

        if (selectedUser !== nextProps.selectedUser) {
            this.getLinks(nextProps.location.pathname, nextProps.selectedUser);
        }

        if (selectedDentist !== nextProps.selectedDentist) {
            this.getLinks(nextProps.location.pathname, nextProps.selectedDentist);
        }
    }

    getLinks(pathname, clinicMember) {
        this.setState({ links: [] });

        const { clinic } = this.props;
        const links = pathname.slice(1).split('/').slice(1);
        let linksToState = [];

        if (clinic) {
            linksToState.push({ text: clinic.name, path: '', exact: true });
        }        

        // if the pathname passed contains the word registration, then the link passed to the breadcrumb is for new user or new dentist
        if (links.length > 1 && links[2] === 'registration') {
            switch(links[1]) {
                case 'user':
                    linksToState.push({ text: 'Novo Usuário', path: '/user/registration' });
                    break;
                default:
                    linksToState.push({ text: 'Novo Dentista', path: '/dentist/registration' });
            }
        }
        
        // if the pathname passed DOES NOT contain the word registration, then the link passed to the breadcrumb is the name of the user or dentist
        if (links.length > 1 && clinicMember) {
            switch(links[1]) {
                case 'user':
                    linksToState.push({ text: clinicMember.name, path: `/user/${clinicMember._id}` });
                    break;
                default:
                    linksToState.push({ text: clinicMember.name, path: `/dentist/${clinicMember._id}` });
                    break;
            }
        }

        return this.setState({ links: linksToState });
    }

    render() {
        const { history, match } = this.props;

        return (
            <div className={css(gridStyles.flex)}>
                <BreadcrumbBar match={match} links={this.state.links} />
                
                <div className={css(gridStyles.flexScroll)}>
                    <Route path={`${match.url}/user/:userId`} component={UserForm} />
                    <Route path={`${match.url}/dentist/:dentistId`} component={DentistForm} />
    
                    <Route exact path={`${match.url}`} component={ClinicView} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
	return {
        clinic: state.auth.clinic,
        selectedUser: state.clinicConfig.selectedUser,
		selectedDentist: state.clinicConfig.selectedDentist
	}; 
} 

export default connect(mapStateToProps)(ClinicRouter);
