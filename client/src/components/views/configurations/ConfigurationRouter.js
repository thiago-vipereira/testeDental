import React from 'react';
import { Route } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { gridStyles } from '../DashboardStyles';

import ViewNavBar from '../../bars/ViewNavBar';
import Profile from './Profile';
import ProcedureRouter from './ProcedureRouter';
import ModelsRouter from './ModelsRouter';
import ClinicRouter from './ClinicRouter';
import ImportingRouter from './ImportingRouter';

const LINKS = [
    { text: 'Perfil e Conta', path: '', exact: true },
    { text: 'Clínicas', path: '/clinic' },
    { text: 'Listas de Procedimentos', path: '/procedures' },
    { text: 'Modelos', path: '/models' },
    { text: 'Importação', path: '/importing' },
];

// 'ConfigurationRouter' will manage the routes inside the patient module
function ConfigurationRouter(props) {
	const { match, history } = props;

	return (
		<div className={css(gridStyles.flex)}>
            <ViewNavBar history={history} match={match} links={LINKS} />

			<Route path={`${match.url}/clinic`} component={ClinicRouter} />
            <Route path={`${match.url}/procedures`} component={ProcedureRouter} />
            <Route path={`${match.url}/models`} component={ModelsRouter} />
            <Route path={`${match.url}/importing`} component={ImportingRouter} />

			<Route exact path={`${match.url}`} component={Profile} />
		</div>
	);
}

export default ConfigurationRouter;
