import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './ClinicalNoteFormStyles';
import moment from 'moment';
import 'moment/locale/pt-br';

import { fetchTreatments, updateTreatment } from '../../../actions/treatment';
import { getPatient } from '../../../actions/patientsCreation';

import { getDentalStatus } from '../../../actions/dentalStatus';
import { defaultOdontogram } from '../../../components/_constants/odontogram';

import Modal from '../../modals/Modal';
import Button from '../../common/Button';

import ModalDeleteOdontogram from './treatmentModals/ModalDeleteTreatment';
import ModalTreatmentCreateForm from './treatmentModals/ModalTreatmentCreateForm';

class TreatmentsForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.renderItems = this.renderItems.bind(this);
		this.renderForm = this.renderForm.bind(this);
		this.onSend = this.onSend.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.openModalCreate = this.openModalCreate.bind(this);
		this.closeModalCreate = this.closeModalCreate.bind(this);
		
		this.state = {
			id_treatment: null,
			modal: false,
			treatmentList: [],
			modalCreate: false,
		}
	}

	// componentWillMount() {
	// 	const { selectedPatient, location, getPatient } = this.props;

	// 	var links = location.pathname.slice(1).split('/').slice(1);

	// 	if(!selectedPatient){

	// 		if(links[links.length - 1] && links[links.length - 1] != 'treatments')
	// 		getPatient(links[links.length - 1], patient => {
	// 			this.componentDidMount(null);
	// 		});
	// 	}
	// }

	componentDidMount () {
		const { selectedPatient, fetchTreatments } = this.props;
		if (selectedPatient)
			fetchTreatments(selectedPatient._id, ret => {
				if(ret){
					this.setState({
						treatmentList: ret,
					});
				} 
			});
	}

	componentWillReceiveProps(nextProps){
		const { selectedPatient, fetchTreatments } = this.props;
		if(!selectedPatient && nextProps.selectedPatient._id){
			fetchTreatments(nextProps.selectedPatient._id, ret => {
				if(ret){
					this.setState({
						treatmentList: ret,
					});
				} 
			});
		}
	}

	onSubmit(values){
		const { defaultOdontogram, selectedPatient, getDentalStatus } = this.props;

		if(selectedPatient){
			var odontogram;
			odontogram = defaultOdontogram();
			odontogram = odontogram.odontogram;
			odontogram.name = values;
			
			getDentalStatus(selectedPatient._id, ret => {

				if(ret){
					for(var i=0; i <= 85; i++){
						if(ret['tooth_'+i] && odontogram['tooth_'+i]){
							
							odontogram['tooth_'+i].status = ret['tooth_'+i].status;
							
							if(odontogram['tooth_'+i].status == 'INCLUDED' || odontogram['tooth_'+i].status == 'AGENESIS' ||
								odontogram['tooth_'+i].status == 'EXODONTIA' || odontogram['tooth_'+i].status == 'LOST')
							{
								odontogram['tooth_'+i].status = 'MISSING';
							}
						}
					}
					this.onSend(odontogram);
				} else {
					this.onSend(odontogram);
				}
			});
		}
	}
	
	onSend(values) {
		const { updateTreatment, selectedPatient, history, match } = this.props;

		values.patient_id = selectedPatient._id;
		values.date = new Date();

		if(selectedPatient){
			updateTreatment(values, selectedPatient._id, ret => {

				if(ret){
					history.push(`${match.url.replace("treatments", "treatment")}/${ret._id}`);
				}
			});
		}
	}

	onDelete(values) {
		const { updateTreatment, selectedPatient } = this.props;

		updateTreatment({ _id:values, active: false}, selectedPatient._id, ret => {
			this.componentDidMount(null);
		});
	}

	openModal(values) {
		this.setState({
			id_treatment: values,
			modal: true,
		});
	}

	closeModal(values) {
		this.setState({
			modal: false,
		});
	}

	openModalCreate(values) {
		this.setState({
			modalCreate: true,
		});
	}

	closeModalCreate(values) {
		this.setState({
			modalCreate: false,
		});
	}

	renderItems(itens) {
		const { history, match } = this.props;
		
		if (itens.length > 0) {
			return itens.map( (item, idx) => {
				if(item.active){
					return (
						<li key={idx} className={css(styles.listItem)}>
							<span className={css(styles.date)}> { moment(item.date).format("D/MM/YYYY") } </span>
							<span className={css(styles.listText)}> { item.name } </span>
							<span className={css(styles.link2, styles.red)} onClick={() => {this.openModal(item._id);}}>Excluir</span>
							<span className={css(styles.link2)} onClick={() => { 
								history.push(`${match.url.replace("treatments", "treatment")}/${item._id}`);
							}}>Editar</span>
							<div>
								{item.note}
							</div>
						</li>
					);
				}
			});
		} else {
			return (
				<li className={css(styles.noItems)}>
					Nenhum Tratamento ;(
				</li>
			);
		}
	};

	renderForm() {
		const { handleSubmit } = this.props;

		return (
			<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}>
				{/* --- INFORMAÇÕES BáSICAS --- */}
				<h3 className={css(styles.sectionTitle)}>Tratamentos 				
					<Button
						text={'Criar Tratamento'}
						color="green"
						onClick={this.openModalCreate}
					/>
				</h3>
				<div className={css(styles.section)}>
					<ul className={css(styles.list)}>
						{ this.renderItems( this.state.treatmentList ) }
					</ul>
				</div>
			</form>
		);
	}

	render() {
		return (
			<div className={css(styles.flex)}>
				{this.renderForm()}

				<Modal
					isOpen={this.state.modal} 
					header={"Excluir Tratamento"} 
					adjustStyle={styles.modal} 
				>
					<ModalDeleteOdontogram
						idOdontogram={this.state.id_treatment}
						onCancel={ this.closeModal }
						onSubmit={ this.onDelete }
					/>
				</Modal>
				<Modal
					isOpen={this.state.modalCreate}
					header={"Criar Tratamento"}
					adjustStyle={styles.modal}
				>
					<ModalTreatmentCreateForm
						onCancel={ this.closeModalCreate }
						onSubmit={ this.onSubmit }
					/>
				</Modal>
			</div>
		);
	}
}

// Redux Form function to handle form validation
function validate(values) {
	const errors = {};

	return errors;
}

const treatmentsForm = reduxForm({
	validate,
	form: 'treatmentsForm'
})(TreatmentsForm);

function mapStateToProps({patientsCreation}) {
	return {
		selectedPatient: patientsCreation.selectedPatient,
	};
}

export default connect(mapStateToProps, { fetchTreatments, updateTreatment, getPatient, getDentalStatus, defaultOdontogram })(treatmentsForm);