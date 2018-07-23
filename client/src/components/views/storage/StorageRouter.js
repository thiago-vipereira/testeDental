import React from 'react';
import { Route } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { gridStyles } from '../DashboardStyles';

import ViewNavBar from '../../bars/ViewNavBar';

import Storage from './Storage';
import Materials from './Materials';
import Vendors from './Vendors';

import DateTimePicker from '../../forms/date/DateTimePicker';

const LINKS = [
    { text: 'Controle de Estoque', path: '', exact: true },
    { text: 'Produtos', path: '/materials' },
    { text: 'Fornecedores', path: '/vendors' },
];

// 'ConfigurationRouter' will manage the routes inside the patient module
function StorageRouter(props) {
    const { match, history } = props;
    
   
	return (

		<div className={css(gridStyles.flex)}>
            <ViewNavBar history={history} match={match} links={LINKS} />
			<Route exact path={`${match.url}`} component={Storage} />
            <Route path={`${match.url}/materials`} component={Materials} />
            <Route path={`${match.url}/vendors`} component={Vendors} />
            
		</div>
        

	);
}

export default StorageRouter;
