import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm} from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './ProcedureFormStyles';

import ProceduresList from '../../lists/ProceduresList';
import { createList, fetchList, deleteList } from '../../../actions/procedure';

import Button from '../../common/Button';
import ModalListForm from './modal/ModalListForm';
import ModalDeleteListForm from './modal/ModalDeleteListForm';
import Modal from '../../modals/Modal';

class ListProcedureForm extends Component {
	constructor(props) {
		super(props);

		//this.newList = this.newList.bind(this);
		
		this.onOpenModal = this.onOpenModal.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
		this.onOpenDeleteModal = this.onOpenDeleteModal.bind(this);
		this.onCloseDeleteModal = this.onCloseDeleteModal.bind(this);

		this.deleteProcedureList = this.deleteProcedureList.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.renderList = this.renderList.bind(this);

		this.state = {
			redirect: false,
			showModal: false,
			showDeleteModal: false,
			idList: null
		}
	}

	newList() {
		const { history, match, createList } = this.props;
		
		createList(ret => {
			history.push(`${match.url}/${ret._id}`);
		});
	}

	deleteProcedureList( id ) {
		const { history, match, fetchList, deleteList } = this.props;
		
		deleteList(id, ret => {
			fetchList();
		});
	}

	componentDidMount() {
		const { fetchList } = this.props;
        fetchList();
    }

	renderList() {
		const { match, proceduresById } = this.props;
		
        if (proceduresById && proceduresById.length > 0) {
            return <ProceduresList procedures={proceduresById} onClick={this.onOpenDeleteModal} match={match} />;
        }

        return <ProceduresList procedures={[]} match={match} />;
    }

	onSubmit(values) {
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

	onOpenDeleteModal(id) {
		this.setState({
			showDeleteModal: true,
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
		const { handleSubmit, history, match } = this.props;

		return (
			<div className={css(styles.flex)}>
				<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}>
					<div className={css(styles.listContainer)}>
						<h3 className={css(styles.sectionTitle)}>Minha lista de Procedimentos</h3>
							<div className={css(styles.list)}>
								{this.renderList()}
									<Button
										text="Cadastrar uma lista"
										onClick={this.onOpenModal}
									/>
							</div>
					</div>
					<Modal
						isOpen={this.state.showModal}
						header="Nova Lista de Procedimentos"
						adjustStyle={styles.newProcedureModal}
					>
						<ModalListForm onCancel={this.onCloseModal} history={history} match={match}/>
					</Modal>
					<Modal
						isOpen={this.state.showDeleteModal}
						header="Deletar Lista de Procedimentos"
						adjustStyle={styles.newProcedureModal}
					>
						<ModalDeleteListForm onCancel={this.onCloseDeleteModal} idList={this.state.idList} del={this.deleteProcedureList} />
					</Modal>
				</form>
			</div>
		);
	}
}

const listProcedureForm = reduxForm({
	enableReinitialize: true,
	form: 'listProcedureForm'
})(ListProcedureForm);

function mapStateToProps(state) {

	state.procedureConfig.selectedProcedure = null;

	return {
		proceduresById: state.procedureConfig.proceduresById
	};
}

export default connect(mapStateToProps, { fetchList, createList, deleteList })(listProcedureForm);
