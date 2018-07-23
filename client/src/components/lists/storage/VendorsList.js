import React from 'react';
import { Link } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { styles } from './VendorsListStyles';

const renderItems = (vendors, match, openModal, openEditModal) => {
    
    if (vendors.length > 0) {
        return vendors.map(vendor => {
            return (
                <li key={vendor._id} id={vendor._id} className={css(styles.listItem)}>
                    {vendor.name}
                                    
                    <span onClick={event => {
                        
                        openModal(event.target.parentElement.id);
                        
                    }} className={css(styles.link, styles.red)}>Excluir</span>

                    <span onClick={event => {

                        openEditModal(vendor);

                    }} className={css(styles.link)}>Editar</span>

                    {/* 
                    <Link to={`${match.url}/${vendor._id}`} className={css(styles.link)}>Editar</Link>
                    */}
                </li>
            );
        });
    }else{
        return (
            <li className={css(styles.noItems)}>
                Nenhum fornecedor cadastrado
            </li>
        );
    }
    
    
    
};

// 'proceduresList' will manage the routes inside the app
function VendorsList(props) {
    const { match, vendors, onClick, editModal } = props;
    
	return (
		<ul className={css(styles.list)}>
            {renderItems(vendors, match, onClick, editModal)}
		</ul>
	);
}

export default VendorsList;