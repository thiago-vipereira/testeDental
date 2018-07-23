import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { reduxForm, Field } from 'redux-form'; 

import { getUser, updateUser } from '../../../../actions/users';

import { css } from 'aphrodite/no-important'; 
import { styles } from './PermissionsModalStyles';

import Icon from '../../../common/Icon';
import Button from '../../../common/Button'; 
import CheckBox from '../../../common/CheckBox';
 
// PermissionsModal handles the form where the user enter the app 
class PermissionsModal extends Component { 
	constructor(props) { 
		super(props); 

		this.onToggle = this.onToggle.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		
		this.state = {
			permitError: null,
			openPatient: false,
			openAgenda: false,
			openFinances: false,
			openStorage: false,
			openCommunication: false,
			openBI: false,
			checkBox: false,
			permissions:   [
				{
					label: 'Pacientes',
					open: false,
					options:[
						{
							label: 'Informações do Paciente',
							view: false,
							edit: false,
							delete: false,
						},
						{
							label: 'Documentos',
							view: false,
							edit: false,
							delete: false,
						},
						{
							label: 'Periograma',
							view: false,
							edit: false,
							delete: false,
						},
						{
							label: 'Tratamentos',
							view: false,
							edit: false,
							delete: false,
						},
						{
							label: 'Financeiro',
							view: false,
							edit: false,
							delete: false,
						},
						{
							label: 'Acompanhamento Clínico',
							view: false,
							edit: false,
							delete: false,
						}
					],
				},
				{
					label: 'Agenda',
					open: false,
					options:[
						{
							label: 'Teste Agenda',
							view: false,
							edit: false,
							delete: false,
						},
						{
							label: 'Teste Agenda 2',
							view: false,
							edit: false,
							delete: false,
						},
					],
				},
				{
					label: 'Finanças',
					open: false,
					options:[
						{
							label: 'Teste Finanças',
							view: false,
							edit: false,
							delete: false,
						},
						{
							label: 'Teste Finanças 2',
							view: false,
							edit: false,
							delete: false,
						},
					],
				},
				{

					label: 'Estoque',
					open: false,
					options:[
						{
							label: 'Teste Estoque',
							view: false,
							edit: false,
							delete: false,
						},
						{
							label: 'Teste Estoque 2',
							view: false,
							edit: false,
							delete: false,
						},
					],
				},
				{
					label: 'Comunicação',
					open: false,
					options:[
						{
							label: 'Teste Comunicação',
							view: false,
							edit: false,
							delete: false,
						},
						{
							label: 'Teste Comunicação 2',
							view: false,
							edit: false,
							delete: false,
						},
					],
				},
				{
					label: 'Inteligência Empresarial',
					open: false,
					options:[
						{
							label: 'Teste Inteligência Empresarial',
							view: false,
							edit: false,
							delete: false,
						},
						{
							label: 'Teste Inteligência Empresarial 2',
							view: false,
							edit: false,
							delete: false,
						},
					],
				},
				{
					label: 'Configurações',
					open: false,
					options:[
						{
							label: 'Teste Configurações',
							view: false,
							edit: false,
							delete: false,
						},
						{
							label: 'Teste Configurações 2',
							view: false,
							edit: false,
							delete: false,
						},
					],
				},
			]
		} 
	}
	
	getPermitError(permitError) {
		this.state.permitError = permitError;
	}

	onToggle(str) {
		const { openPatient, openAgenda, openFinances, openStorage, openCommunication, openBI } = this.state;
		if (str == "patient") {
			if(openPatient){
				this.setState({ openPatient: false });
			} else {
				this.setState({ openPatient: true });
				
			}
		} else if (str == "agenda") {
			if(openAgenda){
				this.setState({ openAgenda: false });
			} else {
				this.setState({ openAgenda: true });
			}
		} else if (str == "finances") {
			if(openFinances){
				this.setState({ openFinances: false });
			} else {
				this.setState({ openFinances: true });
			}
		} else if (str == "storage") {
			if(openStorage) {
				this.setState({ openStorage: false });
			} else {
				this.setState({ openStorage: true });
			}
		} else if (str == "communication") {
			if(openCommunication) {
				this.setState({ openCommunication: false });
			} else {
				this.setState({ openCommunication: true });
			}
		} else if (str == "bi") {
			if(openBI) {
				this.setState({ openBI: false });
			} else {
				this.setState({ openBI: true });
			}
		}
	}


    onSubmit(values) {
		const { selectedUser, updateUser, user, onCancel } = this.props;

		values.permissions = this.state.permissions.filter(permit =>{
			if(permit.value != ''){
				return true;
			}
		});
		onCancel();
    } 

	openHeader() {
		return(
			<div className={css(styles.headerContainer)}>
				<span className={css(styles.header)}>Visualizar</span>
				<span className={css(styles.header)}>Editar</span>
				<span className={css(styles.header)}>Excluir</span>
			</div>
		);
	}


	render() { 
		const { handleSubmit, onCancel } = this.props;
		const { openPatient, openAgenda, openFinances, openStorage, openCommunication, openBI } = this.state;

		

		return (
			<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}>
                <div className={css(styles.container)}>
					<ul className={css(styles.list)}>
						{this.state.permissions.map((item, index) => (
							<li className={css(styles.moduleLI)}>
								<div onClick={() => { this.state.permissions[index].open = !item.open; this.setState({}); }} className={item.open ? css(styles.openModules) : css(styles.modules)}><Icon icon={item.open ? "upArrow" : "downArrow"} size="small" color="grey"/>{item.open ? <span className={css(styles.openModHeader)}>{item.label}{this.openHeader()}</span> : <span className={css(styles.name)}>{item.label}</span>}</div>
								{item.open && 
									item.options.map((itm, ndx) => (
										<div className={css(styles.dropDown)}>
											<ul className={css(styles.list)}>					
												<li className={css(styles.subModules)} >
													<div className={css(styles.subText)}>{itm.label}</div>
													<div className={css(styles.checksContainer)}>
														<CheckBox checked={itm.view?'check':'none'} onChange={(old, newState) => {this.state.permissions[index].options[ndx].view = newState === 'check'}} />
														<CheckBox checked={itm.edit?'check':'none'} onChange={(old, newState) => {this.state.permissions[index].options[ndx].edit = newState === 'check'}} />
														<CheckBox checked={itm.delete?'check':'none'} onChange={(old, newState) => {this.state.permissions[index].options[ndx].delete = newState === 'check'}} />
													</div>
												</li>
											</ul>
										</div>
									))
								}
							</li>
						))}		
					</ul>
                </div>
				<Button
					text="Salvar"
					color="green"
					submit
				/>

				<Button
					text="Fechar"
					color="secondary"
					onClick={onCancel}
					right
				/>   
			</form>
		);
	} 
} 

const permissionsModal = reduxForm({ 
	form: 'permissionsModal' 
})(PermissionsModal); 
 
function mapStateToProps(state) { 
    const selectedUser = state.clinicConfig.selectedUser;
    let initialValues = {}; 
 
	if (selectedUser) {
        initialValues = selectedUser;
	}
 
	return {
        selectedUser: state.clinicConfig.selectedUser,
		initialValues 
	}; 
} 
 
export default connect(mapStateToProps, { getUser, updateUser })(permissionsModal); 