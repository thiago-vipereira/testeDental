import React, { Component } from 'react';
import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import { styles } from './RememberPassStyles';

import RememberPassForm from '../forms/RememberPassForm';

// 'RememberPass' will manage fogrt password form
class RememberPass extends Component {
	constructor(props) {
		super(props);

		this.renderView = this.renderView.bind(this);
	}

	renderView() {
		const { auth } = this.props;

		if(auth.authenticated === 'changing pass') {
			return (
				<div className={css(styles.formContainer)}>
					<h3>E-mail enviado!</h3>
					<p className={css(styles.msg)}>Um link foi enviado para seu e-mail com os próximos passos para recuperar sua senha. 
					Caso nenhum tenha chedo na sua caixa de entrada, verifique a caixa de Spam</p>
				</div>
			);
		} else {
			return (
				<div className={css(styles.formContainer)}>
					<h3>Recuperação de Senha</h3>
					<p className={css(styles.msg)}>Escreve o endereço de e-mail que você utilizou em seu cadastro. 
					Iremos enviar um link com os próximos passos para recuperar sua senha.</p>

					<RememberPassForm />
				</div>
			);
		}
	}

	render() {
		return (
			<div className={css(styles.grid)}>
				{this.renderView()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps)(RememberPass);