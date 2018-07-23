import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { NavLink, Link } from 'react-router-dom';

import { reduxForm } from 'redux-form'; 

import { css } from 'aphrodite/no-important';
import { styles } from './CreateAnamnesisStyles';

import InputField from '../../forms/InputField';
import Button from '../../common/Button';
import Modal from '../../modals/Modal';
import RadioInputSet from '../../forms/RadioInputSet'; 
import CheckBox from '../../common/CheckBox';

import { savePatientAnamnesis } from '../../../actions/patientAnamnesis';

import { getAnamnese } from '../../../actions/anamnesis';

// 'ProcedureRouter' will manage the routes inside the patient module
class CreateAnamnesis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      modelName: '',
      questions: [],
      showModal: false
    }
  }
  componentWillMount() {
    const { getAnamnese, match } = this.props;
		if (match.params.modelId)
			getAnamnese(match.params.modelId, ret => this.setState({modelName: ret.name, questions: ret.questions}));
  }   
  render() {
    return (
      <div>
        <div><b>Modelo:</b> {this.state.modelName}</div>
        <form className={css(styles.form)}> 
          <InputField
            input={{
              name: 'name',
              onChange: (e) => this.state.name = e.currentTarget.value,
            }}
            label={'Nome'}
          />
          <div className={css(styles.questions)}>
            {this.state.questions.map((item, index) => (
              <div key={`question_${index}`}>
                <div className={css(styles.bottom5rem)}><b>{`${index+1}.`}</b> {item.question}</div>
                {item.kind === 'radio' ?
                  <RadioInputSet
                    setLabel=""
                    name={`question_${index}_check`}
                    onChange={(ptn) => this.state.questions[index].answer = ptn.value}
                    options={item.options.map((optn) => { return { label: optn.content, value: optn._id } })} 
                  />
                :item.kind === 'check' ?
                  item.options.map((optn, ndx) => (
                    <div key={`question_${index}_checkOption_${ndx}`} className={css(styles.bottom5rem)}>
                      <CheckBox onChange={(old, newState, clicks) => { this.state.questions[index].options[ndx].answer = (newState === 'check') }} />
                      <span className={css(styles.checkOption)}>{optn.content}</span>
                    </div>
                  ))
                :
                  <InputField
                    input={{
                      name: `question_${index}_open`,
                      onChange: (e) => this.state.questions[index].answer = e.currentTarget.value,
                    }}
                    label={''}
                  />
                }
              </div>
            ))}
          </div>
        </form>
        <Modal
					isOpen={this.state.showModal}
					header="Salvar Anamnese do Paciente"
					adjustStyle={styles.modal}
				>
          <div className={css(styles.modalForm)}>
            <div className={css(styles.modalMsg)}>Após salva essa Anamnese não poderá ser editada ou excluída.<br/> Deseja confirmar ação?</div>
            <Button
              text={'Fechar'}
              color="secondary"
              onClick={() => this.setState({showModal: false})}
            />
            <Button
              text={'Confirmar'}
              color="green"
              onClick={() => {
                const {savePatientAnamnesis, selectedPatient} = this.props;
                savePatientAnamnesis(selectedPatient._id, {name: this.state.name, questions: this.state.questions},
                  () => this.props.history.push(`/patients/profile/${this.props.selectedPatient._id}/files/anamnesis`))
              }}
              right
            />
          </div>
        </Modal>
        <Button
					text={'Cancelar'}
					color="secondary"
          onClick={() => this.props.history.push(`/patients/profile/${this.props.selectedPatient._id}/files/anamnesis`)}
				/>
        <Button
					text={'Salvar'}
					color="green"
          onClick={() => this.setState({showModal: true})}
          right
				/>
      </div>
    )
  }
}

const createAnamnesis = reduxForm({
	form: 'createAnamnesis' 
})(CreateAnamnesis);

function mapStateToProps({ patientsCreation }) {
	return { selectedPatient: patientsCreation.selectedPatient }; 
}

export default connect(mapStateToProps, { 
  savePatientAnamnesis,
  getAnamnese
} )(createAnamnesis);