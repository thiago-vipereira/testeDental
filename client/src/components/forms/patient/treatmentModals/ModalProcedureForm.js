import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from '../BudgetFormStyles';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Toggle from '../../../common/Toggle';
import DateTimePicker from '../../date/DateTimePicker';
import Icon from '../../../common/Icon';
import Button from '../../../common/Button';
import SelectBox from '../../../common/SelectBox';
import InputField from '../../../forms/InputField';
import ProcedureInputAuto from '../treatmentModals/ProcedureInputAuto';

import { updateTreatment } from '../../../../actions/treatment';
import { fetchDentists } from '../../../../actions/dentists';
import { fetchListCallback } from '../../../../actions/procedure';

const FIELDS = [
	{ name: 'observation', label: 'Observação', placeholder: 'Digite a observação' },
];

// ModalProcedureForm handles the form where the user enter the app
class ModalProcedureForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.mathRound = this.mathRound.bind(this);
		this.renderFields = this.renderFields.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.onToggle = this.onToggle.bind(this);
		this.renderSelectBox = this.renderSelectBox.bind(this);
		this.renderSelectDentists = this.renderSelectDentists.bind(this);
		this.onChangeSelectDentists = this.onChangeSelectDentists.bind(this);
		this.renderSpecification = this.renderSpecification.bind(this);
		this.renderFaces = this.renderFaces.bind(this);
		this.renderInputXray = this.renderInputXray.bind(this);
		this.renderInputTeeth = this.renderInputTeeth.bind(this);
		this.onChangeSelectedTooth = this.onChangeSelectedTooth.bind(this);
		this.onChangeSelectedToothInput = this.onChangeSelectedToothInput.bind(this);
		this.onChangeFaces = this.onChangeFaces.bind(this);
		this.showFaces = this.showFaces.bind(this);
		this.renderMultiplication = this.renderMultiplication.bind(this);
		this.renderFrenu = this.renderFrenu.bind(this);
        
        this.state = {
			listProcedure: [],
			selectedDentist: null,
			selectedProcedure: null,
			selectedTooth: [],
			selectedToothAux: [],
			faces: [],
			showFaces: false,
			procedureValue: null,
			date: null,
			toggle: false,
			listDisabled: false,
        }
	}

	componentWillMount() {
		const { fetchListCallback, fetchDentists, treatment, procedure } = this.props;

		fetchDentists();
		fetchListCallback(ret => {
			this.setState({
				listProcedure: ret,
			});
		});

		if(procedure){
			var procedureSelected = treatment.treatment[procedure];
			this.setState({
				selectedDentist: procedureSelected.dentist_id,
				selectedProcedure: procedureSelected.procedure,
				date: procedureSelected.date,

				selectedTooth: procedureSelected.specification.tooth,
				selectedToothAux: procedureSelected.specification.tooth,
				faces: procedureSelected.specification.face,
				procedureValue: procedureSelected.specification.value,
				toggle: procedureSelected.specification.value_acc,
				observation: procedureSelected.specification.observation,
				showFaces: procedureSelected.specification.face && procedureSelected.specification.face.length > 0 ? true : false,
			});
		} else {
			this.setState({
				date: new Date,
			});
		}
	}

	componentDidMount() {
		const { treatment } = this.props;

		if(treatment.list_id){
			this.props.change('list_id', treatment.list_id);
			this.setState({
				listDisabled: true,
			});
		}
	}

	onSubmit(values) {
		const { onCancel, selectedPatient, treatment, updateTreatment, procedure } = this.props;
		
		var editedTreatment = treatment;

		if(procedure){
			editedTreatment.treatment[procedure] = {
				list_id: values.list_id,
				dentist_id: this.state.selectedDentist,
				procedure: this.state.selectedProcedure,
				date: this.state.date,
				specification: {
					tooth: this.state.selectedTooth,
					face: this.state.faces,
					value: this.state.procedureValue,
					value_acc: this.state.toggle,
					frenu: values.frenu,
					xray: values.xray,
				},
				observation: values.observation,
			};
		}else{
			editedTreatment.treatment.push({
				list_id: values.list_id,
				dentist_id: this.state.selectedDentist,
				procedure: this.state.selectedProcedure,
				date: this.state.date,
				specification: {
					tooth: this.state.selectedTooth,
					face: this.state.faces,
					value: this.state.procedureValue,
					value_acc: this.state.toggle,
					frenu: values.frenu,
					xray: values.xray,
				},
				observation: values.observation,
			});
		}
		onCancel();
		if(selectedPatient){
			updateTreatment(editedTreatment, selectedPatient._id, ret => {
				//if(ret){}
			});
		}
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
	
		number = Math.round(number * 100)/100;
		number = number.toFixed(2);
		return formatBR(number);
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

	onDateChange(date) {
		this.setState({
			date: date
		})
	}

	onToggle(res) {

		var value = this.state.selectedProcedure.price;
		if(res){
			value = value * this.state.selectedTooth.length;
		}

		this.setState({
			toggle: res,
			procedureValue: value,
		})
	}

	renderSelectBox(OPTIONS){
		var list = [];
		list.push({value: '', label: 'Selecione uma lista'});
		OPTIONS.map( item => {
			list.push({ value: item._id, label: item.name });
		});
		return (
			<Field
			key={'list_id'}
			type={'selectbox'}
			name={'list_id'}
			label={'Selecione a lista'}
			itens={list}
			component={SelectBox}
			disabled={this.state.listDisabled}
		/>);
	}

	renderSelectDentists(options){
		let dentist = [];
		if(options){
			options.map(field =>{
				dentist.push({value: field._id, label: field.name});
			});
		}
		return (
			<fieldset className={css(styles.fieldset)}>
				<label className={css(styles.label)}>Dentista</label>
				<Select
					name="select"
					placeholder="Selecione o Dentista"
					value={this.state.selectedDentist}
					onChange={this.onChangeSelectDentists}
					options={dentist}
					multi={false}
				/>
			</fieldset>
		);
	}

	onChangeSelectDentists(e){
		this.setState({
			selectedDentist: e.value,
		});
	}
	
	onChangeSelectedTooth(e){
		var regex = /^[0-9,]+$/;

		if( regex.test(e.currentTarget.value) ) {
			var eAux = e.currentTarget.value.split(',');

			this.setState({
				selectedToothAux: eAux,
			});
		}

		if(e.currentTarget.value == ""){
			this.setState({
				selectedToothAux: [],
			});
		}
	}

	onChangeSelectedToothInput(e){
		var regex = /^[0-9,]+$/;

		if( regex.test(e.currentTarget.value) ) {
			var eAux = e.currentTarget.value.split(',');

			this.setState({
				selectedTooth: eAux,
				selectedToothAux: eAux,
			});
		}

		if(e.currentTarget.value == ""){
			this.setState({
				selectedTooth: [],
				selectedToothAux: [],
			});
		}
	}

	onChangeFaces(e){
		var eAux = e.target.value.toUpperCase();

		var regex = /^[DLMOVC,]+$/;
		
		if( regex.test(eAux) || eAux == "" ) {
			var face = {tooth: e.target.parentElement.id, faces: eAux}
			this.state.faces.map(face => {
				if(face.tooth == e.target.parentElement.id){
					face.faces = eAux;
				}
			});
			this.setState({
				faces: this.state.faces,
			});
		}
	}

	showFaces(){

		if(this.state.selectedToothAux.length < 1){
			this.setState({
				faces: [],
				selectedTooth: this.state.selectedToothAux,
				showFaces: false,
			});
		} else {

			var faces = [];
			this.state.selectedToothAux.map(tooth => {

				var exists = false;
				this.state.faces.map(face => {
					if(tooth == face.tooth){
						faces.push(face);
						exists = true;
					}
				});

				if(!exists){
					faces.push({tooth: tooth, faces: ''})
				}

			}, this);

			this.setState({
				faces: faces,
				selectedTooth: this.state.selectedToothAux,
				showFaces: true,
			});
		}
	}

	renderFaces(){

		return (
			<fieldset className={css(styles.fieldset)}>
				<fieldset className={css(styles.fieldset)}>
					<label className={css(styles.label)}>Dentes</label>
					<input className={css(styles.inputTeeth)} placeholder={'ex: 11,12,13 ...'} value={this.state.selectedToothAux.toString()} onChange={this.onChangeSelectedTooth}></input>
					<Button
						text="Confirmar"
						style={ {marginRight: '0px'} }
						onClick={this.showFaces}
					/>
				</fieldset>
				{ this.state.showFaces ?
					this.state.faces.map( item => {
						return (
							<div id={item.tooth} className={css(styles.fieldFace)}>
								<label className={css(styles.label)}>{item.tooth}</label>
								<input className={css(styles.input)} style={{ width: '85px'}} placeholder={'ex: V,D,M,L,O,C'} value={item.faces} onChange={this.onChangeFaces}></input>
							</div>
						)
					})
				:
					''
				}
			</fieldset>
		);
	}

	renderInputXray(){

		var list = [
			{value: 'CM', label: 'região da coroa e com tomada mesio-radial'},
			{value: 'CD', label: 'região da coroa e com tomada disto-radial'},
			{value: 'CO', label: 'região da coroa e com tomada orto-radial'},
			{value: 'RM', label: 'região da raiz e com tomada mesio-radial'},
			{value: 'RD', label: 'região da raiz e com tomada disto-radial'},
			{value: 'RO', label: 'região da raiz e com tomada orto-radial'},
			{value: 'C', label: 'região da cervical e com tomada mesio-radial'}
		];

		return (
			<div>
				<fieldset className={css(styles.fieldset)}>
					<label className={css(styles.label)}>Dentes</label>
					<input className={css(styles.inputTeeth)} placeholder={'ex: 11,12,13 ...'} value={this.state.selectedToothAux.toString()} onChange={this.onChangeSelectedToothInput} style={{ width: '100%'}}></input>
				</fieldset>
				<fieldset className={css(styles.fieldset)}>
					<Field
						key={'xray'}
						type={'selectbox'}
						name={'xray'}
						label={'Selecione a radiografia'}
						itens={list}
						component={SelectBox}
					/>
				</fieldset>
			</div>
		);
	}

	renderFrenu(){
		
		var list = [
			{value: 'SUPERIOR', label: 'Superior'},
			{value: 'INFERIOR', label: 'Inferior'},
			{value: 'LINGUAL', label: 'Lingual'},
		];

		return (
			<fieldset className={css(styles.fieldset)}>
				<Field
					key={'frenu'}
					type={'selectbox'}
					name={'frenu'}
					label={'Selecione a posição'}
					itens={list}
					component={SelectBox}
				/>
			</fieldset>
		);
	}

	renderInputTeeth(){
		
		return (
			<fieldset className={css(styles.fieldset)}>
				<label className={css(styles.label)}>Dentes</label>
				<input className={css(styles.inputTeeth)} placeholder={'ex: 11,12,13 ...'} value={this.state.selectedToothAux.toString()} onChange={this.onChangeSelectedToothInput} style={{ width: '100%'}}></input>
			</fieldset>
		);
	}

	renderSpecification(procedure) {

		if(procedure){

			switch(procedure.procedure_type) {
				case 'NOTYPE':
					return '';
					break;
				case 'CROWN':
					return this.renderFaces();
					break;
				case 'RESTORATION':
					return this.renderFaces();
					break;
				case 'RIZECTOMY':
					return this.renderFaces();
					break;
				case 'APICECTOMY':
					return this.renderFaces();
					break;
				case 'CHANNEL':
					return this.renderFaces();
					break;
				case 'XRAY':
					return this.renderInputXray();
					break;
				case 'DENTURES':
					return this.renderInputTeeth();
					break;
				case 'MOBILE':
					return this.renderInputTeeth();
					break;
				case 'FIXED':
					return this.renderInputTeeth();
					break;
				case 'ADHESIVE':
					return this.renderInputTeeth();
					break;
				case 'SPLINTER':
					return this.renderInputTeeth();
					break;
				case 'GRAFT':
					return this.renderInputTeeth();
					break;
				case 'CONEMORSE':
					return this.renderInputTeeth();
					break;
				case 'SHORT':
					return this.renderInputTeeth();
					break;
				case 'HEXAGONAL_OUT':
					return this.renderInputTeeth();
					break;
				case 'HEXAGONAL_IN':
					return this.renderInputTeeth();
					break;
				case 'ZYGOMATIC':
					return this.renderInputTeeth();
					break;
				case 'NOBEL_REPLACE':
					return this.renderInputTeeth();
					break;
				case 'RETAIL':
					return this.renderInputTeeth();
					break;
				case 'STEEL_CROWN':
					return this.renderInputTeeth();
					break;
				case 'PULPECTOMY':
					return this.renderInputTeeth();
					break;
				case 'FACETS':
					return this.renderInputTeeth();
					break;
				case 'CORE':
					return this.renderInputTeeth();
					break;
				case 'METAL_BLOCK':
					return this.renderFaces();
					break;
				case 'RESORPTION':
					return this.renderFaces();
					break;
				case 'RAP':
					return this.renderFaces();
					break;
				case 'FRENULOTOMY':
					return this.renderFrenu();
					break;
				case 'SELANTE':
					return this.renderFaces();
					break;
				case 'EXTRACTION':
					return this.renderInputTeeth();
					break;
				default:
					return '';
					break;
			}
		}
	}

	renderMultiplication(teeth){

		if(teeth.length > 1){
			return (
				<fieldset className={css(styles.fieldset)}>
					<Toggle
						label={'Multiplicar valor do procedimento por número de Dentes?'}
						defaultValue={this.state.toggle}
						change={ e => {this.onToggle(e)} }
					/>
					<fieldset className={css(styles.fieldset)}>
						<label className={css(styles.label)}> Valor Total: {this.mathRound(this.state.procedureValue)}</label>
					</fieldset>
				</fieldset>
			);
		} else if(teeth.length > 0){
			return (
				<fieldset className={css(styles.fieldset)}>
					<label className={css(styles.label)}> Valor Total: {this.mathRound(this.state.procedureValue)}</label>
				</fieldset>
			);
		}
		return '';
	}

	render() {
		const { handleSubmit, onCancel } = this.props;

		return (
            <form className={css(styles.form_modal)} onSubmit={handleSubmit(this.onSubmit)}>
				
                {this.renderAuthMsg()}

				<h3 className={css(styles.sectionTitle)}>Escolher Procedimento</h3>
				
				{this.renderSelectBox(this.state.listProcedure)}
				<ProcedureInputAuto
					label={'Procedimento'}
					placeholder={'Digite o nome do Procedimento'}
					limit={5}
					list={this.state.listProcedure}
					selectedList={this.props.selectedList}
					value={this.state.selectedProcedure}
					onSelect={ e => {
						this.setState({
							selectedProcedure: e,
							procedureValue: e.price ? e.price : null,
						})
					}}
				/>
				{this.renderSelectDentists(this.props.dentistsById)}
				<DateTimePicker name="date" value={this.state.date} label="Data" onChange={this.onDateChange} />

				<h3 className={css(styles.sectionTitle)}>Especificações</h3>

				{this.renderSpecification(this.state.selectedProcedure)}
				{this.renderMultiplication(this.state.selectedTooth)}
				{this.renderFields(FIELDS)}

                <Button
                    text="Salvar"
                    color="green"
                    submit
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
/*
function validate(values) {
	const errors = {};

    if (!values.code) {
		errors.code = 'Digite o código';
	}

	if (values.description) {
		if(values.description.trim().length <= 0){
			errors.description = 'Digite a descrição';
		}
	}
	if (!values.description) {
		errors.description = 'Digite a descrição';
	}

	if (!values.price) {
		errors.price = 'Digite o valor';
    }
	return errors;
}*/

const modalProcedureForm = reduxForm({
	//validate,
	form: 'modalProcedureForm'
})(ModalProcedureForm);

function mapStateToProps(state, props) {

	let initialValues = {};

	if (props.procedure) {
		initialValues = props.treatment.treatment[props.procedure];
		if(initialValues.specification.xray){
			initialValues.xray = initialValues.specification.xray;
		}
		if(initialValues.specification.frenu){
			initialValues.frenu = initialValues.specification.frenu;
		}
	}

	const selector = formValueSelector('modalProcedureForm');
	let selectedList = selector(state, 'list_id');

	return {
		selectedPatient: state.patientsCreation.selectedPatient,
		selectedList: selectedList,
		ListProcedure: state.procedureConfig.proceduresById,
		dentistsById: state.clinicConfig.dentistsById,
		initialValues,
	};
}

export default connect(mapStateToProps, { fetchListCallback, fetchDentists, updateTreatment })(modalProcedureForm);