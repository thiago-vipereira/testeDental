import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../ProcedureFormStyles';

import Button from '../../../common/Button';
import InputField from '../../../forms/InputField';

import { creatGroup, getList, updateGroup } from '../../../../actions/procedure';

const FIELDS = [
	{ name: 'name', label: 'Nome do Grupo de Procedimentos', placeholder: 'Nome do Grupo de Procedimentos' }
];

// ModalGroupForm handles the form where the user enter the app
class ModalGroupForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
        this.renderFields = this.renderFields.bind(this);
        this.render = this.render.bind(this);
        
        this.state = {
            showModal: false 
        }
	}

	componentDidMount() {
		const { selectedProcedure } = this.props;
		getList(selectedProcedure._id);
	}

	onSubmit(values) {

		const { user, selectedProcedure, updateGroup, creatGroup, onCancel, id, name } = this.props;

		if(id != "" && name != ""){
			var editedGroup = {values: values, updated_by: user._id};

			updateGroup(editedGroup, selectedProcedure._id, ret => { 
				onCancel();
			});

		}else{
			var newGroup = {values: values, updated_by: user._id};

			creatGroup(newGroup, selectedProcedure._id, ret => { 
				onCancel();
			});
		}
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
			errors.name = 'Digite o nome do Grupo'
		}
	}
	if (!values.name) {
		errors.name = 'Digite o nome do Grupo'
	}
	return errors;
}

const modalGroupForm = reduxForm({
	validate,
	form: 'modalGroupForm'
})(ModalGroupForm);

function mapStateToProps(state, props) {

	let initialValues = {};

	if (props.name != "") {
		initialValues = props; 
	}

	return {
		user: state.auth.user,
		selectedProcedure: state.procedureConfig.selectedProcedure,
		initialValues
	};
}

export default connect(mapStateToProps, { creatGroup, getList, updateGroup })(modalGroupForm);
