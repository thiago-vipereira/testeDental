import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Switch, Route } from 'react-router-dom';

import SavedDocument from './SavedDocument';
import CreateDocument from './CreateDocument';
import OpenDocument from './OpenDocument';

class PatientDocumentRouter extends Component {
  render() {
    const {match} = this.props;
    return (
      <div>
        <Switch>
          <Route exact path={`${match.path}`} component={SavedDocument} />
          <Route path={`${match.path}/create/:modelId?`} component={CreateDocument} />
          <Route path={`${match.path}/:documentId?`} component={OpenDocument} />
        </Switch>
      </div>
    );
  }
}

// export default connect(null)(PatientDocumentRouter);
export default PatientDocumentRouter;