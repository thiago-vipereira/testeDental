import React from 'react';
import { Route } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { gridStyles } from './DashboardStyles';

import SideMenu from '../navigation/SideMenu';
import TopBar from '../bars/TopBar';
import SystemMsg from '../notifications/SystemMsg';

import resumeDashboard from './resume/resumeDashboard';
import PatientsRouter from './patients/PatientsRouter';
import StorageRouter from './storage/StorageRouter';
import AuditRouter from './audit/AuditRouter';
import AgendaRouter from './agenda/AgendaRouter';
import ConfigurationRouter from './configurations/ConfigurationRouter';
import WindowsController from './windows/WindowsController';

// 'Dashboard' will manage the routes inside the app
function Dashboard(props) {
	const { history, match } = props;

	return (
		<div className={css(gridStyles.grid)}>
			<SideMenu match={match} history={history} />

			<TopBar history={history} />

			<div className={css(gridStyles.content)}>
				<SystemMsg />

				<Route path={`${match.url}patients`} component={PatientsRouter} />
				<Route path={`${match.url}agenda`} component={AgendaRouter} />
				<Route path={`${match.url}finances`} component={() => <h1>finances</h1>} />
				<Route path={`${match.url}storage`} component={StorageRouter} />
				<Route path={`${match.url}communication`} component={() => <h1>communication</h1>} />
				<Route path={`${match.url}bi`} component={() => <h1>bi</h1>} />
				<Route path={`${match.url}audit`} component={AuditRouter} />

				<Route path={`${match.url}configuration`} component={ConfigurationRouter} />
				
				<Route exact path={match.url} component={resumeDashboard} />

				<WindowsController/>
			</div>
		</div>
	);
}

export default Dashboard;
