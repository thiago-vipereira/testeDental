import React from 'react';
import { Link } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { styles } from './UsersListStyles';

const renderItems = (users, match, openModal) => {
    return users.map(user => {
        return (
            <li key={user._id} className={css(styles.listItem)}>
                {user.name}
                                
                <span className={css(styles.link, styles.red)}>Excluir</span>
                <span onClick={event => {openModal(user._id)}} className={css(styles.link)}>Permissões</span>

                <Link
                    to={`${match.url}/user/${user._id}`}
                    className={css(styles.link)}
                >
                    Editar
                </Link>
            </li>
        );
    });
};

// 'UsersList' will manage the routes inside the app
function UsersList(props) {
    const { match, users, onClick } = props;

    
    
	return (
		<ul className={css(styles.list)}>
            {renderItems(users, match, onClick)}
		</ul>

    );
}

export default UsersList;
