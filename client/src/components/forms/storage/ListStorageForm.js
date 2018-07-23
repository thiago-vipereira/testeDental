import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm} from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './StorageFormStyles';

import DateTimePicker from '../date/DateTimePicker';

import StorageList from '../../lists/storage/StorageList';
import { createMaterial, fetchMaterials, fetchMaterialsByDate, deleteMaterial, updateMaterial } from '../../../actions/storage';

import Button from '../../common/Button';
import ModalAddStorage from './modal/ModalAddStorage';
import ModalDeleteMaterial from './modal/ModalDeleteMaterial';
import ModalEditMaterial from './modal/ModalEditMaterial';
import Modal from '../../modals/Modal';

import TableFilter from '../../lists/patients/TableFilter';

import ListMaterialsForm from './ListMaterialsForm';

import SearchByDateInterval from '../../common/SearchByDateInterval'


class ListStorageForm extends Component{
    constructor(props) {
        super(props);
    
        this.renderList = this.renderList.bind(this);
        this.onOpenInModal = this.onOpenInModal.bind(this);
        this.onOpenOutModal = this.onOpenOutModal.bind(this);
        
        this.onCloseModal = this.onCloseModal.bind(this);

        this.onOpenDeleteModal = this.onOpenDeleteModal.bind(this);
        this.onCloseDeleteModal = this.onCloseDeleteModal.bind(this);
        this.deleteMaterialForm = this.deleteMaterialForm.bind(this);

        this.onOpenEditModal = this.onOpenEditModal.bind(this);
        this.onCloseEditModal = this.onCloseEditModal.bind(this);

        this.onInitChange = this.onInitChange.bind(this);
		this.onEndChange = this.onEndChange.bind(this);

        this.state = {
			redirect: false,
            showInModal: false,
            showOutModal: false,
			showDeleteModal: false,
            idMaterial: null,
            material: null,
            showEditModal: false,
            initDate: null,
            endDate:null,
		  }
    }

    onSubmit(values) {
    }

    componentWillMount(){;
		//criar data com newDate() inicial e final + codigo da clinica
        var today = new Date();
        var daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - 30); 
		//this.setState({initDate : daysAgo, endDate: today});
	}
    
    deleteMaterialForm( id ) {
		const { history, match, fetchMaterials, deleteMaterial } = this.props;
        
		deleteMaterial(id, ret => {
            fetchMaterials();
		});
	}

	onOpenInModal() { 
		this.setState({ 
		  	showInModal: true 
		});
    } 
    
    onOpenOutModal() { 
		this.setState({ 
		  	showOutModal: true 
		});
	} 
	 
	onCloseModal() {
		this.setState({ 
            showInModal: false,
            showOutModal: false
        }); 
        const { fetchMaterials, fetchVendors } = this.props;
        fetchMaterials();
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

    onInitChange(init) {
		this.setState({
			initDate: init
		});
	}

	onEndChange(end) {
		this.setState({
			endDate: end
		});
	}

    componentDidUpdate() {
        const { fetchMaterials, fetchVendors, fetchMaterialsByDate } = this.props;
        fetchMaterials();
        if(this.state.initDate && this.state.endDate){
           
            fetchMaterialsByDate({
                startDate: this.state.initDate, endDate: this.state.endDate}, 
                ret => { console.log(ret.list) });
            }else{
                fetchMaterialsByDate();
            }
    }	 
    
    componentDidMount() {
        const { fetchMaterials, fetchVendors, fetchMaterialsByDate } = this.props;
        fetchMaterials();
        if(this.state.initDate && this.state.endDate){
        fetchMaterialsByDate({
            startDate: this.state.initDate, endDate: this.state.endDate});
        }else{
            fetchMaterialsByDate();
        }
    }

    renderList() {
        const { match, materialsById, materialsByDate } = this.props;
        //console.log(materialsById);

    
        if (materialsByDate && materialsByDate.length > 0) {
            //console.log(materialsByDate.list);
            return <StorageList materials={materialsByDate.list} onClick={this.onOpenDeleteModal} match={match} editModal={this.onOpenEditModal}  />;
        }

        return <StorageList materials={[]} match={match} />;
    }

    render() {
		const { handleSubmit, history, match, materialsById, materialsByDate } = this.props; 
    
		return (
            <div>
            
            <SearchByDateInterval searchByDate="true" callbackEnd={this.onEndChange} callbackInit={this.onInitChange} initDate={this.state.initDate} endDate={this.state.endDate} />

			<div className={css(styles.grid)}>

				<form className={css(styles.form)} onSubmit={handleSubmit(this.onSubmit)}> 
                <h3 className={css(styles.sectionTitle)}>Lista de Entrada e Saída de Material</h3> 
					<div className={css(styles.listContainer)}>
						 
							{this.renderList()}
							<Button
								text="Registrar Entrada de Material"
								onClick={this.onOpenInModal}
                                color="green" 
                            />
                            <Button
								text="Registrar Saída de Material"
                                onClick={this.onOpenOutModal}
                                color="red" 
							/>
					</div>

                    <Modal 
						isOpen={this.state.showInModal} 
						header="Entrada de Material" 
						adjustStyle={styles.newProcedureModal} 
					> 
						<ModalAddStorage onCancel={this.onCloseModal} history={history} match={match} materials={materialsById} actionType='in' />
					</Modal>

                    <Modal 
						isOpen={this.state.showOutModal} 
						header="Saída de Material" 
						adjustStyle={styles.newProcedureModal} 
					> 
						<ModalAddStorage onCancel={this.onCloseModal} history={history} match={match} materials={materialsById} actionType='out' />
					</Modal>
 


				</form>
			</div>
        </div>
		);
	}
}

const listMaterialsForm = reduxForm({
	enableReinitialize: true,
	form: 'listMaterialsForm'
})(ListMaterialsForm);

const listStorageForm = reduxForm({
	enableReinitialize: true,
	form: 'listStorageForm'
})(ListStorageForm);

function mapStateToProps(state) {

    state.storage.selectedMaterial = null;
    
	return {
        materialsById: state.storage.materialsById,
        materialsByDate: state.storage.materialsByDate,        
	};
}

export default connect(mapStateToProps, { fetchMaterials, fetchMaterialsByDate, createMaterial, deleteMaterial, updateMaterial })(listStorageForm, listMaterialsForm);
