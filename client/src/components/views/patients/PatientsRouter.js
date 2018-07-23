import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import { gridStyles } from '../DashboardStyles';

import ViewNavBar from '../../bars/ViewNavBar';
import PatientsTable from './PatientsTable';
import MenuActions from './MenuActions';
import AdvancedSearch from './AdvancedSearch';
import PatientProfileRouter from './PatientProfileRouter';
import Icon from '../../common/Icon';
import Modal from '../../modals/Modal';
import Button from '../../common/Button';
import WysiwygMention from '../../common/WysiwygMention';
import InputField from '../../forms/InputField';

import { styles } from '../../bars/ViewNavBarStyles';
// import Archived from './Archived';
// import Search from './Search';

import { headerListener } from '../../../actions/patientsSearch';
import { fetchModelByType } from '../../../actions/model';
import { sendEmail } from '../../../actions/email';
import { getMention } from '../../../actions/model';

// import $ from 'jquery';
// import jQuery from 'jquery';
// import FroalaEditor from 'react-froala-wysiwyg';
// import '../../common/WysiwygMention.css';

// window.$ = $;
// window.jQuery = jQuery;
// window.jquery = jQuery;
// require('froala-editor/js/froala_editor.pkgd.min.js');
// require('froala-editor/css/froala_editor.pkgd.min.css');
// require('font-awesome/css/font-awesome.css');

const LINKS = [
	{ text: 'Pacientes Ativos', path: '', exact: true },
	{ text: 'Pacientes Arquivados', path: '/archived' },
	{ text: 'Busca Avançada', path: '/search' },
];

class PatientsRouter extends React.Component {
	constructor(props) {
		super(props);
		
		this.refresh = this.refresh.bind(this);
		this.actionDone = this.actionDone.bind(this);
		this.recursiveGetProps = this.recursiveGetProps.bind(this);
		const {headerListener} = this.props;
		
		headerListener(this.actionDone);
		
		this.state = {
			selEmail: {name: '', html: '', title: ''},
			menu: [],
			emails: [],
			destinations: [],
			warningModal: false,
			emailModal: false,
			sendModal: false,
			currentSelect: [],
			actived: {
				select: { content: [], selected: [], unselected: [], out: [] },
				pagination: { page: 1, limit: 0 },
				orderTable: { column: 'name', order: true },
				content: { registry: '', name: '', email: '', telephones: '', cpf: '' },
				accumulate: [],
				update: true
			},
			archived: {
				select: { content: [], selected: [], unselected: [], out: [] },
				pagination: { page: 1, limit: 0 },
				orderTable: { column: 'name', order: true },
				content: { registry: '', name: '', email: '', telephones: '', cpf: '' },
				accumulate: [],
				update: true
			},
			advanced: {
				filters: { status: {}, save: {}, array: [] },
				select: { content: [], selected: [], unselected: [], out: [] },
				pagination: { page: 1, limit: 0 },
				orderTable: { column: 'name', order: true },
				content: { registry: '', name: '', email: '', telephones: '', cpf: '' },
				accumulate: [],
				update: false
			}
		}
	}

	componentWillMount () {
		const {getMention} = this.props;
		getMention((res) => this.setState({ menu: res.filter((item) => ['patient', 'receiver'].includes(item.url)) }));
	}

	componentWillUpdate(nextProps){
	}

	actionDone(status) {
		this.state.actived.update = true;
		this.state.archived.update = true;
		this.state.advanced.update = true;
		this.state[this.state.currentSelect.tab].select.content = [];
		this.state[this.state.currentSelect.tab].select.selected = [];
		this.state[this.state.currentSelect.tab].select.out = [];
		this.setState({});
	}

	refresh (res) {
		if (res === "undo" || typeof res === "object") {
			this.state.actived.update = true;
			this.state.archived.update = true;
			this.state.advanced.update = true;
			this.setState({});
		}
		else {
			var tabs = ['actived', 'archived', 'advanced'].filter((item) => item !== res);
			for (var i=0; i<tabs.length; i++)
				this.state[tabs[i]].update = true;
		}
	}

	sendEmail() {
		this.state.currentSelect
	}

	recursiveGetProps (node) {
    if (node.nodeName === "SPAN" && node.classList.value === "mention" && node.contentEditable === "false") {
      var text = node.textContent.split('.');
      if (text[0] !== '@Paciente' && text[0] !== '@Destinatário') {
				node.classList.value = "notAllowed";
      }
    }
    else
      for (var i=0; i<node.childNodes.length; i++)
        this.recursiveGetProps(node.childNodes[i]);
	}
	
	renderErrorMessage() {
		var filtered = this.state.destinations.filter((item) => !item.email);
		return (
			filtered.length>0 ? 
				<div className={css(styles.destinationEmailEmpty)}><b>{filtered.length} sem e-mail</b></div>
			:
				null
		)
	}

	render () {
		const { match, history, location, selectedPatient } = this.props;
		var isSearch = false;

		const LINKSPROFILE = [
			{ text: 'Resumo', path: '/profile' + (selectedPatient ? '/'+selectedPatient._id : '') + '/resume' },
			{ text: 'Informações do Paciente', path: '/profile' + (selectedPatient ? '/'+selectedPatient._id : '') + '/infos' },
			{ text: 'Documentos', path: '/profile' + (selectedPatient ? '/'+selectedPatient._id : '') + '/files' },
			{ text: 'Tratamentos', path: '/profile' + (selectedPatient ? '/'+selectedPatient._id : '') + '/treatment' },
			{ text: 'Financeiro', path: '/profile' + (selectedPatient ? '/'+selectedPatient._id : '') + '/financial' },
			{ text: 'Acompanhamento Clínico', path: '/profile' + (selectedPatient ? '/'+selectedPatient._id : '') + '/clinical_note' },
		];

		if (location.pathname==="/patients"){
			this.state.currentSelect = {content: this.state.actived.select.content, tab: 'actived'};
			isSearch = true;
		}else if (location.pathname==="/patients/archived"){
			this.state.currentSelect = {content: this.state.archived.select.content, tab: 'archived'};
			isSearch = true;
		}else if (location.pathname ==="/patients/search"){
			this.state.currentSelect = {content: this.state.advanced.select.content, tab: 'advanced'};
			isSearch = true;
		// }else if (location.pathname){
		// 	const links = location.pathname.slice(1).split('/').slice(1);
		// 	if(links[0] == 'treatment'){
		// 		LINKSPROFILE[3].path = '/treatment';
		// 	}
		}

		var cssSearch = isSearch ? gridStyles.content : gridStyles.flex;
		return (
			<div className={css(cssSearch)}>

				{isSearch ?	(
					<ViewNavBar history={history} match={match} links={LINKS}>
						<MenuActions
							done={this.actionDone}
							location={this.props.location.pathname}
							history={history} refresh={this.refresh}
							currentSelect={this.state.currentSelect}
							sendEmail={() => {
								const {fetchModelByType} = this.props;
								fetchModelByType("email", (emails) => this.setState({emails}));
								if (this.state.currentSelect.content.length>0)
									this.setState({emailModal: true, destinations: this.state.currentSelect.content})
								else
									this.setState({warningModal: true});
							}} />
					</ ViewNavBar>
				) : (
					<div>
						{ selectedPatient ? 
							<div>
								<div className={css(styles.patient)} >
									{selectedPatient.registry} | {selectedPatient.name}
								</div>
								<div className={css(styles.over_bar)} >
									<ViewNavBar history={history} match={match} links={LINKSPROFILE} />
								</div>
							</div>
						: '' }	
					</div>
				)}

				<Route exact path={`${match.url}`} component={(props) => <PatientsTable status={true}
					save={this.state.actived}
					refresh={this.refresh}
					action={this.state.archived.action}
					advanced={this.state.advanced.action}
					history={history} /> }
				/>

				{/* <Route path={`${match.url}/archived`} component={Archived} /> */}
				<Route path={`${match.url}/archived`} component={(props) => <PatientsTable status={false}
					save={this.state.archived}
					refresh={this.refresh}
					action={this.state.actived.action}
					advanced={this.state.advanced.action}
					history={history} />}
				/>

				{/* <Route path={`${match.url}/search`} component={Search} /> */}
				<Route path={`${match.url}/search`} component={(props) => <AdvancedSearch filters={this.state.advanced.filters}
					save={this.state.advanced}
					refresh={this.refresh}
					actived={this.state.actived.action}
					archived={this.state.archived.action}
					history={history} />}
				 />
				
				<Route path={`${match.url}/profile/:patientId`} component={PatientProfileRouter} />
				<Modal
					isOpen={this.state.emailModal}
					header={"Escolha o modelo de e-mail"}
					adjustStyle={styles.emailModal}
				>
					<div style={{padding: '1rem'}}>
            <div className={css(styles.listContainer)} style={{marginBottom: '1rem'}}>
              {this.state.emails.map((item, index) => (
								<div className={css(styles.line)} key={`model_${index}`}
									onClick={
										() => this.setState({emailModal: false, selEmail: {name: item.name, html: item.html, _id: item._id, title: ''}}, 
											() => this.setState({sendModal: true}, 
												() => {
													this.recursiveGetProps(document.getElementsByClassName('fr-element fr-view')[0])
													setTimeout(() => {
														this.state.selEmail.html = document.getElementsByClassName('fr-element fr-view')[0].innerHTML;
														this.setState({});
													}, 1000)
												}))}
								>
									<span>{item.name}</span>
								</div>
              ))}
            </div>
            <Button
              text={'Cancelar'}
              color="secondary"
              onClick={() => this.setState({emailModal: false})}
            />
          </div>
				</Modal>
				<Modal
					isOpen={this.state.sendModal}
					header={"Escolha o modelo de e-mail"}
					adjustStyle={styles.sendModal}
				>
					<div style={{padding: '1rem', height: 'calc(100% - 45px)'}}>
						<div className={css(styles.gridSendEmail)}>
							<div className={css(styles.gridDestinations)}>
								<div>
									<span style={{fontSize: '.75rem'}}><b>{this.state.destinations.length} pacientes selecionados</b></span>
									{this.renderErrorMessage()}
								</div>
								<div className={css(styles.listContainer, styles.overflowList)}>
									{this.state.destinations.map((item, index) => (
										<div className={css(styles.line)} key={`selPatient_${index}`} style={{cursor: 'auto'}}>
											<div className={css(styles.gridDestination)}>
												<div>
													<div className={css(styles.cutText)}>{item.name}</div>
													{item.email ?
														<div className={css(styles.cutText, styles.destinationEmail)}>{item.email}</div>
													:
														<div className={css(styles.cutText, styles.destinationEmailEmpty)}>sem endereço de e-mail</div>
													}
												</div>
												<div>
													<span onClick={() => { this.state.destinations.splice(index, 1); this.setState({}); }} style={{cursor: 'pointer'}}>
														<Icon icon={'x'} color={'grey'} size={'xsmall'} />
													</span>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
							<div>
								<span><b>Modelo: </b>{this.state.selEmail.name}</span>
								<div style={{marginBottom: '0rem', height: 'calc(100% - 19px)', padding: '1.5rem 0 1rem 0'}}>
									<InputField
										input={{
											name: 'title',
											onChange: (e) => this.state.selEmail.title = e.currentTarget.value,
										}}
										label={'Título'}
									/>
									<WysiwygMention
										height={'calc(100vh - 409px)'}
										type={"E-mail"}
										menu={this.state.menu}
										url={'/api/image/clinic'}
										model={this.state.selEmail.html}
										onModelChange={(model) => this.setState((prevState) => { return {selEmail: {...prevState.selEmail, html: model}} })}
									/>
								</div>
							</div>
						</div>
						<Button
							text={'Cancelar'}
							color="secondary"
							onClick={() => this.setState({sendModal: false})}
						/>
						<Button
							right
							text={'Enviar'}
							color="green"
							onClick={() => this.props.sendEmail(this.state.selEmail.title, this.state.selEmail.html, this.state.destinations, (res) => console.log(res))}
						/>
          </div>
				</Modal>
				<Modal
					isOpen={this.state.warningModal}
					header={"Aviso"}
					adjustStyle={styles.warningModal}
				>
					<div style={{padding: '1rem'}}>
						<div style={{marginBottom: '1rem'}}>Nenhum paciente selecionado</div>
						<Button
							text={'Fechar'}
							color="secondary"
							onClick={() => this.setState({warningModal: false})}
						/>
					</div>
				</Modal>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		selectedPatient: state.patientsCreation.selectedPatient,
	};
}
export default connect(mapStateToProps, { headerListener, fetchModelByType, sendEmail, getMention } )(PatientsRouter);