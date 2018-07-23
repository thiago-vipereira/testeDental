import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { selectedProcedure, fetchGroup, selectedGroup } from '../../actions/procedure';

import { css } from 'aphrodite/no-important';
import InputSearch from '../forms/InputSearch';
import { styles } from './GroupsListStyles';

class GroupsList extends Component {
    constructor(props) {
        super(props);
        
        this.search = this.search.bind(this);
        this.renderItems = this.renderItems.bind(this);

          this.state = {
            groupAux: [],
            in: false,
            selected: this.props.thisSelectedGroup
        }
    }

    componentWillReceiveProps(){
        this.setState({
            in: false
        });
    }

    componentDidUpdate(prevProps){
        const { fetchGroup, list, groups } = this.props;

        if(list &&  !this.state.in){
            if(prevProps.groups == groups){
                
            }
            fetchGroup(list, ret => {
                this.setState({
                    in: true,
                    groupAux: [...ret]
                });
            });
        }
    }

    search (event){
        const { fetchGroups } = this.props;

        this.state.groupAux = [...fetchGroups];

        fetchGroups.map(group => {

            if(event.target.value == ""){
                // empty
            }else if(!group.name.includes(event.target.value)){

                this.state.groupAux.splice(this.state.groupAux.indexOf(group), 1);
            }

        }, this);
        this.setState({});
    }

    renderItems(groups, match, renderProcedure, changeColor, edit, del) {
        const { thisSelectedGroup, selectedGroup } = this.props;

        let active = false;
        let actived = false;
        groups.map(group => {
            if(group.active){
                active = true;
            }
            if(this.state.selected == group._id && group.active){
                actived = true;
            }
        });

        if(!actived){
            this.state.selected = null; 
        }
        
        if (groups.length > 0 && active) {
            return groups.map(group => {
                if(!this.state.selected  && group.active){
                    
                    selectedGroup(group._id, res =>{});
                    renderProcedure(group._id);
                    this.state.selected = group._id;

                    return (
                        <li key={group._id} id={group._id} className={css(styles.active, styles.listItem)} onClick={(event) => {
                                changeColor(event);
                                selectedGroup(event.target.id, res => {
                                    //renderProcedure(event.target.id);
                                });
                                renderProcedure(event.target.id);
                            }}
                            onDoubleClick={(event) => {
                                edit(event.target.id);
                            }}>

                            {group.name}

                            <span className={css(styles.link, styles.red)} onClick={(event) => {
                                del(event.target.parentElement.id);
                            }}>Excluir</span>
                        </li>
                    );
                }
                if(group.active){

                    let cssActived = null;
                    if(this.state.selected == group._id){
                        cssActived = css(styles.active, styles.listItem);
                    }else{
                        cssActived = css(styles.listItem);
                    }
                    return (
                        <li key={group._id} id={group._id} className={cssActived} onClick={(event) => {
                                changeColor(event);
                                selectedGroup(event.target.id, res => {
                                    //renderProcedure(event.target.id);
                                });
                                renderProcedure(event.target.id);
                            }}
                            onDoubleClick={(event) => {
                                edit(event.target.id);
                            }}>

                            {group.name}

                            <span className={css(styles.link, styles.red)} onClick={(event) => {
                                del(event.target.parentElement.id);
                            }}>Excluir</span>
                            <div style={{clear:'both'}}></div>
                        </li>
                    );
                }
            });
        } else {
            return (
                <li className={css(styles.noItems)}>
                    Nenhum Grupo cadastrado
                </li>
            );
        }
    }

    changeColor(item){
        var arr = Array.from(item.target.parentElement.children);
        arr.map(child => {
            if(child.tagName == "LI"){
                if(child.id == item.target.id){
                    child.className = css(styles.active, styles.listItem);
                }else{
                    child.className = css(styles.listItem);
                }
            }
        });
    }

    render() {
        const { match, renderProcedure, edit, del } = this.props;

        return (
            <div>
                <InputSearch onChange={event => this.search(event)} placeholder='Buscar Grupo...' />
                <ul className={css(styles.list)}>
                    {this.renderItems(this.state.groupAux, match, renderProcedure, this.changeColor, edit, del)}
                </ul>
            </div>
        )
    };
}

const groupsList = reduxForm({
	//validate,
	enableReinitialize: true,
	form: 'groupsList'
})(GroupsList);

function mapStateToProps(state) {

	return {
        thisSelectedGroup : state.procedureConfig.selectedGroup,
        selectedProcedures: state.procedureConfig.selectedProcedure,
        fetchGroups : state.procedureConfig.fetchGroups	
	};
}

export default connect(mapStateToProps, { fetchGroup, selectedGroup })(groupsList);