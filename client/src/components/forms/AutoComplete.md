#### **Usage**

This is an example of the props you need to pass to Autocomplete to implement it.
In this example we are not using redux. For an example on how to use it with Redux, check the Patient Search model at /src/components/forms/PatientSearch.

```jsx
const patients = [
	{ name: 'Amanda Silva', telephone: '(41) 3256 5489' },
	{ name: 'Carlos Almeida', telephone: '(41) 3255 7897' },
	{ name: 'Diego Souza', telephone: '(41) 3145 7548' }
];

let suggestions = [];

function getSuggestions(value) {
	if (value.trim() === '') {
		return [];
	}

	const regex = new RegExp('^' + value.trim(), 'i');

	return patients.filter(patient => regex.test(patient.name));
}

function fetchSuggestionsResquested({ value }) {
	return suggestions = getSuggestions(value);
};

function clearSuggestions() {
	return suggestions = [];
};

function getSuggestionValue(suggestion) {
	return suggestion.name;
}

function onSuggestionSelect(suggestion) {
	console.log(suggestion.name)
}

function renderSuggestion(suggestion) {
	return (
		<span>{suggestion.name}</span>
	);
}

<AutoComplete
	localId="autocomplete"
	placeholder="Buscar pacientes..."
	suggestions={suggestions}
	noResults={false}
	onSuggestionsFetchRequested={fetchSuggestionsResquested}
	onSuggestionsClearRequested={clearSuggestions}
	onSelect={onSuggestionSelect}
	getSuggestionValue={getSuggestionValue}
	renderSuggestion={renderSuggestion}
/>
```