import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { reduxForm, Field } from 'redux-form'; 

import { getUser, updateUser } from '../../../actions/users';
 
import { css } from 'aphrodite/no-important'; 
import { styles } from '../clinic/ClinicFormStyles'; 
 
import InputField from '../../forms/InputField';
import RadioInputSet from '../../forms/RadioInputSet'; 
import SelectBox from '../../common/SelectBox';
import Button from '../../common/Button';
import DateTimePicker from '../date/DateTimePicker';
import TelephoneList from '../../lists/TelephoneList';

const USER_BASIC = {
	name: { name: 'name', label: 'Nome', placeholder: 'Nome' },
	email: { name: 'email', label: 'E-mail', placeholder: 'dentista@email.com' },
	address: { name: 'address', label: 'Endereço', placeholder: 'Ex.: Av. Brasil, 999' },
	city: { name: 'city', label: 'Cidade', placeholder: 'Ex.: Curitiba, São Paulo...' },
	state: { name: 'state', label: 'Estado', placeholder: 'Ex.: Paraná, São Paulo...' },
	zip: { name: 'zip', label: 'CEP', placeholder: 'XXXXX - XXX', mask: '99999 - 999' },
	birth: { name: 'birthday', label: 'Data de nascimento', placeholder: 'DD / MM / AAAA', mask: '99 / 99 / 9999' },
	telNumber: { name: 'telNumber', label: 'Telefone', placeholder: '(XX) XXXXX XXXX', mask: '(99) 99999 9999' },
	telType: { name: 'telType', label: 'Tipo', placeholder: 'Ex.: Celular, Principal...' },
};

const GENDER = [ 
	{ label: 'Feminino', value: 'female' }, 
	{ label: 'Masculino', value: 'male' } 
];

const OPTIONS = [
	{ value: '', label: 'Selecione uma aplicação'},
	{ value: 'quad', label: 'Quadrante'},
	{ value: 'sext', label: 'Sextante'}
];
 
// UserForm handles the form where the user enter the app 
class UserForm extends Component { 
	constructor(props) { 
		super(props); 

		this.onSubmit = this.onSubmit.bind(this);
		this.renderFields = this.renderFields.bind(this);
		this.renderSelectBox = this.renderSelectBox.bind(this);
		this.onBirthChange = this.onBirthChange.bind(this);
		this.getTelephones = this.getTelephones.bind(this);
		this.getTelError = this.getTelError.bind(this);

		this.state = { 
			loading: true, 
			showModal: false,
			birth: null,
			telephones: [],
			telError: null
		} 
	} 
 
	componentDidMount() {
        const { match, getUser } = this.props;
		console.log('mounting: ' + match.params.userId);

		getUser(match.params.userId, ret => {
			this.setState({birth : ret.birthday, telephones: ret.telephones});
		});
	}

	getTelephones(tel) {
		this.state.telephones = tel;
	}

	onBirthChange(birth) {
		this.setState({
			birth: birth
		})
	}

	getTelError(telError) {
		this.state.telError = telError;
	}
 
	onSubmit(values) {
		const { selectedUser, updateUser } = this.props;

		values.telephones = this.state.telephones.filter(tel =>{
			if(tel.value != ''){
				return true;
			}
			return false;
		});

		if (this.state.birth) { values.birthday = this.state.birth; }

		if(!this.state.telError){
			updateUser(values, selectedUser._id,  ret => {
			});
		}
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

	renderSelectBox(OPTIONS){
		return (
			<Field
			key={'role'}
			type={'selectbox'}
			name={'role'}
			label={'Perfil'}
			itens={OPTIONS}
			component={SelectBox}
		/>);
	}
 
	render() {
        const { selectedUser, match, handleSubmit } = this.props;

		return ( 
			<div className={css(styles.grid)}>
				<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}>
					<h3 className={css(styles.sectionTitle)}>Informações básicas</h3>
					<div className={css(styles.section)}>
						<div className={css(styles.row_1)}>
							{this.renderFields([USER_BASIC.name])}
						</div>
						<div className={css(styles.row_1)}>
							{this.renderFields([USER_BASIC.email])}
						</div>
					</div>

					<h3 className={css(styles.sectionTitle)}>Perfil e Permissões</h3>
					<div className={css(styles.section)}>
						<div className={css(styles.row_3)}>
							{this.renderSelectBox(OPTIONS)}
						</div>
					</div>

					<h3 className={css(styles.sectionTitle)}>Endereço</h3>
					<div className={css(styles.section)}>
						<div className={css(styles.row_1)}>
							{this.renderFields([USER_BASIC.address])}
						</div>
						<div className={css(styles.row_3)}>
							{this.renderFields([USER_BASIC.state, USER_BASIC.city])}
						</div>
						<div className={css(styles.row_3)}>
							{this.renderFields([USER_BASIC.zip])}
						</div>
					</div>

					<h3 className={css(styles.sectionTitle)}>Pessoal</h3>
					<div className={css(styles.section)}>
						<div className={css(styles.row_3)}>
							<DateTimePicker name="birthday" value={this.state.birth} label="Nascimento" onChange={this.onBirthChange} />
							<RadioInputSet
								setLabel="Gênero" 
								name="gender" 
								options={GENDER} 
							/>
						</div>
					</div>

					<h3 className={css(styles.sectionTitle)}>Contato</h3>
					<div className={css(styles.section)}>
						<TelephoneList telephones={this.state.telephones} getTelephones={this.getTelephones} getTelError={this.getTelError} />
					</div>

					<Button
					text={"Atualizar Informações"}
					color="green"
					submit
				/>

				</form>
			</div> 
		); 
	} 
} 
 
function validate(values) { 
	const errors = {};

	return errors; 
} 
 
const userForm = reduxForm({ 
	validate, 
	enableReinitialize: true, 
	form: 'userForm' 
})(UserForm); 
 
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
export default connect(mapStateToProps, { getUser, updateUser })(userForm); 