import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { css } from 'aphrodite/no-important';
import { styles } from './DateTimePickerStyles';

import InputMask from 'react-input-mask';

//const propTypes = {
  /** This is the object with all the Field props from Redux Form */
  //input: PropTypes.object.isRequired,
//}

/**
 * Use this component in all of the forms to get input from the user.
 *
 * It shoud be passed as the "component" to a Field component of Redux Form.
 */

class DateTimeInput extends Component {
  focus() {
    this.inputMask.input.focus()
  }

  render(){
    return (
      <InputMask
        ref={el => this.inputMask = el}
        className={css(styles.input)}
        placeholder={`Ex.: ${moment().locale('pt-BR').format('DD/MM/YYYY')}`}
        mask="99/99/9999"
        maskChar={''}
        {...this.props}
      />
    );
  }
}

//DateTimeInput.propTypes = propTypes;

export default DateTimeInput;
