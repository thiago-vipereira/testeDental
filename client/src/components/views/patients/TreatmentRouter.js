import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import TreatmentsForm from '../../forms/patient/TreatmentsForm';
import TreatmentForm from '../../forms/patient/TreatmentForm';

import { getPatient } from '../../../actions/patientsCreation';

class TreatmentRouter extends React.Component {
  // componentWillMount() {
  //   const { match: { params }, getPatient } = this.props;

  //   getPatient(params.patientId, patient => { 
  //     this.setState({
  //       selectedPatient: patient,
  //     })
  //   });
  // }

  render () {
    const { match } = this.props;
    return (
      <div>
        <Switch>
          <Route exact path={`${match.url}`} component={TreatmentsForm} /> 
          <Route path={`${match.url}/:treatmentId?`} component={TreatmentForm} /> 
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

export default connect(mapStateToProps, { getPatient } )(TreatmentRouter);