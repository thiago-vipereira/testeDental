import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './ViewNavBarStyles';

import { NavLink } from 'react-router-dom';

const propTypes = {
	/**  The text of the Button */
	match: PropTypes.object.isRequired,
	/**
    * An array of objects containing the info to render the buttons in the nav bar.
    * The object for the links should have the following format: { text: String, path: String, exact: Boolean }
	*/
    links: PropTypes.array.isRequired,
    children: PropTypes.object
}

/**
 * This component is used to implement a navigation bar inside the views of the app
 * 
 * /src/components/bars/ViewNavBar.js
 */

function ViewNavBar(props)  {
    const { match, links, children } = props;
    const renderLinks = () => {
        return (
            links.map((link, index) => {
                return (
                    <NavLink
                        key={index}
                        className={css(styles.link)}
                        activeClassName={css(styles.active)}
                        to={`${match.url}${link.path}`}
                        exact={link.exact}
                    >
                        {link.text}
                    </NavLink>
                );
            })
        );
    };
    return (
        <div style={{display: 'flex', minHeight: '50px', minWidth: '690px'}}>
            <div className={css(styles.bar)}>
                {renderLinks()}
            </div>
            {children}
        </div>
    );
}

ViewNavBar.propTypes = propTypes;

export default ViewNavBar;
