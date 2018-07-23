import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetch } from '../../actions/component';

import { css } from 'aphrodite/no-important';
import { styles } from './InputAutoCompleteStyles';

class AutoCompleteByProps extends Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.resultDiv = this.resultDiv.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);

		this.state = {
			value: '',
			results: [],
			fullResults: [],
			inside: false,
			onFocus: false,
		};
	}

	componentWillMount(){
		const { results, value } = this.props;
		this.setState({
			results: results,
			fullResults: results,
			value: value,
		});
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			value: nextProps.value,
		});
	}

	onChange(e) {
		const{  onSelect } = this.props;

		onSelect({id: null, value: e.currentTarget.value});

		this.setState({
			value: e.currentTarget.value,
		});

		this.state.results = this.state.fullResults;
		var resAux = [];
		this.state.fullResults.filter(item => {
			if(item.name.includes(e.currentTarget.value))
			{
				resAux.push(item);
			}
		});

		this.setState({
			results: resAux
		});
	}

	onSelect({id, value}){
		const { onSelect } = this.props;
		
		this.setState({
			value: value,
			results: []
		});
		onSelect({id, value});
	}

	onBlur(){
	
		const noResult = () => {
			this.setState({
				results: [],
			});
		};
		var time = setTimeout(noResult, 250, this);
	}

	onFocus(){
		const { results } = this.props;
		this.setState({
			onFocus: true,
			results: results,
			fullResults: results,
		});
	}

	resultDiv() {

		const{ limit } = this.props;
		var resultAux = 0;

		const renderItems = () => {
			return (
				this.state.results.map((item, index) => {

					if(resultAux < limit){
						resultAux ++;

						return (<li className={css(styles.suggestion)} key={item._id} id={item._id}><div onClick={event => {
							this.onSelect({ id: event.target.parentElement.id, value: event.target.textContent});
							
						}}>{item.name}</div></li>);
								
					}
				})
			);
		};
		
		if(this.state.onFocus && this.state.results.length > 0 ){
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
				<input onChange={this.onChange} placeholder={placeholder} value={this.state.value} className={css(styles.input)} onBlur={this.onBlur} onFocus={this.onFocus} ></input>
				{this.resultDiv()}
			</fieldset>
		);
	}
}

export default connect(() => { return {} }, {})(AutoCompleteByProps);
