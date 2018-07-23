import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import ReactDOM from 'react-dom';

import { css } from 'aphrodite/no-important';
import { styles } from '../PatientFormStyles';

import Button from '../../../common/Button';
import InputField from '../../../forms/InputField';

const FIELDS = [
	{ name: 'name', label: 'Nome do Tratamento', placeholder: 'Nome do Tratamento' }
];

// ModalTreatmentCreateForm handles the form where the user enter the app
class ModalTreatmentCreateForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
        this.renderFields = this.renderFields.bind(this);
		this.render = this.render.bind(this);

        this.state = {}
	}

	componentDidMount() {
		const { name } = this.props;

		var node = ReactDOM.findDOMNode(this);
		if(name){
			node[1].value = name;
		} else {
			node[1].focus();
			node[1].select();
		}
	}

	onSubmit(values) {
		const { onCancel, onSubmit } = this.props;
		onSubmit(values.name);
		onCancel();
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
					ref={field.name}
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
            <form className={css(styles.form_modal)} onSubmit={handleSubmit(this.onSubmit)}>
                {this.renderAuthMsg()}
                
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
function validate(values) {
	const errors = {};

	if (values.name) {
		if(values.name.trim().length <= 0){
			errors.name = 'Digite o nome do Tratamento';
		}
	}
	if (!values.name) {
		errors.name = 'Digite o nome do Tratamento';
	}
	return errors;
}

const modalTreatmentCreateForm = reduxForm({
	validate,
	form: 'modalListForm'
})(ModalTreatmentCreateForm);

function mapStateToProps(state, props) {

	const selector = formValueSelector('modalListForm');
	const name = selector(state, 'name');

	if(props.name){
		let initialValues = {};
		initialValues.name = props.name;
		return {
			initialValues
		}
	}
	if(!name || name == ''){
		let initialValues = {};
		initialValues.name = 'Novo Tratamento';
		return {
			initialValues
		}
	}
	return {};
}

export default connect(mapStateToProps, {})(modalTreatmentCreateForm);
