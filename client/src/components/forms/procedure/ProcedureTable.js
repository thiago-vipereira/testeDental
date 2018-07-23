import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { COLORS } from '../../_constants/colors';

import { css, StyleSheet } from 'aphrodite/no-important';
import { gridStyles } from '../../views/DashboardStyles';

import Pagination from '../../common/Pagination';
import TableFilter from '../../lists/patients/TableFilter';

import Modal from '../../modals/Modal';
import { styles } from './EditProcedureFormStyles';

import { fetchProcedure, getProcedure } from '../../../actions/procedure';

import ModalProcedureForm from './modal/ModalProcedureForm';
import ModalDeleteProcedureForm from './modal/ModalDeleteProcedureForm';
// 'Activated' will manage the routes inside the patient module

const mathRound = function(number){
    function formatBR(v) {

        if(!v){ v = ''; }
        v = v.toString();

        if(v.search(/([/.]+)/g) == -1){ v = v + '.00'; }

        v=v.replace(/\D/g,'');
        v=v.replace(/(\d{1,2})$/, ',$1'); 
        v=v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        v = v != ''?'R$ '+v:'R$ ';
        return v;
    }

    number = Math.round(number * 100)/100;

    return formatBR(number);
};

class ProcedureTable extends Component {
    
    constructor(props) {
        super(props);

        this.openModalDelete = this.openModalDelete.bind(this);
        this.closeModalDelete = this.closeModalDelete.bind(this);
        this.onOpenProcedureModal = this.onOpenProcedureModal.bind(this);
        this.onCloseProcedureModal = this.onCloseProcedureModal.bind(this);
        this.colorDiv = this.colorDiv.bind(this);
        this.onWrite = this.onWrite.bind(this);

        let primary = {color: COLORS.blueDark, fontSize: '.875rem', textDecoration: 'underline'};
        let danger = {color: COLORS.red, fontSize: '.875rem', textDecoration: 'underline'};

        this.state = {
            infos: {
                color: { type: 'component', component: this.colorDiv, width: '40px' },
                code: { type: 'String', content: '', head: 'Código', width: '100px' },
                description: { type: 'String', content: '', head: 'Descrição'},
                procedure_type: { type: 'String', content: '', head: 'Tipo do Procedimento', width: '175px' },
                price: { type: 'String', content: '', head: 'Preço', width: '130px', mask: mathRound },
                edit: { type: 'String', style: primary, placeholder: 'Editar', width: '40px', link: { function: this.onOpenProcedureModal, parameters: ["_id"] } }, //link: 'function'
                delete: { type: 'String', style: danger, placeholder: 'Excluir', width: '40px', link: { function: this.openModalDelete, parameters: ["_id"] } },
            },
            showProcedureModal: false,
            showProcedureDeleteModal: false,
            selecetedProcedureId: null,
            proceduresToTable: [],
            proceduresToTableSearch: [],
            page: 1,
            limit: 0,
            column: 'code',
            order: true
        };
    }

    onWrite(coluna, conteudo){
        
        this.state.infos[coluna].content = conteudo.toString();

        this.state.proceduresToTableSearch = this.state.proceduresToTable.filter(procedure =>{

            if(procedure.code.includes(this.state.infos.code.content)
                && procedure.description.includes(this.state.infos.description.content)
                && procedure.procedure_type.includes(this.state.infos.procedure_type.content)
                && procedure.price.toString().includes(this.state.infos.price.content.toString()))
            {
                return true;
            }
            return false;
        }, this);
        this.setState({});
    }

    onOpenProcedureModal(value) {
        const { list, group, getProcedure } = this.props;
        
        if(value && list && group){
            getProcedure(list._id, group, value._id, ret =>{  
                this.setState({ 
                    showProcedureModal: true 
                }); 
            });
        }
	}
	onCloseProcedureModal() {
		this.setState({ 
		  	showProcedureModal: false 
		}); 
	}

    closeModalDelete(){
        this.setState({ 
            showProcedureDeleteModal: false
        });
    }

    openModalDelete(value){
        this.setState({ 
            showProcedureDeleteModal: true,
            selecetedProcedureId: value._id
      });
    }

    colorDiv(ret){
        if(ret){
            const style = StyleSheet.create({
                color: {
                    width: '20px',
                    height: '20px', 
                    borderRadius: '2px',
                    background: ret,
                  },
            });
            return(
                <div className={css(styles.swatch)} >
                    <div className={css(style.color)}/>
                </div>
            )
        }
        else{
            return(
                <div style={{height: '30px'}}></div>
            )
        }
    }

    orderTable(coluna, order){

    }

    componentWillReceiveProps(nextProps){

        const { fetchProcedure } = this.props;
        
        if(nextProps.list && nextProps.group){
            
            fetchProcedure(nextProps.list._id, nextProps.group, ret => {
                this.setState({
                    proceduresToTable: ret,
                    proceduresToTableSearch: ret
                });
            });
        }
    }

    componentWillUpdate(nextProps){
        const { fetchProcedure, list, group } = this.props;

        if(nextProps.list){
            var listAux = nextProps.list.groups.filter( item => {
                if(item.active == true){
                    return true;
                }
                return false;
            });
        

            if(list && group && listAux.length > 0){
                
                fetchProcedure(list._id, group, ret => {
                    this.state.proceduresToTable = ret;
                    this.state.proceduresToTableSearch = ret;
                });
            }
            else{
                this.state.proceduresToTable = [];
                this.state.proceduresToTableSearch = [];
            }
        }
    }

    render() {
        const { list, group } = this.props;

        return (
            <div className={css(styles.flex)}>
                <div className={css()} >
                    {<TableFilter 
                        width="100%"
                        id="_id"
                        // array JSON
                        array={this.state.proceduresToTableSearch}
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
                    />}
                    <Modal
                        isOpen={this.state.showProcedureModal} 
                        header={"Editar Procedimento"} 
                        adjustStyle={styles.newProcedureModal} 
                    >
                        <ModalProcedureForm onCancel={this.onCloseProcedureModal} edit={true}/>
                    </Modal>
                    <Modal
                        isOpen={this.state.showProcedureDeleteModal} 
                        header={"Deletar Procedimento"} 
                        adjustStyle={styles.newProcedureModal}
                    >
                        <ModalDeleteProcedureForm onCancel={this.closeModalDelete} list={list} group={group} procedure={this.state.selecetedProcedureId}/>
                    </Modal>
                    {/* {<Pagination changePage={this.changePage}
                        page={this.state.page}
                        limit={this.state.limit}
                        length={search_pagination.length}
                    />} */}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    
    return {
        //selectedGroup : state.procedureConfig.selectedGroup,
		selectedProcedure: state.procedureConfig.selectedProcedure	
	};
}

export default connect(mapStateToProps, { fetchProcedure, getProcedure })(ProcedureTable);
