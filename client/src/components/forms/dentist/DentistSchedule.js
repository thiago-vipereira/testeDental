import React, { Component } from 'react';

import { css } from 'aphrodite/no-important';
import { styles } from './DentistScheduleStyles';

import ScheduleInterval from './ScheduleInterval';
import ActionLink from '../../common/ActionLink';

class DentistSchedule extends Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.addInterval = this.addInterval.bind(this);
		this.removeInterval = this.removeInterval.bind(this);
		this.renderInterval = this.renderInterval.bind(this);

		this.state = {
			schedule: props.schedule
		}
	}

	onChange(value, name) {
		const { schedule } = this.state;
		const { getSchedule } = this.props;

		const index = name.split('-')[0];
		const day = name.split('-')[1];
		const time = name.split('-')[2];

		// store the previous state of the day
		const prevDay = schedule[day];
		// store the previous state of the interval the user is changing
		const prevInterval = prevDay[index];
		// create a variable for the update value of the day...
		let nextDay = prevDay;
		// ...and then update only the right interval
		nextDay[index] = { ...prevInterval, [time]: value };
		// store the updated schedule
		const newSchedule = { ...schedule, [day]: nextDay };

		// update the state
		this.setState({
			schedule: newSchedule
		});

		getSchedule(newSchedule);
	}

	addInterval(day) {
		const { schedule } = this.state;
		const { getSchedule } = this.props;

		// store the previous state of the day
		const prevDay = schedule[day];
		// store the updated value of the day
		const nextDay = [...prevDay, { start: '08:00', end: '12:00' }];
		// store the updated schedule
		const newSchedule = { ...schedule, [day]: nextDay };

		// update the schedule
		this.setState({
			schedule: newSchedule
		});

		getSchedule(newSchedule);
	}

	removeInterval(day, index) {
		const { schedule } = this.state;
		const { getSchedule } = this.props;

		// store the previous state of the day
		let dayArray = schedule[day];
		// remove the interval
		dayArray.splice(index, 1);
		// store the updated schedule
		const newSchedule = { ...schedule, [day]: dayArray };

		// update the schedule
		this.setState({
			schedule: newSchedule
		});

		getSchedule(newSchedule);
	}

	renderInterval(day) {
		const { schedule } = this.state;

		if (schedule[day].length > 0) {
			return schedule[day].map((value, index) => {
				const valueInNumber = {
					start: {
						hour: Number(value.start.split(':')[0]),
						minute: Number(value.start.split(':')[1])
					},
					end: {
						hour: Number(value.end.split(':')[0]),
						minute: Number(value.end.split(':')[1])
					}
				}

				return <ScheduleInterval key={index} localId={index} day={day} value={valueInNumber} onChange={this.onChange} remove={this.removeInterval} />;
			});
		}

		return <div className={css(styles.noTime)}>Nenhum horário disponível</div>;
	}

	render() {
		return (
			<div className={css(styles.container)}>
				<div className={css(styles.day)}>
					<div className={css(styles.label)}>Domingo</div>
					<div>
						{this.renderInterval('sun')}
						<ActionLink text="Incluir Intervalo" action={() => { this.addInterval('sun') }} />
					</div>
				</div>

				<div className={css(styles.day)}>
					<div className={css(styles.label)}>Segunda</div>
					<div>
						{this.renderInterval('mon')}
						<ActionLink text="Incluir Intervalo" action={() => { this.addInterval('mon') }} />
					</div>
				</div>

				<div className={css(styles.day)}>
					<div className={css(styles.label)}>Terça</div>
					<div>
						{this.renderInterval('tue')}
						<ActionLink text="Incluir Intervalo" action={() => { this.addInterval('tue') }} />
					</div>
				</div>

				<div className={css(styles.day)}>
					<div className={css(styles.label)}>Quarta</div>
					<div>
						{this.renderInterval('wed')}
						<ActionLink text="Incluir Intervalo" action={() => { this.addInterval('wed') }} />
					</div>
				</div>

				<div className={css(styles.day)}>
					<div className={css(styles.label)}>Quinta</div>
					<div>
						{this.renderInterval('thu')}
						<ActionLink text="Incluir Intervalo" action={() => { this.addInterval('thu') }} />
					</div>
				</div>

				<div className={css(styles.day)}>
					<div className={css(styles.label)}>Sexta</div>
					<div>
						{this.renderInterval('fri')}
						<ActionLink text="Incluir Intervalo" action={() => { this.addInterval('fri') }} />
					</div>
				</div>

				<div className={css(styles.day)}>
					<div className={css(styles.label)}>Sábado</div>
					<div>
						{this.renderInterval('sat')}
						<ActionLink text="Incluir Intervalo" action={() => { this.addInterval('sat') }} />
					</div>
				</div>
			</div>
		);
	}
}

export default DentistSchedule;
