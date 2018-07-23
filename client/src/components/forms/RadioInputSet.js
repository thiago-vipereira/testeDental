import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './RadioInputSetStyles';

import { Field } from 'redux-form';
import RadioInput from './RadioInput';

const propTypes = {
  /** Name of the radio inputs */
  name: PropTypes.string.isRequired,
  /**  The label of the group of radios */
  setLabel: PropTypes.string.isRequired,
  /**
   * Array of objects determining the radio options
   */
  options: PropTypes.array.isRequired,
}

const defaultProps = {
  name: 'radios',
  setLabel: 'Radios',
  options: [{ label: 'Radio', value: 'radio' }]
};

/**
 * Use this component in all of the forms to get input from the user.
 *
 * It shoud be passed as the "component" to a Field component of Redux Form.
 */

function RadioInputSet({ setLabel, name, options, onChange }) {
	const renderOptions = () => {
		return options.map((option, index) => {
			return (
				<Field
					key={index}
					type="radio"
					name={name}
					label={option.label}
					value={option.value}
					component={RadioInput}
					onChange={() => onChange(option)}
				/>
			);
		});
	};
  
	return (
		<fieldset className={css(styles.fieldset)}>
			<label className={css(styles.label)}>{setLabel}</label>
			
			{renderOptions()}
		</fieldset>
	);
}

RadioInputSet.propTypes = propTypes;
RadioInputSet.defaultProps = defaultProps;

export default RadioInputSet;
