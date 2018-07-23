import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../ProcedureFormStyles';

import SelectBox from '../../../common/SelectBox';
import Button from '../../../common/Button';
import InputField from '../../../forms/InputField';

import { getList, updateList } from '../../../../actions/procedure';

const FIELDS = [
	{ name: 'name', label: 'Nome da Lista de Procedimentos', placeholder: 'Nome da Lista de Procedimentos' }
];

const INDEX = [
	{ name: 'index', label: 'Índice', placeholder: 'Índice 0-1', }
];

const CORRECTION = [
	{ name: 'correction', label: 'Correção', placeholder: '99.99', ico:'percent' }
];

const OPTIONS = [
	{ value: '+', label: 'Aumento', default: true },
	{ value: '-', label: 'Redução'}
];

class ModalEditListForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.renderFields = this.renderFields.bind(this);
		this.renderFieldsIndex = this.renderFieldsIndex.bind(this);
		this.renderFieldsCorrection = this.renderFieldsCorrection.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleIndex = this.handleIndex.bind(this);
		this.renderSelectBox = this.renderSelectBox.bind(this);
		this.selectChange = this.selectChange.bind(this);
        this.render = this.render.bind(this);
        
        this.state = {
			showModal: false,
			correction: '',
			correction_select: '+',
        }
	}

	componentDidMount() {
		//const { selectedProcedure } = this.props;
		//getList(selectedProcedure._id);
	}

	onSubmit(values) {
		const { user, selectedProcedure, updateList, onCancel } = this.props;

		values.correction = values.correction != null ? Number(values.correction) : null;
		values.correction_select = this.state.correction_select;
		updateList(values, selectedProcedure._id, ret => {
			onCancel();
		});

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

	handleChange(event) {
		var value = event;
		value = value.match(/([0-9])+([\.])?([0-9])*/g);
		return (value =='' || value == null) ? '' : value.join('');
	}

	handleIndex(event) {
		var value = event;
		var valuePrev = event.slice(0, -1);
		value = value.match(/^(1|0(\.[0-9]{0,2}|))$/g);
		return (value =='' || value == null) ? valuePrev : value.join('');
	}

	selectChange(e) {
		this.setState({
			correction_select: e.value,
		});
	}

	renderFields(fields) {
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

	renderFieldsIndex(fields) {
		return fields.map(field => {
			return (
				<Field
					key={field.name}
					type={(field.type) ? field.type : 'text'}
					name={field.name}
					label={field.label}
					placeholder={(field.placeholder) ? field.placeholder : ''}
					mask={(field.mask) ? field.mask : ''}
					normalize={this.handleIndex}
					component={InputField}
				/>
			);
		});
	}

	renderFieldsCorrection(fields) {
		return fields.map(field => {
			return (
				<div>
					<Field
						key={field.name}
						type={(field.type) ? field.type : 'text'}
						name={field.name}
						label={'Percentual'}
						placeholder={(field.placeholder) ? field.placeholder : ''}
						mask={(field.mask) ? field.mask : ''}
						ico={field.ico}
						normalize={this.handleChange}
						component={InputField}
					/>
				</div>
			);
		});
	}

	renderSelectBox(OPTIONS){
		return (
			<Field
			key={'correction_select'}
			type={'selectbox'}
			name={'correction_select'}
			label={'Correção'}
			itens={OPTIONS}
			onChange={this.selectChange}
			component={SelectBox}
		/>);
	}

	render() {
		const { handleSubmit, onCancel } = this.props;

		return (
            <form className={css(styles.form_modal)} onSubmit={handleSubmit(this.onSubmit)}>
                {this.renderAuthMsg()}
                
                {this.renderFields(FIELDS)}
				{this.renderFieldsIndex(INDEX)}
				<div className={css(styles.row_2)}>
					{this.renderSelectBox(OPTIONS)}
					{this.renderFieldsCorrection(CORRECTION)}
				</div>

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
function validate(values) {
	const errors = {};
	
	if (values.name) {
		if(values.name.trim().length <= 0){
			errors.name = 'Digite o nome da Lista'
		}
	}
    if (!values.name) {
		errors.name = 'Digite o nome da Lista';
    }
	return errors;
}

const modalEditListForm = reduxForm({
	validate,
	form: 'modalEditListForm'
})(ModalEditListForm);

function mapStateToProps(state, props) {

	let selectedProcedure = state.procedureConfig.selectedProcedure;	
	let initialValues = {};

	if (selectedProcedure) {
		initialValues = selectedProcedure; 
	}

	return {
		user: state.auth.user,
		selectedProcedure: state.procedureConfig.selectedProcedure,
		initialValues
	};
}

export default connect(mapStateToProps, { getList, updateList })(modalEditListForm);
