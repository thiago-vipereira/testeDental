import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './EditProcedureFormStyles';

import { getList, fetchGroup, selectedGroup } from '../../../actions/procedure';

import Button from '../../common/Button';
import Modal from '../../modals/Modal';

import GroupsList from '../../lists/GroupsList';
import ProcedureTable from './ProcedureTable';

import ModalEditListForm from './modal/ModalEditListForm';
import ModalGroupForm from './modal/ModalGroupForm';
import ModalDeleteGroupForm from './modal/ModalDeleteGroupForm';
import ModalProcedureForm from './modal/ModalProcedureForm';

import InputField from '../../forms/InputField';

// editProcedureForm handles the form where the user enter the app
class EditProcedureForm extends Component {
	constructor(props) {
		super(props); 
	 
		this.onSubmit = this.onSubmit.bind(this);
		this.onOpenModal = this.onOpenModal.bind(this); 
		this.onCloseModal = this.onCloseModal.bind(this);
		
		this.isEditGroup = this.isEditGroup.bind(this);

		this.onOpenDeleteGroup = this.onOpenDeleteGroup.bind(this);
		this.onCloseDeleteGroup = this.onCloseDeleteGroup.bind(this);

		this.onOpenListNameModal = this.onOpenListNameModal.bind(this);
		this.onCloseListNameModal = this.onCloseListNameModal.bind(this);

		this.onOpenProcedureModal = this.onOpenProcedureModal.bind(this);
		this.onCloseProcedureModal = this.onCloseProcedureModal.bind(this);

		this.renderProcedure = this.renderProcedure.bind(this);
	 
		this.state = {
		  redirect: false,
		  
		  showModal: false,
		  deleteGroupModal: false,
		  nameListModal: false,
		  showProcedureModal : false,

		  editGroupId: "",
		  editGroupName: "",
		  deleteGroupId: null,
		  
		  listName: null,

		  procedureGroupIdToTable: null
		}
	}
	
	componentWillReceiveProps() {

		if(this.refs.form){
			this.refs.form.reset();
		}
	}

	componentWillMount(){
		const { getList, match, fetchGroup, selectedProcedure } = this.props;

		getList(match.params.procedureId, ret => {
			
			if(ret.name){
				this.setState({
					listName: ret.name
				});
			}
			fetchGroup(ret._id, ret => {
			});
		});
	}

	componentWillUpdate(){
		const { selectedProcedure } = this.props;
		
		if(selectedProcedure){
			if(selectedProcedure.name != this.state.listName){
				this.setState({
					listName: selectedProcedure.name
				});
			}
		}
	}

	onSubmit(values) {
	}

	shouldComponentUpdate(){
		const { getList, match, selectedProcedure, fetchGroup } = this.props;
		
		if(selectedProcedure){
			return true;
		}
		return false;
	}

	onOpenModal() {
		this.setState({ 
		  	showModal: true 
		});
	} 
	onCloseModal() {
		this.setState({ 
			editGroupId: "",
			editGroupName: "",
			showModal: false 
		});
	}

	onOpenDeleteGroup(id) {
		this.setState({ 
			deleteGroupModal: true,
			deleteGroupId: id
		}); 
	}
	onCloseDeleteGroup() {
		this.setState({ 
			deleteGroupModal: false,
			deleteGroupId: null
		}); 
	}

	onOpenListNameModal() {
		this.setState({
			nameListModal: true
		}); 
	}
	onCloseListNameModal() {
		this.setState({ 
			nameListModal: false
		}); 
	}

	onOpenProcedureModal() {
		this.setState({ 
		  	showProcedureModal: true 
		}); 
	} 
	onCloseProcedureModal() { 
		this.setState({ 
		  	showProcedureModal: false 
		}); 
	}

	isEditGroup(id) {
		
		const { selectedProcedure } = this.props;

		this.setState({ 
			editGroupId: id
		});

		selectedProcedure.groups.map(item => {
			if(item._id == id){

				this.setState({
					editGroupName: item.name
				});
			}
		});
		this.onOpenModal();
	}

	renderGroups() {
		
		const { match, match: { params }, selectedProcedure, fetchGroups } = this.props;
		
			if (selectedProcedure) {
				if(fetchGroups){
					return <GroupsList list={selectedProcedure._id} match={match} renderProcedure={this.renderProcedure} del={this.onOpenDeleteGroup} edit={this.isEditGroup} />;
				}
			}
	
			return <GroupsList groups={[]} />;
	}

	renderProcedure(procedure) {

		const { selectedGroup } = this.props;

		//selectedGroup(procedure, ret => {
			this.setState({
				procedureGroupIdToTable: procedure 
			});
		//}); 
	}
			
	renderFields(fields) {
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

	render() {
		const { handleSubmit, selectedProcedure } = this.props;

		return (
		<div className={css(styles.grid)}>
			<form className={css(styles.form)} ref={"form"} onSubmit={handleSubmit(this.onSubmit)}>

				<div className={css(styles.formList)}>
					<h3 className={css(styles.sectionTitle)}>Lista</h3>
					<div className={css(styles.section)}>
						<div className={css(styles.row)}>
							<div>
								<span className={css(styles.listName)}>{this.state.listName}</span>
								<span onClick={event => { this.onOpenListNameModal() }} className={css(styles.link)}>Editar</span>
							</div>
						</div>
					</div>
				</div>

				<div className={css(styles.formContent)}>
					<div className={css(styles.formGroup)}>
						<h3 className={css(styles.sectionTitle)}>Grupo</h3>
						<div className={css(styles.backgroundGroup)}> 
							{this.renderGroups()}								
							<Button size="full" text="Cadastrar novo Grupo" onClick={this.onOpenModal} /> 
						</div>
					</div>
					<div className={css(styles.formProcedure)}>	
						<h3 className={css(styles.sectionTitle)}>Procedimentos</h3>
						<div className={css(styles.backgroundProcedure)}>
							<ProcedureTable list={selectedProcedure} group={this.state.procedureGroupIdToTable}  />
							<Button style={{marginTop: '1rem'}} text="Cadastrar novo Procedimento" onClick={this.onOpenProcedureModal} /> 
						</div>
					</div>
				</div>
				<Modal
					isOpen={this.state.nameListModal}
					header={"Editar Lista de Procedimentos"}
					adjustStyle={styles.newProcedureModal}
				>
            		<ModalEditListForm onCancel={this.onCloseListNameModal} />
          		</Modal>
				<Modal
					isOpen={this.state.showModal} 
					header={this.state.editGroupId == "" ? "Novo Grupo de Procedimentos" : "Editar Grupo de Procedimentos"} 
					adjustStyle={styles.newProcedureModal} 
				>
            		<ModalGroupForm onCancel={this.onCloseModal} id={this.state.editGroupId} name={this.state.editGroupName} />
          		</Modal>
				<Modal
					isOpen={this.state.deleteGroupModal} 
					header={"Deletar Grupo de Procedimentos"} 
					adjustStyle={styles.newProcedureModal} 
				>
            		<ModalDeleteGroupForm onCancel={this.onCloseDeleteGroup} idGroup={this.state.deleteGroupId}/>
          		</Modal>
				<Modal
					isOpen={this.state.showProcedureModal} 
					header={"Cadastrar Procedimento"} 
					adjustStyle={styles.newProcedureModal} 
				>
            		<ModalProcedureForm onCancel={this.onCloseProcedureModal} />
          		</Modal>
				
		  	</form> 
      </div> 
		);
	}
}

const editProcedureForm = reduxForm({
	//validate,
	enableReinitialize: true,
	form: 'editProcedureForm'
})(EditProcedureForm);

function mapStateToProps(state) {
	const selectedProcedure = state.procedureConfig.selectedProcedure;
	const fetchGroups = state.procedureConfig.fetchGroups;
	let initialValues = {}; 
	
	if (selectedProcedure) {
		initialValues = selectedProcedure; 
	}

	return {
		fetchGroups : state.procedureConfig.fetchGroups,
		selectedProcedure: state.procedureConfig.selectedProcedure,
		initialValues
	};
}

export default connect(mapStateToProps, { getList, fetchGroup, selectedGroup })(editProcedureForm);
