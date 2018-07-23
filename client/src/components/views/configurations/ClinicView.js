import React from 'react';

import { css } from 'aphrodite/no-important';
import { gridStyles } from '../DashboardStyles';
//import { styles } from './ProfileStyles';

import ClinicForm from '../../forms/clinic/ClinicForm';
import ClinicUsers from './ClinicUsers';
import ClinicDentists from './ClinicDentists';

// 'ClinicView' will manage the routes inside the patient module
function ClinicView(props) {
    const { match, history } = props;

	return (
		<div className={css(gridStyles.flex)}>
            <div className={css(gridStyles.flexScroll)}>
                <ClinicForm />
                <ClinicUsers match={match} />
                <ClinicDentists match={match} history={history} />
            </div>
        </div>
	);
}

export default ClinicView;