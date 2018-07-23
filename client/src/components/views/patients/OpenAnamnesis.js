import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { NavLink, Link } from 'react-router-dom';

import { reduxForm } from 'redux-form'; 

import { css } from 'aphrodite/no-important';
import { styles } from './OpenAnamnesisStyles';

import InputField from '../../forms/InputField';
import Button from '../../common/Button';
import RadioInputSet from '../../forms/RadioInputSet'; 
import RadioInput from '../../forms/RadioInput';
import CheckBox from '../../common/CheckBox';

import { getPatientAnamnesis } from '../../../actions/patientAnamnesis';

// 'ProcedureRouter' will manage the routes inside the patient module
class OpenAnamnesis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      questions: []
    }
  }
  componentWillMount() {
    const { getPatientAnamnesis, selectedPatient, allAnamnesis, match } = this.props;
		if (selectedPatient)
      getPatientAnamnesis(selectedPatient._id, match.params.anamnesisId, ret => this.setState(ret));
  }
  componentWillReceiveProps(nextProps, nextState) {
    const { getPatientAnamnesis, selectedPatient, allAnamnesis, match } = this.props;
    if (!selectedPatient && nextProps.selectedPatient)
      getPatientAnamnesis(nextProps.selectedPatient._id, match.params.anamnesisId, ret => this.setState(ret));
  }
  render() {
    return (
      <div>
          <div><b>Anamnese:</b> {this.state.name}</div>
          <div className={css(styles.questions)}>
            {this.state.questions.map((item, index) => (
              <div key={`question_${index}`}>
                <div className={css(styles.bottom5rem)}><b>{`${index+1}.`}</b> {item.question}</div>
                {item.kind === 'radio' ?
                  item.options.map((optn, ndx) => (
                    <RadioInput
                      key={`question_${index}_radioOption_${ndx}`}
                      value={optn._id}
                      label={optn.content}
                      input= {{
                        name: `question_${index}_radioOption_${ndx}`,
                        checked: optn._id === item.answer,
                        onChange: () => {}
                      }}
                    />
                  ))
                  :item.kind === 'check' ?
                  item.options.map((optn, ndx) => (
                    <div key={`question_${index}_checkOption_${ndx}`} className={css(styles.bottom5rem)}>
                      <CheckBox checked={optn.answer?'check':'none'} onChange={(old, newState, clicks) => optn.answer?'check':'none' } />
                      <span className={css(styles.checkOption)}>{optn.content}</span>
                    </div>
                  ))
                :
                  <div className={css(styles.disabledInput)}>{item.answer}</div>
                }
              </div>
            ))}
          </div>
      </div>
    )
  }
}

function mapStateToProps({ patientsCreation, patientAnamnesis }) {
	return { 
    allAnamnesis: patientAnamnesis.allAnamnesis,
    selectedPatient: patientsCreation.selectedPatient
  }; 
}

export default connect(mapStateToProps, { 
  getPatientAnamnesis
} )(OpenAnamnesis);