import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './FinancialFormStyles';
import moment from 'moment';
import 'moment/locale/pt-br';

import Modal from '../../modals/Modal';
import Button from '../../common/Button';

class FinancialForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.renderList = this.renderList.bind(this);
		this.renderItems = this.renderItems.bind(this);
		this.renderForm = this.renderForm.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		
		this.state = {
			modal: false,
			list: [],
		}
	}

	componentWillMount() {
		const { selectedPatient } = this.props;
		console.log('a');
		var parcela = {
			vencimento: new Date,
			parcela: 1,
			dentista: 'dentista teste',
			recibo: 'numero 123',
			valor: 67.00,
			pagamento: 'status do pagamento',
		}

		var parcela2 = {
			vencimento: new Date,
			parcela: 2,
			dentista: 'dentista teste',
			recibo: 'numero 123',
			valor: 67.00,
			pagamento: 'status do pagamento',
		}

		var orçarmento = {
			name: 'Pagamento 1',
			status: 'Em aberto',
			active: true,
			total: 100.00,
			parcela: [parcela, parcela2]
		}

		this.setState({
			list: [orçarmento]
		});
	}

	componentWillReceiveProps(nextProps){
		const { selectedPatient } = this.props;
	}

	onSubmit(values){
		const { selectedPatient } = this.props;
	}

	openModal(values) {
		this.setState({
			modal: true,
		});
	}

	closeModal(values) {
		this.setState({
			modal: false,
		});
	}

	renderList(list) {
		if (list && list.length > 0) {
			return list.map( (item, idx) => {
				if(item.active){
					return (
						<div>
							<h3 className={css(styles.financialTitle)}>{ item.name }</h3>
							<ul className={css(styles.list)}>
								<div className={css(styles.listHeader)}>
									<div className={css(styles.header)} style={{ width: '8%'}} >Vencimento</div>
									<div className={css(styles.header)} style={{ width: '14%'}} >parcela</div>		
									<div className={css(styles.header)} style={{ width: '16%'}} >Dentista</div>
									<div className={css(styles.header)} style={{ width: '12%'}} >Recibo</div>
									<div className={css(styles.header)} style={{ width: '13%'}} >Valor</div>
									<div className={css(styles.header)} style={{ width: '10%'}} >Pagamento</div>
									<div className={css(styles.header)} style={{ width: '10%'}} >Editar</div>
									<div style={{clear:'both'}}></div>
								</div>
								<ul className={css(styles.list2)}>
									{this.renderItems(item)}
								</ul>
							</ul>
						</div>
					);
				}
			});
		} else {
			return (
				<ul className={css(styles.list)}>
					<li className={css(styles.noItems)}>
						Nenhum Pagamento ;(
					</li>
				</ul>
			);
		}
	}

	renderItems(itens) {
		const { history, match } = this.props;
		
		if (itens && itens.parcela.length > 0) {
			return itens.parcela.map( (item, idx) => {
				if(item){
					return (
						<li key={idx} className={css(styles.listItem)}>
							<span className={css(styles.date)}> { moment(item.vencimento).format("D/MM/YYYY") } </span>
							<span className={css(styles.listText)}> { item.parcela } </span>
							<span className={css(styles.listText)}> { item.dentista } </span>
							<span className={css(styles.listText)}> { item.recibo } </span>
							<span className={css(styles.listText)}> { item.valor } </span>
							<span className={css(styles.listText)}> {item.pagamento } </span>
						</li>
					);
				}
			});
		} else {
			return (
				<li className={css(styles.noItems)}>
					Nenhum Pagamento ;(
				</li>
			);
		}
	};

	renderForm() {
		const { handleSubmit } = this.props;

		return (
			<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}>
				{/* --- INFORMAÇÕES BáSICAS --- */}
				<div className={css(styles.section)}>
					{ this.renderList( this.state.list ) }
				</div>
			</form>
		);
	}

	render() {
		return (
			<div>
				<div className={css(styles.financial_bar)}>TESTE</div>
				<div className={css(styles.flex)}>
					{this.renderForm()}
					<Modal
						isOpen={this.state.modal} 
						header={"Excluir Tratamento"} 
						adjustStyle={styles.modal} 
					>
					</Modal>
				</div>
			</div>
		);
	}
}

// Redux Form function to handle form validation
function validate(values) {
	const errors = {};

	return errors;
}

const financialForm = reduxForm({
	validate,
	form: 'financialForm'
})(FinancialForm);

function mapStateToProps({patientsCreation}) {
	return {
		selectedPatient: patientsCreation.selectedPatient,
	};
}

export default connect(mapStateToProps, { })(financialForm);