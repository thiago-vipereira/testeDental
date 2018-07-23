import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm} from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './MaterialsFormStyles';

import MaterialsList from '../../lists/storage/MaterialsList';
import { createMaterial, fetchMaterials, deleteMaterial, updateMaterial, fetchVendors } from '../../../actions/storage';

import Button from '../../common/Button';
import ModalCreateMaterial from './modal/ModalCreateMaterial';
import ModalDeleteMaterial from './modal/ModalDeleteMaterial';
import ModalEditMaterial from './modal/ModalEditMaterial';
import Modal from '../../modals/Modal';

import TableFilter from '../../lists/patients/TableFilter';

import ListVendorsForm from './ListVendorsForm';

class ListMaterialsForm extends Component{
    constructor(props) {
        super(props);
    
        this.renderList = this.renderList.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);

        this.onOpenDeleteModal = this.onOpenDeleteModal.bind(this);
        this.onCloseDeleteModal = this.onCloseDeleteModal.bind(this);
        this.deleteMaterialForm = this.deleteMaterialForm.bind(this);

        this.onOpenEditModal = this.onOpenEditModal.bind(this);
        this.onCloseEditModal = this.onCloseEditModal.bind(this);

        this.state = {
			redirect: false,
			showModal: false,
			showDeleteModal: false,
            idMaterial: null,
            material: null,
            showEditModal: false,
		  }
    }

    onSubmit(values) {
    }
    
    deleteMaterialForm( id ) {
		const { history, match, fetchMaterials, deleteMaterial, fetchVendors } = this.props;
		
		deleteMaterial(id, ret => {
            fetchMaterials();
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
        const { fetchMaterials, fetchVendors } = this.props;
        fetchMaterials();
        fetchVendors();
    }

    onOpenEditModal(vv){
        this.setState({
            showEditModal: true,
            material: vv
        });
    }

    onCloseEditModal(){
        this.setState({
            showEditModal: false,
            material: null
        });
        const { fetchMaterials, fetchVendors } = this.props;
        fetchMaterials();
        fetchVendors();
    }

    onOpenDeleteModal(id){
        this.setState({
            showDeleteModal: true,
            idMaterial: id
        });
    }

    onCloseDeleteModal(){
        this.setState({
            showDeleteModal: false,
            idMaterial: null
        })
    }

	 
    componentWillMount() {
        const { fetchMaterials, fetchVendors } = this.props;
        fetchMaterials();
        fetchVendors();
    }

    renderList() {
        const { match, materialsById, vendorsById } = this.props;
        
        let materials = materialsById;
        let vendors = vendorsById;


        if (materialsById && materialsById.length > 0 && vendorsById && vendorsById.length > 0) {

            for(let i = 0; i < materials.length; i++){

                for(let j = 0; j < vendors.length; j++){
        
                    if(materials[i].vendor_id == vendors[j]._id){
                        materials[i].vendor_name = vendors[j].name;
                    }
          
                }
                
            }
           
            return <MaterialsList materials={materials}  match={match} />;
        }

        return <MaterialsList materials={[]} match={match} />;
    }

    render() {
		const { handleSubmit, history, match, vendorsById } = this.props; 
    
		return (
			<div className={css(styles.grid)}>
				<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}> 

					<div className={css(styles.listContainer)}>
						<h3 className={css(styles.sectionTitle)}>Lista de Produtos</h3>  
                            <div className={css(styles.card)}>
                                {this.renderList()}
                                <Button
                                    text="Cadastrar Produto"
                                    onClick={this.onOpenModal}
                                />
                            </div>
					</div>

                    <Modal 
						isOpen={this.state.showModal} 
						header="Novo Produto" 
						adjustStyle={styles.newProcedureModal} 
					> 
						<ModalCreateMaterial onCancel={this.onCloseModal} history={history} match={match} vendors={vendorsById}/>
					</Modal>
                    
                    <Modal 
						isOpen={this.state.showDeleteModal} 
						header="Deletar Produto"
						adjustStyle={styles.newProcedureModal} 
					> 
						<ModalDeleteMaterial onCancel={this.onCloseDeleteModal} idMaterial={this.state.idMaterial} del={this.deleteMaterialForm} />
					</Modal>

                    <Modal
                        isOpen={this.state.showEditModal}
                        header="Editar Produto"
                        adjustStyle={styles.newProcedureModal}
                    >
                        <ModalEditMaterial onCancel={this.onCloseEditModal} history={history} match={match} vendors={vendorsById} material={this.state.material} />
                    </Modal>
				</form>
			</div>
		);
	}
}

const listMaterialsForm = reduxForm({
	enableReinitialize: true,
	form: 'listMaterialsForm'
})(ListMaterialsForm);

const listVendorsForm = reduxForm({
	enableReinitialize: true,
	form: 'listVendorsForm'
})(ListVendorsForm);

function mapStateToProps(state) {

    state.storage.selectedMaterial = null;
    state.storage.selectedVendor = null;

	return {
        materialsById: state.storage.materialsById,
        vendorsById: state.storage.vendorsById
	};
}

export default connect(mapStateToProps, { fetchMaterials, createMaterial, deleteMaterial, updateMaterial, fetchVendors })(listMaterialsForm, listVendorsForm);
