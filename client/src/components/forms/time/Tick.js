import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './TimePickerStyles';

import Icon from '../../common/Icon';

const propTypes = {
	/** Defines if the tick is to count hours or minutes */
	type: PropTypes.string.isRequired,
	/** The value that will be shown */
	value: PropTypes.number.isRequired,
	/** The function that will run when the user clicks on the increase button */
	increase: PropTypes.func.isRequired,
	/** The function that will run when the user clicks on the increase button */
	decrease: PropTypes.func.isRequired
}

/**
 *	Component used in the Clock component to change the values of the hour or the minute
 */

function Tick(props) {
	const {
		type,
		value,
		increase,
		decrease
	} = props;

	let label = 'hora';
	let valueShow = value.toString();
	
	if (type === 'minutes') {
		label = 'min.';
	}

	if (value.toString().length < 2) {
		valueShow = '0' + value;
	}

	return (
		<div className={css(styles.tick)} >
			<div className={css(styles.tickType)}>{label}</div>

			<div className={css(styles.arrow)} onClick={() => { increase() }} ><Icon icon="upArrow" size="small" color="grey"/></div>

			<div className={css(styles.tickNumber)}>{valueShow}</div>

			<div className={css(styles.arrow)} onClick={() => { decrease() }} ><Icon icon="downArrow" size="small" color="grey" /></div>
		</div>
	);
}

Tick.propTypes = propTypes;

export default Tick;
