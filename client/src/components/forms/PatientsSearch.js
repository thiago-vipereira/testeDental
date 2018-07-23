import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPatients } from '../../actions/patientsSearch';

import { css } from 'aphrodite/no-important';
import { styles } from './InputAutoCompleteStyles';

class PatientsSearch extends Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.resultDiv = this.resultDiv.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onClick = this.onClick.bind(this);

		this.state = {
			value: '',
			results: [],
			isWaiting: false,
			valueNext: '',
		};
	}

	componentWillMount(){
		const{ value } = this.props;
		
		if(value){
			this.setState({
				value: value,
			});
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			value: nextProps.value,
		});
	}

	onChange(e) {
		const{ fetchPatients } = this.props;

		
		if(!this.state.isWaiting){
			this.setState({
				value: e.currentTarget.value,
				valueNext: e.currentTarget.value,
			});
		}else{
			this.setState({
				value: e.currentTarget.value,
			});
		}
		
		if(e.currentTarget.value == ''){
			this.setState({
				results: [],
			});
		}else{
			if(!this.state.isWaiting){
				this.setState({
					isWaiting: true,
				});
				fetchPatients( { value: e.currentTarget.value } , res => {

					if(this.state.value == ''){
						this.setState({
							results: [],
							isWaiting: false,
						});
					} else {
						this.setState({
							results: res,
							isWaiting: false,
						});
					}
					if(this.state.valueNext != this.state.value){
						var send = { currentTarget: {value : this.state.value }}
						this.onChange(send);
					}
				});
			}
		}
	}

	onBlur(){

		const noResult = () => {
			this.setState({
				results: []
			});
		};
		var time = setTimeout(noResult, 250, this);
	}

	onClick(e){
		const { history } = this.props;

		this.setState({
			value: ''
		});
		history.push(`/patients/profile/${e}`);
	}

	resultDiv() {
		const renderItems = () => {
			return (
				this.state.results.map((item, index) => {

					var boldName = null
					boldName = item.name.split(new RegExp("("+this.state.value.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&')+")", 'gi'));
					for (var k=1; k < boldName.length; k+=2){
						boldName[k] = <b key={'name'+k} >{boldName[k]}</b>;
					}

					var boldRegistry = null
					boldRegistry = item.registry.toString().split(new RegExp("("+this.state.value.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&')+")", 'gi'));
					for (var k=1; k < boldRegistry.length; k+=2){
						boldRegistry[k] = <b key={'reg'+k} >{boldRegistry[k]}</b>;
					}

					var boldTelephones = null
					boldTelephones = item.telephones[0].value.split(new RegExp("("+this.state.value.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&')+")", 'gi'));
					for (var k=1; k < boldTelephones.length; k+=2){
						boldTelephones[k] = <b key={'tel'+k} >{boldTelephones[k]}</b>;
					}
					
					return (
						<li className={css(styles.suggestion)} key={item._id} id={item._id}><div id={item._id} onClick={event => {
							this.onClick(item._id);
						}}>
							<span>{ boldRegistry } | </span>
							{ boldName }
							<div>{ boldTelephones }</div>
						</div></li>
					);
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
		return (
			<fieldset className={css(styles.fieldset)}>
				<div className={css(styles.searchFix)}>
					<svg className={css(styles.iconPatient)} width="18px" height="18px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
						<path className={css(styles.pathPatient)}
							d="M17.978,15.148l-4.449-4.449c0.571-1.033,0.898-2.221,0.898-3.484C14.427,3.229,11.197,0,7.213,0C3.229,0,0,3.229,0,7.215
							c0,3.982,3.229,7.214,7.213,7.214c1.25,0,2.425-0.319,3.451-0.879l4.455,4.456L17.978,15.148z M3,7.215C3,4.891,4.89,3,7.213,3
							c2.324,0,4.213,1.891,4.213,4.215c0,2.323-1.89,4.214-4.213,4.214C4.89,11.429,3,9.538,3,7.215z"/>
					</svg>
					<input onChange={this.onChange} placeholder={'Buscar por Paciente...'} value={this.state.value} className={css(styles.inputPatient)} onBlur={this.onBlur} ></input>
				</div>
				{this.resultDiv()}
			</fieldset>
		);
	}
}

export default connect(() => { return {} }, { fetchPatients })(PatientsSearch);
