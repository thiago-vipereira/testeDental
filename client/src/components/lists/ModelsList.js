import React from 'react';
import { Link } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { styles } from './ModelsListStyles';

const renderItems = (models, match, openModal, message) => {
  if (models.length > 0)
    return models.map(model => {
      return (
        <li key={model._id} id={model._id} className={css(styles.listItem)}>
          <div className={css(styles.boxName)}>
          {model.name}
          </div>
          <div className={css(styles.boxEditExclude)}>
            <span onClick={event => openModal(event.target.parentElement.id, message)} className={css(styles.link, styles.red)}>Excluir</span>
            <Link to={`${match.url}/${message}/${model.type?model.type:"anamnesis"}/${model._id}`} className={css(styles.link)}>Editar</Link>
          </div>
          <div style={{clear:'both'}}></div>
        </li>
      );
    });
  else
    return (
      <li className={css(styles.noItems)}>Nenhum modelo cadastrado</li>
    );
};

// 'ModelsList' will manage the routes inside the app
function ModelsList(props) {
  const { match, models, onClick, message, type } = props;
	return (
		<ul className={css(styles.list)}>
      {renderItems(models, match, onClick, message)}
		</ul>
	);
}

export default ModelsList;
