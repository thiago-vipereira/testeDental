import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './ActionLinkStyles';

const propTypes = {
	/** Funtion that handles what happens when the time picker changes */
	action: PropTypes.func.isRequired,
	/** Id of the interval */
	text: PropTypes.string.isRequired
}

/**
 *	Component to render the intervals of the dentist's schedules
 */

function ActionLink(props) {
	const { text, action } = props;

	return <span className={css(styles.link)} onClick={() => { action() }}>{text}</span>;
}

ActionLink.propTypes = propTypes;

export default ActionLink;
