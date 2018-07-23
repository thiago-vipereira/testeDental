import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { reduxForm, Field } from 'redux-form';
import axios from 'axios';  
	
import { css } from 'aphrodite/no-important';  
import { styles } from './ClinicFormStyles';  
 
import { updateClinic, getClinic } from '../../../actions/auth'; 
	
import Button from '../../common/Button';  
import InputField from '../../forms/InputField'; 

import Icon from '../../common/Icon';
	
const CLINIC_INFO = { 
	name: { name: 'name', label: 'Nome', placeholder: 'Nome da clínica' }, 
	address: { name: 'address', label: 'Endereço', placeholder: 'Endereço da clínica' }, 
	city: { name: 'city', label: 'Cidade', placeholder: 'Ex.: Curitiba, São Paulo...' }, 
	state: { name: 'state', label: 'Estado', placeholder: 'Ex.: Paraná, São Paulo...' }, 
	zip: { name: 'zip', label: 'CEP', placeholder: 'XXXXX-XXX', mask: '99999-999' } 
}; 
	
// ClinicForm handles the form where the user enter the app  
class ClinicForm extends Component {  
	constructor(props) {  
		super(props);  
		this.newList = this.newList.bind(this);
		this.onSubmit = this.onSubmit.bind(this); 
		this.renderFields = this.renderFields.bind(this); 
		this.renderForm = this.renderForm.bind(this); 
 
		this.state = {  
			loading: true,  
			showModal: false,
			logo: {src: '', file: ''} 
		}  
	}
	
	newList() {
		const { updateClinic, showMessage, clinic } = this.props;
		var formData = new FormData();
		if (this.state.logo.file) {
		  formData.append("file", this.state.logo.file);
		  axios.post('/api/image/clinic', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
			.then((response) => updateClinic({ logo_clinic: response.data.link }, clinic._id, clinic.clinic_data, () => {}))
			.catch(error => showMessage({message: "Erro no upload da imagem", type: 'danger'}));
		}
		else
		  updateClinic({ logo_clinic: this.state.logo.src }, clinic._id, clinic.clinic_data, () => {});
	}
	componentDidMount() {  
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
	
	onSubmit(values) { 
		const { user, clinic, updateClinic, getClinic } = this.props; 
 
		values.updated_by = user._id;  
		updateClinic(values, clinic._id, clinic.clinic_data, clinic => { 
		}); 
 
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
	 
	renderForm() { 
		const { loading } = this.state; 
 
		if (!loading) { 
			return ( 
				<div className={css(styles.section, styles.infoRow)}> 
					<div style={{overflow: 'hidden'}}>
						<div className={css(styles.picture)}>
							<div className={css(styles.pictureInside)}>
							{this.state.logo.src?
								<div className={css(styles.closePosition)}>
								<div className={css(styles.close)} onClick={(e) => this.setState({logo: { src: '', file: '' }})}>
									<Icon icon="x" size="extra-small" color="white" />
								</div>
								</div>
							:null}
							{this.state.logo.src?
								<img className={css(styles.pictureImg)} src={this.state.logo.src} />
							:
								<div>
								<input id="file-upload" type="file" accept="image/*" style={{display: 'none'}} 
									onChange={(e)=> {
									let imagefile = e.target.files || e.dataTransfer.files;
									var reader = new FileReader();
									reader.onload = (e) => this.setState({ logo:{ src: e.target.result, file: imagefile[0] } });
									reader.readAsDataURL(imagefile[0]);
									}}
								/>
								<label htmlFor="file-upload" className={css(styles.plus)}>
									<Icon icon="plus" size="small" color="grey" />
								</label>
								<label style={{cursor: 'pointer'}} htmlFor="file-upload">Adicionar Imagem</label>
								</div>
							}
							</div>
						</div>
					</div>
					<div> 
						<div>  
							{this.renderFields([CLINIC_INFO.name])} 
						</div> 
						<div>  
							{this.renderFields([CLINIC_INFO.address])} 
						</div> 
						<div className={css(styles.row_2)}>  
							{this.renderFields([CLINIC_INFO.city, CLINIC_INFO.state])} 
						</div> 
						<div className={css(styles.row_2)}>  
							{this.renderFields([CLINIC_INFO.zip])} 
						</div> 
 
						<Button  
							text="Atualizar Informações"  
							color="green"  
							submit
							onClick={this.newList}  
						/>  
					</div> 
				</div> 
			); 
		} else { 
			return <div className={css(styles.loading)}>Carregando...</div>; 
		} 
	} 
	
	render() {  
		const { handleSubmit } = this.props; 
 
		return (  
			<div className={css(styles.grid)}> 
				<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}>  
					{/* --- INFORMAÇÕES DA CLÍNICA --- */}  
					<h3 className={css(styles.sectionTitle)}>Informações da clínica</h3>   
					{this.renderForm()} 
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
	
const clinicForm = reduxForm({  
	validate,  
	enableReinitialize: true,  
	form: 'clinicForm'  
})(ClinicForm);  
	
function mapStateToProps(state) {
		const selectedClinic = state.auth.clinic; 
		let initialValues = {};  
	
	if (selectedClinic) { 
		initialValues = {  
			name: selectedClinic.name, 
			address: selectedClinic.address, 
			city: selectedClinic.city, 
			state: selectedClinic.state, 
			zip: selectedClinic.zip 
		};  
	} 
	
	return { 
		//clinicConfig: state.clinicConfig, 
		user: state.auth.user,
		clinic: state.auth.clinic, 
		initialValues  
	};  
}  
	
export default connect(mapStateToProps, { getClinic, updateClinic })(clinicForm);