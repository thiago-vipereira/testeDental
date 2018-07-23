import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import { gridStyles } from '../DashboardStyles';

import ViewNavBar from '../../bars/ViewNavBar';
// import MenuActions from './MenuActions';
import PatientForm from '../../forms/patient/PatientForm';
import DentalStatusForm from '../../forms/patient/DentalStatusForm';
import PeriogramRouter from './PeriogramRouter';
// import PerioForm from '../../forms/patient/PerioForm';

import { styles } from '../../bars/ViewNavBarStyles';
// import Archived from './Archived';
// import Search from './Search';

import { getPatient } from '../../../actions/patientsCreation';

// 'PatientInfoRouter' will manage the routes inside the patient module
// function PatientInfoRouter(props) {

class PatientInfoRouter extends React.Component {
	constructor(props) {
		super(props);	
		
		// this.onView = this.onView.bind(this);

		this.state = {
			selectedPatient: null,
			view: 'info',
			form: PatientForm,
			LINKSPROFILE: [
				{ text: 'Cadastro', path: '', exact: true },
				{ text: 'Status da Arcada Dentária', path: '/dental_status' },
				{ text: 'Periograma', path: '/periograms' },
				{ text: 'Anamnese', path: '/anamnese' }
			]
		}
	}

	// onView(ret){
	// 	var form;

	// 	if(ret.target.name == 'info'){
	// 		form = PatientForm;
	// 	} else if(ret.target.name == 'status'){
	// 		form = DentalStatusForm;
	// 	} else if(ret.target.name == 'anamnese'){
	// 		form = function(){ return <h1>anamnese</h1> };
	// 	}else if(ret.target.name == 'periograms'){
	// 		form = PeriogramRouter;
	// 	}else if(ret.target.name == 'periogram'){
	// 		form = PerioForm;
	// 	}

	// 	this.setState({
	// 		view: ret.target.name,
	// 		form: form,
	// 	})
	// }

	render () {
		const { match, history, location } = this.props;

		return (
			<div className={css(gridStyles.flex)}>

				<ViewNavBar history={history} match={match} links={this.state.LINKSPROFILE} />

				<Route exact path={`${match.url}`} component={PatientForm} />
				<Route path={`${match.url}/dental_status`} component={DentalStatusForm} />
				<Route path={`${match.url}/periograms`} component={PeriogramRouter} />
				<Route path={`${match.url}/anamnese`} render={() => <h1>anamnese</h1>} />
				
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		//selectedPatient: state.patientsCreation.selectedPatient,
	};
}
export default connect(mapStateToProps, { getPatient } )(PatientInfoRouter);