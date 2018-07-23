import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { NavLink, Link } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { styles } from './SavedAnamnesisStyles';

import InputField from '../../forms/InputField';
import Button from '../../common/Button';
import Modal from '../../modals/Modal';
import Icon from '../../common/Icon';
import CheckBox from '../../common/CheckBox';

import { fetchPatientAnamnesis } from '../../../actions/patientAnamnesis';

import { fetchAnamnese } from '../../../actions/anamnesis';

// 'ProcedureRouter' will manage the routes inside the patient module
class SavedAnamnesis extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      anamnesis: [],
      models: [],
      showModal: false
    }
  }
  componentDidMount() {
    const { fetchPatientAnamnesis, fetchAnamnese, selectedPatient } = this.props;
    if (selectedPatient) {
      fetchPatientAnamnesis(selectedPatient._id, (anamnesis) => this.setState({anamnesis}));
      fetchAnamnese((models) => this.setState({models}))
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { fetchPatientAnamnesis, fetchAnamnese, selectedPatient } = this.props;
    if (!selectedPatient && nextProps.selectedPatient) {
      fetchPatientAnamnesis(nextProps.selectedPatient._id, (anamnesis) => this.setState({anamnesis}));
      fetchAnamnese((models) => this.setState({models}))
    }
  }
  render() {
    const {match} = this.props;
    return (
      <div style={{position: 'relative'}}>
        <Modal
					isOpen={this.state.showModal}
					header="Escolha um Modelo"
					adjustStyle={styles.modal}
				>
          <div style={{padding: '1rem'}}>
            <div className={css(styles.listContainer)} style={{marginBottom: '1rem'}}>
              {this.state.models.map((item, index) => (
                <NavLink
                  key={`link_${index}`}
                  className={css(styles.link)}
                  to={`${match.path}/create/${item._id}`}
                >
                  <div className={css(styles.line)}>
                    <span>{item.name}</span>
                    <span style={{float: 'right'}}>{item.questions.length} pergunta{item.questions.length>1?'s':''}</span>
                  </div>
                </NavLink>
              ))}
            </div>
            <Button
              text={'Fechar'}
              color="secondary"
              onClick={() => this.setState({showModal: false})}
            />
          </div>
        </Modal>
        <div onClick={() => this.setState({showModal: true})} className={css(styles.containerOption)}>
          <span className={css(styles.create)} >Nova Anamnese</span>
        </div>
        <div className={css(styles.listContainer)}>
          {this.state.anamnesis.map((item, index) => (
            <NavLink
              key={`link_${index}`}
              className={css(styles.link)}
              to={`${match.path}/${item._id}`}
            >
              <div className={css(styles.line)}>
                <span>{item.name}</span>
                <span style={{float: 'right'}}>{item.questions.length} pergunta{item.questions.length>1?'s':''}</span>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ patientAnamnesis, patientsCreation }) {
	return {
    selectedPatient: patientsCreation.selectedPatient,
    anamnesisModels: patientAnamnesis.allAnamnesis
	}; 
} 

export default connect(mapStateToProps, { fetchPatientAnamnesis, fetchAnamnese } )(SavedAnamnesis);