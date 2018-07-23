import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../VendorsFormStyles';

import Button from '../../../common/Button';
import InputField from '../../../forms/InputField';
import SelectBox from '../../../common/SelectBox';

import { createMaterial, fetchVendors } from '../../../../actions/storage';

import { STATES } from '../../../_constants/states';

const FIELDS = [
	{ name: 'name', label: 'Descrição do Produto', placeholder: 'Descrição do Produto' },
	{ name: 'quantity', label: 'Quantidade Inicial', placeholder: 'Estoque Inicial', mask: '9999999' }
];

const FIELDS2 = [
	{ name: 'min', label: 'Estoque Mínimo', placeholder: 'Estoque Mínimo', mask: '9999999' },
	{ name: 'max', label: 'Estoque Máximo', placeholder: 'Estoque Máximo', mask: '9999999' },

];

// ModalListForm handles the form where the user enter the app
class ModalCreateMaterial extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
        this.renderFields = this.renderFields.bind(this);
		this.render = this.render.bind(this);
		this.renderSelectBox = this.renderSelectBox.bind(this);
        
        this.state = {
            showModal: false 
        }
	}

	componentDidMount() {
		
	}

	onSubmit(values) {

		const { history, match, createMaterial, onCancel } = this.props;

		createMaterial(values, ret => {
           
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


		renderSelectBox(options){
			let vendors = [];
			vendors.push({ value: '', label: 'Selecione uma fornecedor'})

			options.map(field =>{
				vendors.push({value: field._id, label: field.name});
			});
				return (
					<Field
					key={'vendor_id'}
					type={'selectbox'}
					name={'vendor_id'}
					label={'Fornecedor'}
					itens={vendors}
					component={SelectBox}
				/>);
		


		}


	render() {
		const { handleSubmit, onCancel, vendors } = this.props;

console.log(vendors)


		return (
            <form className={css(styles.form_modal)} onSubmit={handleSubmit(this.onSubmit)}>
                {this.renderAuthMsg()}
                
				{this.renderFields(FIELDS)}
				
				{this.renderSelectBox(vendors)}

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

const modalCreateMaterial = reduxForm({
	validate,
	form: 'modalCreateMaterial'
})(ModalCreateMaterial);

function mapStateToProps(state) {
	return {
		user: state.auth.user,
	
	};
}

export default connect(mapStateToProps, { createMaterial, fetchVendors })(modalCreateMaterial);



