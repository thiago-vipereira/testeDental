import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './PatientFormStyles';

import { createPatientFull, getPatient, clearPatient, updatePatient } from '../../../actions/patientsCreation';

import Button from '../../common/Button';
import InputField from '../../forms/InputField';
import DateTimePicker from '../date/DateTimePicker';
import TelephoneList from '../../lists/TelephoneList';

const PATIENT = {
	name: { name: 'name', label: 'Nome', placeholder: 'Nome do(a) paciente' },
	email: { name: 'email', label: 'E-mail', placeholder: 'paciente@email.com' },
	registry: { name: 'registry', label: 'Número de Registro', placeholder: 'XXXXXXXX' },

	telNumber: { name: 'telNumber', label: 'Telefone', placeholder: '(XX) XXXXX XXXX', mask: '(99) 99999 9999' },
	telType: { name: 'telType', label: 'Tipo', placeholder: 'Ex.: Celular, Principal...' },

	zip: { name: 'zip', label: 'CEP', placeholder: 'XXXXX - XXX', mask: '99999 - 999' },
	address: { name: 'address', label: 'Endereço', placeholder: 'Ex.: Av. Brasil, 999' },
	state: { name: 'state', label: 'Estado', placeholder: 'Ex.: Paraná, São Paulo...' },
	city: { name: 'city', label: 'Cidade', placeholder: 'Ex.: Curitiba, São Paulo...' },

	profession: { name: 'profession', label: 'Profissão', placeholder: 'Profissão' },
	company: { name: 'company', label: 'Empresa', placeholder: 'Empresa' },
	rg: { name: 'civil_id', label: 'RG', placeholder: 'Ex.:XXX.XXX.XXX - X'},
	cpf: { name: 'cpf', label: 'CPF', placeholder: 'XXX.XXX.XXX - XX', mask: '999.999.999 - 99' },
	father: { name: 'father', label: 'Nome do pai', placeholder: 'Nome do pai' },
	mother: { name: 'mother', label: 'Nome da mãe', placeholder: 'Nome da mãe' },
	father_profession: { name: 'father_profession', label: 'Profissão do pai', placeholder: 'Profissão do pai' },
	mother_profession: { name: 'mother_profession', label: 'Profissão da mãe', placeholder: 'Profissão da mãe' },
	insurance: { name: 'insurance', label: 'Plano de saúde', placeholder: 'Plano de saúde' },
	insurance_number: { name: 'insurance_number', label: 'Número do plano de saúde', placeholder: 'XXX.XXX.XXX.XXX' },
	sponsor: { name: 'sponsor', label: 'Responsável', placeholder: 'Nome do responsável' },
	sponsor_insurance_number: { name: 'sponsor_insurance_number', label: 'Número do plano de saúde do responsável', placeholder: 'XXX.XXX.XXX.XXX' },
	sponsor_cpf: { name: 'sponsor_cpf', label: 'CPF do responsável', placeholder: 'XXX.XXX.XXX - XX', mask: '999.999.999 - 99' },
	indication: { name: 'indication', label: 'Indicação', placeholder: 'Indicação' }
};

// PatientForm handles the form where the user enter the app
class PatientForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
    	this.onBirthChange = this.onBirthChange.bind(this);
		this.renderFields = this.renderFields.bind(this);
		this.renderForm = this.renderForm.bind(this);
		this.getTelephones = this.getTelephones.bind(this);
		this.getTelError = this.getTelError.bind(this);

		this.state = {
			birth: null,
			telephones: [],
			telError: null
		}
	}

	componentDidMount() {
		const { selectedPatient } = this.props;
		
		if (selectedPatient) {
			this.setState({
				birth: selectedPatient.birthday,
				telephones: selectedPatient.telephones
			});
		}
	}

	componentWillReceiveProps(nextProps){
		const { selectedPatient } = this.props;
		
		if( selectedPatient && selectedPatient._id != nextProps.selectedPatient._id){
			this.setState({
				birth: nextProps.selectedPatient.birthday,
				telephones: nextProps.selectedPatient.telephones
			});
		} else if( selectedPatient ){
			this.setState({
				birth: selectedPatient.birthday,
				telephones: selectedPatient.telephones
			});
		}
    }

	onBirthChange(birth) {
		this.setState({
			birth: birth
		})
	}

	getTelephones(tel) {
		this.state.telephones = tel;
	}

	getTelError(telError) {
		this.state.telError = telError;
	}

	onSubmit(values) {
		const { createPatientFull, updatePatient, selectedPatient, clinic, match, history } = this.props;

		values.clinic_id = clinic._id;
		values.telephones = this.state.telephones.filter(tel =>{
			if(tel.value != ''){
				return true;
			}
			return false;
		});
		if (this.state.birth) { values.birthday = this.state.birth; }

		if(!this.state.telError){
			if (match.params.patientId === 'registration') {
				createPatientFull(values, ret =>{
					history.push(`/patients/profile/${ret._id}`);
				});
			} else {
				updatePatient(values, selectedPatient._id, ret => {
				});
			}
		}
	}

	renderFields(fields) {
		// iterate through the FIELDS array and create a Field for each item
		return fields.map(field => {
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

	renderForm() {
		const { match, handleSubmit } = this.props;
		let btnText = 'Atualizar Paciente';

		if (match.params.patientId === 'registration') {
			btnText = 'Criar Paciente';
		}

		return (
			<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}>
				{/* --- INFORMAÇÕES BáSICAS --- */}
				<h3 className={css(styles.sectionTitle)}>Informações básicas</h3>
				<div className={css(styles.section)}>
					<div className={css(styles.row_1)}>
						{this.renderFields([PATIENT.registry])}
					</div>
					<div className={css(styles.row_1)}>
						{this.renderFields([PATIENT.name])}
					</div>
				</div>

				{/* --- CONTATO --- */}
				<h3 className={css(styles.sectionTitle)}>Contato</h3>
				<div className={css(styles.section)}>
					<div className={css(styles.row_1)}>
						{this.renderFields([PATIENT.email])}
					</div>
					<TelephoneList telephones={this.state.telephones} getTelephones={this.getTelephones} getTelError={this.getTelError} />
				</div>

				<h3 className={css(styles.sectionTitle)}>Endereço</h3>
				<div className={css(styles.section)}>
					<div className={css(styles.row_1)}>
						{this.renderFields([PATIENT.address])}
					</div>
					<div className={css(styles.row_3)}>
						{this.renderFields([PATIENT.state, PATIENT.city])}
					</div>
					<div className={css(styles.row_3)}>
						{this.renderFields([PATIENT.zip])}
					</div>
				</div>

				<h3 className={css(styles.sectionTitle)}>Informações Avançadas</h3>
				<div className={css(styles.section)}>
					<div className={css(styles.row_3)}>
						{this.renderFields([PATIENT.cpf, PATIENT.rg])}
					</div>
					<div className={css(styles.row_3)}>
						<DateTimePicker name="birthday" value={this.state.birth} label="Data de Aniversário" onChange={this.onBirthChange} />
					</div>
					<div className={css(styles.row_1)}>
						{this.renderFields([PATIENT.profession])}
					</div>
					<div className={css(styles.row_1)}>
						{this.renderFields([PATIENT.company])}
					</div>
					<div className={css(styles.row_1)}>
						{this.renderFields([PATIENT.mother])}
					</div>
					<div className={css(styles.row_1)}>
						{this.renderFields([PATIENT.mother_profession])}
					</div>
					<div className={css(styles.row_1)}>
						{this.renderFields([PATIENT.father])}
					</div>
					<div className={css(styles.row_1)}>
						{this.renderFields([PATIENT.father_profession])}
					</div>
					<div className={css(styles.row_1)}>
						{this.renderFields([PATIENT.sponsor])}
					</div>
					<div className={css(styles.row_1)}>
						{this.renderFields([PATIENT.sponsor_cpf])}
					</div>
				</div>

				<h3 className={css(styles.sectionTitle)}>Informações do PLano de Saúde</h3>
				<div className={css(styles.section)}>
					<div className={css(styles.row_1)}>
						{this.renderFields([PATIENT.insurance])}
					</div>
					<div className={css(styles.row_1)}>
						{this.renderFields([PATIENT.insurance_number])}
					</div>
					<div className={css(styles.row_1)}>
						{this.renderFields([PATIENT.sponsor_insurance_number])}
					</div>
				</div>

				<h3 className={css(styles.sectionTitle)}>Indicação</h3>
				<div className={css(styles.section)}>
					<div className={css(styles.row_1)}>
						{this.renderFields([PATIENT.indication])}
					</div>
				</div>
				<Button
					text={btnText}
					color="green"
					submit
				/>
			</form>
		);
	}

	render() {
		return (
			<div className={css(styles.flex)}>
				{this.renderForm()}
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

const patientForm = reduxForm({
	validate,
	enableReinitialize: true,
	form: 'patientForm'
})(PatientForm);

function mapStateToProps(state) {
    const selectedPatient = state.patientsCreation.selectedPatient;
    let initialValues = {};

	if (selectedPatient) {
        initialValues = selectedPatient;
	}

	return {
        clinic: state.auth.clinic,
		user: state.auth.user,
		selectedPatient: state.patientsCreation.selectedPatient,
		initialValues
	};
}

export default connect(mapStateToProps, { createPatientFull, getPatient, clearPatient, updatePatient })(patientForm);