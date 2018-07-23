import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './DateTimePickerStyles';

import moment from 'moment';
import './dayTime.css';
import DayPicker from 'react-day-picker';

//const propTypes = {
  /** Unique name to identify the input */
  //name: PropTypes.string.isRequired,
//};

const WEEKDAYS_LONG = {
  pt: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
  ]
};
const WEEKDAYS_SHORT = {
  pt: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ]
};
const MONTHS = {
  pt: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]
};

class DayPickerComponent extends Component {
  constructor(props) {
    super(props);

    this.handleDayChange = this.handleDayChange.bind(this);

    this.state = {
      selectedDay: moment()
    }
  }

  // method that handles the change on the datetime picker
  handleDayChange(selectedDay, modifiers) {
    this.setState({
      selectedDay
    });
    this.props.onChange(new Date(moment(selectedDay)));
  }

  render() {
    const { name, label, selectedDay, value } = this.props;
    var formattedDay = null;
    if(value){
      formattedDay = moment(value).format('DD/MM/YYYY');
    }else{
      formattedDay = selectedDay ? moment(selectedDay).format('DD/MM/YYYY') : '';
    }
    const dayPickerProps = {
      locale:"pt",
      months: MONTHS.pt,
      weekdaysLong: WEEKDAYS_LONG.pt,
      weekdaysShort: WEEKDAYS_SHORT.pt,
    };

    return (
      <div>
        <label className={css(styles.label)}>{label}</label>
        <DayPicker
          value={formattedDay}
          name={name}
          onDayClick={this.props.onDayClick}
          onMonthChange={this.props.onMonthChange}
          month={this.props.month}
          locale="pt"
          months={dayPickerProps.months}
          weekdaysLong={dayPickerProps.weekdaysLong}
          weekdaysShort={dayPickerProps.weekdaysShort}
        />
      </div>
    );
  }
}

//DateTimePicker.propTypes = propTypes;

export default DayPickerComponent;
