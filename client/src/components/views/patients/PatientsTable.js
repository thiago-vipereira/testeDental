import React, { Component } from 'react';
import { connect } from 'react-redux';

import { COLORS } from '../../_constants/colors';

import { css } from 'aphrodite/no-important';
import { gridStyles } from '../DashboardStyles';
import { styles } from './PatientsTableStyles';

import Pagination from '../../common/Pagination';
import TableFilter from '../../lists/patients/TableFilter';
import { paginationPatients, selectAll, editPatient } from '../../../actions/patientsSearch';

// 'Activated' will manage the routes inside the patient module

class PatientsTable extends Component {
    
    constructor(props) {
        super(props);
        this.adjustSize = this.adjustSize.bind(this);
        document.body.onresize = this.adjustSize;
        this.filePatient = this.filePatient.bind(this);
        this.openProfile = this.openProfile.bind(this);

        let primary = {color: COLORS.blueDark, fontSize: '.875rem', textDecoration: 'underline'};
        let danger = {color: COLORS.red, fontSize: '.875rem', textDecoration: 'underline'};

        this.state = {
            infos: {
                select: { type: 'CheckBox', disabled: false, parameters: ["_id", "email", "name"], content: this.props.save.select.content, selected: this.props.save.select.selected, unselected: this.props.save.select.unselected, out: this.props.save.select.out },
                registry: { type: 'String', content: this.props.save.content.registry, head: 'Cad.', width: '100px' },
                name: { type: 'String', content: this.props.save.content.name, head: 'Nome', link: { function: this.openProfile, parameters: ["_id"] } }, //link: 'function'
                email: { type: 'String', content: this.props.save.content.email, head: 'E-mail' },
                telephones: { type: 'Array', content: this.props.save.content.telephones, head: 'Telefone', show: 'value', obs: 'name', width: '200px' },
                cpf: { type: 'String', content: this.props.save.content.cpf, head: 'CPF', width: '130px' },
                archive: {style: this.props.status ? danger : primary, type: 'String', placeholder: this.props.status ? 'Arquivar' : "Ativar", link: { function: this.filePatient, parameters: ["_id"] } }
            },
            advanced: this.props.advanced,
            action: this.props.action,
            clickEvent: 0,
            callback: true,
            searchWait: false,
            actionTimer: false,
            prevent: false,
            column: this.props.save.orderTable.column,
            order: this.props.save.orderTable.order
        };
        this.selectAllPatients = this.selectAllPatients.bind(this);
        this.orderTable = this.orderTable.bind(this);
        this.onWrite = this.onWrite.bind(this);
        this.returnUndo = this.returnUndo.bind(this);
        this.changePage = this.changePage.bind(this);
        if (this.props.save.update) {
            this.state.infos.select.disabled = true;
            var height = window.innerHeight - 259;
            var lmt = 5;
            if (height>160) {
                var total = (height/32);
                lmt = total - (total%5);
            }
            this.props.save.pagination.limit = lmt;
            const { paginationPatients } = this.props;
            paginationPatients({ active: this.props.status, 
                                 cad: this.state.infos.registry.content.trim(),
                                 name: this.state.infos.name.content.trim(),
                                 email: this.state.infos.email.content.trim(),
                                 tel: this.state.infos.telephones.content.trim(),
                                 cpf: this.state.infos.cpf.content.trim(),
                                 page: this.props.save.pagination.page,
                                 limit: this.props.save.pagination.limit,
                                 column: this.state.column,
                                 order: this.state.order }, () => {});
            const { selectAll } = this.props;
            selectAll({ active: this.props.status,
                        cad: this.state.infos.registry.content.trim(),
                        name: this.state.infos.name.content.trim(),
                        email: this.state.infos.email.content.trim(),
                        tel: this.state.infos.telephones.content.trim(),
                        cpf: this.state.infos.cpf.content.trim() }, res => {
                            this.state.infos.select.unselected.splice(0, this.state.infos.select.unselected.length);
                            this.state.infos.select.unselected.push(...res);
                            for (var i=0; i<this.state.infos.select.content.length; i++)
                                this.state.infos.select.unselected.splice(this.state.infos.select.unselected.findIndex((item) => item._id === this.state.infos.select.content[i]._id), 1)
                            this.props.save.update = false;
                            this.state.infos.select.disabled = false;
                            this.setState({});
            });
        }
    }
    componentDidMount() {
        if (document.getElementById(this.props.save.pagination.page)!==null && !this.props.save.update) {
            document.getElementById(this.props.save.pagination.page).style.border = "2px solid #45afe5";
            document.getElementById(this.props.save.pagination.page).style.fontWeight = "bold";
        }
    }
    adjustSize () {
        var height = window.innerHeight - 259;
        var lmt = 5;
        if (height>160) {
            var total = (height/32);
            lmt = total - (total%5);
        }
        if (lmt !== this.props.save.pagination.limit) {
            this.props.save.pagination.page = 1;
            this.props.save.pagination.limit = lmt;
            const { paginationPatients } = this.props;
            paginationPatients({ active: this.props.status, 
                                 cad: this.state.infos.registry.content.trim(),
                                 name: this.state.infos.name.content.trim(),
                                 email: this.state.infos.email.content.trim(),
                                 tel: this.state.infos.telephones.content.trim(),
                                 cpf: this.state.infos.cpf.content.trim(),
                                 page: this.props.save.pagination.page,
                                 limit: this.props.save.pagination.limit,
                                 column: this.state.column,
                                 order: this.state.order }, () => {});
        }
    }
    // Input Filter Event
    onWrite (event, value) {
        // this.props.save.content[event] = value.toString().replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&');
        this.state.infos[event].content = this.props.save.content[event] = value.toString();
        if (this.state.callback) {
            this.props.save.pagination.page = 1;
            const { paginationPatients } = this.props;
            this.state.infos.select.disabled = true;
            paginationPatients({ 
                active: this.props.status,
                cad: this.state.infos.registry.content.trim(),
                name: this.state.infos.name.content.trim(),
                email: this.state.infos.email.content.trim(),
                tel: this.state.infos.telephones.content.trim(),
                cpf: this.state.infos.cpf.content.trim(),
                page: this.props.save.pagination.page,
                limit: this.props.save.pagination.limit,
                column: this.state.column,
                order: this.state.order
            }, () => {
                this.state.callback = true;
                if (this.state.searchWait === false) {
                    const { selectAll } = this.props;
                    // get all ID's of the Search - used to Check All later
                    selectAll({
                        active: this.props.status,
                        cad: this.state.infos.registry.content.trim(),
                        name: this.state.infos.name.content.trim(),
                        email: this.state.infos.email.content.trim(),
                        tel: this.state.infos.telephones.content.trim(),
                        cpf: this.state.infos.cpf.content.trim()}, res => {
                            this.state.infos.select.out.splice(0, this.state.infos.select.out.length);
                            this.state.infos.select.out.push(...this.state.infos.select.content);
                            // this.state.infos.select.out = this.props.save.select.out = [...this.state.infos.select.content];
                            this.state.infos.select.selected.splice(0, this.state.infos.select.selected.length);
                            // this.state.infos.select.selected = this.props.save.select.selected = [];
                            this.state.infos.select.unselected.splice(0, this.state.infos.select.unselected.length);
                            // this.state.infos.select.unselected = this.props.save.select.unselected = [];
                            for (var i=0; i<res.length; i++) {
                                var index = this.state.infos.select.out.findIndex((item) => item._id === res[i]._id);
                                if (index != -1) {
                                    this.state.infos.select.selected.push(res[i]);
                                    this.state.infos.select.out.splice(index, 1);
                                } else
                                    this.state.infos.select.unselected.push(res[i]);
                            }
                            if (this.state.searchWait === false) {
                                this.state.infos.select.disabled = false;
                                this.setState({});
                            }
                        }
                    );
                } else {
                    this.state.infos.registry.content = this.props.save.content.registry = this.state.searchWait.cad;
                    this.state.infos.name.content = this.props.save.content.name = this.state.searchWait.name;
                    this.state.infos.email.content = this.props.save.content.email = this.state.searchWait.email;
                    this.state.infos.telephones.content = this.props.save.content.telephones = this.state.searchWait.tel;
                    this.onWrite('cpf', this.state.searchWait.cpf);
                }

            });
            this.state.callback = false;
            this.state.searchWait = false;
        }
        else {
            this.state.searchWait = {
                cad: this.state.infos.registry.content.trim(),
                name: this.state.infos.name.content.trim(),
                email: this.state.infos.email.content.trim(),
                tel: this.state.infos.telephones.content.trim(),
                cpf: this.state.infos.cpf.content.trim(),
            }
        }
    }
    changePage (value) {
        this.props.save.pagination.page = parseInt(value, 10);
        const { paginationPatients } = this.props;
        paginationPatients({
            active: this.props.status,
            cad: this.state.infos.registry.content.trim(),
            name: this.state.infos.name.content.trim(),
            email: this.state.infos.email.content.trim(),
            tel: this.state.infos.telephones.content.trim(),
            cpf: this.state.infos.cpf.content.trim(),
            page: this.props.save.pagination.page,
            limit: this.props.save.pagination.limit,
            column: this.state.column,
            order: this.state.order
        }, () => {});
    }
    // select all check boxes (click event)
    selectAllPatients (info, clicks) {
        if (clicks == 1) {
        // Select current Page (one click)
        let me = this;
            this.state.clickEvent = setTimeout(function() {
                if (!me.state.prevent) {
                    const { search_pagination } = me.props;
                    var pageContent = [...me.state.infos[info].content],
                    pageSelected = [...me.state.infos[info].selected],
                    pageUnselected = [...me.state.infos[info].unselected],
                    empty = true;
                    for (var i=0; i<search_pagination.array.length; i++) {
                        var lgth = me.state.infos[info].parameters.length, item = {};
                        if (lgth == 1)
                            item = search_pagination.array[i][me.state.infos[info].parameters[0]];
                        else
                            for (var k=0; k<lgth; k++)
                                item[me.state.infos[info].parameters[k]] = search_pagination.array[i][me.state.infos[info].parameters[k]];
                        if (me.state.infos[info].selected.find((itm) => itm._id === item._id) !== undefined) {
                            pageContent.splice(pageContent.findIndex((itm) => itm._id === item._id), 1);
                            pageSelected.splice(pageSelected.findIndex((itm) => itm._id === item._id), 1);
                            pageUnselected.push(item);
                        }
                        else {
                            me.state.infos[info].content.push(item);
                            me.state.infos[info].selected.push(item);
                            me.state.infos[info].unselected.splice(me.state.infos[info].unselected.findIndex((itm) => itm._id === item._id), 1);
                            empty = false;
                        }
                    }
                    if (empty) {
                        me.state.infos[info].content.splice(0, me.state.infos[info].content.length);
                        me.state.infos[info].content.push(...pageContent);
                        me.state.infos[info].selected.splice(0, me.state.infos[info].selected.length);
                        me.state.infos[info].selected.push(...pageSelected);
                        me.state.infos[info].unselected.splice(0, me.state.infos[info].unselected.length);
                        me.state.infos[info].unselected.push(...pageUnselected);
                    }
                }
                me.state.prevent = false;
                me.setState({});
            }, 200);
        }
        if (clicks == 2) {
            // Select All the Search (double click)
            clearTimeout(this.state.clickEvent);
            this.state.prevent = true;
            if (this.state.infos[info].unselected.length===0) {
                this.state.infos[info].content.splice(0, this.state.infos[info].content.length);
                this.state.infos[info].content.push(...this.state.infos[info].out);
                // this.state.infos[info].content = this.props.save.select.content = [...this.state.infos[info].out];
                this.state.infos[info].unselected.splice(0, this.state.infos[info].unselected.length);
                this.state.infos[info].unselected.push(...this.state.infos[info].selected);
                // this.state.infos[info].unselected = this.props.save.select.unselected = [...this.state.infos[info].selected];
                this.state.infos[info].selected.splice(0, this.state.infos[info].selected.length);
                // this.state.infos[info].selected = this.props.save.select.selected = [];
            } else {
                this.state.infos[info].content.push(...this.state.infos[info].unselected);
                this.state.infos[info].selected.push(...this.state.infos[info].unselected);
                this.state.infos[info].unselected.splice(0, this.state.infos[info].unselected.length);
                // this.state.infos[info].unselected = this.props.save.select.unselected = [];
            }
            this.setState({});
        }
    }
    // order by column (click event)
    orderTable (column, order) {
        const { paginationPatients } = this.props;
        paginationPatients({ 
            active: this.props.status,
            cad: this.state.infos.registry.content.trim(),
            name: this.state.infos.name.content.trim(),
            email: this.state.infos.email.content.trim(),
            tel: this.state.infos.telephones.content.trim(),
            cpf: this.state.infos.cpf.content.trim(),
            page: this.props.save.pagination.page,
            limit: this.props.save.pagination.limit,
            column: column,
            order: order
        }, () => {});
        this.setState({ column : column, order: order });
    }
    // action of 'arquivar' button
    returnUndo(res) {
        this.props.save.accumulate.splice(0, this.props.save.accumulate.length);
        // for (var i=0; i<res.length; i++)
        //     this.state.infos.select.unselected.push(res[i]);
        this.props.refresh("undo");
    }
    filePatient (ret) {
        this.props.save.accumulate.push ({ find: {'_id': ret._id}, set: {active: this.props.status} });
        clearTimeout(this.state.actionTimer);
        var me = this;
        this.state.actionTimer = setTimeout(() => me.props.save.accumulate.splice(0, me.props.save.accumulate.length), 10000);
        this.state.infos.select.selected.splice(this.state.infos.select.selected.findIndex((item) => item._id === ret._id), 1);
        this.state.infos.select.content.splice(this.state.infos.select.content.findIndex((item) => item._id === ret._id), 1);
        this.state.infos.select.unselected.splice(this.state.infos.select.unselected.findIndex((item) => item._id === ret._id), 1);
        const { editPatient } = this.props;
        var message = this.props.save.accumulate.length + ' paciente' + (this.props.save.accumulate.length>1?'s':'') + ' ' + (this.props.status ? 'arquivado' : 'ativado') + (this.props.save.accumulate.length>1?'s':'') +' com sucesso';
        editPatient({ id: ret._id, props: {active: !this.props.status}, message: message, update: {response: this.returnUndo, send: this.props.save.accumulate} }, () => {
            this.props.refresh(this.props.status ? 'actived' : 'archived');
            const { paginationPatients } = this.props;
            paginationPatients({ 
                active: this.props.status,
                cad: this.state.infos.registry.content.trim(),
                name: this.state.infos.name.content.trim(),
                email: this.state.infos.email.content.trim(),
                tel: this.state.infos.telephones.content.trim(),
                cpf: this.state.infos.cpf.content.trim(),
                page: this.props.save.pagination.page,
                limit: this.props.save.pagination.limit,
                column: this.state.column,
                order: this.state.order
            }, () => {});
        });
    }
    openProfile(ret){
        const { history } = this.props;
        history.push(`/patients/profile/${ret._id}`);
    }
    render() {
        const { search_pagination } = this.props;
        return (
            <div className={css(gridStyles.flex)}>
                <div className={css(gridStyles.flexScroll)} style={{padding: '12px 16px'}}>
                        <div id="conteiner" className={css(gridStyles.tableContainer)}>

                            {<TableFilter width="100%"
                                        array={search_pagination.array}
                                        infos={this.state.infos}
                                        onWrite={this.onWrite}
                                        selectAll={this.selectAllPatients}
                                        limit={this.props.save.pagination.limit}
                                        orderTable={this.orderTable}
                                        column={this.state.column}
                                        order={this.state.order}
                                        expanded={this.state.expanded}
                            />}
                        
                        </div>
                    {<Pagination changePage={this.changePage}
                                 page={this.props.save.pagination.page}
                                 limit={this.props.save.pagination.limit}
                                 length={search_pagination.length}
                    />}
                </div>
            </div>
        );
    }
}

function mapStateToProps({ patientsPaginate }, ownProps) {
    if (ownProps.status) {
        return {
            search_pagination: patientsPaginate.active
        }
    } else {
        return {
            search_pagination: patientsPaginate.filed
        }
    }
}

export default connect(mapStateToProps, { paginationPatients, selectAll, editPatient })(PatientsTable);
