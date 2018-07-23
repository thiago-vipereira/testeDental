import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../VendorsFormStyles';

import Button from '../../../common/Button';
import InputField from '../../../forms/InputField';
import SelectBox from '../../../common/SelectBox';

import { createMaterial, fetchVendors, addStorage } from '../../../../actions/storage';

import { STATES } from '../../../_constants/states';

const FIELDS = [
	{ name: 'quantity', label: 'Quantidade Entrada', placeholder: 'Quantidade Entrada', mask: '9999999' }
];

const FIELDS2 = [
	{ name: 'quantity', label: 'Quantidade Saída', placeholder: 'Quantidade Saída', mask: '9999999' },
];

// ModalListForm handles the form where the user enter the app
class ModalAddStorage extends Component {
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

		const { history, match, addStorage, onCancel, actionType } = this.props;
		values.registry_type = actionType;
		var today = new Date();
		values.date = today;
	
		addStorage(values, ret => {
           
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
			let materials = [];
			materials.push({ value: '', label: 'Selecione o Produto'})

			options.map(field =>{
				materials.push({value: field._id, label: field.name});
			});
				return (
					<Field
					key={'material_id'}
					type={'selectbox'}
					name={'material_id'}
					label={'Produto'}
					itens={materials}
					component={SelectBox}
				/>);
		


		}


	render() {
		const { handleSubmit, onCancel, materials, actionType } = this.props;



		
		return (
            <form className={css(styles.form_modal)} onSubmit={handleSubmit(this.onSubmit)}>
                {this.renderAuthMsg()}
                

				
				{this.renderSelectBox(materials)}

				{actionType == 'in' ? this.renderFields(FIELDS) : this.renderFields(FIELDS2)}


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

const modalAddStorage = reduxForm({
	validate,
	form: 'modalAddStorage'
})(ModalAddStorage);

function mapStateToProps(state) {
	return {
		user: state.auth.user,
	
	};
}

export default connect(mapStateToProps, { createMaterial, fetchVendors, addStorage })(modalAddStorage);



