import React from 'react';

import { css } from 'aphrodite/no-important';
import { gridStyles } from '../DashboardStyles';
//import { styles } from './ProfileStyles';

import ProfileForm from '../../forms/profile/ProfileForm';

// 'Profile' will manage the routes inside the patient module
function Profile(props) {
	return (
		<div className={css(gridStyles.flex)}>
            <div className={css(gridStyles.flexScroll)}>
                <ProfileForm />
            </div>
        </div>
	);
}

export default Profile;
