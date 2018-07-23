import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../PatientFormStyles';

import Button from '../../../common/Button';
import InputField from '../../../forms/InputField';

import { createList } from '../../../../actions/procedure';

class ModalClinicalNote extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.renderFields = this.renderFields.bind(this);
		this.render = this.render.bind(this);

		this.state = {
			errorMsg: null,
			note: '',
		}
	}

	onSubmit(values) {
		const { onSubmit, onCancel, note } = this.props;
		
		if(note){
			onSubmit({ _id: note._id, issue_date: note.issue_date, note: values.note });
		}else{
			onSubmit({ issue_date: new Date, note: values.note });
		}
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

	renderFields({input}) {
		return (
			<textarea {...input} name="note" rows="15"	cols="70">
			</textarea>
		);
	}

	render() {
		const { handleSubmit, onCancel } = this.props;

		return (
            <form className={css(styles.form_modal)} onSubmit={handleSubmit(this.onSubmit)} >
                {this.renderAuthMsg()}
                <div className={css(styles.fieldset)}>
					<Field name="note" component={this.renderFields}/>
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

	if (values.note) {
		if(values.note.trim().length <= 0){
			errors.note = 'Digite o nome da Lista';
		}
	}
	if (!values.note) {
		errors.note = 'Digite o nome da Lista';
	}
	return errors;
}

const modalClinicalNote = reduxForm({
	validate,
	form: 'modalClinicalNote'
})(ModalClinicalNote);

function mapStateToProps(state, props) {

	const note = props.note;
    let initialValues = {};

	if (note) {
        initialValues = note;
	}

	return {
		selectedPatient: state.patientsCreation.selectedPatient,
		user: state.auth.user,
		initialValues
	};
}

export default connect(mapStateToProps, { createList })(modalClinicalNote);
