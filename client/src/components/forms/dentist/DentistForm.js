import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css, StyleSheet } from 'aphrodite/no-important';
import { styles } from './DentistFormStyles';

import { GithubPicker } from 'react-color';

import { createDentist, getDentist, updateDentist } from '../../../actions/dentists';

import Button from '../../common/Button';
import InputField from '../../forms/InputField';
import DentistSchedule from './DentistSchedule';
import DateTimePicker from '../date/DateTimePicker';
import TelephoneList from '../../lists/TelephoneList';

const DENTIST_BASIC = {
	user: { name: 'user', label: 'Usuário vinculado', placeholder: '----' },
	name: { name: 'name', label: 'Nome', placeholder: 'Nome do(a) dentista' },
	speciality: { name: 'speciality', label: 'Especialidade', placeholder: 'Ex.: Endodontia, Periodontia...' },
	cro: { name: 'cro', label: 'CRO', placeholder: 'XXXXXXXX' },
	commission: { name: 'commission', label: 'Comissão', placeholder: 'XX %' },
	cpf: { name: 'cpf', label: 'CPF', placeholder: 'XXX.XXX.XXX - XX', mask: '999.999.999 - 99' },
	rg: { name: 'civil_id', label: 'RG', placeholder: 'Ex.:XXX.XXX.XXX - X' },
	birth: { name: 'birthday', label: 'Data de nascimento', placeholder: 'DD / MM / AAAA', mask: '99 / 99 / 9999' },
	email: { name: 'email', label: 'E-mail', placeholder: 'dentista@email.com' },
	telNumber: { name: 'telNumber', label: 'Telefone', placeholder: '(XX) XXXXX XXXX', mask: '(99) 99999 9999' },
	telType: { name: 'telType', label: 'Tipo', placeholder: 'Ex.: Celular, Principal...' },
	zip: { name: 'zip', label: 'CEP', placeholder: 'XXXXX - XXX', mask: '99999 - 999' },
	address: { name: 'address', label: 'Endereço', placeholder: 'Ex.: Av. Brasil, 999' },
	state: { name: 'state', label: 'Estado', placeholder: 'Ex.: Paraná, São Paulo...' },
	city: { name: 'city', label: 'Cidade', placeholder: 'Ex.: Curitiba, São Paulo...' }
};

// DentistForm handles the form where the user enter the app
class DentistForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onGetSchedule = this.onGetSchedule.bind(this);
    	this.onBirthChange = this.onBirthChange.bind(this);
		this.renderFields = this.renderFields.bind(this);
		this.renderForm = this.renderForm.bind(this);
		this.renderSchedule = this.renderSchedule.bind(this);
		this.getTelephones = this.getTelephones.bind(this);
		this.getTelError = this.getTelError.bind(this);
		this.displayColorPickerClick = this.displayColorPickerClick.bind(this);
		this.displayColorPickerClose = this.displayColorPickerClose.bind(this);
		this.displayColorPickerChange = this.displayColorPickerChange.bind(this);
		this.onVacation1Change = this.onVacation1Change.bind(this);
		this.onVacation2Change = this.onVacation2Change.bind(this);

		this.state = {
			schedule: null,
      		birth: null,
			telephones: [],
			telError: null,
			displayColorPicker: false,
			color: '#C4DEF6',
			vacation_start: null,
			vacation_end: null,
		}
	}

	componentDidMount() {
        const { match: { params }, getDentist } = this.props;

		if (params.dentistId && params.dentistId !== 'registration') {
			getDentist(params.dentistId, dentist => {
				this.onGetSchedule(dentist.schedule);
				this.setState({
					birth : dentist.birthday,
					telephones: dentist.telephones,
					color: dentist.color,
					vacation_start: dentist.vacation_start,
					vacation_end: dentist.vacation_end,
				});
			});
		}
	}

	displayColorPickerClick() {
		this.setState({ displayColorPicker: !this.state.displayColorPicker })
	};

	displayColorPickerClose() {
		this.setState({ displayColorPicker: false })
	  };
	
	displayColorPickerChange(color) {
		this.setState({ color: color.hex })
		this.displayColorPickerClose();
	};

	onGetSchedule(schedule) {
		this.setState({
			schedule
		});
	}

	onBirthChange(birth) {
		this.setState({
			birth: birth
		})
	}

	onVacation1Change(value) {
		this.setState({
			vacation_start: value
		})
	}

	onVacation2Change(value) {
		this.setState({
			vacation_end: value
		})
	}

	getTelephones(tel) {
		this.state.telephones = tel;
	}

	getTelError(telError) {
		this.state.telError = telError;
	}

	onSubmit(values) {
		const { user, clinic, match, createDentist, updateDentist, selectedDentist } = this.props;

		values.color = this.state.color;
		values.clinic_id = clinic._id;
		values.schedule = this.state.schedule;
		values.updated_by = user._id;
		values.vacation_start = this.state.vacation_start;
		values.vacation_end = this.state.vacation_end;

		values.telephones = this.state.telephones.filter(tel =>{
			if(tel.value != ''){
				return true;
			}
			return false;
		});

    	if (this.state.birth) { values.birthday = this.state.birth; }

		if(!this.state.telError){
			if (match.params.dentistId === 'registration') {
				createDentist(values);
			} else {
				updateDentist(values, selectedDentist._id);
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
		let btnText = 'Atualizar Dentista';

		if (match.params.dentistId === 'registration') {
			btnText = 'Criar Dentista';
		}

		return (
			<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}>
				{/* --- INFORMAÇÕES BáSICAS --- */}
				<h3 className={css(styles.sectionTitle)}>Informações básicas</h3>
				<div className={css(styles.section)}>
					<div className={css(styles.row_1)}>
						{this.renderFields([DENTIST_BASIC.user])}
					</div>
					<div className={css(styles.row_1)}>
						{this.renderFields([DENTIST_BASIC.name])}
					</div>
				</div>

				{/* --- INFORMAÇÕES Clínicas --- */}
				<h3 className={css(styles.sectionTitle)}>Informações clínicas</h3>
				<div className={css(styles.section)}>
					<div className={css(styles.row_3)}>
						{this.renderFields([DENTIST_BASIC.speciality, DENTIST_BASIC.cro, DENTIST_BASIC.commission])}
					</div>
				</div>

				{/* --- IDENTIFICAÇÃO --- */}
				<h3 className={css(styles.sectionTitle)}>Identificação</h3>
				<div className={css(styles.section)}>
					<div className={css(styles.row_3)}>
						{this.renderFields([DENTIST_BASIC.cpf, DENTIST_BASIC.rg])}
					</div>
					<div className={css(styles.row_3)}>
						{/*this.renderFields([DENTIST_BASIC.birth])*/}
						<DateTimePicker name="birthday" value={this.state.birth} label="Data de Aniversário" onChange={this.onBirthChange} />
					</div>
				</div>

				{/* --- CONTATO --- */}
				<h3 className={css(styles.sectionTitle)}>Contato</h3>
				<div className={css(styles.section)}>
					<div className={css(styles.row_1)}>
						{this.renderFields([DENTIST_BASIC.email])}
					</div>
					<TelephoneList telephones={this.state.telephones} getTelephones={this.getTelephones} getTelError={this.getTelError} />
				</div>

				{/* --- ENDEREÇO --- */}
				<h3 className={css(styles.sectionTitle)}>Endereço</h3>
				<div className={css(styles.section)}>
					<div className={css(styles.row_1)}>
						{this.renderFields([DENTIST_BASIC.address])}
					</div>
					<div className={css(styles.row_3)}>
						{this.renderFields([DENTIST_BASIC.state, DENTIST_BASIC.city])}
					</div>
					<div className={css(styles.row_3)}>
						{this.renderFields([DENTIST_BASIC.zip])}
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

	renderSchedule() {
		const { match: { params } } = this.props;

		if (params.dentistId && params.dentistId === 'registration') {
			const schedule = {
				sun: [],
				mon: [{ start: '08:00', end: '12:00'}, { start: '13:00', end: '18:00'}],
				tue: [{ start: '08:00', end: '12:00'}, { start: '13:00', end: '18:00'}],
				wed: [{ start: '08:00', end: '12:00'}, { start: '13:00', end: '18:00'}],
				thu: [{ start: '08:00', end: '12:00'}, { start: '13:00', end: '18:00'}],
				fri: [{ start: '08:00', end: '12:00'}, { start: '13:00', end: '18:00'}],
				sat: []
			};

			this.state.schedule = schedule;
			return  <DentistSchedule schedule={schedule} getSchedule={this.onGetSchedule} />;

		} else if (this.state.schedule) {
			return  <DentistSchedule schedule={this.state.schedule} getSchedule={this.onGetSchedule} />;
		}

		return <div className={css(styles.loading)}>Carregando...</div>;
	}

	render() { 

		const style = StyleSheet.create({
			color: {
				width: '100%',
				height: '14px',
				borderRadius: '2px',
				background: this.state.color,
			  },
		});

		return (
			<div className={css(styles.container)}>
				<div className={css(styles.content)}>
					{this.renderForm()}
				
				<div className={css(styles.schedule)}>

					<h3 className={css(styles.sectionTitle)}>Cor do Dentista na Agenda</h3>
					
					<div className={css(styles.backgroundCard)}>
						<div className={css(styles.swatch)} onClick={ this.displayColorPickerClick }>
							<div className={css(style.color)}/>
						</div>
						{ this.state.displayColorPicker ? <div className={css(styles.popover)}>
							<div className={css(styles.cover)} onClick={ this.displayColorPickerClose }/>
								<GithubPicker color={ this.state.color } onChange={ this.displayColorPickerChange } />
							</div> :
						null }
					</div>
					
					{/* --- HORÁRIOS DE ATENDIMENTO --- */}
					<h3 className={css(styles.sectionTitle)}>Horários de atendimento</h3>
					<div className={css(styles.backgroundCard)}>
						{this.renderSchedule()}
					</div>
					{/* --- FÉRIAS --- */}
					<h3 className={css(styles.sectionTitle)}>Férias</h3>
					<div className={css(styles.backgroundCard)}>
						<DateTimePicker name="vacation1" value={this.state.vacation_start ? this.state.vacation_start: new Date()} label="Início das Férias" onChange={this.onVacation1Change} />
						<DateTimePicker name="vacation2" value={this.state.vacation_end ? this.state.vacation_end: new Date()} label="Fim das Férias" onChange={this.onVacation2Change} />
					</div>
				</div>
				
				</div>
			</div>
		);
	}
	
}

function validate(values) {
	const errors = {};

	if (values.name) {
		if(values.name.trim().length <= 0){
			errors.name = 'Qual é o nome do dentista?'
		}
	}
	if (!values.name) {
		errors.name = 'Qual é o nome do dentista?'
	}

	if (values.cro) {
		if(values.cro.trim().length <= 0){
			errors.cro = 'CRO inválido'
		}
	}
	if (!values.cro) {
		errors.cro = 'CRO inválido'
	}

	return errors;
}

const dentistForm = reduxForm({
	validate,
	enableReinitialize: true,
	form: 'dentistForm'
})(DentistForm);

function mapStateToProps(state) {
    const selectedDentist = state.clinicConfig.selectedDentist;
    let initialValues = {};

	if (selectedDentist) {
        initialValues = selectedDentist;
	}

	return {
        clinic: state.auth.clinic,
		user: state.auth.user,
		selectedDentist: state.clinicConfig.selectedDentist,
		initialValues
	};
}

export default connect(mapStateToProps, { createDentist, getDentist, updateDentist })(dentistForm);
