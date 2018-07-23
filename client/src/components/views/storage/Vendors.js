import React from 'react';
import { Route } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { gridStyles } from '../DashboardStyles';
//import { styles } from './ProfileStyles';

//import VendorsList from '../../lists/storage/VendorsList';
import ListVendorsForm from '../../forms/storage/ListVendorsForm';

// 'Profile' will manage the routes inside the patient module
function Vendors(props) {

    const { history, match } = props;
  

	return (
		<div className={css(gridStyles.flex)}>
            <div className={css(gridStyles.flexScroll)}>
                <ListVendorsForm history={history} match={match} />
            </div>
        </div>
	);
}

export default Vendors;
