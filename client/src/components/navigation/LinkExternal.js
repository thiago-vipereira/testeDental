import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';

import { styles } from './LinkExternalStyles';

import Icon from '../common/Icon';

const propTypes = {
	/** Text of the link */
	text: PropTypes.string.isRequired,
	/** The url of the website the user will be redirected */
	url: PropTypes.string.isRequired,
	/** The name of the icon you want to add to the link */
	icon: PropTypes.string,
	/** If 'false' the link will be rendered with no underline */
	decoration: PropTypes.bool,
	/** If 'false' the link will open the url in another tab of the browser */
	internal: PropTypes.bool
};

const defaultProps = {
	text: 'text not found',
	url: 'http://www.softmanager.com.br/',
	decoration: true,
	internal: false
};

/**
 * Use the LinkExternal just in the case where the user will leave the app after clicking on it.
 *
 * To execute an action or to navegate inside the app, use the LinkAction component.
 */

function LinkExternal({ text, url, icon, decoration, internal }) {
	// Function to check if the link has an icon or not
	const getIcon = () => {
		if(icon) {
			return (
				<Icon
					icon={icon}
					size="small"
					color="blueDark"
				/>
			);
		} else {
			return '';
		}
	}

	return (
		<a href={url} className={css(styles.link, !decoration && styles.noUnderline)} target={!internal ? '_blank' : ''}>
			{getIcon()}
			<span className={css(icon && styles.text)}>{text}</span>
		</a>
	);
}

LinkExternal.propTypes = propTypes;
LinkExternal.defaultProps = defaultProps;

export default LinkExternal;
