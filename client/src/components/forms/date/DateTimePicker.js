import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../common/Icon.js'

import { css } from 'aphrodite/no-important';
import { styles } from './DateTimePickerStyles';

import moment from 'moment';
import './datetime.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import DateTimeInput from './DateTimeInput';

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
  pt: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb' ]
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

class DateTimePicker extends Component {
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
    const { name,audit , label, selectedDay, value } = this.props;
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
      <div className={css(styles.timePicker)} >

        <fieldset className={css(styles.fieldset)}>
        <label className={css(styles.label)}>{label}</label>
        <div className={audit ? css(styles.icons) : css(styles.icon)}>
          <Icon
            icon="calendar"
            size="input"
            color="grey65"
          />
        </div>
        <DayPickerInput
          value={formattedDay}
          name={name}

          component={DateTimeInput}
          onDayChange={this.handleDayChange}
          format={'DD/MM/YYYY'}
          placeholder={`Ex.: ${moment().locale('pt-BR').format('DD/MM/YYYY')}`}
          dayPickerProps={dayPickerProps}
          
        />
      
      </fieldset>
    </div>
    );
  }
}

//DateTimePicker.propTypes = propTypes;

export default DateTimePicker;
