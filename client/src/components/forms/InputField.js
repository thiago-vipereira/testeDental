import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './InputFieldStyles';

import Icon from '../common/Icon';

import InputMask from 'react-input-mask';

const propTypes = {
	/** This is the object with all the Field props from Redux Form */
	input: PropTypes.object.isRequired,
	/**  The label of the input */
	label: PropTypes.string.isRequired,
	/**  The type of the input between "text" and "password" */
	type: PropTypes.string,
	/**
	 * Write short placeholders to explain what is the information we need form the user
	 * and to help screen readers
	 */
	placeholder: PropTypes.string,
}

const defaultProps = {
	type: 'text',
	placeholder: '',
	meta: { error: null, touched: null }
};

/**
 * Use this component in all of the forms to get input from the user.
 *
 * It shoud be passed as the "component" to a Field component of Redux Form.
 */

function formatBR(v) {
	if(!v){ v = ''; }
	
	v = v.toString();
	v=v.replace(/\D/g,'');

	while(v.length < 4){
		v = '0'+v;
	}
	if(v.charAt(0) === '0' && v.length >= 5){
		v = v.substr(1);
	}
	if(v.length >= 3){
		v=v.replace(/(\d{1,2})$/, ',$1');
	}
	v=v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
	v = v != ''?'R$ '+v:'R$ ';
	return v;
}

function InputField({ input, type, label, placeholder, mask, defaultValue, ico, meta: { error, touched }, ref }) {
	if(type == "money"){
		input.value = formatBR(input.value);
		return (
			<fieldset className={css(styles.fieldset)}>
				<label className={css(styles.label)}>{label}</label>
				<input className={css(styles.input)} type="text" name={input.name} defaultValue={defaultValue} {...input} onKeyUp={(event) => {
					event.target.value = formatBR(event.target.value);
				}} />
				{touched && error && <span className={css(styles.msgError)}>{error}</span>}
			</fieldset>
		);
	}

	return (
		<fieldset className={css(styles.fieldset)}>
			<label className={css(styles.label)}>{label}</label>
			{ ico ?
				<div className={css(styles.icoRelative)}>
					<div className={css(styles.ico)}>
						<Icon icon={ico} color='grey77' size='14px' />
					</div>
				</div>
			:''}
			<InputMask className={css(styles.input)} type={type} placeholder={placeholder} mask={mask}  maskChar={''} {...input} />
			{touched && error && <span className={css(styles.msgError)}>{error}</span>}
		</fieldset>
	);
}

InputField.propTypes = propTypes;
InputField.defaultProps = defaultProps;

export default InputField;
