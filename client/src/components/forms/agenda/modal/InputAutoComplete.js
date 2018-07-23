import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetch } from '../../actions/component';

import { css } from 'aphrodite/no-important';
import { styles } from './InputAutoCompleteStyles';

class InputAutoComplete extends Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.resultDiv = this.resultDiv.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.onBlur = this.onBlur.bind(this);

		this.state = {
			value: '',
			results: [],
			inside: false,
		};
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			value: nextProps.value,
		});
	}

	onChange(e) {
		const{ model, attribute, limit, fetch, onSelect } = this.props;

		onSelect({id: null, value: e.currentTarget.value});

		this.setState({
			value: e.currentTarget.value,
		});

		if(e.currentTarget.value.length >= 3){
			
			fetch({ text: e.currentTarget.value, model: model, attribute: attribute, limit: limit}, res => {
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
		
		this.setState({
			value: value,
			results: []
		});
		onSelect({id, value});
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

		const{ attribute, limit } = this.props;
		var resultAux = 0;

		const renderItems = () => {
			return (
				this.state.results.map((item, index) => {

					if(resultAux < limit){

						return(
							attribute.map((item2, index) =>{
								if( item[item2].search( new RegExp(this.state.value, "i") ) !== -1){
										resultAux ++;
										return (<li className={css(styles.suggestion)} key={item._id} id={item._id}><div onClick={event => {

											this.onSelect({ id: event.target.parentElement.id, value: event.target.textContent});
											
										}}>{item[item2]}</div></li>);
								}
							},this)
						)
					}
				})
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
				<input onChange={this.onChange} placeholder={placeholder} value={this.state.value} className={css(styles.input)} onBlur={this.onBlur} ></input>
				{this.resultDiv()}
			</fieldset>
		);
	}
}

export default connect(() => { return {} }, { fetch })(InputAutoComplete);
