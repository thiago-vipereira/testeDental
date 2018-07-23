import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logOutUser, getClinic } from '../../actions/auth';

import { css } from 'aphrodite/no-important';
import { styles } from './UserOptionsStyles';

import { Link } from 'react-router-dom';
import Icon from '../common/Icon';

class UserOptions extends Component {
	constructor(props) {
		super(props);

		this.onToggle = this.onToggle.bind(this);
		this.onLogOut = this.onLogOut.bind(this);
		this.onOptionClick = this.onOptionClick.bind(this);
		this.renderDropdown = this.renderDropdown.bind(this);

		this.state= {
			open: false
		};
	}

	onToggle() {
		const { open } = this.state;

		if (open) {
			this.setState({ open: false });
		} else {
			this.setState({ open: true });
		}
	}

	onLogOut() {
		const { history, logOutUser } = this.props;
		
		logOutUser(() => {
			history.push('/login');
		});
	}

	onOptionClick() {
		this.setState({ open: false });
	}

	componentDidMount(){
		const { getClinic, clinic } = this.props; 
		if (clinic) {  
			const clinicId = clinic._id; 
			const clinicDb = clinic.clinic_data; 
			 
			getClinic({ clinicId, clinicDb }, () => {
				const { clinic } = this.props;
				this.setState({ loading: false, logo: {src: clinic.logo_clinic, file: ''}});
			});  
		} 
	}

	renderDropdown() {
		const { open } = this.state;
		const { user, clinic } = this.props;

		if (open) {
			return (
				<div className={css(styles.dropDown)}>
					<ul className={css(styles.list, styles.accountOptions)}>					
						<Link to="/configuration" className={css(styles.reactlink)}>
							<li className={css(styles.link)} onClick={this.onOptionClick}>Perfil e conta</li>
						</Link>
						
						<li className={css(styles.link)} onClick={this.onLogOut}>Trocar de usuário</li>
					</ul>

					<ul className={css(styles.list)}>
						{user.clinics.map(item => {
							const active = item.clinic_id === clinic._id;

							return <li key={item._id} className={css(styles.link, active && styles.active)}>{item.name}</li>;
						})}
					</ul>
				</div>
			);
		}

		return ''
	}

	render() {
		const { user, clinic } = this.props;
		const { open } = this.state;
		return (
			<div className={css(styles.container)}>
				<div className={clinic && clinic.logo_clinic ? css(styles.loginInfoLogo) : css(styles.loginInfo)} onClick={this.onToggle}>
					<div className={clinic && clinic.logo_clinic ? css(styles.logo) : css(styles.noLogo) }>
						<img className={css(styles.pictureImg)} src={clinic ? clinic.logo_clinic : ""} />
					</div>
					<div className={css(styles.txt)}>
						<div className={css(styles.mainInfo)}>{clinic && clinic.name}</div>
						<div className={clinic && clinic.logo_clinic ? css(styles.secondaryInfo) : css(styles.secondaryInfoLeft)}>{user && user.name}</div>
					</div>

					<div className={css(styles.icon)}>
						<Icon icon={open ? 'upArrow' : 'downArrow'} size="small" color="white" />
					</div>
				</div>

				{this.renderDropdown()}
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return {
		clinic: auth.clinic,
		user: auth.user
	}
}

export default connect(mapStateToProps, { logOutUser, getClinic })(UserOptions);
