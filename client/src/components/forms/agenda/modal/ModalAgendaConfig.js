import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../AgendaFormStyles';

import Button from '../../../common/Button';
import SelectBox from '../../../common/SelectBox';
import InputField from '../../../forms/InputField';
import { editAgendaConfig } from '../../../../actions/agendaConfig';

const OPTIONS = [
	{ value: '5', label: '5 Minutos'},
	{ value: '10', label: '10 Minutos'},
	{ value: '15', label: '15 Minutos'},
	{ value: '30', label: '30 Minutos'},
	{ value: '60', label: '60 Minutos'},
];

const PROCEDURE = {	 name: 'procedure', label: 'Novo Procedimento', placeholder: 'Procedimento' };

class ModalAgendaConfig extends Component {
	constructor(props) {
		super(props);

		this.renderItems = this.renderItems.bind(this);
		this.renderSelectBox = this.renderSelectBox.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.renderFields = this.renderFields.bind(this);
		this.showDivNewProcedure = this.showDivNewProcedure.bind(this);
		this.addProcedure = this.addProcedure.bind(this);
		this.removeProcedure = this.removeProcedure.bind(this);

        this.state = {
			showModal: false,
			procedures: [],
			showDivNewProcedure: false,
		}
	}

	componentWillMount(){
		const { initialValues } = this.props;

		if(initialValues){
			this.setState({
				procedures: initialValues.procedures ? initialValues.procedures : [],
			});
		}

	}

	onCancel(values){
		const { editAgendaConfig, onCancel } = this.props;
		editAgendaConfig(values);
		onCancel();
	}

	addProcedure(values){
		const { editAgendaConfig } = this.props;

		if(values.procedure && values.procedure.trim() != ''){

			this.state.procedures.push({ name: values.procedure});
			values.procedure = '';
			values.procedures = this.state.procedures;
			editAgendaConfig(values);

			this.setState({
				showDivNewProcedure: false,
			});
		}
	}

	removeProcedure(idx){
		const { editAgendaConfig } = this.props;

		this.state.procedures.splice(idx, 1);
		editAgendaConfig(this.state.procedures);
		this.setState({});
	}

	renderItems(itens) {

		if (itens.length > 0) {
			return itens.map( (item, idx) => {
				return (
					<li key={idx} className={css(styles.listItem)}>
						{item.name}
						<span className={css(styles.link2, styles.red)} onClick={() => this.removeProcedure(idx) }>Excluir</span>
					</li>
				);
			});
		} else {
			return (
				<li className={css(styles.noItems)}>
					Nenhum Procedimento cadastrado
				</li>
			);
		}
	};

	renderSelectBox(OPTIONS){
		return (
			<Field
			key={'interval'}
			type={'selectbox'}
			name={'interval'}
			label={'Intervalo de tempo da agenda'}
			itens={OPTIONS}
			component={SelectBox}
		/>);
	}

	showDivNewProcedure(){
		this.state.showDivNewProcedure ? this.setState({ showDivNewProcedure: false }) : this.setState({ showDivNewProcedure: true })
	}
	
	renderFields(fields) {
		const { handleSubmit } = this.props;

		return fields.map((field, idx) => {
			return (
				<div className={css(styles.row_procedure)} key={idx}>
					<Field
						key={field.name}
						type={(field.type) ? field.type : 'text'}
						name={field.name}
						label={field.label}
						placeholder={(field.placeholder) ? field.placeholder : ''}
						mask={(field.mask) ? field.mask : ''}
						component={InputField}
					/>
					<div className={css(styles.row_confirm)} >
						<Button
							text="Salvar"
							color="green"
							onClick={handleSubmit(this.addProcedure)}
							right
						/>
					</div>
				</div>
			);
		});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
            <form className={css(styles.form_modal)} onSubmit={handleSubmit(this.onCancel)}>
				
				<h3 className={css(styles.sectionTitle)}>Configurações da Agenda</h3>
				<div className={css(styles.section)}>
					{this.renderSelectBox(OPTIONS)}
				</div>
				
				<h3 className={css(styles.sectionTitle)}>Lista de Procedimentos</h3>
				<ul className={css(styles.list)}>
					{ this.renderItems( this.state.procedures ) }
				</ul>

				{ this.state.showDivNewProcedure ? 
					( this.renderFields([PROCEDURE]) )
				 : ''}

                <div className={css(styles.password)}> 
					<Button text="Adicionar Procedimento" onClick={this.showDivNewProcedure} /> 
				</div>
				<Button
                    text="Fechar"
                    color="red"
                    submit
                    right
                />

            </form>
		);
	}
}

const modalAgendaConfig = reduxForm({
	form: 'modalAgendaConfig'
})(ModalAgendaConfig);

function mapStateToProps(state, props) {

	let initialValues = {interval: 30};
	if(state.agendaConfig.agendaConfig[0]){
		initialValues = state.agendaConfig.agendaConfig[0];
	}

	return {
		initialValues
	};
}

export default connect(mapStateToProps, { editAgendaConfig })(modalAgendaConfig);