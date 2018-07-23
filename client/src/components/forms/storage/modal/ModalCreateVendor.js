import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../VendorsFormStyles';

import Button from '../../../common/Button';
import InputField from '../../../forms/InputField';
import SelectBox from '../../../common/SelectBox';

import { createVendor } from '../../../../actions/storage';

import { STATES } from '../../../_constants/states';

const FIELDS = [
	{ name: 'name', label: 'Nome do Fornecedor', placeholder: 'Nome do Fornecedor' },
	{ name: 'address', label: 'Endereço', placeholder: 'Endereço do fornecedor' }

];

const FIELDS2 = [
	{ name: 'city', label: 'Cidade', placeholder: 'Cidade' },
	{ name: 'email', label: 'Email', placeholder: 'Email' },
	{ name: 'contact', label: 'Nome para contato', placeholder: 'Nome para contato' },
	{ name: 'website', label: 'Site', placeholder: 'Site' },


	
];

// ModalListForm handles the form where the user enter the app
class ModalCreateVendor extends Component {
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

		const { history, match, createVendor, onCancel } = this.props;

		createVendor(values, ret => {
           
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

const modalCreateVendor = reduxForm({
	validate,
	form: 'modalCreateVendor'
})(ModalCreateVendor);

function mapStateToProps(state) {
	return {
		user: state.auth.user
	};
}

export default connect(mapStateToProps, { createVendor })(modalCreateVendor);



