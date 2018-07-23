import React from 'react';

import { css } from 'aphrodite/no-important';
import { gridStyles } from '../DashboardStyles';
//import { styles } from './ProfileStyles';

import MaterialsList from '../../lists/storage/MaterialsList';
import ListMaterialsForm from '../../forms/storage/ListMaterialsForm';

// 'Profile' will manage the routes inside the patient module
function Materials(props) {

    const { history, match } = props;

	return (
		<div className={css(gridStyles.flex)}>
            <div className={css(gridStyles.flexScroll)}>
                <ListMaterialsForm history={history} match={match} />
            </div>
        </div>
	);
}

export default Materials;
