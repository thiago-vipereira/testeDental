import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { createPatient, clearPatient, passPatient } from '../../actions/patientsCreation';

import { css } from 'aphrodite/no-important';
import { styles } from './NewPatientFormStyles';

import Button from '../common/Button';
import InputField from '../forms/InputField';

const FIELDS = [
	{ name: 'name', label: 'Nome', placeholder: 'Nome do paciente' },
	{ name: 'telephone', label: 'Telefone', placeholder: '(XX) XXXXX XXXX ', mask: '(99) 99999 9999' },
];

// NewPatientForm handles the form where the user enter the app
class NewPatientForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		//this.renderAuthMsg = this.renderAuthMsg.bind(this);
		this.renderFields = this.renderFields.bind(this);

		this.state = {
			redirect: false,
			errorMsg: null
		}
	}

	onSubmit({ name, telephone }) {
		const { createPatient, clearPatient, createdPatient, onCancel, history, clinic, passPatient } = this.props;
		const { redirect } = this.state;

		this.setState({ errorMsg: null});
		console.log('clico');
		createPatient({ name, telephone: telephone, clinicId: clinic._id }, patient => {
			const error = typeof patient === 'string';

			if (!redirect && !error) {
				onCancel();
				if (createdPatient)
					createdPatient(patient);
			} else if ( redirect && !error) {
				onCancel();
				passPatient(patient);
				history.push(`/patients/profile/${patient._id}`);
				
			} else {
				this.setState({ errorMsg: 'Esse paciente já está cadastrado no sistema :('});
			}

		});
	}

	renderAuthMsg() {
		const { errorMsg } = this.state;

		if(errorMsg) {
			return (
				<div className={css(styles.msgAuth)}>
					<span className={css(styles.msgSpan)}>{errorMsg}</span>
				</div>
			);
		}
	}

	renderFields() {
		// iterate through the FIELDS array and create a Field for each item
		return FIELDS.map(field => {
			return (
				<Field
					key={field.name}
					type={(field.type) ? field.type : 'text'}
					name={field.name}
					label={field.label}
					placeholder={(field.placeholder) ? field.placeholder : ''}
					mask={(field.mask) ? field.mask : ''}
					component={InputField}
				/>
			);
		});
	}

	render() {
		const { handleSubmit, onCancel } = this.props;
		
		return (
			<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}>
				{this.renderAuthMsg()}
				
				{this.renderFields()}

				<Button
					text="Salvar"
					submit
					onClick={() => { this.setState({ redirect: false }) }}
				/>

				<Button
					text="Completar Cadastro"
					submit
					onClick={() => { this.setState({ redirect: true }) }}
				/>

				<Button
						text="Cancelar"
						color="secondary"
						onClick={onCancel}
						right
				/>
			</form>
		);
	}
}

// Redux Form function to handle form validation
function validate(values) {
	const errors = {};
	const regex = /\([1-9]{2}\) [2-9][0-9]{3,4} [0-9]{4}/;

	if (values.name) {
		if(values.name.trim().length <= 0){
			errors.name = 'Escreva um nome para o paciente';
		}
	}
	if (!values.name) {
		errors.name = 'Escreva um nome para o paciente';
	}

	if (!values.telephone || !regex.test(values.telephone)) {
		errors.telephone = 'Número de telefone inválido';
	}

	return errors;
}

const newPatientForm = reduxForm({
	validate,
	form: 'newPatientForm'
})(NewPatientForm);

function mapStateToProps(state) {
	return {
		clinic: state.auth.clinic,
		message: state.patientsCreation.message,
		createdPatient: state.patientsSearch.listener
	};
}

export default connect(mapStateToProps, { createPatient, clearPatient, passPatient })(newPatientForm);
