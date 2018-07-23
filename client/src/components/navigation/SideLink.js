import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { styles } from './SideLinkStyles';

import Icon from '../common/Icon';

const propTypes = {
	/** Text of the link */
	text: PropTypes.string.isRequired,
	/** The path necessary to config NavLink form React Router */
	path: PropTypes.string.isRequired,
	/** The name of the icon you want to add to the link */
	icon: PropTypes.string,
	/** This is only needed for the "Resumo" path */
	exact: PropTypes.bool
};

const defaultProps = {
	icon: 'globe',
	exact: false
};

/**
 * Use the SideLink for the main navigation of the app
 */

function SideLink({ text, path, icon, exact, warning }) {
	return (
		<NavLink
			exact={exact}
			to={path}
			activeClassName={css(styles.active)}
			className={css(styles.navLink)}
		>
			<Icon
				icon={icon}
				size="small"
				color="grey77"
			/>
			<span className={css(styles.navText)}>{text}</span>

			<span style={ warning ? {} : {display: 'none'} } className={css(styles.warning)}> {warning} </span>

		</NavLink>
	);
}

SideLink.propTypes = propTypes;
SideLink.defaultProps = defaultProps;

export default SideLink;
