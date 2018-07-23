import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Switch, Route } from 'react-router-dom';

import SavedAnamnesis from './SavedAnamnesis';
import CreateAnamnesis from './CreateAnamnesis';
import OpenAnamnesis from './OpenAnamnesis';

class PatientAnamnesisRouter extends Component {
  render() {
    const {match} = this.props;
    return (
      <div>
        <Switch>
          <Route exact path={`${match.path}`} component={SavedAnamnesis} />
          <Route path={`${match.path}/create/:modelId?`} component={CreateAnamnesis} />
          <Route path={`${match.path}/:anamnesisId?`} component={OpenAnamnesis} />
        </Switch>
      </div>
    );
  }
}

// export default connect(null)(PatientAnamnesisRouter);
export default PatientAnamnesisRouter;