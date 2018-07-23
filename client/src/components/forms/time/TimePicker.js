import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './TimePickerStyles';

import InputMask from 'react-input-mask';
import Clock from './Clock';

const propTypes = {
	/** Unique name to identify the input */
	name: PropTypes.string.isRequired,
	/** Sets the initial time for the time picker. It needs to be an object with the an hour and a minute attribute */
	hour: PropTypes.number.isRequired,
	/** Sets the initial time for the time picker. It needs to be an object with the an hour and a minute attribute */
	minute: PropTypes.number.isRequired,
	/** How much the component should increase or decrese the hour each time */
	hourStep: PropTypes.number,
	/** How much the component should increase or decrese the minute each time */
	minStep: PropTypes.number,
	/** Function that handles what happens when the value of the time picker changes */
	onValueChanged: PropTypes.func
};

const defaultProps = {
	hourStep: 1,
	minStep: 1,
	onValueChanged: value => console.log(value)
};

class TimePicker extends Component {
	constructor(props) {
		super(props);

		this.getValue = this.getValue.bind(this);

		this.onChange = this.onChange.bind(this);

		this.onShow = this.onShow.bind(this);
		this.onHide = this.onHide.bind(this);

		this.onIncreaseHour = this.onIncreaseHour.bind(this);
		this.onDecreaseHour = this.onDecreaseHour.bind(this);
		this.onIncreaseMinute = this.onIncreaseMinute.bind(this);
		this.onDecreaseMinute = this.onDecreaseMinute.bind(this);

		this.onDocumentClick = this.onDocumentClick.bind(this);

		this.state = {
			visible: false,
			inputValue: '12:00',
			hour: props.hour,
			minute: props.minute,
			hourStep: props.hourStep,
			minStep: props.minStep,
			position: {
				top: 0,
				left: 0,
				direction: 'below'
			}
		}
	}

	componentDidMount() {
		// add click event to hide the clock
		document.addEventListener('click', this.onDocumentClick);

		// set the default value of the timePicker
		this.getValue(this.state.hour, this.state.minute);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.hour !== this.state.hour || nextProps.minute !== this.state.minute) {
			this.getValue(nextProps.hour, nextProps.minute);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { inputValue } = this.state;
		const { onValueChanged, name } = this.props;

		if (inputValue !== prevState.inputValue) {
			onValueChanged(inputValue, name);
		}
	}

	componentWillUnmount() {
		// remove click event to hide the clock
		document.removeEventListener('click', this.onDocumentClick);
	}

	// method that formats the value to 'HH:mm'
	getValue(hour, minute) {
		let txtHour = hour.toString();
		let txtMin = minute.toString();

		if (txtHour.length < 2) { txtHour = '0' + txtHour };
		if (txtMin.length < 2) { txtMin = '0' + txtMin };

		this.timeInput.value = `${txtHour}:${txtMin}`;
		this.timeInput.input.value = `${txtHour}:${txtMin}`;

		return `${txtHour}:${txtMin}`;
	}

	// method that handles when the user types the value insteade of tick the clock
	onChange() {
		const value = this.timeInput.value;
		let valSplitted;
		let hour;
		let min;

		switch(value.length) {
			// value of 1
			case 1:
				break;
			// value of 11
			case 2:
				hour = Number(value);
				break;
			case 4:
				valSplitted = value.split(':');
				hour = Number(valSplitted[0]);
				break;
			// value of 11:11
			default:
				valSplitted = value.split(':');
				hour = Number(valSplitted[0]);
				min = Number(valSplitted[1]);
		}

		if (hour && hour > 23) { hour = 0 };
		if (min && min > 59) { min = 0 };

		this.setState({
			inputValue: this.timeInput.value,
			hour: hour ? hour : 0,
			minute: min ? min : 0
		})
	}

	// method that increases the hour value
	onIncreaseHour() {
		const { hour, minute, hourStep } = this.state;
		const hourIncreased = hour + hourStep;

		let inputValue = this.getValue(hourIncreased, minute);

		if (hourIncreased < 24) {
			this.setState({
				hour: hourIncreased,
				inputValue
			});
		} else {
			inputValue = this.getValue(0, minute);

			this.setState({
				hour: 0,
				inputValue
			});
		}
	}

	// method that decreases the hour value
	onDecreaseHour() {
		const { hour, minute, hourStep } = this.state;
		const hourDecreased = hour - hourStep;

		let inputValue = this.getValue(hourDecreased, minute);

		if (hourDecreased >= 0) {
			this.setState({
				hour: hourDecreased,
				inputValue
			});
		} else {
			inputValue = this.getValue(24 - hourStep, minute);

			this.setState({
				hour: 24 - hourStep,
				inputValue
			});
		}
	}

	// method that increases the minute value
	onIncreaseMinute() {
		const { hour, minute, minStep } = this.state;
		const minIncreased = minute + minStep;

		let inputValue = this.getValue(hour, minIncreased);

		if (minIncreased < 60) {
			this.setState({
				minute: minIncreased,
				inputValue
			});
		} else {
			inputValue = this.getValue(hour, 0);

			this.setState({
				minute: 0,
				inputValue
			});
		}
	}

	// method that decreases the minute value
	onDecreaseMinute() {
		const { hour, minute, minStep } = this.state;
		const minDecreased = minute - minStep;

		let inputValue = this.getValue(hour, minDecreased);

		if (minDecreased >= 0) {
			this.setState({
				minute: minDecreased,
				inputValue
			});
		} else {
			inputValue = this.getValue(hour, 60 - minStep);

			this.setState({
				minute: 60 - minStep,
				inputValue
			});
		}
	}

	// method that shows the clock
	onShow() {
		const rect = this.timeInput.input.getBoundingClientRect();
		const isTopHalf = rect.top < window.innerHeight / 2;

		const position = this.timeInput.input.clientHeight + 2;

        this.setState({
            visible: true,
            position: {
                top: isTopHalf ? position : '',
				bottom: !isTopHalf ? position : ''
            }
		});
	}

	// method that hides the clock
	onHide() {
		this.setState({
			visible: false
		});
	}

	// method to get the click outside the clock
	onDocumentClick(e) {
		const container = this.timeInput.input.parentNode;
		const isClickInside = container.contains(e.target);

		if (!isClickInside) {
			this.onHide();
		}
	}

	render() {
		const { name, label } = this.props;
		return (
			<fieldset className={css(styles.fieldset)}>
				<label className={css(styles.label)}>{label}</label>
				<div className={css(styles.timePicker)}>
					<InputMask
						name={name}
						ref={input => this.timeInput = input}
						className={css(styles.input)}
						type="text"
						mask="99:99"
						maskChar={''}
						onClick={this.onShow}
						onChange={this.onChange}
					/>

					<Clock
						visible={this.state.visible}
						position={this.state.position}
						hour={this.state.hour}
						minute={this.state.minute}
						onIncreaseHour={this.onIncreaseHour}
						onDecreaseHour={this.onDecreaseHour}
						onIncreaseMinute={this.onIncreaseMinute}
						onDecreaseMinute={this.onDecreaseMinute}
					/>
				</div>
			</fieldset>
		);
	}
}

TimePicker.propTypes = propTypes;
TimePicker.defaultProps = defaultProps;

export default TimePicker;
