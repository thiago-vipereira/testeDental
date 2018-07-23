import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './BudgetFormStyles';
import './TabStyles.css';
import moment from 'moment';
import 'moment/locale/pt-br';

import { getTreatment, updateTreatment } from '../../../actions/treatment';
import { getPatient } from '../../../actions/patientsCreation';
import { addToWindows } from '../../../actions/windowsController';
import { fetchDentists } from '../../../actions/dentists';

import ModalDeleteProcedure from './treatmentModals/ModalDeleteProcedure';
import ModalProcedureForm from './treatmentModals/ModalProcedureForm';
import ModalTreatmentCreateForm from './treatmentModals/ModalTreatmentCreateForm';
import ModalApproveBudget from './treatmentModals/ModalApproveBudget';


import Select from 'react-select';
import DateTimePicker from '../date/DateTimePicker';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SelectBox from '../../common/SelectBox';
import Modal from '../../modals/Modal';
import Button from '../../common/Button';
import Icon from '../../common/Icon';
import InputField from '../../forms/InputField';
import Toggle from '../../common/Toggle';

const OPTIONS = [
	{ value: 'pendent', label: 'Pendente'},
	{ value: 'realized', label: 'Realizado'},

];

class TreatmentForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.addToWindows = this.addToWindows.bind(this);
		this.renderList = this.renderList.bind(this);
		this.renderItems = this.renderItems.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.openModalDelete = this.openModalDelete.bind(this);
		this.closeModalDelete = this.closeModalDelete.bind(this);
		this.deleteProcedure = this.deleteProcedure.bind(this);
		this.renderDentist = this.renderDentist.bind(this);
		this.mathRound = this.mathRound.bind(this);
		this.openModalName = this.openModalName.bind(this);
		this.closeModalName = this.closeModalName.bind(this);
		this.editName = this.editName.bind(this);
		this.renderTab = this.renderTab.bind(this);
		this.addToTab = this.addToTab.bind(this);
		this.renderTabPanel = this.renderTabPanel.bind(this);
		this.renderBudgetList = this.renderBudgetList.bind(this);
		this.renderBudgetItems = this.renderBudgetItems.bind(this);
		this.deleteBudget = this.deleteBudget.bind(this);
		this.renderParcels = this.renderParcels.bind(this);
		this.saveAll = this.saveAll.bind(this);
		this.getMoney = this.getMoney.bind(this);
		this.moneyPercentInput = this.moneyPercentInput.bind(this);
		this.getEntrance = this.getEntrance.bind(this);
		this.setToggle = this.setToggle.bind(this);

		this.state = {
			modal: false,
			modalDelete: false,
			treatment: null,
			procedure: null,
			modalName: false,
			modalApproveBudget: false,
			tab: [],
		}
	}

	componentWillMount() {
		const { location, getPatient, getTreatment, match, fetchDentists } = this.props;
		
		fetchDentists();
		getTreatment(match.params.treatmentId, ret => {
			if(ret) {

				this.state.tab = ret.budgets;
				if(ret.list_id){
					this.setState({
						treatment: ret,
					});
				} else {
					
					if(ret.treatment.length > 0){
						ret.list_id = ret.treatment[0].list_id;
					}

					this.setState({
						treatment: ret,
					});
				}
			}
		});
	}

	componentDidUpdate() {
		if(this.state.treatment) {

			if(!this.state.treatment.list_id){
				
				if(this.state.treatment.treatment.length > 0){
					this.state.treatment.list_id = this.state.treatment.treatment[0].list_id;
				}
			}
		}
	}

	componentDidMount(nextProps){
	}
	
	onSubmit(values) {
	}

	mathRound(number){
		function formatBR(v) {
	
			if(!v){ v = ''; }
			v = v.toString();
	
			if(v.search(/([/.]+)/g) == -1){ v = v + '.00'; }
	
			v=v.replace(/\D/g,'');
			v=v.replace(/(\d{1,2})$/, ',$1'); 
			v=v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
			v = v != ''?'R$ '+v:'R$ ';
			return v;
		}
		
		if(number == 0){
			return 'R$ 0,00';
		} else {
			number = Math.round(number * 100)/100;
			number = number.toFixed(2);
		}
		return formatBR(number);
	}

	openModal(values) {
		this.setState({
			procedure: values,
			modal: true,
		});
	}

	closeModal() {
		this.setState({
			modal: false,
		});
	}

	openModalDelete(values) {
		this.setState({
			procedure: values,
			modalDelete: true,
		});
	}

	closeModalDelete() {
		this.setState({
			modalDelete: false,
		});
	}

	openModalName(values) {
		this.setState({
			modalName: true,
		});
	}

	closeModalName(values) {
		this.setState({
			modalName: false,
		});
	}

	openModalApproveBudget(values) {
		this.setState({
			modalApproveBudget: true,
		});
	}

	closeModalApproveBudget(values) {
		this.setState({
			modalApproveBudget: false,
		});
	}

	editName(value) {
		const { updateTreatment, selectedPatient } = this.props;
		
		this.state.treatment.name = value;
		updateTreatment(this.state.treatment, selectedPatient._id, ret => {
			//if(ret){}
			console.log(ret);
		});
		this.closeModalName();
	}

	deleteProcedure(treatment, procedure) {
		const { updateTreatment, selectedPatient } = this.props;
		var editedTreatment = treatment;

		editedTreatment.treatment.splice(procedure,1);
		updateTreatment(editedTreatment, selectedPatient._id, ret => {
			//if(ret){}
		});
		this.closeModalDelete();
	}

	addToWindows() {
		const { addToWindows, selectedPatient } = this.props;
		addToWindows({ type: 'TREATMENT', id: this.state.treatment._id, opened: true, data: { value: this.state.treatment }}, res =>{
			//console.log(res);
		});
	}

	renderDentist(id) {
		const { dentistsById } = this.props;
		
		var dentistAux = dentistsById.find( dentist => {
			return dentist._id == id;
		});

		return dentistAux ? dentistAux.name : '';
	}

	renderSelectBox(OPTIONS){
		return (
			<Field
			key={'role'}
			type={'selectbox'}
			name={'role'}
			itens={OPTIONS}
			component={SelectBox}
		/>);
	}

	renderItems(treatment) {
		if ( treatment && treatment.treatment.length > 0) {
			return treatment.treatment.map( (procedure, index) => {
				return (
					<li key={index} id={index} className={css(styles.listItem)}>
						<div style={{margin:'.5rem 5px', height: '19px', width: '8%', float: 'left', textAlign: 'left'}} >{procedure.procedure.code}</div>
						<div style={{margin:'.5rem 0', height: '19px', width: '14%', float: 'left', textAlign: 'left'}} ></div>
						<div style={{margin:'.5rem 0', height: '19px', width: '17%', float: 'left', textAlign: 'left'}} >{procedure.specification.tooth ? procedure.specification.tooth.toString() : ''}</div>
						<div style={{margin:'.5rem 0', height: '19px', width: '13%', float: 'left', textAlign: 'left'}} >{this.renderDentist(procedure.dentist_id)}</div>
						<div style={{ height: '19px', width: '12%', float: 'left', textAlign: 'left'}} >{this.renderSelectBox(OPTIONS)}</div>
						<div style={{margin:'.5rem 0', height: '19px', width: '13%', float: 'left', textAlign: 'left'}} ></div>
						<div style={{margin:'.5rem 0', height: '19px', width: '10%', float: 'left', textAlign: 'left'}} >{this.mathRound(procedure.specification.value)}</div>					
						<span style={{margin: '.5rem'}} onClick={event => { this.openModalDelete(event.target.parentElement.id) }} className={css(styles.link, styles.delete)}>Excluir</span>
						<span style={{margin: '.5rem'}} onClick={event => { this.openModal(event.target.parentElement.id) }} className={css(styles.link)}>Editar</span>
						<div style={{clear:'both'}}></div>
					</li>
				);
			});
		} else {
			return (
				<li className={css(styles.noItems)}>
					Nenhum Procedimento cadastrado
				</li>
			);
		}
	}

	renderList(treatment) {
		return (
			<div>
				<div className={css(styles.listHeader)}>
					<div className={css(styles.header)} style={{ width: '8%'}} >Código</div>
					<div className={css(styles.header)} style={{ width: '14%'}} >Procedimento</div>		
					<div className={css(styles.header)} style={{ width: '17%'}} >Dentes</div>
					<div className={css(styles.header)} style={{ width: '16%'}} >Dentista</div>
					<div className={css(styles.header)} style={{ width: '12%'}} >Status</div>
					<div className={css(styles.header)} style={{ width: '13%'}} >Execução</div>
					<div className={css(styles.header)} style={{ width: '10%'}} >Valor</div>
					<div style={{clear:'both'}}></div>
				</div>
				<ul className={css(styles.list2)}>
					{this.renderItems(treatment)}
				</ul>
			</div>
		);
	}

	renderParcels(item) {
		if (item.payment_type == 'cash') {

			var total = 0;
			item.procedures.map( proc => {
				total += proc.specification.value;
			});
			item.parcels[0].value = total;
			item.parcels[0].number = 'unic';

			if(item.discount.value > 0){
				if(item.discount.value_type == 'percent'){
					item.parcels[0].value -= (item.parcels[0].value * item.discount.value) / 100;
				} else {
					item.parcels[0].value -= item.discount.value;
				}
			}

			return (
				<li key={'1cash'} id={'1cash'} className={css(styles.listItem)}>
					<div style={{ height: '40px', width: '33%', float: 'left', textAlign: 'left'}} >Parcela única</div>
					<div style={{ height: '40px', width: '33%', float: 'left', textAlign: 'left'}} >{this.mathRound(item.parcels[0].value)}</div>
					<div style={{ height: '40px', width: '30%', float: 'left', textAlign: 'left'}} >
						<DateTimePicker name="budget_expiration" value={item.parcels[0].expiration} audit={true} onChange={(e) => {
							item.parcels[0].expiration = e;
							this.setState([]);
						}} />
					</div>
				</li>
			);
		} else {

			if(item.parcel_number){
				
				var parcelAux = [];
				var total = 0;
				item.procedures.map( proc => {
					total += proc.specification.value;
				});

				if(item.discount.value > 0){
					if(item.discount.value_type == 'percent'){
						total -= (total * item.discount.value) / 100;
					} else {
						total -= item.discount.value;
					}
				}
				if(item.entrance.value > 0){
					if(item.entrance.value_type == 'percent'){
						total -= (total * item.entrance.value) / 100;
					} else {
						total -= item.entrance.value;
					}
				}

				var parcelValue = total / item.parcel_number;

				if(item.parcels[0].number == 'unic'){

					for(var par = 0; par < item.parcel_number; par ++){
						
						parcelAux.push({ number: par + 1, value: parcelValue, expiration: item.parcels[par] ? new Date(item.parcels[par].expiration).setMonth( new Date(item.parcels[par].expiration).getMonth() + 1 ) : new Date(item.parcels[0].expiration).setMonth( new Date(item.parcels[0].expiration).getMonth() + par + 1 ) });
					}
				} else {

					for(var par = 0; par < item.parcel_number; par ++){
						
						parcelAux.push({ number: par + 1, value: parcelValue, expiration: item.parcels[par] ? item.parcels[par].expiration : new Date(item.parcels[0].expiration).setMonth( new Date(item.parcels[0].expiration).getMonth() + par )});
					}
				}

				item.parcels = parcelAux;

				return item.parcels.map( (parcel, idx) => {

					return (
						<li key={'parcel'+idx} id={'parcel'+idx} className={css(styles.listItem)}>
							<div style={{ height: '40px', width: '33%', float: 'left', textAlign: 'left'}} >Parcela {parcel.number}</div>
							<div style={{ height: '40px', width: '33%', float: 'left', textAlign: 'left'}} >{this.mathRound(parcel.value)}</div>
							<div style={{ height: '40px', width: '30%', float: 'left', textAlign: 'left'}} >
								<DateTimePicker name="budget_expiration" value={parcel.expiration} audit={true} onChange={(e) => {
									parcel.expiration = e;
									this.setState([]);
								}} />
							</div>
						</li>
					);
				});
			}
			return '';
		}
	}

	renderBudgetList(procedureList, idx) {
		return (
			<div>
				<div className={css(styles.listHeader)}>
					<div className={css(styles.header)} style={{ width: '10%'}} >Código</div>
					<div className={css(styles.header)} style={{ width: '19%'}} >Procedimento</div>		
					<div className={css(styles.header)} style={{ width: '25%'}} >Dentes</div>
					<div className={css(styles.header)} style={{ width: '20%'}} >Faces</div>
					<div className={css(styles.header)} style={{ width: '20%'}} >Valor</div>
					<div style={{clear:'both'}}></div>
				</div>
				<ul className={css(styles.list2)}>
					{this.renderBudgetItems(procedureList, idx)}
				</ul>
			</div>
		);
	}

	renderBudgetItems(procedureList, idx) {
		if ( procedureList[idx] && procedureList[idx].procedures.length > 0) {
			return procedureList[idx].procedures.map( (item, index) => {
				return (
					<li key={index} id={index} className={css(styles.listItem)}>
						<div style={{margin:'.5rem 5px', height: '19px', width: '10%', float: 'left', textAlign: 'left'}} >{item.procedure.code}</div>
						<div style={{margin:'.5rem 6px', height: '19px', width: '18%', float: 'left', textAlign: 'left'}} >{item.procedure.description}</div>
						<div style={{margin:'.5rem 1px', height: '19px', width: '24%', float: 'left', textAlign: 'left'}} >{item.specification.tooth ? item.specification.tooth.toString() : ''}</div>
						<div style={{margin:'.5rem 6px', height: '19px', width: '19%', float: 'left', textAlign: 'left'}} >Faces</div>
						<div style={{margin:'.5rem 2px', height: '19px', width: '20%', float: 'left', textAlign: 'left'}} >{this.mathRound(item.specification.value)}</div>
						<div style={{clear:'both'}}></div>
					</li>
				);
			});
		} else {
			return (
				<li className={css(styles.noItems)}>
					Nenhum Procedimento
				</li>
			);
		}
	}

	renderTab(tab){
		return(
			tab.map( (item, idx) => {
				return (
					<Tab>Orçamento {idx + 1}</Tab>
				);
			})
		);
	}

	deleteBudget(idx){
		const { updateTreatment, selectedPatient } = this.props;
		
		this.state.tab.splice(idx, 1);

		updateTreatment(this.state.treatment, selectedPatient._id, ret => {
			this.setState({});
		});
	}

	setToggle(item, e){
		item.approved = e
		this.setState({
		});
		return e;
	}

	renderTabPanel(tab){
		return(
			tab.map( (item, idx) => {
				return (
					<TabPanel>
						<div className={css(styles.list)}>
							{this.renderBudgetList(this.state.tab, idx)}
							<div className={css(styles.container)}>
								<div className={css(styles.column)}>
									<fieldset className={css(styles.fieldset)} style={{ textAlign: 'left', width: '33%', float: 'left', height: '57px' }}>
										<label className={css(styles.label)}>Forma de Pagamento</label>
										<input type="radio"	name="payment_type" value="cash"
											style={{ marginRight: '0.5rem' }}
											checked={item.payment_type == 'cash'}
											onChange={() => {
												item.payment_type = 'cash'
												item.entrance.value = 0;
												this.setState([]);
											}}
										/>À vista
										<input type="radio" name="payment_type" value="parcel"
											style={{ marginLeft: '1rem', marginRight: '0.5rem' }}
											checked={item.payment_type == 'parcel'}
											onChange={() => {
												item.payment_type = 'parcel'
												this.setState([]);
											}}
										/>Parcelado
									</fieldset>
									<fieldset className={css(styles.fieldset)} style={{ textAlign: 'left'}}>
										{ this.moneyPercentInput(item.discount, 'Desconto')}
										<div style={{ width: '33%', float: 'left' }}>
											<div style={{ width: '140px' }}>
												<DateTimePicker name="budget_expiration" value={item.budget_expiration} label="Validade do Orçamento" onChange={(e) => {
													item.budget_expiration = e;
													this.setState([]);
												}} />
											</div>
										</div>
									</fieldset>
										{ item.payment_type == 'parcel' ?
											<div>
												<fieldset className={css(styles.fieldset)} style={{ textAlign: 'left', width: '33%', float: 'left' }}>
													<label className={css(styles.label)}>Número de Parcelas</label>
													<input type="number" name="parcel_number" min="1" max="48" className={css(styles.input)} defaultValue={item.parcel_number} style={{ width: '80px' }}
														onBlur={(e) => {
															item.parcel_number = e.target.value;
															this.setState([]);
														}}
													>
													</input>
												</fieldset>
												{ this.moneyPercentInput(item.entrance, 'Entrada')}
											</div>
											: ''
										}

										<label className={css(styles.label)}>Parcelas</label>
									
										<ul className={css(styles.list)}>
											{ item.entrance.value > 0 ?
												<li key={'parcel'+idx} id={'parcel'+idx} className={css(styles.listItem)}>
													<div style={{ height: '40px', width: '33%', float: 'left', textAlign: 'left'}} >Entrada</div>
													<div style={{ height: '40px', width: '33%', float: 'left', textAlign: 'left'}} >{this.getEntrance(item)}</div>
													<div style={{ height: '40px', width: '30%', float: 'left', textAlign: 'left'}} >
														<DateTimePicker name="budget_expiration" value={item.entrance.expiration} audit={true} onChange={(e) => {
															item.entrance.expiration = e;
															this.setState([]);
														}} />
													</div>
												</li> : ''
											}
											{this.renderParcels(item)}
										</ul>
								</div>
								<div className={css(styles.row2)}>
									<div className={css(styles.buttons)}>
										<div className={css(styles.btn2)} style={{ marginLeft: '1rem' }}>
											<Button
												text={'Excluir'}
												color="red"
												onClick={ () => { this.deleteBudget(idx) }}
											/>
										</div>
										<div className={css(styles.btn2)}>
											<Button
												text={'Salvar'}
												color="green"
												onClick={ this.saveAll }
											/>
										</div>
									</div>
								</div>
							</div>
							<label className={css(styles.label)}>Parcelas</label>
							
							<ul className={css(styles.list)}>
								{ item.entrance.value > 0 ?
									<li key={'parcel'+idx} id={'parcel'+idx} className={css(styles.listItem)}>
										<div style={{ height: '40px', width: '33%', float: 'left', textAlign: 'left'}} >Entrada</div>
										<div style={{ height: '40px', width: '33%', float: 'left', textAlign: 'left'}} >{this.getEntrance(item)}</div>
										<div style={{ height: '40px', width: '30%', float: 'left', textAlign: 'left'}} >
											<DateTimePicker name="budget_expiration" value={item.entrance.expiration} audit={true} onChange={(e) => {
												item.entrance.expiration = e;
												this.setState([]);
											}} />
										</div>
									</li> : ''
								}
								{this.renderParcels(item)}
							</ul>
							<fieldset className={css(styles.fieldset)}>
								<div style={ {marginLeft: '45px', float: 'right'} }>
									<Toggle
										label={'Orçamento Aprovado?'}
										defaultValue={item.approved}
										change={ (e) => { this.setToggle(item, e) } }
									/>
								</div>
							</fieldset>
							<div className={css(styles.btn2)} style={{ marginLeft: '1rem' }}>
								<Button
									text={'Excluir'}
									color="red"
									onClick={ () => { this.deleteBudget(idx) }}
								/>
							</div>
							<div className={css(styles.btn2)}>
								<Button
									text={'Salvar'}
									color="green"
									onClick={ () => {this.saveAll(item)} }
								/>
							</div>
						</div>
					</TabPanel>
				);
			})
		);
	}

	addToTab(){
		const { updateTreatment, selectedPatient } = this.props;

		var proc = [...this.state.treatment.treatment];
		var total = 0;
		
		proc.map( procedure => {
			total += procedure.specification.value;
		});

		var budget = {
			procedures: proc,
			approved: false,
			payment_type: 'cash',
			parcel_number: 1,
			entrance: { value: 0, value_type: 'percent', expiration: new Date() },
			discount: { value: 0, value_type: 'percent' },
			budget_expiration: new Date().setMonth( new Date().getMonth() + 1 ),
			parcels:[{ number: 'unic', value: total, expiration: new Date() }],
		}
		this.state.tab.push(budget);

		updateTreatment(this.state.treatment, selectedPatient._id, ret => {
			this.setState({});
		});
	}

	saveAll(item){
		const { updateTreatment, selectedPatient } = this.props;

		if(item.approved) {
			this.openModalApproveBudget();
		} else {
			
			updateTreatment(this.state.treatment, selectedPatient._id, ret => {
				this.setState({});
			});
		}

	}

	getMoney( str ){
		return parseFloat(str.replace(/[\D]+/g,''))/100; // pega a string no formato R$ 0.000,00 e transforma em 0000.00
	}

	getEntrance(item){

		if(item.entrance.value_type == 'percent'){

			var total = 0;
			item.procedures.map( proc => {
				total += proc.specification.value;
			});

			var toCash = (total * item.entrance.value) / 100;
			return this.mathRound(toCash);
		}

		return	this.mathRound(item.entrance.value);
	}

	moneyPercentInput(item, label){

		if(item.value_type == 'cash'){
			return (
				<fieldset className={css(styles.fieldset)} style={{ textAlign: 'left', width: '33%' }}>
					<label className={css(styles.label)}>{label}</label>
					<input type="text" className={css(styles.input)} value={this.mathRound(item.value)} style={{ width: '140px' }}
						onChange={(e) => {
							item.value = this.getMoney(e.target.value);
							this.setState([]);
						}}
					>
					</input>
					<div style={{ position: 'absolute', top: '27px', left: '109px' }} onClick={() => {
						item.value_type = 'percent'
						item.value = 0
						this.setState([]);
					}}> 
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" height={26} width={26} >
							<rect width="26" height="26" rx="4" ry="4" fill="#00b1e8"/>
							<path d="M7.2,15.1H5.4v4.8H2.1V6.3H7.5a6.3,6.3,0,0,1,3.8,1.1,3.5,3.5,0,0,1,1.3,3,4.3,4.3,0,0,1-.6,2.4,3.5,3.5,0,0,1-1.8,1.5l2.9,5.5H9.6ZM5.4,12.6H7.5a2,2,0,0,0,1.4-.5,2,2,0,0,0,.4-1.4,1.7,1.7,0,0,0-.4-1.3,1.6,1.6,0,0,0-1.4-.5H5.4Z" fill="#fff"/>
							<path d="M20.7,16.3a1.6,1.6,0,0,0-.4-1.1,3.2,3.2,0,0,0-1.3-.8l-1.7-.8a3.8,3.8,0,0,1-1.3-.9,3.1,3.1,0,0,1-.9-1.1,4.1,4.1,0,0,1-.3-1.6,3.3,3.3,0,0,1,1.1-2.6,4.5,4.5,0,0,1,2.8-1.2v-2h1.5v2a3.9,3.9,0,0,1,2.7,1.4,4.3,4.3,0,0,1,1,2.9H20.7A2.4,2.4,0,0,0,20.3,9a1.2,1.2,0,0,0-1-.5,1.3,1.3,0,0,0-1,.4A1.8,1.8,0,0,0,18,10a1.5,1.5,0,0,0,.4,1.1l1.2.7,1.7.8,1.3.9a2.7,2.7,0,0,1,.9,1.2,3.8,3.8,0,0,1,.3,1.6,3.4,3.4,0,0,1-1,2.6A4.3,4.3,0,0,1,20,20.1V22H18.5V20.1a5.3,5.3,0,0,1-3.1-1.4,4.5,4.5,0,0,1-1.1-3.1h3.2a2.1,2.1,0,0,0,.5,1.6,1.4,1.4,0,0,0,1.3.5,1.7,1.7,0,0,0,1-.3A1.8,1.8,0,0,0,20.7,16.3Z" fill="#fff"/>
						</svg>
					</div>
				</fieldset>
			)
		}

		return (
			<fieldset className={css(styles.fieldset)} style={{ textAlign: 'left', width: '33%' }}>
				<label className={css(styles.label)}>{label}</label>
				<input type="number" className={css(styles.input)} value={item.value} style={{ width: '140px' }}
					onChange={(e) => {
						item.value = e.target.value;
						this.setState([]);
					}}
				>
				</input>
				<div style={{ position: 'absolute', top: '27px', left: '109px' }} onClick={() => {
					item.value_type = 'cash'
					item.value = 0
					this.setState([]);
				}}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" height={26} width={26} >
						<rect width="25.9" height="25.94" rx="4" ry="4" fill="#00b1e8"/>
						<path d="M18,14.4a3.4,3.4,0,0,0-3.2,3.7A3.5,3.5,0,0,0,18,21.8a3.5,3.5,0,0,0,3.2-3.7A3.5,3.5,0,0,0,18,14.4Z" fill="#fff"/>
						<path d="M8.2,4.2A3.6,3.6,0,0,0,5,7.9a3.5,3.5,0,0,0,3.3,3.7,3.3,3.3,0,0,0,3.1-3.7A3.5,3.5,0,0,0,8.2,4.2Z" fill="#fff"/>
						<polygon points="7 21.8 4.4 19.4 19.4 4.2 22 6.6 7 21.8" fill="#fff"/>
					</svg>
				</div>
			</fieldset>
		)

	}

	render() {
		const { handleSubmit, history, match } = this.props;

		return (
			<div className={css(styles.flex)}>
				<form className={css(styles.form2)} onSubmit={handleSubmit(this.onSubmit)}>
					<div className={css(styles.listContainer)}>
						<Tabs>
							<TabList>
							<Tab>
								<div onDoubleClick={this.openModalName}>
									{ this.state.treatment ? this.state.treatment.name : ''}
								</div>
							</Tab>
							{this.renderTab(this.state.tab)}
							</TabList>
						
							<TabPanel>
								<div className={css(styles.list)}>
									<div className={css(styles.fieldsetBtn)}>
										<Button
											icon={'tooth'}
											text={'Odontograma'}
											color="green2"
											onClick={ this.addToWindows }
										/>
										<Button
											icon={'plus'}
											text={'Procedimento'}
											onClick={ () => {this.openModal(null)} }
										/>
									</div>
									{this.renderList(this.state.treatment)}
									<div className={css(styles.btn2)}>
										<Button
											text={'Criar Orçamento'}
											onClick={ this.addToTab }
										/>
									</div>
								</div>
							</TabPanel>
							{this.renderTabPanel(this.state.tab)}
						</Tabs>
					</div>

					<Modal
						isOpen={this.state.modal}
						header="Procedimentos"
						adjustStyle={styles.modal}
					>
						<ModalProcedureForm onCancel={this.closeModal} treatment={this.state.treatment} procedure={this.state.procedure} />
					</Modal>
					<Modal
						isOpen={this.state.modalDelete}
						header={"Excluir Procedimento"}
						adjustStyle={styles.modal} 
					>
						<ModalDeleteProcedure
							treatment={this.state.treatment}
							procedure={this.state.procedure}
							onCancel={this.closeModalDelete}
							onSubmit={this.deleteProcedure}
						/>
					</Modal>
					<Modal
						isOpen={this.state.modalName}
						header={"Editar nome do Tratamento"}
						adjustStyle={styles.modal}
					>
						<ModalTreatmentCreateForm
							name={ this.state.treatment ? this.state.treatment.name : null }
							onCancel={ this.closeModalName }
							onSubmit={ this.editName }
						/>
					</Modal>
					<Modal
						isOpen={this.state.modalApproveBudget}
						header={"Aprovar Orçamento"}
						adjustStyle={styles.modal}
					>
						<ModalApproveBudget
							onCancel={this.closeModalApproveBudget}
							onSubmit={this.deleteProcedure}
						/>
					</Modal>
				</form>
			</div>
		);
	}
}

// Redux Form function to handle form validation
function validate(values) {
	const errors = {};

	return errors;
}

const treatmentForm = reduxForm({
	validate,
	form: 'treatmentForm'
})(TreatmentForm);

function mapStateToProps(state) {
    const selectedPatient = state.patientsCreation.selectedPatient;
    let initialValues = {};

	if (selectedPatient) {
        initialValues = selectedPatient;
	}

	return {
		dentistsById: state.clinicConfig.dentistsById,
		selectedPatient: state.patientsCreation.selectedPatient,
		initialValues
	};
}

export default connect(mapStateToProps, { fetchDentists, getTreatment, updateTreatment, getPatient, addToWindows })(treatmentForm);