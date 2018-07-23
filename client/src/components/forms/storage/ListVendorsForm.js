import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm} from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './VendorsFormStyles';

import VendorsList from '../../lists/storage/VendorsList';
import { createVendor, fetchVendors, deleteVendor, updateVendor } from '../../../actions/storage';

import Button from '../../common/Button';
import ModalCreateVendor from './modal/ModalCreateVendor';
import ModalDeleteVendorForm from './modal/ModalDeleteVendorForm';
import ModalEditVendor from './modal/ModalEditVendor';
import Modal from '../../modals/Modal';

class ListVendorsForm extends Component{
    constructor(props) {
        super(props);
    
        this.renderList = this.renderList.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);

        this.onOpenDeleteModal = this.onOpenDeleteModal.bind(this);
        this.onCloseDeleteModal = this.onCloseDeleteModal.bind(this);
        this.deleteVendorForm = this.deleteVendorForm.bind(this);

        this.onOpenEditModal = this.onOpenEditModal.bind(this);
        this.onCloseEditModal = this.onCloseEditModal.bind(this);

        this.state = {
			redirect: false,
			showModal: false,
			showDeleteModal: false,
            idVendor: null,
            vendor: null,
            showEditModal: false,
		  }
    }

    onSubmit(values) {
    }
    
    deleteVendorForm( id ) {
		const { history, match, fetchVendors, deleteVendor } = this.props;
		
		deleteVendor(id, ret => {
			fetchVendors();
		});
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
        const { fetchVendors } = this.props;
        fetchVendors();
    }

    onOpenEditModal(vv){
        this.setState({
            showEditModal: true,
            vendor: vv
        });
    }

    onCloseEditModal(){
        this.setState({
            showEditModal: false,
            vendor: null
        });
        const { fetchVendors } = this.props;
        fetchVendors();
    }

    onOpenDeleteModal(id){
        this.setState({
            showDeleteModal: true,
            idVendor: id
        });
    }

    onCloseDeleteModal(){
        this.setState({
            showDeleteModal: false,
            idVendor: null
        })
    }

	 
    
    componentDidMount() {
        const { fetchVendors } = this.props;
        fetchVendors();
    }

    renderList() {
        const { match, vendorsById } = this.props;
       
        if (vendorsById && vendorsById.length > 0) {
            return <VendorsList vendors={vendorsById} onClick={this.onOpenDeleteModal} match={match} editModal={this.onOpenEditModal} />;
        }

        return <VendorsList vendors={[]} match={match} />;
    }

    render() {
		const { handleSubmit, history, match } = this.props; 
        console.log(this.props);
		return (
			<div className={css(styles.grid)}>
				<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}> 

					<div className={css(styles.listContainer)}>
						<h3 className={css(styles.sectionTitle)}>Lista de Fornecedores</h3>  
                            <div className={css(styles.card)}>
							{this.renderList()}
							<Button
								text="Cadastrar Fornecedor"
								onClick={this.onOpenModal}
							/>
                            </div>
					</div>

                    <Modal 
						isOpen={this.state.showModal} 
						header="Novo Fornecedor" 
						adjustStyle={styles.newProcedureModal} 
					> 
						<ModalCreateVendor onCancel={this.onCloseModal} history={history} match={match}/>
					</Modal>
                    <Modal 
						isOpen={this.state.showDeleteModal} 
						header="Deletar Fornecedor"
						adjustStyle={styles.newProcedureModal} 
					> 
						<ModalDeleteVendorForm onCancel={this.onCloseDeleteModal} idVendor={this.state.idVendor} del={this.deleteVendorForm} />
					</Modal>

                    <Modal
                        isOpen={this.state.showEditModal}
                        header="Editar Fornecedor"
                        adjustStyle={styles.newProcedureModal}
                    >
                        <ModalEditVendor onCancel={this.onCloseEditModal} history={history} match={match} vendor={this.state.vendor} />
                    </Modal>
				</form>
			</div>
		);
	}
}

const listVendorsForm = reduxForm({
	enableReinitialize: true,
	form: 'listVendorsForm'
})(ListVendorsForm);

function mapStateToProps(state) {

	state.storage.selectedVendor = null;

	return {
        vendorsById: state.storage.vendorsById
	};
}

export default connect(mapStateToProps, { fetchVendors, createVendor, deleteVendor, updateVendor })(listVendorsForm);
