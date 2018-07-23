import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { reduxForm } from 'redux-form';  
	
import { css } from 'aphrodite/no-important';  
import { styles } from './AuditFormStyles';

import AuditTable from './AuditTable';
import DateTimePicker from '../date/DateTimePicker';

import { fetchtAudit } from '../../../actions/audit'; 

import SearchByDateInterval from '../../common/SearchByDateInterval'
 	  
class AuditForm extends Component {  
	constructor(props) {  
		super(props);  
 
		this.onSubmit = this.onSubmit.bind(this); 
		this.renderForm = this.renderForm.bind(this);
		this.onInitChange = this.onInitChange.bind(this);
		this.onEndChange = this.onEndChange.bind(this);

		this.state = {  
			initDate: null,
			endDate:null
		}  
 
	}
	

	componentWillMount(){;
		//criar data com newDate() inicial e final + codigo da clinica
		var today = new Date();
		this.setState({initDate : today, endDate: today});
	}
	
	componentDidMount() {
		this.setState({ loading: false });
	}

	onInitChange(init) {
		this.setState({
			initDate: init
		});
	}

	onEndChange(end) {
		this.setState({
			endDate: end
		});
	}
	
	onSubmit(values) {
	} 
	 
	renderForm() {
		const { loading } = this.state; 
 
		if (!loading) { 
			return ( 
				<div>

				</div>
			); 
		} else { 
			return <div className={css(styles.loading)}>Carregando...</div>; 
		} 
	} 
	
	render() {
		const { handleSubmit, audit } = this.props; 
 
		return (
			<div>
				<SearchByDateInterval searchByDate="true" callbackEnd={this.onEndChange} callbackInit={this.onInitChange} />


				<div className={css(styles.grid)}>
					<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}>
						{/*this.renderForm()*/}
						
						<AuditTable initDate={this.state.initDate} endDate={this.state.endDate} />
					</form> 
				</div>
			</div>
		);  
	}  
}  
	
// Redux Form function to handle form validation  
function validate(values) {  
	const errors = {}; 
 
	return errors;  
}  
	
const auditForm = reduxForm({  
	validate,  
	enableReinitialize: true,  
	form: 'auditForm'  
})(AuditForm);  
	
function mapStateToProps(state) {
	return { 
		audit: state.audit.audit,
	};  
}  
	
export default connect(mapStateToProps, { fetchtAudit })(auditForm);