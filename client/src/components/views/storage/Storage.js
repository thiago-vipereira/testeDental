import React from 'react';

import { css } from 'aphrodite/no-important';
import { gridStyles } from '../DashboardStyles';
//import { styles } from './ProfileStyles';

import StorageList from '../../lists/storage/StorageList';
import ListStorageForm from '../../forms/storage/ListStorageForm';

// 'Profile' will manage the routes inside the patient module
function Storage(props) {

    const { history, match } = props;

	return (
		<div className={css(gridStyles.flex)}>
            <div className={css(gridStyles.flexScroll)}>
                <ListStorageForm history={history} match={match}  />
            </div>
        </div>
	);
}

export default Storage;
