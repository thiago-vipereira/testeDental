import React, { Component } from 'react';
import { connect } from 'react-redux';

import DOMPurify from 'dompurify';

import { css } from 'aphrodite/no-important';
import { styles } from './PatientsSearchStyles';

import { fetchPatients, clearPatients, selectPatient } from '../../actions/patientsSearch';

import AutoComplete from '../forms/AutoComplete';

class PatientsSearch extends Component {
	constructor(props) {
		super(props);

		this.onPatientsGetValue = this.onPatientsGetValue.bind(this);
		this.onPatientsFetch = this.onPatientsFetch.bind(this);
		this.onPatientsClear = this.onPatientsClear.bind(this);
		this.onPatientSelect = this.onPatientSelect.bind(this);

		this.renderSuggestion = this.renderSuggestion.bind(this);
	}

	// function that handles how to get the value for the search input
	onPatientsGetValue(suggestion) {
		return suggestion.name;
	}

	// function that handles what to do when the user selects a suggestion
	onPatientSelect(suggestion) {
		const { history, selectPatient } = this.props;
		
		selectPatient(suggestion, patient => {
			history.push(`/patients/profile/${patient}`);
		});
	}

	// function that handles the fetching of the patients in the database
	onPatientsFetch({ value }) {
		const { clinic, fetchPatients } = this.props;
		
		fetchPatients({ query: value.trim(), clinic: clinic._id });
	}

	// function that cleans the state
	onPatientsClear() {
		
		this.props.clearPatients();
	}

	// function that tells the Autocomplete component how to render the suggestions
	renderSuggestion(suggestion, { query }) {
		const rgx = new RegExp(`(${query})`, 'gi');
		const highlight = `<b>$1</b>`;
		let registryFormatted = '';

		const name = suggestion.name.replace(rgx, highlight);
		const email = suggestion.email && suggestion.email.replace(rgx, highlight);
		const registry = suggestion.registry && suggestion.registry.toString().replace(rgx, highlight);
		const telephone = suggestion.telephones[0] && suggestion.telephones[0].value.replace(rgx, highlight);

		if (suggestion.registry) {
			let numberOfZeros = 4 - suggestion.registry.length;
			
			for (var i = 0; i < numberOfZeros; i++) {
				registryFormatted += '0';
			}
			
			registryFormatted += registry;
		}

		let suggestionHtml = `<span>${registry ? registryFormatted : '0000'} | </span><span>${name}</span>${email ? `<div>${email}</div>` : ''}${telephone ? `<div>${telephone}</div>` : ''}`;

		return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(suggestionHtml) }}></div>;
	}

	render() {
		const { localId, suggestions, noResults } = this.props;
		
		return (
			<span className={css(styles.searchFix)}>
				<AutoComplete
					localId={localId}
					placeholder="Buscar pacientes..."
					suggestions={suggestions}
					noResults={noResults}
					onSuggestionsFetchRequested={this.onPatientsFetch}
					onSuggestionsClearRequested={this.onPatientsClear}
					onSelect={this.onPatientSelect}
					getSuggestionValue={this.onPatientsGetValue}
					renderSuggestion={this.renderSuggestion}
				/>
			</span>
		);
	}
}

function mapStateToProps({ auth, patientsSearch }) {
	return {
		clinic: auth.clinic,
		selected: patientsSearch.selected,
		suggestions: patientsSearch.suggestions,
		noResults: patientsSearch.noResults
	}
}

export default connect(mapStateToProps, { fetchPatients, clearPatients, selectPatient })(PatientsSearch);
