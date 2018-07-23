import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logInClinic, logOutUser } from '../../actions/auth';

import { css } from 'aphrodite/no-important';
import { styles } from './ClinicsListStyles';

//import LinkExternal from '../navigation/LinkExternal';
import ClinicListItem from './ClinicListItem';

// 'ClinicsList' will manage the main navigationof the app
class ClinicsList extends Component {
	constructor(props) {
		super(props);

		this.onClinicChoice = this.onClinicChoice.bind(this);
		this.onLogOut = this.onLogOut.bind(this);
		this.renderList = this.renderList.bind(this);
	}

	onClinicChoice(clinicId, clinicDb) {
		const { history, logInClinic, auth: { user } } = this.props;

		logInClinic({ user, clinicId, clinicDb }, () => {
			history.push('/');
		});
	}

	onLogOut() {
		const { history, logOutUser } = this.props;
		
		logOutUser(() => {
			history.push('/login');
		});
	}

	renderList() {
		const { auth: { user } } = this.props;

		return user.clinics.map(clinic => {
			return (
				<ClinicListItem
					key={clinic.clinic_id}
					name={clinic.name}
					clinicId={clinic.clinic_id}
					clinicDb={clinic.clinic_data}
					callback={this.onClinicChoice}
				/>
			);
		});
	}

	render() {
		const { auth: { user } } = this.props;

		return (
			<div className={css(styles.listContainer)}>
				<h3>Olá {user.name}!</h3>
				<div className={css(styles.msg)}>Selecione a clínica na qual você deseja trabalhar:</div>
				<ul className={css(styles.list)}>
					{this.renderList()}
				</ul>
				<span className={css(styles.link)} onClick={this.onLogOut}>Entrar com outro usuário</span>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps, { logInClinic, logOutUser })(ClinicsList);
