import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
//import { styles } from './ListWithEditStyles';

import { Link } from 'react-router-dom';

const propTypes = {
	/**  The text of the Button */
	//match: PropTypes.object.isRequired,
	/**
    * An array of objects containing the info to render the buttons in the nav bar.
    * The object for the links should have the following format: { text: String, path: String, exact: Boolean }
	*/
	items: PropTypes.array.isRequired,
}

/**
 * This component is used to implement a navigation bar inside the views of the app
 * 
 * /src/components/bars/ListWithEdit.js
 */

function ListWithEdit(props)  {
    const { items, match } = props;

    const renderItems = () => {
        return (
            items.map((item, index) => {
                return (
                    <li key={index}>
                        {item.value}

                        <Link to={`${match.url}/${item.link}`}>Editar</Link>
                    </li>
                );
            })
        );
    };

    return (
        <ul>
            {renderItems()}
        </ul>
    );
}

ListWithEdit.propTypes = propTypes;

export default ListWithEdit;
