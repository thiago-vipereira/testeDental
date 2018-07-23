import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './TimePickerStyles';

import Tick from './Tick';

const propTypes = {
	/** This prop determines if the clock should be shown or hidden */
	visible: PropTypes.bool.isRequired,
	/** Pass the top and left coordines to this prop */
	position: PropTypes.object.isRequired,
	/** The value of the hour managed by the TimePicker */
	hour: PropTypes.number.isRequired,
	/** The value of the minute managed by the TimePicker */
	minute: PropTypes.number.isRequired,
	/** Function that manages what happens when the user clicks on the increase button of the hour tick */
	onIncreaseHour: PropTypes.func.isRequired,
	/** Function that manages what happens when the user clicks on the decrease button of the hour tick */
	onDecreaseHour: PropTypes.func.isRequired,
	/** Function that manages what happens when the user clicks on the increase button of the minute tick */
	onIncreaseMinute: PropTypes.func.isRequired,
	/** Function that manages what happens when the user clicks on the increase button of the minute tick */
	onDecreaseMinute: PropTypes.func.isRequired,
}

/**
 * Component used by the TimePicker component to render a hour and minute selector
 */

function Clock(props) {
	const {
		visible,
		position,
		hour,
		minute,
		onIncreaseHour,
		onDecreaseHour,
		onIncreaseMinute,
		onDecreaseMinute
	} = props;

	let posStyle = { top: position.top, left: -15, bottom: position.bottom };

	let direction = position.bottom ? 'above' : '';

	return (
		<div className={css(styles.tp_clock, styles[direction], !visible ? styles.hide : '')} style={posStyle} >
			<Tick
				type="hours"
				value={hour}
				increase={onIncreaseHour}
				decrease={onDecreaseHour}
			/>

			<Tick
				type="minutes" 
				value={minute} 
				increase={onIncreaseMinute} 
				decrease={onDecreaseMinute}
			/>
		</div>
	);
}

Clock.propTypes = propTypes;

export default Clock;
