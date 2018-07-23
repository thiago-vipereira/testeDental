import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { gridStyles } from '../../views/DashboardStyles';

import Pagination from '../../common/Pagination';
import TableFilter from '../../lists/patients/TableFilter';

import Modal from '../../modals/Modal';
import { styles } from './AuditFormStyles';

import { fetchtAudit } from '../../../actions/audit'; 

import ModalAuditForm from './modal/ModalAuditForm';
// 'Activated' will manage the routes inside the patient module

class AuditTable extends Component {
    
    constructor(props) {
        super(props);

        this.onOpenAuditModal = this.onOpenAuditModal.bind(this);
        this.onCloseAuditModal = this.onCloseAuditModal.bind(this);
        this.onWrite = this.onWrite.bind(this);
        this.changePage = this.changePage.bind(this);
        this.orderTable = this.orderTable.bind(this);
        this.adjustSize = this.adjustSize.bind(this);
        document.body.onresize = this.adjustSize;

        this.state = {
            infos: {
                date: { type: 'String', content: '', head: 'Data', width: '180px' },
                user: { type: 'String', content: '', head: 'Usuário'},
                module: { type: 'String', content: '', head: 'Módulo' },
                description: { type: 'String', content: '', head: 'Descrição' },
                edit: { type: 'String', placeholder: 'Reverter', link: { function: this.onOpenAuditModal, parameters: ["_id"] } } //link: 'function'
            },
            showAuditModal: false,
            auditToTableSearch: [],
            selectedAudit: null,
            page: 1,
            limit: 15,
            column: 'date',
            order: true,
            length: null,
            ///////FROM FORM
            initDate: null,
			endDate:null
        };
    }

    onWrite(coluna, conteudo){

        const { fetchtAudit } = this.props;
        
        this.state.infos[coluna].content = conteudo.toString();

        fetchtAudit({
            startDate: this.state.initDate, endDate: this.state.endDate, 
            date: this.state.infos.date.content,
            user: this.state.infos.user.content,
            module: this.state.infos.module.content,
            description: this.state.infos.description.content,
            column: this.state.column, order: this.state.order, limit: this.state.limit, page: this.state.page
        }, ret => {
            this.setState({
                auditToTableSearch: ret.list,
                length: ret.length,
            });
        });
    }

    onOpenAuditModal(value) {
        this.setState({ 
            showAuditModal: true,
            selectedAudit: value._id
		}); 
    }
    
	onCloseAuditModal() {
		this.setState({ 
            showAuditModal: false,
            selectedAudit: null
		}); 
	}

    orderTable(coluna, order){
        this.setState({ 
            column: coluna,
            order: order
		});
    }

    changePage(page){
        this.setState({
            page: parseInt(page)
        });
    }

    adjustSize () {
        const { fetchtAudit } = this.props;

        var height = window.innerHeight - 298;
        var lmt = 5;
        if (height>160) {
            var total = (height/32);
            lmt = total - (total%5);
        }
        if (lmt !== this.state.limit) {
            this.state.page = 1;
            this.state.limit = lmt;
            
            fetchtAudit({
                startDate: this.state.initDate, endDate: this.state.endDate, 
                date: this.state.infos.date.content,
                user: this.state.infos.user.content,
                module: this.state.infos.module.content,
                description: this.state.infos.description.content,
                column: this.state.column, order: this.state.order, limit: this.state.limit, page: this.state.page
            }, ret => {
                this.setState({
                    auditToTableSearch: ret.list,
                    length: ret.length,
                });
            });
        }
    }

    /////// FROM FORM

    componentWillMount(){
       
        const { fetchtAudit, initDate, endDate } = this.props;

        this.state.initDate = initDate;
        this.state.endDate = endDate;

        fetchtAudit({
            startDate: initDate, endDate: endDate, 
            date: this.state.infos.date.content,
            user: this.state.infos.user.content,
            module: this.state.infos.module.content,
            description: this.state.infos.description.content,
            column: this.state.column, order: this.state.order, limit: this.state.limit, page: this.state.page
        }, ret => {
			this.setState({
                auditToTableSearch: ret.list,
                length: ret.length,
            });
		});
    }

    componentWillReceiveProps(nextProps){
        
        const { fetchtAudit } = this.props;

        if( nextProps.audit === 'refresh' || nextProps.initDate !== this.state.initDate || nextProps.endDate !== this.state.endDate ){
            
            this.state.initDate = nextProps.initDate;
            this.state.endDate = nextProps.endDate;

            fetchtAudit({
                startDate: nextProps.initDate, endDate: nextProps.endDate, 
                date: this.state.infos.date.content,
                user: this.state.infos.user.content,
                module: this.state.infos.module.content,
                description: this.state.infos.description.content,
                column: this.state.column, order: this.state.order, limit: this.state.limit, page: this.state.page
            }, ret => {
                this.setState({
                    auditToTableSearch: ret.list,
                    length: ret.length,
                });
            });
        }
    }

    componentWillUpdate(nextProps, nextState){

        const { fetchtAudit } = this.props;
        
        if( this.state.column !== nextState.column || this.state.order !== nextState.order || this.state.page !== nextState.page ){
            
            this.state.column = nextState.column;
            this.state.order = nextState.order;
            this.state.page = nextState.page;

            fetchtAudit({
                startDate: this.state.initDate, endDate: this.state.endDate, 
                date: this.state.infos.date.content,
                user: this.state.infos.user.content,
                module: this.state.infos.module.content,
                description: this.state.infos.description.content,
                column: this.state.column, order: this.state.order, limit: this.state.limit, page: this.state.page
            }, ret => {
                this.setState({
                    auditToTableSearch: ret.list,
                    length: ret.length,
                });
            });
        }
    }

    /*componentWillUpdate(nextProps){
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
                    this.state.auditToTable = ret;
                    this.state.auditToTableSearch = ret;
                });
            }
            else{
                this.state.auditToTable = [];
                this.state.auditToTableSearch = [];
            }
        }
    }*/

    render() {
       let d = "";
       for ( var k in this.state.auditToTableSearch){
         
         d=new Date(this.state.auditToTableSearch[k].date); 
         this.state.auditToTableSearch[k].date = d.toLocaleString();
       }

        return (
            <div className={css(gridStyles.flex)}>
                <h3 className={css(styles.sectionTitle)}>Ações dos Usuários Durante o Período</h3>  
                <div className={css(gridStyles.tableContainer)} >    
                    {<TableFilter 
                        width="100%"
                        id="_id"
                        // array JSON
                        array={this.state.auditToTableSearch}
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
                </div>
                <div className={css()} >
                    <Modal
                        isOpen={this.state.showAuditModal} 
                        header={"Reverter Alteração"} 
                        adjustStyle={styles.auditModal} 
                    >
                        <ModalAuditForm onCancel={this.onCloseAuditModal} selectedAudit={this.state.selectedAudit}/>
                    </Modal>
                    {/*<Modal
                        isOpen={this.state.showProcedureDeleteModal} 
                        header={"Deletar Procedimento"} 
                        adjustStyle={styles.newProcedureModal}
                    >
                        <ModalDeleteProcedureForm onCancel={this.closeModalDelete} list={list} group={group} procedure={this.state.selecetedProcedureId}/>
                    </Modal>
                    */}
                     {<Pagination changePage={this.changePage}
                        page={this.state.page}
                        limit={this.state.limit}
                        length={this.state.length}
                    />}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
	return { 
		audit: state.audit.audit,   
	};  
} 

export default connect(mapStateToProps, { fetchtAudit })(AuditTable);
