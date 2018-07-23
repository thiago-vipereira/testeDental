import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { changePassEmail } from '../../actions/auth';

import { css } from 'aphrodite/no-important';
import { styles } from './RememberPassFormStyles';

import LinkExternal from '../navigation/LinkExternal';
import Button from '../common/Button';
import InputField from '../forms/InputField';

// RememberPassForm handles the form where the user enter the app
class RememberPassForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.renderChangeSucess = this.renderChangeSucess.bind(this);
		
		this.state = {
			emailsent: false
		};
	}

	onSubmit({ email }) {
		const { changePassEmail } = this.props;
		
		changePassEmail({ email });
	}

	renderChangeSucess() {
		const { auth } = this.props;
		
		if(auth.authenticated === 'unauthorized') {
			return (
				<div className={css(styles.msgAuth)}>
					<span className={css(styles.msgSpan)}>Não conseguimos reconhecer esta conta. Gostaria de tentar novamente ou</span>
					<LinkExternal
						text="criar uma conta nova?"
						url="http://www.softmanager.com.br/contato/"
						decoration={false}
					/>
				</div>
			);
		}
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}>
				{this.renderChangeSucess()}

				<Field
					type="text"
					name="email"
					label="E-mail"
					placeholder="seu.email@exemplo.com"
					component={InputField}
				/>

				<Button
					text="Enviar"
					size="large"
					color="green"
					submit
				/>
			</form>
		);
	}
}

// Redux Form function to handle form validation
function validate(values) {
	const errors = {};
	const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if(!values.email || !regex.test(values.email)) {
		errors.email = 'E-mail inválido';
	}

	return errors;
}

const rememberPassForm = reduxForm({
	validate,
	form: 'rememberPassForm'
})(RememberPassForm);

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps, { changePassEmail })(rememberPassForm);
