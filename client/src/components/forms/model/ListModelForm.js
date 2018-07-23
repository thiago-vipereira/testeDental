import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { styles } from '../model/ModelFormStyles';

import ModelsList from '../../lists/ModelsList';
import { fetchModel, deleteModel } from '../../../actions/model';
import { fetchAnamnese, deleteAnamnese } from '../../../actions/anamnesis';


import Button from '../../common/Button';
import ModalDeleteModelForm from './modal/ModalDeleteModelForm';
import Modal from '../../modals/Modal';

class ListModelForm extends Component {
	constructor(props) {
		super(props);

		//this.newList = this.newList.bind(this);
		
		this.onOpenDeleteModal = this.onOpenDeleteModal.bind(this);
		this.onCloseDeleteModal = this.onCloseDeleteModal.bind(this);

		this.deleteModel = this.deleteModel.bind(this);
		this.renderList = this.renderList.bind(this);

		this.state = {
			redirect: false,
			showModal: false,
			showDeleteModal: false,
			idList: null,
			message: null
		}
	}

	deleteModel( id ) {
		if (this.state.message === "quiz") {
			const { fetchAnamnese, deleteAnamnese } = this.props;
			deleteAnamnese(id, ret => {
				fetchAnamnese();
			});
		}
		else {
			const { fetchModel, deleteModel } = this.props;
			deleteModel(id, ret => {
				fetchModel();
			});
		}
	}

	componentDidMount() {
		const { fetchModel, fetchAnamnese } = this.props;
		fetchModel();
		fetchAnamnese();
	}

	renderList(message, type) {
		const { match } = this.props;
		var listArray = [];
		if (message === "quiz")
			listArray = this.props.anamnesisById;
		else
			listArray = this.props.modelsById?this.props.modelsById.filter((item) => item.type === type):[];
    if (listArray && listArray.length > 0)
      return <ModelsList models={listArray} message={message} onClick={this.onOpenDeleteModal} match={match} />;
    return <ModelsList models={[]} match={match} />;
	}

	onOpenDeleteModal(id, message) {
		this.setState({
			showDeleteModal: true,
			message: message,
			idList: id
		});
	}
	 
	onCloseDeleteModal() {
		this.setState({ 
			showDeleteModal: false,
			idList: null
		});
	}


	render() {
		const { history, match } = this.props;

		return (
			<div className={css(styles.container)}>
				<div className={css(styles.content)}>
					<div className={css(styles.item1)} style={{marginBottom: '.5rem'}}>
						<div className={css(styles.form)}>
							<div className={css(styles.listContainer)}>
								<h3 className={css(styles.sectionTitle)}>CABEÇALHO E RODAPÉ</h3>
								<div className={css(styles.backgroundModels)}>
								<Link to={`${match.url}/pattern`} className={css(styles.link)}>Editar cabeçalho e rodapé</Link>
								</div>
							</div>
						</div>
						<div className={css(styles.form)}>
							<div className={css(styles.listContainer)}>
								<h3 className={css(styles.sectionTitle)}>MODELOS DE E-MAIL</h3>
								<div className={css(styles.backgroundModels)}>
									{this.renderList("html", "email")}
									<Link to={`${match.url}/html/email`} className={css(styles.link)}>Novo Modelo de e-mail</Link>
								</div>
							</div>
							<div className={css(styles.listContainer)}>
								<h3 className={css(styles.sectionTitle)}>MODELOS DE SMS</h3>
								<div className={css(styles.backgroundModels)}>
									{this.renderList("text", "sms")}
									<Link to={`${match.url}/text/sms`} className={css(styles.link)}>Novo Modelo de SMS</Link>
								</div>
							</div>
						</div>
					</div>
					<div className={css(styles.item2)}>
						<div className={css(styles.form)}>
							<div className={css(styles.listContainer)}>
								<h3 className={css(styles.sectionTitle)}>MODELOS DE ANAMNESE</h3>
								<div className={css(styles.backgroundModels)}>
									{this.renderList("quiz", "anamnesis")}
									<Link to={`${match.url}/quiz/anamnesis`} className={css(styles.link)}>Novo Modelo de anamnese</Link>
								</div>
							</div>
							<div className={css(styles.listContainer)}>
								<h3 className={css(styles.sectionTitle)}>MODELOS DE PRESCRIÇÕES</h3>
								<div className={css(styles.backgroundModels)}>
									{this.renderList("html", "prescription")}
									<Link to={`${match.url}/html/prescription`} className={css(styles.link)}>Novo Modelo de prescrição</Link>
								</div>
							</div>
							<div className={css(styles.listContainer)}>
								<h3 className={css(styles.sectionTitle)}>MODELOS DE ATESTADOS</h3>
								<div className={css(styles.backgroundModels)}>
									{this.renderList("html", "attestations")}
									<Link to={`${match.url}/html/attestations`} className={css(styles.link)}>Novo Modelo de atestado</Link>
								</div>
							</div>
							<div className={css(styles.listContainer)}>
								<h3 className={css(styles.sectionTitle)}>MODELOS DE CONTRATOS</h3>
								<div className={css(styles.backgroundModels)}>
									{this.renderList("html", "contracts")}
									<Link to={`${match.url}/html/contracts`} className={css(styles.link)}>Novo Modelo de contrato</Link>
								</div>
							</div>
						</div>
						<Modal
							isOpen={this.state.showDeleteModal}
							header="Deletar Modelo"
							adjustStyle={styles.newProcedureModal}
						>
							<ModalDeleteModelForm onCancel={this.onCloseDeleteModal} idList={this.state.idList} del={this.deleteModel} />
						</Modal>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		modelsById: state.model.modelsById,
		anamnesisById: state.anamnesis.anamnesisById
	};
}

export default connect(mapStateToProps, { fetchModel, deleteModel, fetchAnamnese, deleteAnamnese })(ListModelForm);