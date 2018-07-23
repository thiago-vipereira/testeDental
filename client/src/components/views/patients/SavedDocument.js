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

import { fetchPatientDocument } from '../../../actions/patientDocument';

import { fetchModelByType } from '../../../actions/model';

// 'ProcedureRouter' will manage the routes inside the patient module
class SavedDocument extends Component {
  constructor(props) { 
    super(props);
    var paths = props.match.path.split('/');
    this.state = {
      document: [],
      models: [],
      showModal: false,
      type: paths[5],
      fileOptions: { prescription: 'Nova Prescrição', attestations: 'Novo Atestado' },
    }
  }
  componentDidMount() {
    const { fetchPatientDocument, fetchModelByType, selectedPatient } = this.props;
    if (selectedPatient) {
      fetchPatientDocument(selectedPatient._id, this.state.type, (document) => this.setState({document}));
      fetchModelByType(this.state.type, (models) => this.setState({models}))
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { fetchPatientDocument, fetchModelByType, selectedPatient } = this.props;
    if (!selectedPatient && nextProps.selectedPatient) {
      fetchPatientDocument(nextProps.selectedPatient._id, this.state.type, (document) => this.setState({document}));
      fetchModelByType(this.state.type, (models) => this.setState({models}))
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
          <span className={css(styles.create)} >{this.state.fileOptions[this.state.type]}</span>
        </div>
        <div className={css(styles.listContainer)}>
          {this.state.document.map((item, index) => (
            <NavLink
              key={`link_${index}`}
              className={css(styles.link)}
              to={`${match.path}/${item._id}`}
            >
              <div className={css(styles.line)}>
                <span>{item.name}</span>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ patientDocument, patientsCreation }) {
	return {
    selectedPatient: patientsCreation.selectedPatient,
    documentModels: patientDocument.allDocument
	}; 
} 

export default connect(mapStateToProps, { fetchPatientDocument, fetchModelByType } )(SavedDocument);