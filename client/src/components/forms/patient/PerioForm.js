import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './PerioFormStyles';
import moment from 'moment';
import 'moment/locale/pt-br';

import { getPatient, updatePatient } from '../../../actions/patientsCreation';

import { updatePeriogram, getPeriogram } from '../../../actions/periogram';

import Modal from '../../modals/Modal';
import Button from '../../common/Button';
import InputField from '../../forms/InputField';
import PerioComponent from './PerioComponent';


class PerioForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			modal: false,
		}
	}

	componentWillMount() {
		const { selectedPatient, getPeriogram, match, history } = this.props;
		console.log(match.params.periogramId);
		if(selectedPatient){
		
			getPeriogram(match.params.periogramId, ret => {
				
				if(ret){
					
					this.setState({
						active: ret.active,
						date: ret.date,
						dentes: ret.dentes,
						patient_id: ret.patient_id,
						_id: ret._id
					});
					
					//history.push(`${match.url}/periogram/${ret._id}`);
				}

			});
		}
	}

	componentWillUpdate(){
	}
	
	componentDidMount(){
		const { selectedPatient, getPeriogram, match, history } = this.props;
		
		if(selectedPatient){
		
			getPeriogram(match.params.periogramId, ret => {
				
				if(ret){
				
					this.setState({
						active: ret.active,
						date: ret.date,
						dentes: ret.dentes,
						patient_id: ret.patient_id,
						_id: ret._id
					});
					
					//history.push(`${match.url}/periogram/${ret._id}`);
				}

			});
		}
	}

	onSubmit(values) {
	}

	render() {
		const { handleSubmit, history, match } = this.props;
		// let str = history.location.pathname.split('/')
		return (
			<div className={css(styles.flex)}>
				<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}>

					<h3 className={css(styles.sectionTitle)}>Registro feito Dia { moment(this.state.date).format("D/MM/YYYY") } </h3>
					{/* --- INFORMAÇÕES BáSICAS --- */}
					<Button
					style={{float:'right', marginTop: '-60px', marginRight: '-1px'}}
					text="Salvar Periograma"
					color="green"
					onClick={() => this.clickChild()}
					/>
					<div className={css(styles.section)} style={{width: '900px', paddingLeft: '7px'}}>

						<PerioComponent perioId={match.params.periogramId} onSubmit={this.onSubmit} setClick={click => this.clickChild = click} />
					</div>
					
					<Button
					style={{float:'right', marginRight: '-1px'}}
					text="Salvar Periograma"
					color="green"
					onClick={() => this.clickChild()}
					/>
				</form>
			</div>
		);
	}
}

// Redux Form function to handle form validation
function validate(values) {
	const errors = {};

	return errors;
}

const perioForm = reduxForm({
	validate,
	form: 'perioForm'
})(PerioForm);

function mapStateToProps(state) {
    const selectedPatient = state.patientsCreation.selectedPatient;
    let initialValues = {};

	if (selectedPatient) {
        initialValues = selectedPatient;
	}

	return {
		selectedPatient: state.patientsCreation.selectedPatient,
		initialValues
	};
}

export default connect(mapStateToProps, { getPatient, updatePatient, getPeriogram, updatePeriogram })(perioForm);


