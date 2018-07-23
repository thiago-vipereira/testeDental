import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../VendorsFormStyles';

import Button from '../../../common/Button';
import InputField from '../../../forms/InputField';
import SelectBox from '../../../common/SelectBox';

import { updateVendor } from '../../../../actions/storage';

import { STATES } from '../../../_constants/states';





// ModalListForm handles the form where the user enter the app
class ModalEditVendor extends Component {
	constructor(props) {
		super(props);

		console.log(props);
		this.onSubmit = this.onSubmit.bind(this);
        this.renderFields = this.renderFields.bind(this);
		this.render = this.render.bind(this);
		this.renderSelectBox = this.renderSelectBox.bind(this);
        
        this.state = {
			showModal: false,
			vendor: this.props.vendor,
        }
	}

	componentDidMount() {

	}

	onSubmit(values) {

		const { history, match, updateVendor, onCancel } = this.props;

		updateVendor(values, this.props.vendor._id, ret => {
           
			onCancel();
			history.push(`${match.url}`); 
			
		});

		
    }
    
    renderAuthMsg() {
        const { errorMsg } = this.state;
        
		if(errorMsg) {
			return (
				<div className={css(styles.msgAuth_modal)}>
					<span>{errorMsg}</span>
				</div>
			);
		}
	}

	renderFields(fields) {
		// iterate through the FIELDS array and create a Field for each item


		return fields.map(field => {
			console.log(field.valor);
			return (
				<Field
					key={field.name}
					type={(field.type) ? field.type : 'text'}
					name={field.name}
					label={field.label}
					placeholder={(field.placeholder) ? field.placeholder : ''}
					mask={(field.mask) ? field.mask : ''}
					component={InputField} 
					valor={field.valor}
				/>
			);
		});
	}


		renderSelectBox(options){
			return (
				<Field
				key={'state'}
				type={'selectbox'}
				name={'state'}
				label={'Estado'}
				itens={options}
				component={SelectBox}
			/>);
		}


	render() {
		const { handleSubmit, onCancel } = this.props;

		const FIELDS = [
			{ name: 'name', label: 'Nome do Fornecedor', placeholder: 'Nome do Fornecedor', valor: this.state.vendor.name },
			{ name: 'address', label: 'Endereço', placeholder: 'Endereço do fornecedor', valor: this.state.vendor.address }
		
		];

		const FIELDS2 = [
			{ name: 'city', label: 'Cidade', placeholder: 'Cidade', valor: this.state.vendor.city },
			{ name: 'email', label: 'Email', placeholder: 'Email', valor: this.state.vendor.email },
			{ name: 'contact', label: 'Nome para contato', placeholder: 'Nome para contato', valor: this.state.vendor.contact },
			{ name: 'website', label: 'Site', placeholder: 'Site', valor: this.state.vendor.website },
		
		];

		return (
            <form className={css(styles.form_modal)} onSubmit={handleSubmit(this.onSubmit)}>
                {this.renderAuthMsg()}
                
				{this.renderFields(FIELDS)}
				
				{this.renderSelectBox(STATES)}

				{this.renderFields(FIELDS2)}

                <Button
                    text="Salvar"
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

	if (!values.name) {
		errors.name = 'Digite o nome do fornecedor';
	}
	return errors;
}

const modalEditVendor = reduxForm({
	validate,
	form: 'modalEditVendor'
})(ModalEditVendor);

function mapStateToProps(state, props) {
	let initialValues = {};

	if (props.name != "") {
		console.log(props);
		initialValues = props.vendor; 
	}

	return {
		user: state.auth.user,
		initialValues
	};
}

export default connect(mapStateToProps, { updateVendor })(modalEditVendor);



