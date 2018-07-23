import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import PatientInfoRouter from './PatientInfoRouter';
import PatientFilesRouter from './PatientFilesRouter';
import ClinicalNoteForm from '../../forms/patient/ClinicalNoteForm';
// import TreatmentsForm from '../../forms/patient/TreatmentsForm';
// import TreatmentForm from '../../forms/patient/TreatmentForm';
import TreatmentRouter from './TreatmentRouter';
import FinancialRouter from './FinancialRouter';


import { getPatient } from '../../../actions/patientsCreation';

class PatientProfileRouter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPatient: null
    }
  }
  componentWillMount() {
    const { match: { params }, getPatient } = this.props;

    getPatient(params.patientId, patient => { 
      //console.log(patient);
      this.setState({
        selectedPatient: patient,
      })
    });
  }

  render () {
    const { match } = this.props;
    return (
      <div>
        <Route path={`${match.url}/infos`} component={PatientInfoRouter} />
				<Route path={`${match.url}/clinical_note`} component={ClinicalNoteForm} />
				<Route path={`${match.url}/files`} component={PatientFilesRouter} />
        {/* <Route path={`${match.url}/periogram`} component={PerioForm} /> */}
        <Route path={`${match.url}/treatment`} component={TreatmentRouter} />
        <Route path={`${match.url}/financial`} component={FinancialRouter} />
        <Route exact path={`${match.url}`} render={() => <Redirect to={`${match.url}/infos`} />} />
			</div>
		);
	}
}

export default connect(null, { getPatient } )(PatientProfileRouter);