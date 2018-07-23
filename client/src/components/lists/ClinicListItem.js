import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './ClinicsListStyles';

const propTypes = {
	/* function passed by its parent to handle the click event */
	callback: PropTypes.func.isRequired,
	/* The id of the clinic */
	clinicId: PropTypes.string.isRequired,
	/* The name of the clinic */
	name: PropTypes.string.isRequired
}

const defaultProps = {
	name: 'Clínica'
};

function ClinicListItem({ callback, clinicId, clinicDb, name }) {
	const onClick = () => {
		callback(clinicId, clinicDb);
	};

	return (
		<li className={css(styles.listItem)} onClick={onClick}>
			{name}
		</li>
	);
}

ClinicListItem.propTypes = propTypes;
ClinicListItem.defaultProps = defaultProps;

export default ClinicListItem;
