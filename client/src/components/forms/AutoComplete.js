import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Autosuggest from 'react-autosuggest';

import { css } from 'aphrodite/no-important';
import { styles } from './AutoCompleteStyles';

import AutocompleteInput from './AutocompleteInput';

const propTypes = {
	/** The autocomplete needs a unique id to render or it will break when used multiple times on a view */
	localId: PropTypes.string.isRequired,
	/** This is an array of objects that the autocomplete is going to use as suggestions on its list */
	suggestions: PropTypes.array.isRequired,
	/** A placeholder is a important hint to help the user identifying what he/she can search in the autocomplete */
	placeholder: PropTypes.string,
	/** A boolean to tell the component if there wasn't found any result at the backend, then the component will render a message to the user */
	noResults: PropTypes.bool.isRequired,
	/** function that handles how to get the value for the search input */
	getSuggestionValue: PropTypes.func.isRequired,
	/** function that handles the fetching of the patients in the database */
	onSuggestionsFetchRequested: PropTypes.func.isRequired,
	/** function that cleans the suggestions */
	onSuggestionsClearRequested: PropTypes.func.isRequired,
	/** function that handles what is done after selecting a suggestion */
	onSelect: PropTypes.func.isRequired,
	/** function that tells the Autocomplete component how to render the suggestions */
	renderSuggestion: PropTypes.func.isRequired
}

const defaultProps = {
	placeholder: 'Buscar...'
};

/**
 * Pass an array of objects to this component and it will make an autocomplete element for the UI.
 * It needs some functions to work properly. Read the documentation about its props for more information
 */

class AutoComplete extends Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.onSuggestionSelected = this.onSuggestionSelected.bind(this);

		this.renderInput = this.renderInput.bind(this);
		this.renderNoResults = this.renderNoResults.bind(this);		

		this.state = {
			value: ''
		};    
	}

	onChange(e, { newValue }) {
		this.setState({
			value: newValue
		});
	}

	onSuggestionSelected(e, { suggestion }) {
		const { onSelect } = this.props;
		
		onSelect(suggestion);	
		
		this.setState({
			value: ''
		});
	};

	renderInput(inputProps) {
		return (
			<AutocompleteInput inputProps={inputProps} />
		);
	}

	renderNoResults() {
		const { noResults } = this.props;

		if (noResults) {
			return <div className={css(styles.noResults)}>Nenhum resultado encontrado :(</div>;
		}
	}

	render() {
		const {
			localId,
			suggestions,
			placeholder,
			getSuggestionValue,
			onSuggestionsFetchRequested,
			onSuggestionsClearRequested,
			renderSuggestion
		} = this.props;

		const { value } = this.state;
		
		const inputProps = { placeholder, value, onChange: this.onChange };

		return (
			<div style={{zIndex: 1}} className={css(styles.container)}>
				<Autosuggest
					id={localId}
					theme={{
						container: css(styles.container),
						suggestionsContainer: css(styles.suggestionsContainer),
						suggestionsList: css(styles.suggestionsList),
						suggestion: css(styles.suggestion)
					}}

					suggestions={suggestions}

					getSuggestionValue={getSuggestionValue}
					onSuggestionsFetchRequested={onSuggestionsFetchRequested}
					onSuggestionsClearRequested={onSuggestionsClearRequested}
					onSuggestionSelected={this.onSuggestionSelected}
					renderSuggestion={renderSuggestion}

					renderInputComponent={this.renderInput}
					inputProps={inputProps}
				/>
				{this.renderNoResults()}
			</div>
		);
	}
}

AutoComplete.propTypes = propTypes;
AutoComplete.defaultProps = defaultProps;

export default AutoComplete;