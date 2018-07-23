import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './ClinicalNoteFormStyles';
import moment from 'moment';
import 'moment/locale/pt-br';

import { getPatient, updatePatient } from '../../../actions/patientsCreation';

import Modal from '../../modals/Modal';
import Button from '../../common/Button';
import InputField from '../../forms/InputField';

import ModalClinicalNote from './clinicalNoteModals/ModalClinicalNote';
import ModalDeleteNote from './clinicalNoteModals/ModalDeleteNote';

class ClinicalNoteForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.renderItems = this.renderItems.bind(this);
		this.renderForm = this.renderForm.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.closeModalDelete = this.closeModalDelete.bind(this);

		this.state = {
			modal: false,
			modalDelete: false,
			noteOpened: null,
		}
	}

	componentWillUpdate(nextProps){
    }

	onSubmit(values) {
		const { selectedPatient, updatePatient } = this.props;

		if(values._id){
			selectedPatient.clinical_note.forEach( note => {if( note._id == values._id ){ note.note = values.note } } );	
		}else{
			selectedPatient.clinical_note.push(values);
		}
		updatePatient(selectedPatient, selectedPatient._id, ret =>{
			console.log(ret)
		});
	}

	onDelete(values) {
		const { selectedPatient, updatePatient } = this.props;

		selectedPatient.clinical_note.forEach( note => {if( note._id == values._id ){ note.active = false } } );
		updatePatient(selectedPatient, selectedPatient._id, ret =>{
			console.log(ret)
		});
	}

	openModal(values) {
		this.setState({
			modal: true,
			noteOpened: null,
		});
	}

	closeModal(values) {
		this.setState({
			modal: false,
		});
	}

	openModalEdit(values) {
		this.setState({
			modal: true,
			noteOpened: values
		});
	}

	openModalDelete(values) {
		this.setState({
			modalDelete: true,
			noteOpened: values
		});
	}

	closeModalDelete() {
		this.setState({
			modalDelete: false,
		});
	}

	renderItems(itens) {
		
		if (itens.length > 0) {
			return itens.map( (item, idx) => {
				if(item.active){
					return (
						<li key={idx} className={css(styles.listItem)}>
							<span className={css(styles.date)}> { moment(item.issue_date).format("D/MM/YYYY") } </span>
							<span className={css(styles.link2, styles.red)} onClick={() => this.openModalDelete(item)}>Excluir</span>
							<span className={css(styles.link2)} onClick={() => this.openModalEdit(item)}>Editar</span>
							<div>
								{item.note}
							</div>
						</li>
					);
				}
			});
		} else {
			return (
				<li className={css(styles.noItems)}>
					Nenhuma Anotação ;(
				</li>
			);
		}
	};

	renderForm() {
		const { handleSubmit, selectedPatient } = this.props;

		return (
			<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}>
				{/* --- INFORMAÇÕES BáSICAS --- */}
				<h3 className={css(styles.sectionTitle)}>Anotações 				
					<Button
						text={'Criar Anotação'}
						color="green"
						onClick={this.openModal}
						style={styles.btnNote}
					/>
				</h3>
				<div className={css(styles.section)}>
					<ul className={css(styles.list)}>
						{this.renderItems( selectedPatient ? selectedPatient.clinical_note : [] )}
					</ul>
				</div>
			</form>
		);
	}

	render() {	
		return (
			<div className={css(styles.flex)}>
				{this.renderForm()}

				<Modal
					isOpen={this.state.modal} 
					header={"Nova Anotação"} 
					adjustStyle={styles.modal} 
				>
					<ModalClinicalNote
						note={this.state.noteOpened}
						onCancel={ this.closeModal }
						onSubmit={ this.onSubmit }
					/>
				</Modal>
				<Modal
					isOpen={this.state.modalDelete} 
					header={"Excluir Anotação"} 
					adjustStyle={styles.modal_del} 
				>
					<ModalDeleteNote
						note={this.state.noteOpened}
						onCancel={ this.closeModalDelete }
						onSubmit={ this.onDelete }
					/>
				</Modal>
			</div>
		);
	}
}

// Redux Form function to handle form validation
function validate(values) {
	const errors = {};

	if (values.name) {
		if(values.name.trim().length <= 0){
			errors.name = 'Qual é o nome do paciente?'
		}
	}
	if (!values.name) {
		errors.name = 'Qual é o nome do paciente?'
	}

	return errors;
}

const clinicalNoteForm = reduxForm({
	validate,
	enableReinitialize: true,
	form: 'clinicalNoteForm'
})(ClinicalNoteForm);

function mapStateToProps(state) {
    const selectedPatient = state.patientsCreation.selectedPatient;
    let initialValues = {};

	if (selectedPatient) {
        initialValues = selectedPatient;
	}

	return {
		selectedPatient: state.patientsCreation.selectedPatient,
		initialValues
	};
}

export default connect(mapStateToProps, { getPatient, updatePatient })(clinicalNoteForm);