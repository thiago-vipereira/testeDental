import React, { Component } from 'react';
import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import { styles } from './MenuActionsStyles';

import ActionButton from '../../common/ActionButton';

import ReactTooltip from 'react-tooltip';

import Icon from '../../common/Icon';
import { editPatients } from '../../../actions/patientsSearch';
import { clearPatient } from '../../../actions/patientsCreation';

class MenuActions extends React.Component {
	constructor(props) {
		super(props);
		this.editPatients = this.editPatients.bind(this);
		this.handleOutsideClick = this.handleOutsideClick.bind(this);
		this.state = {
			dropOpen: false
		}
	}
	handleOutsideClick(e) {
		if (this.node === null || this.node.contains(e.target.parentNode))
				return;
		if (this.state.dropOpen !== false)
				this.setState({dropOpen: false});
		document.removeEventListener('click', this.handleOutsideClick, false);
	}
	editPatients (status) {
		const { editPatients } = this.props;
		var message = this.props.currentSelect.content.length + ' paciente' + (this.props.currentSelect.content.length>1?'s':'') + ' ' + (status ? 'arquivado' : 'ativado') + (this.props.currentSelect.content.length>1?'s':'') +' com sucesso';
		var send = this.props.currentSelect.content.map((id) => { return { find: {'_id': id}, set: {active: status} } });
		editPatients({ props: {active: !status}, array: this.props.currentSelect.content, message: message, update: {response: this.props.refresh, send: send} }, () => {
				this.setState({ dropOpen: false });
				this.props.done(status);
		});
	}
	render() {
		const { history, match, clearPatient } = this.props;
		return (
			<div className={css(styles.actions)}>
				<div className={css(styles.action, styles.newUser)} onClick={() => {clearPatient(); history.push(`/patients/profile/registration`)} }>Novo Paciente</div>
				<div ref={node => { this.node = node; }} className={css(styles.dropdown)}>
					<div className={css(styles.action, styles.content)}
							 onClick={() => {
								 if (!this.state.dropOpen)
								 	document.addEventListener('click', this.handleOutsideClick, false);
								 this.setState((prevState) => { return {dropOpen: !prevState.dropOpen}; })
							 }}
					>
						<div style={{marginRight: '0.3rem'}}>Ações</div>
						{this.state.dropOpen ? <Icon icon="upArrow" color="grey" size="small" /> : <Icon icon="downArrow" size="small" color="grey" />}
					</div>
					{this.state.dropOpen ?
						<div className={css(styles.contentDrop)}>
							{this.props.location!=="/patients" ?
								<div className={css(styles.itemDrop)} onClick={() => this.editPatients(false)}>Ativar Todos</div>
							:null}
							{this.props.location!=="/patients/archived" ?
								<div className={css(styles.itemDrop)} onClick={() => this.editPatients(true)}>Arquivar Todos</div>
							:null}
							<div className={css(styles.itemDrop)} onClick={() => {this.setState({dropOpen: false}); this.props.sendEmail();}}>Enviar E-mail para todos</div>
							<div className={css(styles.itemDrop)}>Enviar sms para todos</div>
						</div>
					:null}
				</div>
				<div className={css(styles.action)}>Importar</div>
				<div className={css(styles.action)}>Exportar</div>
				<div className={css(styles.printer)}>
					<div className={css(styles.printerIcon)}>
						<ActionButton onClick={() => {}} icon="printer" tip="Imprimir" color="grey" tipid="printertip" />
						<ReactTooltip place="bottom" effect="solid" id="printertip" />
					</div>
				</div>
				
			</div>
			
		);
	}
}

export default connect(() => { return {} }, {  editPatients, clearPatient })(MenuActions);