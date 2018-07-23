import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios';
import T from 'i18n-react';

import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';

// importing all the reducers to add them to our store
import reducers from './reducers';
import { AUTH_USER, LOGOUT } from './actions/auth';

// importing the App component to pass it to ReactDOM
import App from './components/App';
import {LIBRARY} from './components/_constants/library';

T.setTexts(LIBRARY);

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const renderApp = async () => {
	const res = await axios.get('/api/session');
	const user = res.data.user;
	const clinic = res.data.clinic;

	if (user && clinic) {
		store.dispatch({ type: AUTH_USER, payload: { user, clinic } });
	} else {
		store.dispatch({ type: LOGOUT, payload: 'unauthorized' });
	}

	// rendering the App with Redux
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	);
};
renderApp();
