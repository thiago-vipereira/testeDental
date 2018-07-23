import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LogIn from './views/Login';
import Dashboard from './views/Dashboard';
import RememberPass from './views/RememberPass';

import RequireAuth from './hoc/requireAuth';

// 'App' will manage redux and routes
function App(props) {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={LogIn} />
				<Route path="/rememberpass" component={RememberPass} />
				<Route path="/" component={RequireAuth(Dashboard)} />
				
				<Route component={() => <h1>404</h1>}/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
