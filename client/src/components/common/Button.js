import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';

import { styles } from './ButtonStyles';

import Icon from './Icon';

const propTypes = {
	/**  The text of the Button */
	style: PropTypes.object,
	text: PropTypes.string.isRequired,
	/**
	* The color of the icon. Use some of the standard colors:
	*
	* 'primary', 'secondary', 'green', 'red' or 'disabled'
	*/
	color: PropTypes.string.isRequired,
	/**
	* The size of the button. Choose one:
	*
	* 'small', 'normal' or 'large'
	*/
	size: PropTypes.string,
	/**  If it is true, the button will be rendered with a type="submit" */
	submit: PropTypes.bool,
	/**  Some buttons need to float to the right of the page */
	right: PropTypes.bool
}

const defaultProps = {
	text: '',
	color: 'primary'
};

function Button({ style, text, color, size, right, submit, onClick, icon, iconColor}) {
	return (
		<button style={style} className={css(styles.btn, styles[color], styles[size], right && styles.right)} type={(submit) ? 'submit' : 'button'} onClick={onClick}>
			{icon && <span className={css(styles.iconBucket)}><Icon classAdjust icon={icon} size="12px" color={iconColor==='secondary'?"grey":iconColor==='disabled'?"grey85":iconColor==='red'?"red":"white"} /></span>}{text}
		</button>
	);
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
