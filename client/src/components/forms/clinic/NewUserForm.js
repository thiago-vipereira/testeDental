import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { reduxForm, Field } from 'redux-form'; 
 
import { css } from 'aphrodite/no-important'; 
import { styles } from './NewFormStyles';
 
import Button from '../../common/Button'; 
import InputField from '../../forms/InputField';
 
const FIELDS = [
	{ name: 'name', label: 'Nome', placeholder: 'Nome do novo usuário' },
	{ name: 'email', label: 'E-mail', placeholder: 'novo.usuário@email.com' }
];
 
// NewUserForm handles the form where the user enter the app 
class NewUserForm extends Component { 
	constructor(props) { 
		super(props); 

		this.onSubmit = this.onSubmit.bind(this);
		this.renderFields = this.renderFields.bind(this);
	} 
 
	onSubmit(values) {
		const { user } = this.props;

		values.updated_by = user._id; 
		console.log(values);
    } 
    
	renderFields(fields) { 
		// iterate through the FIELDS array and create a Field for each item 
		return fields.map(field => { 
			return ( 
				<Field 
					key={field.name} 
					type={(field.type) ? field.type : 'text'} 
					name={field.name} 
					label={field.label} 
					placeholder={(field.placeholder) ? field.placeholder : ''} 
					mask={(field.mask) ? field.mask : ''} 
					component={InputField} 
				/> 
			); 
		}); 
	}
 
	render() { 
		const { handleSubmit, onCancel } = this.props;

		return (
			<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}>
				{this.renderFields(FIELDS)}

				<Button
					text="Convidar"
					color="green"
					submit
				/>

				<Button
					text="Cancelar"
					color="secondary"
					onClick={onCancel}
					right
				/>   
			</form>
		); 
	} 
} 
 
// Redux Form function to handle form validation 
function validate(values) { 
	const errors = {};

	return errors; 
} 
 
const newUserForm = reduxForm({ 
	validate, 
	enableReinitialize: true, 
	form: 'newUserForm' 
})(NewUserForm); 
 
function mapStateToProps(state) { 
	return {
		user: state.auth.user,
		clinic: state.auth.clinic
	}; 
} 
 
export default connect(mapStateToProps)(newUserForm); 