import React from 'react';
import { Link } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { styles } from './UsersListStyles';

const renderItems = (dentists, match, deleteDentist) => {

    if (dentists.length > 0) {
        return dentists.map(dentist => {
            return (              
                    <li key={dentist._id} id={dentist._id} className={css(styles.listItem)}>
                        {dentist.gender ? 'teste ' : 'Dr.(a) '}
                        {dentist.name}
                        <span className={css(styles.link, styles.red)}
                            onClick={event => {
                                deleteDentist(event.target.parentElement.id);
                            }}
                        >Excluir</span>
                        <Link to={`${match.url}/dentist/${dentist._id}`} className={css(styles.link)}>Editar</Link>
                    </li>
            );
        });
    } else {
        return ( 
            <li className={css(styles.noItems)}>
                Nenhum dentista cadastrado
            </li>
        );
    }
};

// 'DentistsList' will manage the routes inside the app
function DentistsList(props) {
    const { match, dentists, deleteDentist } = props;

	return (
		<ul className={css(styles.list)}>
            {renderItems(dentists, match, deleteDentist)}
		</ul>
	);
}

export default DentistsList;
