import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './RadioInputSetStyles';

const propTypes = {
	/** This is the object with all the Field props from Redux Form */
	input: PropTypes.object.isRequired,
	/**  The label of the radio */
	label: PropTypes.string.isRequired
}

const defaultProps = {
	input: {},
	label: 'Label',
	type: 'text'
};

/**
 * Use this component in all of the forms to get input from the user.
 *
 * It shoud be passed as the "component" to a Field component of Redux Form.
 */

function RadioInput({ input, label, meta }) {
	return (
		<div className={css(styles.radioContainer)}>
			<input id={`${input.name}_${input.value}`} className={css(styles.radio)} type="radio" {...input} />
            <label htmlFor={`${input.name}_${input.value}`} className={css(styles.radioLabel, input.checked && styles.checked)}>{label}</label>
		</div>
	);
}

RadioInput.propTypes = propTypes;
RadioInput.defaultProps = defaultProps;

export default RadioInput;
