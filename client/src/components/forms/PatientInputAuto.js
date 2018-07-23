import React, { Component } from 'react';
import { connect } from 'react-redux';

import { patientFetch } from '../../actions/component';

import { css } from 'aphrodite/no-important';
import { styles } from './InputAutoCompleteStyles';

class PatientInputAuto extends Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.resultDiv = this.resultDiv.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.onBlur = this.onBlur.bind(this);

		this.state = {
			value: '',
			results: [],
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
		const{ limit, patientFetch, onSelect } = this.props;

		onSelect({id: null, value: e.currentTarget.value});

		this.setState({
			value: e.currentTarget.value,
		});

		if(e.currentTarget.value.length >= 3){
			
			patientFetch({ text: e.currentTarget.value, limit: limit}, res => {
				this.setState({
					results: res,
				});
			});
		} else {

			this.setState({
				results: []
			});

		}
	}

	onSelect({id, value}){
		const { onSelect } = this.props;

		this.state.results.map((item, index) => {
			if(item._id == id){
				this.setState({
					value: item.name,
					results: []
				});
				onSelect(item);
			}
		}, this);
	}

	onBlur(){

		const noResult = () => {
			this.setState({
				results: []
			});
		};
		var time = setTimeout(noResult, 250, this);
	}

	resultDiv() {

		const renderItems = () => {
			return (
				this.state.results.map((item, index) => {

					var inside = null
					inside = item.name.split(new RegExp("("+this.state.value.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&')+")", 'gi'));
					for (var k=1; k < inside.length; k+=2){
						inside[k] = <b>{inside[k]}</b>;
					}
					
					return (
						<li className={css(styles.suggestion)} key={item._id} id={item._id}><div id={item._id} onClick={event => {
							this.onSelect({ id: event.target.parentElement.id, value: event.target.textContent});
						}}>
							<span>{item.registry} | </span>
							{ inside }
							<div>{item.telephones[0].value}</div>
						</div></li>
					);
				}, this)
			);
		};
		
		if(this.state.value.length >= 3 && this.state.results.length > 0 ){
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
		const{ placeholder, label } = this.props;

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
					<input onChange={this.onChange} placeholder={placeholder} value={this.state.value} className={css(styles.input)} onBlur={this.onBlur} ></input>
				</div>
				{this.resultDiv()}
			</fieldset>
		);
	}
}

export default connect(() => { return {} }, { patientFetch })(PatientInputAuto);
