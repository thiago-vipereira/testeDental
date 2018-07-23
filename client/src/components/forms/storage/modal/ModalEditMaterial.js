import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../VendorsFormStyles';

import Button from '../../../common/Button';
import InputField from '../../../forms/InputField';
import SelectBox from '../../../common/SelectBox';

import { updateMaterial } from '../../../../actions/storage';

import { STATES } from '../../../_constants/states';





// ModalListForm handles the form where the user enter the app
class ModalEditMaterial extends Component {
	constructor(props) {
		super(props);

		console.log(props);
		this.onSubmit = this.onSubmit.bind(this);
        this.renderFields = this.renderFields.bind(this);
		this.render = this.render.bind(this);
		this.renderSelectBox = this.renderSelectBox.bind(this);
        
        this.state = {
			showModal: false,
			material: this.props.material,
        }
	}

	componentDidMount() {

	}

	onSubmit(values) {

		const { history, match, updateMaterial, onCancel } = this.props;
		
		updateMaterial(values, this.props.material._id, ret => {
           
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

		const FIELDS = [
			{ name: 'name', label: 'Descrição do Produto', placeholder: 'Descrição do Produto' },
			{ name: 'quantity', label: 'Quantidade Atual', placeholder: 'Estoque Atual', valor: this.state.material.quantity, mask: '9999999' }
		];
		
		const FIELDS2 = [
			{ name: 'min', label: 'Estoque Mínimo', placeholder: 'Estoque Mínimo', mask: '9999999' },
			{ name: 'max', label: 'Estoque Máximo', placeholder: 'Estoque Máximo', mask: '9999999'},
		
		];

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
		errors.name = 'Digite a Descrição do Produto';
	}
	return errors;
}

const modalEditMaterial = reduxForm({
	validate,
	form: 'modalEditMaterial'
})(ModalEditMaterial);

function mapStateToProps(state,props) {
	let initialValues = {};

	if (props.name != "") {
		console.log(props);
		initialValues = props.material; 
	}

	return {
		user: state.auth.user,
		initialValues
	};
}

export default connect(mapStateToProps, { updateMaterial })(modalEditMaterial);



