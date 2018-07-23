import React from 'react';

import { css } from 'aphrodite/no-important';
import { styles } from './UsersListStyles';

const renderItems = (procedures, match) => {
    
    if (false) {
        return procedures.map(procedure => {
            return (
                <li key={procedure._id} className={css(styles.listItem)}>
                    {procedure.description}
                </li>
            );
        });
    } else {
        return (
            <li className={css(styles.noItems)}>
                Nenhum Grupo de Procedimentos cadastrado
            </li>
        );
    }

};

// 'GroupsList' will manage the routes inside the app
function GroupsList(props) {
    const { match, procedures } = props;
    
	return (
        <div>
            <ul className={css(styles.list)}>
                {renderItems(procedures, match)}
            </ul>
        </div>
	);
}

export default GroupsList;
