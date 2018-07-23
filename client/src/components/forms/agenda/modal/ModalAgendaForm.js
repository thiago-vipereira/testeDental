import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, change } from 'redux-form';
import PropTypes from 'prop-types';


import T from 'i18n-react';
import moment from 'moment';
import 'moment/locale/pt-br';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { css } from 'aphrodite/no-important';
import { styles } from '../AgendaFormStyles';
import DateTimePicker from '../../date/DateTimePicker';

import Icon from '../../../common/Icon';
import SelectBox from '../../../common/SelectBox';
import Modal from '../../../modals/Modal';
import Button from '../../../common/Button';
import InputField from '../../../forms/InputField';
import TimePicker from '../../time/TimePicker';
import Toggle from '../../../common/Toggle';
import AutoCompleteByProps from '../../../forms/AutoCompleteByProps';
import PatientInputAuto from '../../../forms/PatientInputAuto';
import ModalCreatePatient from '../modal/ModalCreatePatientForm';
import ModalVacationForm from '../modal/ModalVacationForm';

import { patientAgendaValidation } from '../../../../actions/patientsSearch';
import { checkDentistSchedule } from '../../../../actions/agendaConfig';

const FIELDS = [
	{ name: 'desc', label: 'Descrição', placeholder: 'Descrição', type:'textarea' },
];

class ModalAgendaForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.renderFields = this.renderFields.bind(this);
		this.onStartChange = this.onStartChange.bind(this);
		this.onEndChange = this.onEndChange.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.validate = this.validate.bind(this);
		this.InputDentist = this.InputDentist.bind(this);
		this.InputPatient = this.InputPatient.bind(this);
		this.setToggle = this.setToggle.bind(this);
		this.onOpenModalVacation = this.onOpenModalVacation.bind(this);
		this.onCloseModalVacation = this.onCloseModalVacation.bind(this);
		this.submitVacation = this.submitVacation.bind(this);
		this.checkVacation = this.checkVacation.bind(this);
		this.renderProcedureSelectBox = this.renderProcedureSelectBox.bind(this);
		this.renderSelectBoxStatus = this.renderSelectBoxStatus.bind(this);
		this.onChangeSelectBoxStatus = this.onChangeSelectBoxStatus.bind(this);

		this.onOpenModal = this.onOpenModal.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
		
        this.state = {
			showModal: false,
			errorMsg: null,

			modal: false,
			modalVacation: false,
			modalPatientSubmit: null,
			modalPatientCancel: null,
			
			date: null,
			allDay: false,
			start: null,
			end: null,
			patient: "",
			id_patient: null,
			title: [],
			user: "",
			id_user: null,
			tel:"",
			valuesToSubmit: null,
			textModalValidation: null,
			status: null,
		}
	}

	componentWillMount() {
		const { selectedSlot , selectEvent, selectedDentist } = this.props;

		if(selectedSlot){
			this.setState({
				date: selectedSlot,
				id_user: selectedDentist && selectedDentist.length > 0 ? selectedDentist[0].value : null,
				user: selectedDentist && selectedDentist.length > 0 ? selectedDentist[0].label : '',

				start: {
					hour: Number(new Date().getHours()),
					minute: Number(new Date().getMinutes()),
				},
				end: {
					hour: Number( new Date( new Date().setHours(new Date().getHours() + 1) ).getHours() ),
					minute: Number(new Date().getMinutes()),
				},
			});
		}

		if(selectEvent){
			this.setState({

				patient: selectEvent.patient,
				id_patient: selectEvent.id_patient,
				user: selectEvent.user,
				id_user: selectEvent.id_user,
				status: selectEvent.status,
				
				date: selectEvent.start,
				allDay: selectEvent.allDay,

				start: {
					hour: Number(selectEvent.start.getHours()),
					minute: Number(selectEvent.start.getMinutes()),
				},
				end: {
					hour: Number(selectEvent.end.getHours()),
					minute: Number(selectEvent.end.getMinutes()),
				},
			});
		}
	}

	onOpenModal() {
		this.setState({ 
			modal: true 
		});
	}

	onCloseModal(){
		this.setState({ 
			modal: false 
		});
	}

	onOpenModalVacation(text){
		this.setState({ 
			modalVacation: true,
			textModalValidation: text,
		});
	}

	onCloseModalVacation(){
		this.setState({
			modalVacation: false,
		});
	}

	onDateChange(date) {
		this.setState({
			date: date
		})
	}

	onStartChange(value, name){

		var start = {
			hour: Number(value.split(':')[0]),
			minute: Number(value.split(':')[1])
		}
		
		this.setState({
			start: start
		})
	}

	onEndChange(value, name) {

		var end = {
			hour: Number(value.split(':')[0]),
			minute: Number(value.split(':')[1])
		}
		
		this.setState({
			end: end
		})
	}

	submitVacation(){

		this.onSubmit(this.state.valuesToSubmit);
		this.setState({ 
			modalVacation: false 
		});
	}

	checkVacation(values){
		const { dentistsById, checkDentistSchedule } = this.props;
	
		if(dentistsById){
			var i;
			
			dentistsById.map( user =>{
				if(user._id == this.state.id_user || user.name == this.state.user){ i = user }
			});

			if(i){


				var startCheck = new Date(this.state.date);
				var endCheck = new Date(this.state.date);
				startCheck = new Date(startCheck.setHours(this.state.start.hour, this.state.start.minute));
				endCheck = new Date(endCheck.setHours(this.state.end.hour, this.state.end.minute));
				
				checkDentistSchedule({id: i._id, start: startCheck, end: endCheck}, ret => {
				
					var dayObject;
					var inInterval = false;
					var inVacation = false;
					var dayMessage = [];
					var vacationMessage = [];
					var denstistScheduleValidation = [];

					dayMessage.push(<span> { T.translate("agenda_schedule_validation") } </span>);
					vacationMessage.push(<span> { T.translate("agenda_vacation_validation") } </span>);
					denstistScheduleValidation.push(<span> { T.translate("denstist_schedule_validation") } </span>);

					switch (moment( this.state.date ).weekday()) {
						case 0:
							dayObject = i.schedule.sun
							break;
						case 1:
							dayObject = i.schedule.mon
							break;
						case 2:
							dayObject = i.schedule.tue
							break;
						case 3:
							dayObject = i.schedule.wed
							break;
						case 4:
							dayObject = i.schedule.thu
							break;
						case 5:
							dayObject = i.schedule.fri
							break;
						case 6:
							dayObject = i.schedule.sat
							break;
					}

					if(dayObject.length > 0){
						
						dayObject.map(day => {

							var init = new Date( this.state.date ).setHours(Number(day.start.split(':')[0]), Number(day.start.split(':')[1]));
							var end = new Date( this.state.date ).setHours(Number(day.end.split(':')[0]), Number(day.end.split(':')[1]));

							if(this.state.date.getHours() == 0 && this.state.date.getMinutes() == 0){ }else{
								if( this.state.date >= init && this.state.date <= end ){ inInterval = true } else {
									dayMessage.push(<br></br>);
									dayMessage.push(<span> { day.start } até { day.end } </span>);
								}
							}
						});	
					}

					if(i.vacation_start && new Date(i.vacation_start) <= this.state.date && new Date(i.vacation_end) >= this.state.date ){
						vacationMessage.push(<br></br>);
						vacationMessage.push( <span> { moment(i.vacation_start).format("D MMM YYYY") }  até </span>);
						vacationMessage.push( <span> { moment(i.vacation_end).format("D MMM YYYY") } </span>);
						inVacation = true;
					}

					if(!inInterval || inVacation || ret.length > 0){
						
						function textToShow( dayMessage , vacationMessage, denstistScheduleValidation ){

							return (
								<div>
									<div className={css(styles.listContainer)}>
										{ dayMessage.map(ret => { return ret; }) }
									</div>
									<div className={css(styles.listContainer)}>
										{ vacationMessage.map(ret => { return ret; }) }
									</div>
									{ ret.length > 0 ? 
										<div className={css(styles.listContainer)}>
											{ denstistScheduleValidation.map(ret => { return ret; }) }
										</div>
									: ''}
								</div>
							)
						}

						this.setState({
							valuesToSubmit: values
						});

						this.onOpenModalVacation( textToShow(dayMessage, vacationMessage, denstistScheduleValidation) );
					}else{
						this.onSubmit(values);	
					}
				});
			}else{
				this.onSubmit(values);	
			}
		}else{
			this.onSubmit(values);
		}
	}

	onSubmit(values){
		const { socket, clinic, onCancel, selectedSlot, selectEvent, patientAgendaValidation, agendaConfig } = this.props;

		if(selectedSlot){
		
			if(socket && clinic){

				var start = new Date(this.state.date);
				var end = new Date(this.state.date);
				start = new Date(start.setHours(this.state.start.hour, this.state.start.minute));
				end = new Date(end.setHours(this.state.end.hour, this.state.end.minute));

				if(start >= end){
					this.state.errorMsg = "Erro no Intervalo de Horários";
				} else {
					var title = {name: ''};
					if(values.id_title){
						title = agendaConfig.procedures.find( (item) => { if(item._id == values.id_title){return item} });
					}

					var schedule = {
						title: title.name,
						id_title: values.id_title,
						user: this.state.user,
						id_user: this.state.id_user,
						patient: this.state.patient,
						id_patient: this.state.id_patient,
						allDay: this.state.allDay,
						start: start,
						end: end,
						telephone: values.telephone,
						desc: values.desc ? values.desc : "",
						status: this.state.status,
					};

					if(!this.validate(schedule) && values){

						if(schedule.id_patient){
							socket.emit('create', { data: clinic.clinic_data, schedule: schedule, createNew: false });
							onCancel();
						}else{

							patientAgendaValidation({name: schedule.patient, telephone: schedule.telephone }, ret =>{

								if(ret){

									schedule.id_patient = ret._id;
									schedule.patient = ret.name;
									socket.emit('create', { data: clinic.clinic_data, schedule: schedule, createNew: false });
									onCancel();
								}else{

									this.setState({
										modalPatientSubmit: () => {socket.emit('create', { data: clinic.clinic_data, schedule: schedule, createNew: true }); onCancel() },
										modalPatientCancel: () => {socket.emit('create', { data: clinic.clinic_data, schedule: schedule, createNew: false }); onCancel() },
									})
									this.onOpenModal();
								}
							});
						}
					}else{
						this.renderAuthMsg();
					}
				}
			}
		}

		if(selectEvent){

			if(socket && clinic){

				var start = new Date(this.state.date);
				var end = new Date(this.state.date);
				start = new Date(start.setHours(this.state.start.hour, this.state.start.minute));
				end = new Date(end.setHours(this.state.end.hour, this.state.end.minute));

				if(start >= end){
					this.state.errorMsg = "Erro no Intervalo de Horários";
				}else {
					var title = {name: ''};
					if(values.id_title){
						title = agendaConfig.procedures.find( (item) => { if(item._id == values.id_title){return item} });
					}

					selectEvent.title = title.name;
					selectEvent.id_title = values.id_title;
					selectEvent.user = this.state.user;
					selectEvent.id_user = this.state.id_user;
					selectEvent.patient = this.state.patient;
					selectEvent.id_patient = this.state.id_patient;
					selectEvent.allDay = this.state.allDay;
					selectEvent.start = start;
					selectEvent.end = end;
					selectEvent.telephone = values.telephone;
					selectEvent.desc = values.desc ? values.desc : "";
					selectEvent.status = this.state.status;

					if(!this.validate(selectEvent)){
						socket.emit('update', { data: clinic.clinic_data, move: { event: selectEvent, start, end } });
						onCancel();
					}else{
						this.renderAuthMsg();
					}
				}
			}
		}
	}

	onDelete(){
		const { socket, clinic, onCancel, selectEvent } = this.props;

		if(selectEvent){

			if(socket && clinic){

				var start = new Date(this.state.date);
				var end = new Date(this.state.date);
				start = new Date(start.setHours(this.state.start.hour, this.state.start.minute));
				end = new Date(end.setHours(this.state.end.hour, this.state.end.minute));

				if(start >= end){
					this.state.errorMsg = "Erro no Intervalo de Horários";
				}else {
					selectEvent.active = false;
					socket.emit('update', { data: clinic.clinic_data, move: { event: selectEvent, start, end } });
					onCancel();
				}
			}
		}
	}

	validate(values) {
		const regex = /\([1-9]{2}\) [2-9][0-9]{3,4} [0-9]{4}/;

		if (values.patient) {
			if(values.patient.trim().length <= 0){
				this.setState({
					errorMsg: 'Digite o nome do Paciente'
				});
				return true;
			}
		}
		if (!values.patient) {
			this.setState({
				errorMsg: 'Digite o nome do Paciente'
			});
			return true;
		}
	
		if (values.title) {
			if(values.title.trim().length <= 0){
				this.setState({
					errorMsg: 'Selecione o Procedimento'
				});
				return true;
			}
		}
		if (!values.title) {
			this.setState({
				errorMsg: 'Selecione o Procedimento'
			});
			return true;
		}

		if (values.status) {
			if(values.title.trim().length <= 0){
				this.setState({
					errorMsg: 'Selecione a Situação do Agendamento'
				});
				return true;
			}
		}
		if (!values.status) {
			this.setState({
				errorMsg: 'Selecione a Situação do Agendamento'
			});
			return true;
		}
	
		if (values.user) {
			if(values.user.trim().length <= 0){
				this.setState({
					errorMsg: 'Digite o nome do Dentista'
				});
				return true;
			}
		}
		if (!values.user) {
			this.setState({
				errorMsg: 'Digite o nome do Dentista'
			});
			return true;
		}

		if (!values.telephone || !regex.test(values.telephone)){
			this.setState({
				errorMsg: 'Número de telefone inválido'
			});
			return true;
		}

		return false;
	}
    
    renderAuthMsg() {
        const { errorMsg } = this.state;
        
		if(errorMsg) {
			return (
				<div className={css(styles.msgAuth_modal)}>
					<span>{errorMsg}</span>
				</div>
			);
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

	renderProcedureSelectBox(){

		const { agendaConfig } = this.props;
		
		var options = [];
		options.push({ value: '' ,label: "Selecione"});
		if(agendaConfig){
			
			this.state.title = agendaConfig.procedures;

			agendaConfig.procedures.map( item => {
				options.push({ value: item._id ,label: item.name});
			});
		}

		return (
			<Field
			key={'id_title'}
			type={'selectbox'}
			name={'id_title'}
			label={'Procedimento'}
			itens={options}
			component={SelectBox}
		/>);
	}

	renderSelectBoxStatus(options){
		
		var OPTIONS = [
			{ value: 'not_confirmed', label: T.translate("not_confirmed")},
			{ value: 'first_attempt', label: T.translate("first_attempt")},
			{ value: 'second_attempt', label: T.translate("second_attempt")},
			{ value: 'third_attempt', label: T.translate("third_attempt")},
			{ value: 'confirmed', label: T.translate("confirmed")},
			{ value: 'waiting_room', label: T.translate("waiting_room")},
			{ value: 'attended', label: T.translate("attended")},
			{ value: 'justified_missing', label: T.translate("justified_missing")},
			{ value: 'unjustified_missing', label: T.translate("unjustified_missing")},
		];
		
		var optionComponent = React.createClass({
			propTypes: {
				children: PropTypes.node,
				className: PropTypes.string,
				isDisabled: PropTypes.bool,
				isFocused: PropTypes.bool,
				isSelected: PropTypes.bool,
				onFocus: PropTypes.func,
				onSelect: PropTypes.func,
				option: PropTypes.object.isRequired,
			},
			handleMouseDown (event) {
				event.preventDefault();
				event.stopPropagation();
				this.props.onSelect(this.props.option, event);
			},
			handleMouseEnter (event) {
				this.props.onFocus(this.props.option, event);
			},
			handleMouseMove (event) {
				if (this.props.isFocused) return;
				this.props.onFocus(this.props.option, event);
			},
			render(){
				return(
					<div className={css(styles.rowIco)} onMouseDown={this.handleMouseDown} onMouseEnter={this.handleMouseEnter} onMouseMove={this.handleMouseMove}	>
						<div className={css(styles.ico)} >
							<Icon icon={this.props.option.value} size="small" color="grey65" />
						</div>
						<div className={css(styles.labelIco)} >
							{this.props.option.label}
						</div>
					</div>
				)
			}
		});

		const valueComponent = React.createClass({
			propTypes: {
				children: PropTypes.node,
				value: PropTypes.object
			},
			render () {
				return (
						<div className={css(styles.rowIco)} >
							<div className={css(styles.ico)} >
								<Icon icon={this.props.value.value} size="small" color="grey65" />
							</div>
							<div className={css(styles.labelIco)} >
								{this.props.value.label}
							</div>
						</div>
				);
			}
		});

		return (
			<fieldset className={css(styles.fieldset)}>
				<label className={css(styles.label2)}>Situação do Agendamento</label>
				<Select
					name="select"
					placeholder="Situação do Agendamento"
					clearable={false}
					value={this.state.status}
					onChange={this.onChangeSelectBoxStatus}
					options={OPTIONS}
					optionComponent={optionComponent}
					valueComponent={valueComponent}
					className={css(styles.cssAux)}
				/>
			</fieldset>
		);
	}

	onChangeSelectBoxStatus(e){
		this.setState({
			status: e.value,
		});
	}

	InputDentist(e){
		this.setState({
			user: e.value,
			id_user: e.id,
		});		
	}

	InputPatient(e){

		if(e.name){
			this.props.dispatch( change('modalAgendaForm', 'telephone', e.telephones[0].value));
			this.setState({
				patient: e.name,
				id_patient: e._id,
				tel: e.telephones[0].value,
			});
		}else{
			this.setState({
				patient: e.value,
				id_patient: e.id,
			});	
		}
	}

	setToggle(e){
		this.setState({
			allDay: e
		});
		return e;
	}

	render() {
		const { handleSubmit, onCancel, selectEvent, dentistsById } = this.props;
		
		return (
            <form className={css(styles.form_modal)} onSubmit={handleSubmit(this.checkVacation)}>
                {this.renderAuthMsg()}
				<PatientInputAuto
					label={'Nome do Paciente'}
					placeholder={'Nome do Paciente'}
					limit={5}
					value={this.state.patient}
					onSelect={this.InputPatient}
				/>
				{<Field
					key={'telephone'}
					type={'text'}
					name={'telephone'}
					label={'Telefone'}
					placeholder={'(XX) XXXXX XXXX'}
					mask={'(99) 99999 9999'}
					component={InputField}
					value={this.state.tel}
				/>}
				{this.renderProcedureSelectBox()}
				<AutoCompleteByProps
					label={'Nome do Dentista'}
					placeholder={'Nome do Dentista'}
					limit={20}
					results={dentistsById}
					value={this.state.user}
					onSelect={this.InputDentist}
				/>

				{this.renderSelectBoxStatus()}

				<div className={css(styles.row_2)}>
					<div className={css(styles.dateInput)}>
						<DateTimePicker name="date" value={this.state.date} label="Data" onChange={this.onDateChange} />
					</div>
					<div style={ {marginLeft: '45px'} }>
						<Toggle
						label={'Evento para o dia todo?'}
						defaultValue={this.state.allDay}
						change={this.setToggle}
						/>
					</div>
				</div>
				{ !this.state.allDay ? ( 
					<div className={css(styles.fieldset)}>
						<div className={css(styles.label)}>Horário</div>
						<div className={css(styles.row_2)}>
							<div>
								<TimePicker name={`start`} hour={this.state.start.hour} minute={this.state.start.minute} minStep={1} onValueChanged={this.onStartChange} />
							</div>
							<div className={css(styles.labelTime)}>às</div>
							<div>
								<TimePicker name={`end`} hour={this.state.end.hour} minute={this.state.end.minute} minStep={1} onValueChanged={this.onEndChange} />
							</div>
						</div>
					</div>) : ''
				}
				{this.renderFields(FIELDS)}

				{selectEvent ?
					<div className={css(styles.row_delete)}>
						<Button
							icon="delete"
							text="Excluir"
							color="white"
							iconColor="red"
							onClick={this.onDelete}
							style={{display: 'inline-flex',
									alignItems: 'flex-end'}}
						/>
					</div> : ""
				}
				<div className={css(styles.buttons)}>
				<Button
					text="Salvar"
					color="green"
					submit
				/>
				<Button
					text="Cancelar"
					color="secondary"
					onClick={onCancel}
				/>
				</div>
				<Modal
				isOpen={this.state.modal} 
				header={"Paciente não Cadastrado"} 
				adjustStyle={styles.agendaModal} 
				>
					<ModalCreatePatient
						onCancel={this.state.modalPatientCancel}
						onSubmit={this.state.modalPatientSubmit}
					/>
				</Modal>
				
				<Modal
				isOpen={this.state.modalVacation} 
				header={"Dentista em Férias"} 
				adjustStyle={styles.agendaModal} 
				>
					<ModalVacationForm
						textMessage={this.state.textModalValidation}
						onSubmit={this.submitVacation}
						onCancel={this.onCloseModalVacation}
					/>
				</Modal>
            </form>
		);
	}
}

const modalAgendaForm = reduxForm({
	form: 'modalAgendaForm'
})(ModalAgendaForm);

function mapStateToProps(state, props) {

	let initialValues = {};
	
	if (props.selectEvent) {
		initialValues = props.selectEvent; 
	}

	return {
		agendaConfig: state.agendaConfig.agendaConfig ? state.agendaConfig.agendaConfig[0] : null,
		clinic: state.auth.clinic,
		initialValues
	};
}

export default connect(mapStateToProps, { patientAgendaValidation, checkDentistSchedule })(modalAgendaForm);