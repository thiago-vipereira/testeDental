import React from 'react';
import { Link } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { styles } from './ProceduresListStyles';

const renderItems = (procedures, match, openModal) => {
    
    if (procedures.length > 0) {
        return procedures.map(procedure => {
            return (
                <li key={procedure._id} id={procedure._id} className={css(styles.listItem)}>
                    {procedure.name}
                                    
                    <span onClick={event => {
                        
                        openModal(event.target.parentElement.id);
                        
                    }} className={css(styles.link, styles.red)}>Excluir</span>
                    <Link to={`${match.url}/${procedure._id}`} className={css(styles.link)}>Editar</Link>
                    <div style={{clear:'both'}}></div>
                </li>
            );
        });
    } else {
        return (
            <li className={css(styles.noItems)}>
                Nenhuma Lista de Procedimentos cadastrada
            </li>
        );
    }
};

// 'proceduresList' will manage the routes inside the app
function ProceduresList(props) {
    const { match, procedures, onClick } = props;
    
	return (
		<ul className={css(styles.list)}>
            {renderItems(procedures, match, onClick)}
		</ul>
	);
}

export default ProceduresList;
