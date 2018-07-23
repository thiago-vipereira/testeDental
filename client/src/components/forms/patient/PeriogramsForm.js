import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './ClinicalNoteFormStyles';
import moment from 'moment';
import 'moment/locale/pt-br';


import { fetchPeriograms, updatePeriogram } from '../../../actions/periogram';

import { getPatient } from '../../../actions/patientsCreation';

import { getDentalStatus } from '../../../actions/dentalStatus';
import { defaultPeriogram } from '../../../components/_constants/periogram';

import Modal from '../../modals/Modal';
import Button from '../../common/Button';

import ModalDeleteOdontogram from './treatmentModals/ModalDeleteTreatment';

class PeriogramsForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.renderItems = this.renderItems.bind(this);
		this.renderForm = this.renderForm.bind(this);
		this.onSend = this.onSend.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		
		
		
		this.state = {
			id_periogram: null,
			modal: false,
            periogramsList: [],
            dentes: null,
            dentalStatus: null
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
		const { selectedPatient, fetchPeriograms } = this.props;
		if (selectedPatient)
			fetchPeriograms(selectedPatient._id, ret => {
				if(ret){
					this.setState({
						periogramsList: ret,
					});
				} 
			});
	}

	componentWillReceiveProps(nextProps){
		const { selectedPatient, fetchPeriograms } = this.props;
		if(!selectedPatient && nextProps.selectedPatient._id){
			fetchPeriograms(nextProps.selectedPatient._id, ret => {
				if(ret){
					this.setState({
						periogramsList: ret,
					});
				} 
			});
		}
	}

	onSubmit(values){
		const { defaultPeriogram, selectedPatient, getDentalStatus } = this.props;

		if(selectedPatient){
			var periogram;
			periogram = defaultPeriogram();
            periogram = periogram.periogram;
           
            this.setState({
                dentes : periogram.dentes
            })
			
			getDentalStatus(selectedPatient._id, ret => {

				// if(ret){
				// 	for(var i=0; i <= 85; i++){
				// 		if(ret['tooth_'+i] && odontogram['tooth_'+i]){
				// 			odontogram['tooth_'+i].status = ret['tooth_'+i].status;
				// 		}
				// 	}
				// 	this.onSend(periogram);
				// } else {
				// 	this.onSend(periogram);
                // }

                if(ret){
                  
					this.setState({
						dentalStatus: ret,
                    });
                //console.log(this.state);
                    if(this.state.dentes){
                       
                        var i;
                        var n = 0;
                        var teeth_inferior = this.state.dentes.inferior;
                        var teeth_superior = this.state.dentes.superior;
                
                        for(i in teeth_superior){
                            var porra = Object.keys(teeth_superior)[n];
       
                            this.setState(
                                {
                                dentes: { ...this.state.dentes, 
                                superior: { ...this.state.dentes.superior,
                                [porra]: { ...this.state.dentes.superior[porra],
                                status: this.state.dentalStatus[porra].status
                                }
                            }
                        }
                    } 
                ); 
                    
                            n++;
                        }
                        n = 0;
                        for(i in teeth_inferior){
                            var porra = Object.keys(teeth_inferior)[n];
       
                            this.setState(
                                {
                                dentes: { ...this.state.dentes, 
                                inferior: { ...this.state.dentes.inferior,
                                [porra]: { ...this.state.dentes.inferior[porra],
                                status: this.state.dentalStatus[porra].status
                                }
                            }
                        }
                    } 
                ); 
                    
                            n++;
                        }

                    }
                    //console.log(this.state);
                    this.onSend(this.state);
                } 
                


			});
		}
	}
	
	onSend(values) {
		const { updatePeriogram, selectedPatient, history, match } = this.props;

		values.patient_id = selectedPatient._id;
        values.date = new Date();
        values.active = 'true';
       console.log(values);
		if(selectedPatient){
			updatePeriogram(values, selectedPatient._id, ret => {

				if(ret){
					history.push(`${match.url}/periogram/${ret._id}`);
				}
			});
		}
	}

	onDelete(values) {
		const { updatePeriogram, selectedPatient } = this.props;
        console.log(values);
		updatePeriogram({ _id:values, active: false}, selectedPatient._id, ret => {
			this.componentDidMount(null);
		});
	}

	openModal(values) {
		this.setState({
			id_periogram: values,
			modal: true,
		});
	}

	closeModal(values) {
		this.setState({
			modal: false,
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
							<span className={css(styles.link2, styles.red)} onClick={() => {this.openModal(item._id);}}>Excluir</span>
							<span className={css(styles.link2)} onClick={() => { 
								history.push(`${match.url}/${item._id}`);
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
					Nenhum Periograma ainda ;(
				</li>
			);
		}
	};

	renderForm() {
		const { handleSubmit } = this.props;

		return (
			<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}>
				{/* --- INFORMAÇÕES BáSICAS --- */}
				<h3 className={css(styles.sectionTitle)}>Periogramas 				
					<Button
						text={'Novo Periograma'}
						color="green"
						submit
					/>
				</h3>
				<div className={css(styles.section)}>
					<ul className={css(styles.list)}>
						{ this.renderItems( this.state.periogramsList ) }
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
					header={"Excluir Periograma"} 
					adjustStyle={styles.modal} 
				>
					<ModalDeleteOdontogram
						idOdontogram={this.state.id_periogram}
						onCancel={ this.closeModal }
						onSubmit={ this.onDelete }
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

const periogramsForm = reduxForm({
	validate,
	form: 'periogramsForm'
})(PeriogramsForm);

function mapStateToProps({patientsCreation}) {
	return {
		selectedPatient: patientsCreation.selectedPatient,
	};
}

export default connect(mapStateToProps, { getPatient, getDentalStatus, defaultPeriogram, fetchPeriograms, updatePeriogram })(periogramsForm);