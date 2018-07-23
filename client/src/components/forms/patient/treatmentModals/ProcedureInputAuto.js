import React, { Component } from 'react';
import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import { styles } from './ProcedureInputAutoStyles';

class ProcedureInputAuto extends Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.resultDiv = this.resultDiv.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.onBlur = this.onBlur.bind(this);

		this.state = {
			value: '',
			results: [],
			itemSelected: null,
			listSearch: null,
		};
	}

	componentDidMount(){
		const{ list, selectedList, value } = this.props;
		
		var listAux = list.find(item => {
			if(item._id == selectedList){
				return true;
			}
			return false;	 
		})

		if(selectedList){
			this.setState({
				listSearch: listAux,
			});
		}

		if(value){
			this.setState({
				value: value.description,
				itemSelected: value,
			});
		}
	}

	componentWillReceiveProps(nextProps){
		var list = nextProps.list.find(item => {
			if(item._id == nextProps.selectedList){
				return true;
			}
			return false;	 
		})
		this.setState({
			listSearch: list,
		});
	}

	onChange(e) {
		const{ limit, onSelect, selectedList } = this.props;
		var results = [];

		onSelect({id: null, value: e.currentTarget.value});

		this.setState({
			itemSelected: null,
			value: e.currentTarget.value,
		});

		if(e.currentTarget.value.length >= 1){

			this.state.listSearch.groups.map(group =>{
				
				if(group.name.toUpperCase().indexOf( e.currentTarget.value.toUpperCase() ) > -1 ){
					
					results.push({type: 'GROUP', name: group.name});
					
					group.procedures.map(procedure =>{
						results.push({type: 'PROCEDURE', item: procedure});
					});
				} else {

					var procedureList = [];
					group.procedures.map(procedure =>{
						
						if(procedure.description.toUpperCase().indexOf( e.currentTarget.value.toUpperCase() ) > -1 ){
							procedureList.push({type: 'PROCEDURE', item: procedure});
						}
					});

					if(procedureList.length > 0){
						
						results.push({type: 'GROUP', name: group.name});
						procedureList.map(procedure =>{
							results.push(procedure);
						});
					}
				}
			});
			this.setState({
				results: results
			});

		} else {

			this.state.listSearch.groups.map(group =>{
				
				results.push({type: 'GROUP', name: group.name});
				group.procedures.map(procedure =>{
					
					results.push({type: 'PROCEDURE', item: procedure});
				});
			});

			this.setState({
				results: results
			});
		}
	}

	onSelect({id, value}){
		const { onSelect } = this.props;

		this.state.results.map((item, index) => {
			if(item.item && item.item._id == id){
				this.setState({
					itemSelected: item.item,
					value: item.item.description,
					results: []
				});
				onSelect(item.item);
			}
		}, this);
	}

	onBlur(){
		const noResult = () => {

			if(!this.state.itemSelected){
				this.setState({
					value: '',
					results: []
				});	
			} else {
				this.setState({
					results: []
				});
			}
		};
		var time = setTimeout(noResult, 250, this);
	}

	resultDiv() {

		const renderItems = () => {
			return (
				this.state.results.map((item, index) => {

					if(item.type == 'GROUP'){

						var inside = null;
						inside = item.name.split(new RegExp("("+this.state.value.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&')+")", 'gi'));
						for (var k=1; k < inside.length; k+=2){
							inside[k] = <b>{inside[k]}</b>;
						}

						return (
							<li className={css(styles.suggestion)} key={'group-'+index} id={'group-'+index}><div id={'group-'+index} onClick={event => {
								//this.onSelect({ id: event.target.parentElement.id, value: event.target.textContent});
							}}>
								<span>Grupo: { inside }</span>
							</div></li>
						);

					} else {

						var itemAux = item.item;
						var inside = null;
						inside = itemAux.description.split(new RegExp("("+this.state.value.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&')+")", 'gi'));
						for (var k=1; k < inside.length; k+=2){
							inside[k] = <b>{inside[k]}</b>;
						}

						return (
							<li className={css(styles.suggestion)} key={itemAux._id} id={itemAux._id}><div id={itemAux._id} onClick={event => {
								this.onSelect({ id: event.target.parentElement.id, value: event.target.textContent});
							}}>
								<span>{ inside }</span>
							</div></li>
						);

					}
				}, this)
			);
		};
		
		if( this.state.results.length > 0 ){
			return (
				<div className={css(styles.suggestionsContainer)} >
					<ul className={css(styles.suggestionsList)}>
						{renderItems()}
					</ul>
				</div>
			);
		}else{
			return (null);
		}
	}

	render() {
		const{ placeholder, label, selectedList } = this.props;

		return (
			<fieldset className={css(styles.fieldset)}>
				<label className={css(styles.label)}>{label}</label>
				<div>
					<svg className={css(styles.icon)} width="18px" height="18px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
						<path className={css(styles.path)}
							d="M17.978,15.148l-4.449-4.449c0.571-1.033,0.898-2.221,0.898-3.484C14.427,3.229,11.197,0,7.213,0C3.229,0,0,3.229,0,7.215
							c0,3.982,3.229,7.214,7.213,7.214c1.25,0,2.425-0.319,3.451-0.879l4.455,4.456L17.978,15.148z M3,7.215C3,4.891,4.89,3,7.213,3
							c2.324,0,4.213,1.891,4.213,4.215c0,2.323-1.89,4.214-4.213,4.214C4.89,11.429,3,9.538,3,7.215z"/>
					</svg>
					{ selectedList ? 
						<input onChange={this.onChange} placeholder={placeholder} value={this.state.value} className={css(styles.input)} onBlur={this.onBlur} onFocus={(e) => { this.onChange(e)}} ></input>
						:
						<input onChange={this.onChange} placeholder={placeholder} value={''} className={css(styles.input)} onBlur={this.onBlur} disabled></input>
					}
				</div>
				{this.resultDiv()}
			</fieldset>
		);
	}
}

export default connect(() => { return {} }, {})(ProcedureInputAuto);
