import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './BreadcrumbBarStyles';

import { NavLink } from 'react-router-dom';

import Icon from '../common/Icon';

const propTypes = {
	/**  The text of the Button */
	match: PropTypes.object.isRequired,
	/**
    * An array of objects containing the info to render the buttons in the nav bar.
    * The object for the links should have the following format: { text: String, path: String, exact: Boolean }
	*/
	links: PropTypes.array.isRequired,
}

/**
 * This component is used to implement a navigation bar inside the views of the app
 * 
 * /src/components/bars/BreadcrumbBar.js
 */

function BreadcrumbBar(props)  {
    const { match, links } = props;

    const renderLinks = () => {
        return (
            links.map((link, index) => {
                const renderIcon = index + 1 < links.length;
                return (
                    <div key={index} className={css(styles.linkContainer)}>
                        <NavLink                            
                            className={css(styles.link)}
                            activeClassName={css(styles.active)}
                            to={`${match.url}${link.path}`}
                            exact={link.exact}
                        >
                            {link.text}
                        </NavLink>
                        {renderIcon ? <Icon icon="rightArrow" size="small" color="grey" /> : '' }
                    </div>
                );
            })
        );
    };

    return (
        <div className={css(styles.bar)}>
            {renderLinks()}
        </div>
    );
}

BreadcrumbBar.propTypes = propTypes;

export default BreadcrumbBar;
