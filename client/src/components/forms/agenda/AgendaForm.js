import React, { Component } from 'react';
import { connect } from 'react-redux';  
import { reduxForm, Field } from 'redux-form';
import { StyleSheet, css } from 'aphrodite/no-important';
import T from 'i18n-react';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import ReactTooltip from 'react-tooltip'
import BigCalendar from '../../../lib/react-big-calendar';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import withDragAndDrop from '../../../lib/react-big-calendar/lib/addons/dragAndDrop';
import '../../../lib/react-big-calendar/lib/css/react-big-calendar.css';
import '../../../lib/react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { styles } from './AgendaFormStyles';

import moment from 'moment';
import 'moment/locale/pt-br';

import Button from '../../common/Button';
import Icon from '../../common/Icon';
import DayPicker from '../date/DayPicker';
import SelectBox from '../../common/SelectBox';
import Modal from '../../modals/Modal';
import ModalAgenda from './modal/ModalAgendaForm';
import ModalVacationForm from './modal/ModalVacationForm';
import PatientInputAuto from '../../forms/PatientInputAuto';
import ModalAgendaConfig from './modal/ModalAgendaConfig';

import { fetchDentists } from '../../../actions/dentists';
import { fetchAgendaConfig } from '../../../actions/agendaConfig';

import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost');

BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

const message = {
	allDay: 'Todo o dia',
	previous: 'Anterior',
	next: 'Próximo',
	today: 'Hoje',
	month: 'Mês',
	week: 'Semana',
	day: "Dia",
	agenda: 'Agenda',
	date: 'Dia',
	time: 'Hora',
	event: 'Evento',
	user: 'Dentista',
	patient: 'Paciente',
	procedure: 'Procedimento',
}

class AgendaForm extends Component {
	constructor(props) {
		super(props);
		
		this.moveEvent = this.moveEvent.bind(this);
		this.onSelectSlot = this.onSelectSlot.bind(this);
		this.onSelectEvent = this.onSelectEvent.bind(this);
		this.setEvents = this.setEvents.bind(this);
		this.onOpenModal = this.onOpenModal.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
		this.resizeEvent  = this.resizeEvent.bind(this);
		this.renderSelectBox = this.renderSelectBox.bind(this);
		this.onChangeSelectBox = this.onChangeSelectBox.bind(this);
		this.renderStatusSelectBox = this.renderStatusSelectBox.bind(this);
		this.onOpenModalVacation = this.onOpenModalVacation.bind(this);
		this.onCloseModalVacation = this.onCloseModalVacation.bind(this);
		this.onOpenModalConfig = this.onOpenModalConfig.bind(this);
		this.onCloseModalConfig = this.onCloseModalConfig.bind(this);
		this.InputPatient = this.InputPatient.bind(this);
		this.onView = this.onView.bind(this);
		this.onNavigateTopBar = this.onNavigateTopBar.bind(this);
		this.dateTopBar = this.dateTopBar.bind(this);

		this.handleDayClick = this.handleDayClick.bind(this);

		this.eventStyleGetter = this.eventStyleGetter.bind(this);
		this.eventAgenda = this.eventAgenda.bind(this);
		this.eventAgendaDate = this.eventAgendaDate.bind(this);
		this.eventAgendaTime = this.eventAgendaTime.bind(this);
		this.eventAgendaPatient = this.eventAgendaPatient.bind(this);
		this.dayPropGetter = this.dayPropGetter.bind(this);

		this.state = {
			events: [],
			modal: false,
			
			selectedDentist: null,
			selectedSlot: null,
			selectEvent: null,
			modalVacation: false,
			modalConfig: false,
			selectedDay: null,

			view: 'day',
			
			patientName: null,
			patientId: null,
			patientFirstSearch: false,

			textModalValidation: null,
		};
		
		socket.on('client'+this.props.clinic.clinic_data , function (data) {
			
			if(data.data == "update"){
				socket.emit('fetch', { data: this.props.clinic.clinic_data, date: this.state.selectedDay, user: this.state.selectedDentist, patient: this.state.patientId, view: this.state.view });
			}
			else{
				data.data.forEach( iten => {
					iten.start = new Date(iten.start);
					iten.end = new Date(iten.end);
				});

				//if(this.state.patientFirstSearch && data.data.length > 0){
				//	this.state.selectedDay = data.data[data.data.length-1].start;
				//	this.state.patientFirstSearch = false;
				//}

				this.setEvents(data.data);
			}
		}.bind(this));
	}

	componentWillMount(){
		const { clinic, fetchDentists, fetchAgendaConfig } = this.props;
		this.setState({
			selectedDay: new Date
		});
		fetchDentists();
		fetchAgendaConfig();
	}

	componentWillUnmount(){
		//socket.close();
	}

	componentDidMount(){
		const { clinic } = this.props;
		const { selectedDay, selectedDentist, patientId } = this.state;

		if(clinic){
			socket.emit('fetch', { data: clinic.clinic_data, date: selectedDay, user: selectedDentist, patient: patientId, view: this.state.view });
		}
	}

	onOpenModal() {
		this.setState({ 
			modal: true 
		});
	}

	onCloseModal() {
		this.setState({ 
			modal: false 
		});
	}

	onOpenModalVacation(text) {
		this.setState({ 
			modalVacation: true,
			textModalValidation: text,
		});
	}
	
	onCloseModalVacation() {
		this.setState({ 
			modalVacation: false 
		});
	}

	onOpenModalConfig() {
		this.setState({ 
			modalConfig: true 
		});
	}
	onCloseModalConfig() {
		this.setState({ 
			modalConfig: false 
		});
	}

	setEvents(events) {
		this.setState({
			events: events,
		});
	}

	moveEvent({ event, start, end }) {
		const { clinic } = this.props;
	
		if(clinic){
			socket.emit('update', { data: clinic.clinic_data, move: { event, start, end } });
		}
	}

	resizeEvent(resizeType, { event, start, end }){
		const { clinic } = this.props;
		
		if(clinic){
			if(start.getDate() != end.getDate()){
				end.setDate(start.getDate());
			}
			socket.emit('update', { data: clinic.clinic_data, move: { event, start, end } });
		}
	}

	onSelectSlot({ action, start }) {
		const { clinic, dentistsById } = this.props;

		if(action === "doubleClick"){
			if(clinic){

				if(this.state.selectedDentist && this.state.selectedDentist.length > 0){
					if(dentistsById){
						var i = 0;
						while(dentistsById[i]._id != this.state.selectedDentist[0].value){ i++; }
						
						var dayObject;
						var inInterval = false;
						var inVacation = false;
						var dayMessage = [];
						var vacationMessage = [];
						dayMessage.push(<span> { T.translate("agenda_schedule_validation") } </span>);
						vacationMessage.push(<span> { T.translate("agenda_vacation_validation") } </span>);

						switch (moment(start).weekday()) {
							case 0:
								dayObject = dentistsById[i].schedule.sun
								break;
							case 1:
								dayObject = dentistsById[i].schedule.mon
								break;
							case 2:
								dayObject = dentistsById[i].schedule.tue
								break;
							case 3:
								dayObject = dentistsById[i].schedule.wed
								break;
							case 4:
								dayObject = dentistsById[i].schedule.thu
								break;
							case 5:
								dayObject = dentistsById[i].schedule.fri
								break;
							case 6:
								dayObject = dentistsById[i].schedule.sat
								break;
						}

						if(dayObject.length > 0){
							
							dayObject.map(day => {

								var init = new Date( start ).setHours(Number(day.start.split(':')[0]), Number(day.start.split(':')[1]));
								var end = new Date( start ).setHours(Number(day.end.split(':')[0]), Number(day.end.split(':')[1]));

								if(start.getHours() == 0 && start.getMinutes() == 0){ }else{
									if( start >= init && start <= end ){ inInterval = true } else {
										dayMessage.push(<br></br>);
										dayMessage.push(<span> { day.start } até { day.end } </span>);
									}
								}
							});	
						}

						if(dentistsById[i].vacation_start && new Date(dentistsById[i].vacation_start) <= start && new Date(dentistsById[i].vacation_end) >= start ){
							vacationMessage.push(<br></br>);
							vacationMessage.push( <span> { moment(dentistsById[i].vacation_start).format("D MMM YYYY") }  até </span>);
							vacationMessage.push( <span> { moment(dentistsById[i].vacation_end).format("D MMM YYYY") } </span>);
							inVacation = true;
						}

						if(!inInterval || inVacation){

							function textToShow( dayMessage , vacationMessage ){

								return (
									<div>
										<div className={css(styles.listContainer)}>
											{ dayMessage.map(ret => { return ret; }) }
										</div>
										<div className={css(styles.listContainer)}>
											{ vacationMessage.map(ret => { return ret; }) }
										</div>
									</div>
								)
							}
							this.onOpenModalVacation( textToShow(dayMessage, vacationMessage) );
						} else {

							this.state.selectEvent = null;
							this.state.selectedSlot = start;
							this.onOpenModal();
						}
					}
				}else{
					
					this.state.selectEvent = null;
					this.state.selectedSlot = start;
					this.onOpenModal();
				}
			}
		}
	}

	onSelectEvent(event, action) {

		action.target.ondblclick = function(e){
			if(e.type === "dblclick"){

				this.state.selectedSlot = null;
				this.state.selectEvent = event;
				this.onOpenModal();
			}
		}.bind(this);
	}

	onNavigate(e){
		const { clinic } = this.props;
		
		this.setState({
			selectedDay: e
		});
		socket.emit('fetch', { data: clinic.clinic_data, date: e, user: this.state.selectedDentist, patient: this.state.patientId, view: this.state.view });
	}

	onNavigateTopBar(e){

		const { clinic } = this.props;
		var selectedDay;

		if(e == 0){
			selectedDay = new Date();
			this.setState({
				selectedDay: selectedDay
			});
		} else {

			selectedDay = new Date(this.state.selectedDay);
			if(this.state.view == "month"){
				selectedDay.setMonth( new Date(this.state.selectedDay).getMonth() + e );
			} else if(this.state.view == "week"){
				selectedDay.setDate( new Date(this.state.selectedDay).getDate() + (7 * e) );
			} else if(this.state.view == "day"){
				selectedDay.setDate( new Date(this.state.selectedDay).getDate() + e );
			} else if(this.state.view == "agenda"){
				selectedDay.setDate( new Date(this.state.selectedDay).getDate() + (30 * e) );
			}
			this.setState({
				selectedDay: selectedDay
			});
		}

		socket.emit('fetch', { data: clinic.clinic_data, date: selectedDay, user: this.state.selectedDentist, patient: this.state.patientId, view: this.state.view });
	}

	renderSelectBox(options){
		let dentist = [];
		if(options){
			options.map(field =>{
				dentist.push({value: field._id, label: field.name});
			});
		}
		return (
			<fieldset className={css(styles.fieldset_patient)}>
				<Select
					name="select"
					placeholder="Selecione o(s) Dentista(s)"
					value={this.state.selectedDentist}
					onChange={this.onChangeSelectBox}
					options={dentist}
					multi={true}
				/>
			</fieldset>
		);
	}

	onChangeSelectBox(e){
		const { clinic } = this.props;
		this.setState({
			selectedDentist: e,
		});
		socket.emit('fetch', { data: clinic.clinic_data, date: this.state.selectedDay, user: e, patient: this.state.patientId, view: this.state.view });
	}

	colorLuminance(hex) {
		
			hex = String(hex).replace(/[^0-9a-f]/gi, '');
			if (hex.length < 6) {
				hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
			}
		
			var rgb = "#", c, i;
		  var sum = 0;
		  var media = 0;
			for (i = 0; i < 3; i++) {
				c = parseInt(hex.substr(i*2,2), 16);
			sum = parseInt(sum) + c;
			}
		  media = sum / 3;
		  
		  if(media >= 127.5){
			return true
		  }else{
			return false
		  }
		  
	}

	shadeColor2(color, percent) {   
		var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
		return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
	}

	eventStyleGetter(event, start, end, isSelected) {
		const { dentistsById } = this.props;
		var color;

		if(dentistsById){
			dentistsById.map(dentist =>{
				
				if(dentist.name == event.user || dentist._id == event.id_user){
					color = dentist.color
				}	
			});
	
			if(color){
				var style;
				var className = '';

				if(this.state.view == "agenda"){
					style = {
						borderLeft: '6px solid '+ color,
					};
				}else {
					var colorLuminance = this.colorLuminance(color);
					
						var shadeColor = this.shadeColor2(color, 0.1);
					
					
					style= {
						border: '1px rgba(0,0,0,0.2) solid',
						borderRadius: '3px',
						background: `linear-gradient(to right, ${color} , ${shadeColor})`,
						color: colorLuminance ? 'black' : 'white',
					};
					className = colorLuminance ? 'black' : 'white';
				}

				return {
					style: style,
					className: className
				};

			}
		}
		
		return {
			style: style,
			className: 'white'
		};
	}

	renderStatusSelectBox(event){
		const { clinic } = this.props;
		
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

		return (
			<fieldset>
				<select onChange={e => {
						event.status = e.currentTarget.value;
						socket.emit('update', { data: clinic.clinic_data, move: { event, start: event.start, end: event.end } });
					}} value={event.status} className={css(styles.input)}>
					{OPTIONS.map((itm) => 
					<option key={itm.value} value={itm.value}>{itm.label}</option>
					)}
				</select>
			</fieldset>
		);
	}

	eventAgenda({ event }){
		return (
		  <span>
			{this.renderStatusSelectBox(event)}
		  </span>
		)
	}

	eventAgendaDate({ event }){

		var week = moment(event.start).format("ddd");
		var date = moment(event.start).format("D MMM YYYY");

		return (
			<span onDoubleClick={e => { if(event){ this.state.selectEvent = event; this.onOpenModal(); } }}>{week} {date}</span>
		)
	}
	
	eventAgendaTime({ event }){
		
		var start = moment(event.start).format("HH:mm");
		var end = moment(event.end).format("HH:mm");

		return (
			<span onDoubleClick={e => { if(event){ this.state.selectEvent = event; this.onOpenModal(); } }}>{start} - {end}</span>
		)
	}

	eventAgendaPatient({ event }){
		const { history } = this.props;
		return (
			<span onDoubleClick={e => { if(event.id_patient){history.push(`/patients/profile/${event.id_patient}`)} }}>{event.patient}</span>
		)
	}

	dayPropGetter(value){
		const { dentistsById } = this.props;

		/*if(this.state.selectedDentist){

			if(dentistsById){
				var i = 0;
				while(dentistsById[i]._id != this.state.selectedDentist){ i++; }
				
				if(dentistsById[i].vacation_start && new Date(dentistsById[i].vacation_start) <= value && new Date(dentistsById[i].vacation_end) >= value ){
					return { style: {backgroundColor: '#ccc'} };
				}
			}
		}*/
	}

	handleDayClick(day) {
		const { clinic } = this.props;

		if(this.state.view == 'month'){
			this.setState({
				selectedDay: day,
				view: 'day',
			});	
		}else{
			this.setState({
				selectedDay: day
			});
		}
		if( this.state.view == 'agenda' ){
			socket.emit('fetch', { data: clinic.clinic_data, date: day, user: this.state.selectedDentist , patient: this.state.patientId, view: this.state.view });
		}
	}

	InputPatient(e){
		const { clinic } = this.props;

		if(e.name){
			this.setState({
				patientName: e.name,
				patientId: e._id,
				patientFirstSearch: true,
				view: "agenda",
			});
			socket.emit('fetch', { data: clinic.clinic_data, date: this.state.selectedDay, user: e, patient: e._id, view: "agenda" });

		}else if(this.state.patientId != null){
			this.setState({
				patientName: e.value,
				patientId: null,
				patientFirstSearch: false,
			});	
			socket.emit('fetch', { data: clinic.clinic_data, date: this.state.selectedDay, user: e, patient: null, view: this.state.view });

		}
	}

	onView(e){
		const { clinic } = this.props;

		this.setState({
			view: e.target ? e.target.name : e,
		});
		if( e == 'agenda' || (e.target && e.target.name == 'agenda' ) ){
			socket.emit('fetch', { data: clinic.clinic_data, date: this.state.selectedDay, user: this.state.selectedDentist, patient: this.state.patientId, view: 'agenda' });
		} else {
			socket.emit('fetch', { data: clinic.clinic_data, date: this.state.selectedDay, user: this.state.selectedDentist, patient: this.state.patientId, view: e.target ? e.target.name : e });
		}
	}

	dateTopBar(){
		var toShow;
		if(this.state.view == "month"){
			toShow = moment(this.state.selectedDay).format("MMMM YYYY");
		} else if(this.state.view == "week" || this.state.view == "day"){
			toShow = moment(this.state.selectedDay).format("DD MMMM YYYY");
		} else if( this.state.view == "agenda"){
			var endDate = new Date(this.state.selectedDay).setMonth(this.state.selectedDay.getMonth() + 1);
			toShow = moment(this.state.selectedDay).format("DD MMMM YYYY") + " - " + moment(endDate).format("DD MMMM YYYY");
		}
		return(	toShow );
	}

	render() {
		const { agendaConfig } = this.props;

		var tableHeight = window.innerHeight - 100;
		const styles2 = StyleSheet.create({
			table: {
				height: tableHeight+'px'
			}
		});

		return (
			<div className="rbc-calendar">

				<div style={{display: 'flex', minHeight: '50px', minWidth: '690px'}}>
					<div className={css(styles.actions)}>
						<div className={css(styles.action)} onClick={ () => {this.onNavigateTopBar(-1)} } >{ T.translate("previous") }</div>
						<div className={css(styles.action)} onClick={ () => {this.onNavigateTopBar(0)} } >{ T.translate("today") }</div>
						<div className={css(styles.action)} onClick={ () => {this.onNavigateTopBar(1)} } >{ T.translate("next") }</div>
					</div>
					<div className={css(styles.bar)}>
						<h3>{ this.dateTopBar() }</h3>
					</div>
					<div className={css(styles.bar2)}>
						<div style={{float: 'right', display: 'flex'}}>
							<a
								name={'month'}
								className={css(styles.link, (this.state.view == "month" ? styles.active : ''))}
								onClick={this.onView}
							>
								{ T.translate("month") }
							</a>
							<a
								name={'week'}
								className={css(styles.link, (this.state.view == "week" ? styles.active : ''))}
								onClick={this.onView}
							>
								{ T.translate("week") }
							</a>
							<a
								name={'day'}
								className={css(styles.link, (this.state.view == "day" ? styles.active : ''))}
								onClick={this.onView}
							>
								{ T.translate("day") }
							</a>
							<a
								name={'agenda'}
								className={css(styles.link, (this.state.view == "agenda" ? styles.active : ''))}
								onClick={this.onView}
							>
								{ T.translate("agenda") }
							</a>
							<a className={css(styles.btn)} onClick={this.onOpenModalConfig} data-tip data-for='gear' >
								<Icon
									icon="gear"
									size="small"
									color="grey"
								/>
							</a>
							<ReactTooltip id='gear' place="left" effect="solid">
								<span>Configurações</span>
							</ReactTooltip>

						</div>
					</div>
				</div>

				<div className={css(styles.formAgenda)}>
					<div>
						<Button text={'Adicionar Agendamento'} style={ { width: '100%', margin: '1px 0 1rem 0' } } onClick={ () => {this.onSelectSlot( { action:"doubleClick" , start: new Date} )} } />
						<DayPicker name="date" onDayClick={this.handleDayClick} onMonthChange={this.onNavigate} month={this.state.selectedDay} />
						{this.renderSelectBox(this.props.dentistsById)}
						<PatientInputAuto
							label={'Horários do Paciente'}
							placeholder={'Nome do Paciente'}
							limit={5}
							onSelect={this.InputPatient}
						/>
					</div>
				</div>

				<div className={css(styles.formCalendar, styles2.table)+" rbc-calendar"}>
					<DragAndDropCalendar
						selectable
						resizable
						step={agendaConfig.interval}
						timeslots={1}
						popup={true}
						messages={message}
						date={this.state.selectedDay}
						culture={'pt-br'}
						defaultView={'day'}
						view={this.state.view}
						scrollToTime={new Date()}
						toolbar={false}

						events={this.state.events}
						onEventDrop={this.moveEvent}
						onEventResize={this.resizeEvent}
						onView={this.onView}
						onNavigate={this.onNavigate}
						onSelectSlot={this.onSelectSlot}
						onSelectEvent={this.onSelectEvent}
						onSelecting={ (e) =>{console.log("onSelecting"+e)}}
						eventPropGetter={this.eventStyleGetter}
						dayPropGetter={this.dayPropGetter}
						patientSearch={this.state.patientFirstSearch}

						components={{
							event: Event,
							agenda: {
								date: this.eventAgendaDate,
								event: this.eventAgenda,
								time: this.eventAgendaTime,
								patient: this.eventAgendaPatient,
							}
						}}
		
					/>
				</div>
				<Modal
					isOpen={this.state.modal} 
					header={"Adicionar Evento"} 
					adjustStyle={styles.agendaModal} 
					>
						<ModalAgenda
							onCancel={this.onCloseModal}
							socket={socket}
							selectedDentist={this.state.selectedDentist}
							selectedSlot={this.state.selectedSlot}
							selectEvent={this.state.selectEvent}
							dentistsById={this.props.dentistsById}
						/>
				</Modal>
				<Modal
					isOpen={this.state.modalVacation} 
					header={"Adicionar Evento"} 
					adjustStyle={styles.agendaModal} 
					>
						<ModalVacationForm
							textMessage={this.state.textModalValidation}
							onSubmit={this.onOpenModal}
							onCancel={this.onCloseModalVacation}
						/>
				</Modal>
				<Modal
					isOpen={this.state.modalConfig} 
					header={"Configurações da Agenda"} 
					adjustStyle={styles.agendaModal} 
					>
						<ModalAgendaConfig
							onCancel={this.onCloseModalConfig}
						/>
				</Modal>
			</div>
		)
	}
}

const agendaForm = reduxForm({
	form: 'agendaForm'
})(AgendaForm);

function mapStateToProps(state) {
	
	var agendaConfig = {interval: 30};
	if(state.agendaConfig.agendaConfig){
		if(state.agendaConfig.agendaConfig[0]){
			agendaConfig = state.agendaConfig.agendaConfig[0];
		}
	}

	return { 
		clinic: state.auth.clinic,
		dentistsById: state.clinicConfig.dentistsById,
		agendaConfig
	};  
}

export default connect(mapStateToProps, { fetchDentists, fetchAgendaConfig })(agendaForm);