import React, {Component} from 'react';
import { connect } from 'react-redux';
import { reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';

import { fetchMaterials, deleteMaterial, updateMaterial, fetchVendors } from '../../../actions/storage';

import { COLORS } from '../../_constants/colors';

import { css } from 'aphrodite/no-important';
import { styles } from './MaterialsListStyles';

import Icon from '../../common/Icon';

import ReactTooltip from 'react-tooltip';


import TableFilter from './TableFilterStorage';
import ModalDeleteMaterial from '../../forms/storage/modal/ModalDeleteMaterial';
import ModalEditMaterial from '../../forms/storage/modal/ModalEditMaterial';
import Modal from '../../modals/Modal';

import ListVendorsForm from '../../forms/storage/ListVendorsForm';
import ListMaterialsForm from '../../forms/storage/ListMaterialsForm';

class MaterialsList extends Component {
	constructor(props) {
		super(props);

        this.renderItems = this.renderItems.bind(this);
        this.orderTable = this.orderTable.bind(this);

        this.onOpenDeleteModal = this.onOpenDeleteModal.bind(this);
        this.onCloseDeleteModal = this.onCloseDeleteModal.bind(this);
  

        let primary = {color: COLORS.blueDark, fontSize: '.875rem', textDecoration: 'underline'};
        let danger = {color: COLORS.red, fontSize: '.875rem', textDecoration: 'underline'};

        

        this.state = {
            idMaterial: null,
            showDeleteModal: false,
            noStorage: true,
            column: 'date',
            order: true,
            infos: {
                warning: { type: 'Warning' },
                name: { type: 'String', content: '', head: 'Produto'  },
                vendor_name: { type: 'String', content: '', head: 'Fornecedor', width: '250px'},
                quantity: { type: 'String', content: '', head: 'Qtd. Atual', width: '100px', margin: '18px' },
                max: { type: 'String', content: '', head: 'Qtd. Máx.', width: '100px', margin: '18px' },
                min: { type: 'String', content: '', head: 'Qtd. Mín.', width: '100px', margin: '18px' },
                edit: { type: 'String', style: primary, placeholder: 'Editar', width: '50px', link: { function: this.editModal, parameters: ["_id"] } }, //link: 'function'
                delete: { type: 'String', style: danger, placeholder: 'Excluir', width: '50px', link: { function: this.onOpenDeleteModal, parameters: ["_id"] } },
                
            }
        }
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

    deleteMaterialForm( id ) {
		const { history, match, fetchMaterials, deleteMaterial, fetchVendors } = this.props;
		
		deleteMaterial(id, ret => {
            fetchMaterials();
            fetchVendors();
		});
	}

    orderTable(coluna, order){
        this.setState({ 
            column: coluna,
            order: order
		});
    }

renderItems(materials, match){
    

    
  

/*     for(let i = 0; i < materials.length; i++){

        for(let j = 0; j < vendors.length; j++){

            if(materials[i].vendor_id == vendors[j]._id){
                materials[i].vendor_name = vendors[j].name;
            }
            
        }
        
        console.log(materials[i]);
    } */

    if (materials.length > 0) {

        for(let i = 0; i < materials.length; i++){

            if(materials[i].quantity <= materials[i].min){

                materials[i].warning = "true";
             
            }

        }


       
        return ( 
                
            <TableFilter 
            width="100%"
            id="_id"
            // array JSON
            array={materials}
            // infos das colunas da tabela              
            infos={this.state.infos}
            // evento ao escrever no input (coluna, conteudo)
            onWrite={this.onWrite}
            // qtd de linhas
            limit={this.state.limit}
            // evento clica coluna (coluna, order-boolean)
            orderTable={this.orderTable}
            // default coluna ordenada
            column={this.state.column}
            order={this.state.order}

            type="materials"
            />
     

         
        );

        


/*             return (
                
                <li key={material._id} id={material._id} className={css(styles.listItem)}>
                    {material.name}
                    
                      
                    <span onClick={event => {
                        
                        openModal(event.target.parentElement.id);
                        
                    }} className={css(styles.link, styles.red)}>Excluir</span>

                    <span onClick={event => {

                        openEditModal(material);

                    }} className={css(styles.link)}>Editar</span>
*/

                        
        
     
        


    }else{
        return (
            <li className={css(styles.noItems)}>
                Nenhum produto cadastrado
            </li>
        );
    }
    
    
};

// 'proceduresList' will manage the routes inside the app
render() {
    const { match, materials} = this.props;
    
	return (
		<div>
            {this.renderItems(materials, match)}
                    <div className={css(styles.grid)}>

                    <Modal 
                    isOpen={this.state.showDeleteModal} 
                    header="Deletar Produto"
                    adjustStyle={styles.newProcedureModal}
                    > 
                        <ModalDeleteMaterial onCancel={this.onCloseDeleteModal} idMaterial={this.state.idMaterial} del={this.deleteMaterialForm} />

                    </Modal> 

                    </div>  
		</div>
	);
}

}




export default MaterialsList;

