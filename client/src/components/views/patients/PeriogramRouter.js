import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import PeriogramsForm from '../../forms/patient/PeriogramsForm';
import PerioForm from '../../forms/patient/PerioForm';

import { getPatient } from '../../../actions/patientsCreation';

class PeriogramRouter extends React.Component {

  render () {
    const { match } = this.props;
    return (
      <div>
        <Switch>
          <Route exact path={`${match.url}`} component={PeriogramsForm} /> 
          <Route path={`${match.url}/periogram/:periogramId?`} component={PerioForm} /> 
          <Route path={`${match.url}/:periogramId?`} component={PerioForm} /> 
        </Switch>
      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		selectedPatient: state.patientsCreation.selectedPatient,
	};
}

export default connect(mapStateToProps, { getPatient } )(PeriogramRouter);