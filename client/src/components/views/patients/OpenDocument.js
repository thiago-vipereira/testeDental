import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { NavLink, Link } from 'react-router-dom';

import { reduxForm } from 'redux-form'; 

import { css } from 'aphrodite/no-important';
import { styles } from './OpenAnamnesisStyles';

import { getPatientDocument } from '../../../actions/patientDocument';

// 'ProcedureRouter' will manage the routes inside the patient module
class OpenDocument extends Component {
  constructor(props) {
    super(props);
    this.recursiveGetProps = this.recursiveGetProps.bind(this);
    this.state = {
      name: '',
      html: '',
      type: '',
      fileOptions: {
        prescription: 'Prescrição',
        attestations: 'Atestado'
      },
      selectedPatient: {}
    }
  }
  componentWillMount() {
    const { getPatientDocument, selectedPatient, match } = this.props;
		if (selectedPatient) {
      this.state.selectedPatient = {...selectedPatient};
      getPatientDocument(selectedPatient._id, match.params.documentId, ({name, html, type}) => this.setState({name, html, type}, () => this.recursiveGetProps(this.refs.documentHtml)));
    }
  }
  recursiveGetProps (node) {
    if (node.nodeName === "SPAN" && node.classList.value === "mention" && node.contentEditable === "false") {
      var text = node.textContent.split('.');
      if (text[0] === '@Paciente') {
        node.id = node.innerHTML;
        node.innerHTML = this.state.selectedPatient[text[1]];
      }
    }
    else
      for (var i=0; i<node.childNodes.length; i++)
        this.recursiveGetProps(node.childNodes[i]);
  }
  componentWillReceiveProps(nextProps, nextState) {
    const { getPatientDocument, selectedPatient, match } = this.props;
    if (!selectedPatient && nextProps.selectedPatient) {
      this.state.selectedPatient = {...nextProps.selectedPatient};
      getPatientDocument(nextProps.selectedPatient._id, match.params.documentId, ({name, html, type}) => this.setState({name, html, type}, () => this.recursiveGetProps(this.refs.documentHtml)));
    }
  }
  render() {
    return (
      <div>
          <div><b>{this.state.type?this.state.fileOptions[this.state.type]:''}:</b> {this.state.name}</div>
          <div className={css(styles.questions)} ref='documentHtml' dangerouslySetInnerHTML={{__html: this.state.html}}></div>
      </div>
    )
  }
}

function mapStateToProps({ patientsCreation }) {
	return { 
    selectedPatient: patientsCreation.selectedPatient
  }; 
}

export default connect(mapStateToProps, { 
  getPatientDocument
} )(OpenDocument);