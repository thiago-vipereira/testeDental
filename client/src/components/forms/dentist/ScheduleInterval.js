import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './DentistScheduleStyles';

import TimePicker from '../time/TimePicker';
import Icon from '../../common/Icon';

const propTypes = {
	/** Funtion that handles what happens when the time picker changes */
	onChange: PropTypes.func.isRequired,
	/** Id of the interval */
	localId: PropTypes.number.isRequired,
	/** Name of the day that this interval is responsable */
	day: PropTypes.string.isRequired,
	/** Inital values for this interval */
	value: PropTypes.object.isRequired
}

/**
 *	Component to render the intervals of the dentist's schedules
 */

class ScheduleInterval extends Component {
	constructor(props) {
		super(props);

		this.state = {
			start: props.value.start,
			end: props.value.end
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.start.hour !== nextProps.value.start.hour || this.state.start.minute !== nextProps.value.start.minute) {
			this.setState({ start: nextProps.value.start });
		}

		if (this.state.end.hour !== nextProps.value.end.hour || this.state.end.minute !== nextProps.value.end.minute) {
			this.setState({ end: nextProps.value.end });
		}
	}

	render() {
		const { start, end } = this.state;
		const { onChange, localId, day, remove, value } = this.props;

		return (
			<div className={css(styles.interval)}>
				das
				<TimePicker name={`${localId}-${day}-start`} hour={start.hour} minute={start.minute} minStep={15} onValueChanged={onChange} />
				às
				<TimePicker name={`${localId}-${day}-end`} hour={end.hour} minute={end.minute} minStep={15} onValueChanged={onChange} />

				<span className={css(styles.delete)} onClick={() => { remove(day, localId) }}><Icon icon="x" size="extra-small" color="grey" className={css(styles.iconX)} /></span>
			</div>
		);
	}
}

ScheduleInterval.propTypes = propTypes;

export default ScheduleInterval;
