import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './ChangePassFormStyles';

import { changePassword } from '../../../actions/auth';

import Button from '../../common/Button';
import InputField from '../../forms/InputField';

const FIELDS = [
	{ name: 'password', label: 'Senha atual', type: 'password' },
    { name: 'newPassword', label: 'Nova senha', type: 'password' },
    { name: 'newPasswordConfirm', label: 'Confirmar nova senha', type: 'password' },
];

// ChangePassForm handles the form where the user enter the app
class ChangePassForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
        this.renderFields = this.renderFields.bind(this);
        this.renderAuthMsg = this.renderAuthMsg.bind(this);
        
        this.state = {
			errorMsg: null
		}
	}

	onSubmit(values) {
        const { user, changePassword, onCancel } = this.props;
        
        this.setState({ errorMsg: null});

        values.userId = user._id;

        changePassword(values, error => {
            if (typeof error === 'string') {
                this.setState({ errorMsg: 'Oops! Senha incorreta' });
            } else {
                onCancel();
            }
        });
    }
    
    renderAuthMsg() {
        const { errorMsg } = this.state;
        
		if(errorMsg) {
			return (
				<div className={css(styles.msgAuth)}>
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
            <form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}>
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

    if (!values.password) {
		errors.password = 'Digite sua senha para autorizar a mudança de senha';
    }
    
	if (!values.newPasswordConfirm || values.newPassword !== values.newPasswordConfirm) {
		errors.newPasswordConfirm = 'Confirme sua nova senha';
	}

	return errors;
}

const changePassForm = reduxForm({
	validate,
	form: 'changePassForm'
})(ChangePassForm);

function mapStateToProps(state) {
	return {
        user: state.auth.user
	};
}

export default connect(mapStateToProps, { changePassword })(changePassForm);
