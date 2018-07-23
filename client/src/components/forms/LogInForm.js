import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { logInUser } from '../../actions/auth';

import { css } from 'aphrodite/no-important';
import { styles } from './LogInFormStyles';

import { Link } from 'react-router-dom';

import LinkExternal from '../navigation/LinkExternal';
import Button from '../common/Button';
import InputField from '../forms/InputField';

const FIELDS = [
	{ name: 'email', label: 'E-mail', placeholder: 'seu.email@exemplo.com' },
	{ name: 'password', label: 'Senha', type: 'password' },
];

// LogInForm handles the form where the user enter the app
class LogInForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.renderAuthMsg = this.renderAuthMsg.bind(this);
		this.renderFields = this.renderFields.bind(this);
	}

	onSubmit({ email, password }) {
		const { history, logInUser } = this.props;
		logInUser({ email, password }, () => {
			history.push('/');
		});
	}

	renderAuthMsg() {
		const { auth } = this.props;

		if(auth.message === 'unauthorized') {
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
		if(auth.message === 'drop') {
			return (
				<div className={css(styles.msgAuth)}>
					<span className={css(styles.msgSpan)}>Você foi desconectado porque outro dispositivo acessou esse Usuário</span>
				</div>
			);
		}
	}

	renderFields() {
		// iterate through the FIELDS array and create a Field for each item
		return FIELDS.map(field => {
			return (
				<Field
					key={field.name}
					type={(field.type) ? field.type : 'text'}
					name={field.name}
					label={field.label}
					placeholder={(field.placeholder) ? field.placeholder : ''}
					component={InputField}
				/>
			);
		});
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}>
				{this.renderAuthMsg()}

				{this.renderFields()}

				<Link to="/rememberpass" className={css(styles.link)}>Esqueceu a senha?</Link>

				<Button
					text="Entrar"
					size="large"
					submit
					right
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

	if(!values.password) {
		errors.password = 'Digite sua senha';
	}

	return errors;
}

const logInForm = reduxForm({
	validate,
	form: 'logInForm'
})(LogInForm);

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps, { logInUser })(logInForm);
