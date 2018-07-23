import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { reduxForm, Field } from 'redux-form'; 
 
import { css } from 'aphrodite/no-important'; 
import { styles } from './ProfileFormStyles'; 
 
import { getFullUser } from '../../../actions/auth'; 
import { updateProfile } from '../../../actions/configurations'; 
 
import Button from '../../common/Button'; 
import InputField from '../../forms/InputField'; 
import RadioInputSet from '../../forms/RadioInputSet'; 
import Modal from '../../modals/Modal'; 
import ChangePassForm from './ChangePassForm';
import TelephoneList from '../../lists/TelephoneList';
import DateTimePicker from '../date/DateTimePicker';
 
const ACCOUNT = [ 
	{ name: 'name', label: 'Nome', placeholder: 'Seu nome completo' }, 
	{ name: 'email', label: 'E-mail', placeholder: 'seu@email.com' } 
]; 
 
const CONTACT = {
	address: { name: 'address', label: 'Endereço', placeholder: 'Preencha seu endereço' }, 
	city: { name: 'city', label: 'Cidade', placeholder: 'Ex.: Curitiba, São José dos Pinhais, etc.' }, 
	state: { name: 'state', label: 'Estado', placeholder: 'Ex.: Paraná, Santa Catarina, etc.' }, 
	zip: { name: 'zip', label: 'CEP', placeholder: 'XXXXX-XXX', mask: '99999-999' } 
};

const birth = { name: 'birthday', label: 'Data de nascimento', placeholder: 'DD / MM / AAAA', mask: '99 / 99 / 9999' };
 
const GENDER = [
	{ label: 'Feminino', value: 'female' }, 
	{ label: 'Masculino', value: 'male' } 
];
 
// ProfileForm handles the form where the user enter the app 
class ProfileForm extends Component { 
	constructor(props) {
		super(props); 
 
		this.onSubmit = this.onSubmit.bind(this); 
		this.onOpenModal = this.onOpenModal.bind(this); 
		this.onCloseModal = this.onCloseModal.bind(this);
		this.onBirthChange = this.onBirthChange.bind(this); 
		this.renderFields = this.renderFields.bind(this);
		this.getTelephones = this.getTelephones.bind(this);
		this.getTelError = this.getTelError.bind(this);
 
		this.state = {
			redirect: false,
			showModal: false,
			birth: null,
			telephones: [],
			telError: null
		}
	}
 
	componentDidMount() {
		const { getFullUser, user } = this.props; 
		 
		if (user) { 
			getFullUser(user._id, ret =>{
				this.setState({
					birth: ret.birthday,
					telephones: ret.telephones
				});
			}); 
		};     
	} 
 
	onSubmit(values) {
		const { updateProfile, getFullUser, user } = this.props;  

		values.telephones = this.state.telephones.filter(tel =>{
			if(tel.value != ''){
				return true;
			}
			return false;
		}); 
		values.updated_by = user._id;

		if (this.state.birth) { values.birthday = this.state.birth; }

		if(!this.state.telError){
			updateProfile(values, user._id, user => {  
				getFullUser(user._id);  
			});	
		}  
	}

	getTelephones(tel) {
		this.state.telephones = tel;
	}

	getTelError(telError) {
		this.state.telError = telError;
	}

	onOpenModal() {
		this.setState({  
			showModal: true  
		});  
	}  
	  
	onCloseModal() {
		this.setState({  
			showModal: false  
		});  
	}

	onBirthChange(birth) {
		this.setState({
			birth: birth
		})
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
		const { handleSubmit } = this.props; 

		return ( 
			<div className={css(styles.grid)}> 
				<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}> 

					{/* --- INFORMAÇÕES DA CONTA --- */} 
					<h3 className={css(styles.sectionTitle)}>Informações da conta</h3> 
					<div className={css(styles.section)}> 
						{this.renderFields(ACCOUNT)} 

						<div className={css(styles.password)}> 
							<Button text="Trocar de senha" onClick={this.onOpenModal} /> 
						</div> 
					</div> 

					<Modal 
						isOpen={this.state.showModal} 
						header="Trocar de Senha" 
						adjustStyle={styles.passwordModal} 
					>
						<ChangePassForm onCancel={this.onCloseModal} /> 
					</Modal> 

					{/* --- CONTATO --- */} 
					<h3 className={css(styles.sectionTitle)}>Contato</h3> 
					<div className={css(styles.section)}>

						<div className={css(styles.password)}> 
							<TelephoneList telephones={this.state.telephones} getTelephones={this.getTelephones} getTelError={this.getTelError}  />
						</div>
						
						<div className={css(styles.row)}> 
							{/* Rendering field for the zip code */} 
							{this.renderFields([ CONTACT.zip ])} 
						</div> 

						<div> 
							{/* Rendering field for the address */} 
							{this.renderFields([ CONTACT.address ])} 
						</div> 

						<div className={css(styles.row)}> 
							{/* Rendering fields for the city and the state */} 
							{this.renderFields([ CONTACT.city, CONTACT.state ])} 
						</div> 
					</div> 

					{/* --- PESSOAL --- */} 
					<h3 className={css(styles.sectionTitle)}>Pessoal</h3> 
					<div className={css(styles.section)}> 
						<div className={css(styles.row)}> 
							<DateTimePicker name="birth" value={this.state.birth} label="Nascimento" onChange={this.onBirthChange}/>

							<RadioInputSet 
								setLabel="Gênero" 
								name="gender" 
								options={GENDER} 
							/> 
						</div> 
					</div> 

					<Button 
						text="Atualizar Informações" 
						color="green" 
						submit 
					/> 
				</form> 
			</div> 
		); 
	} 
} 
 
// Redux Form function to handle form validation 
function validate(values) {
	const errors = {}; 
	const emailRgx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
	const phoneRgx = /\([1-9]{2}\) [2-9][0-9]{3,4} [0-9]{4}/; 
	
	if (values.name) {
		if(values.name.trim().length <= 0){
			errors.name = 'Escreva seu nome'; 
		}
	}
	if (!values.name) {
		errors.name = 'Escreva seu nome'; 
	}
 
	if (!values.email || !emailRgx.test(values.email)) { 
		errors.email = 'E-mail inválido'; 
	} 
 
	if (!values.telNumber || !phoneRgx.test(values.telNumber)) {
		errors.telephone = 'Número de telefone inválido'; 
	}
 
	return errors;
} 
 
const profileForm = reduxForm({ 
	validate, 
	enableReinitialize: true, 
	form: 'profileForm' 
})(ProfileForm); 
 
function mapStateToProps(state) { 
	const user = state.auth.user; 
	let initialValues = {}; 
 
	if (user) { 
		initialValues = { 
			name: user.name, 
			email: user.email, 
			zip: user.zip, 
			address: user.address, 
			city: user.city, 
			state: user.state, 
			birth: user.birth, 
			gender: user.gender 
		}; 
	} 
 
	return { 
		clinic: state.auth.clinic, 
		user: state.auth.user, 
		initialValues 
	}; 
} 
 
export default connect(mapStateToProps, { getFullUser, updateProfile })(profileForm); 