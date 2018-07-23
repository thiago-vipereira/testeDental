import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import FinancialForm from '../../forms/patient/FinancialForm';

class FinancialRouter extends React.Component {

  render () {
    const { match } = this.props;
    return (
      <div>
        <Switch>
          <Route exact path={`${match.url}`} component={FinancialForm} /> 
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

export default connect(mapStateToProps, {} )(FinancialRouter);