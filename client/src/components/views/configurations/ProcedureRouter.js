import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Route } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { gridStyles } from '../DashboardStyles';
import { styles } from '../../forms/procedure/ProcedureFormStyles';

import ListProcedureForm from '../../forms/procedure/ListProcedureForm';
import EditProcedureForm from '../../forms/procedure/EditProcedureForm';
import BreadcrumbBar from '../../bars/BreadcrumbBar';

// 'ProcedureRouter' will manage the routes inside the patient module
class ProcedureRouter extends Component {
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

    componentWillReceiveProps(nextProps, nextState) {
        const { location, selectedProcedure } = this.props;

        if (location.pathname !== nextProps.location.pathname) {
            this.getLinks(nextProps.location.pathname);
        }

        if (selectedProcedure !== nextProps.selectedProcedure) {
            this.getLinks(nextProps.location.pathname, nextProps.selectedProcedure);
        }
    }

    getLinks(pathname, selectedProcedure) {
        this.setState({ links: [] });

        const { clinic } = this.props;
        const links = pathname.slice(1).split('/').slice(1);
        let linksToState = [];

        linksToState.push({ text: 'Listas', path: '', exact: true });

        if (links.length > 1 && selectedProcedure) {
            linksToState.push({ text: selectedProcedure.name, path: `/${selectedProcedure._id}` });
        }

        return this.setState({ links: linksToState });
    }

    render() {
        const { history, match } = this.props;
        return (
            <div className={css(gridStyles.flex)}>
                <BreadcrumbBar history={history} match={match} links={this.state.links} />

                <div className={css(gridStyles.flexScroll)}>
                    
                    <Route path={`${match.url}/:procedureId`} component={EditProcedureForm} />

                    <Route exact path={`${match.url}`} component={ListProcedureForm} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
	return {
        selectedProcedure: state.procedureConfig.selectedProcedure,
	}; 
} 

export default connect(mapStateToProps)(ProcedureRouter);