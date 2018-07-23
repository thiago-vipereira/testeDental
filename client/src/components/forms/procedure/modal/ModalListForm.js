import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../ProcedureFormStyles';

import Button from '../../../common/Button';
import InputField from '../../../forms/InputField';

import { createList } from '../../../../actions/procedure';

const FIELDS = [
	{ name: 'name', label: 'Nome da Lista de Procedimentos', placeholder: 'Nome da Lista de Procedimentos' }
];

// ModalListForm handles the form where the user enter the app
class ModalListForm extends Component {
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
	}

	onSubmit(values) {

		const { history, match, createList, onCancel } = this.props;

		createList(values, ret => {
			onCancel();
		
			history.push(`${match.url}/${ret._id}`); 
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
			errors.name = 'Digite o nome da Lista';
		}
	}
	if (!values.name) {
		errors.name = 'Digite o nome da Lista';
	}
	return errors;
}

const modalListForm = reduxForm({
	validate,
	form: 'modalListForm'
})(ModalListForm);

function mapStateToProps(state) {
	return {
		user: state.auth.user
	};
}

export default connect(mapStateToProps, { createList })(modalListForm);
