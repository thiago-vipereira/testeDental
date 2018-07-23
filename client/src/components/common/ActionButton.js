import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './ActionButtonStyles';

import Icon from './Icon';

const propTypes = {
	/**
	 * A function that is called when the user clicks the button
	 */
	onClick: PropTypes.func.isRequired,
	/**
	 * You should implement a ReactTooltip with the ActionButton. The tip prop is a string that contains
	 * the text that will be shown by the tooltip.
	 */
	tip: PropTypes.string.isRequired,
	/**
	 * Name of the icon that you want to render in the Action Button
	 */
	icon: PropTypes.string.isRequired,
	/**
	 * A boolean that when it is 'true' will float the button to the right
	 */
	right: PropTypes.bool
}

const defaultProps = {
	right: false
};

/**
 * This compenent should be used for buttons that executes some action and don't have a label.
 * For example: print buttons, back button in the top bar, new patient button, etc...
 */

function ActionButton({ onClick, tip, icon, right, color, tipid, size }) {
	return (
		<div className={css(styles.btn, right && styles.right)}  onClick={onClick} data-tip={tip} data-for={tipid}>
			<Icon icon={icon} color={color ? color : 'grey'} size={size} classAdjust="marginTop" />
		</div>
	);
}

ActionButton.propTypes = propTypes;
ActionButton.defaultProps = defaultProps;

export default ActionButton;
