import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './AutocompleteInputStyles';

/**
 * Use this component to render inputs that are going to be used as search or filter fields on tables
 */

function InputSearch({ data, onChange, iconStyle, value, placeholder, id }) {
	return (
		<div style={{position: 'relative'}}>
			<svg className={css(styles.icon)} style={(iconStyle)} width="18px" height="18px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
				<path className={css(styles.path)}
					d="M17.978,15.148l-4.449-4.449c0.571-1.033,0.898-2.221,0.898-3.484C14.427,3.229,11.197,0,7.213,0C3.229,0,0,3.229,0,7.215
					c0,3.982,3.229,7.214,7.213,7.214c1.25,0,2.425-0.319,3.451-0.879l4.455,4.456L17.978,15.148z M3,7.215C3,4.891,4.89,3,7.213,3
					c2.324,0,4.213,1.891,4.213,4.215c0,2.323-1.89,4.214-4.213,4.214C4.89,11.429,3,9.538,3,7.215z"/>
			</svg>
			<input id={id} className={css(styles.input)} onChange={onChange} data-tag={data} value={value} placeholder={placeholder} ></input>
		</div>
	);
}

export default InputSearch;
