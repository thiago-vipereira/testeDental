import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';

import { Field } from 'redux-form';

import { styles } from './SelectBoxStyles';

const propTypes = {
	// name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	itens: PropTypes.array,
}

const defaultProps = {
	meta: { error: null, touched: null }
};

const renderItems = (itens) => {
    
    if (itens.length > 0) {
        return itens.map(iten => {
            return (
				<option key={iten.value} value={iten.value}>{iten.label}</option>
            );
        });
    } else {
        return (
			<option value={0}>{" :) "}</option>
        );
    }
    
    
};

// 'SelectBox' will manage the routes inside the app
function SelectBox(props) {
	const { itens, label, input, style, onChange, meta: { error, touched }, ref, disabled } = props;
	return (
		<fieldset style={style} className={css(styles.fieldset)}>
			<label className={css(styles.label)}>{label}</label>
			{
				disabled ?
				<Field onChange={(e)=> input.onChange ? input.onChange({name: input.name, value: e.target.value}):null} value={input.value?input.value:''} name={input.name} className={css(styles.input)} component="select" disabled >
					{renderItems(itens)}
				</Field>
				:
				<Field onChange={(e)=> input.onChange ? input.onChange({name: input.name, value: e.target.value}):null} value={input.value?input.value:''} name={input.name} className={css(styles.input)} component="select" >
					{renderItems(itens)}
				</Field>
			}
			{touched && error && <span className={css(styles.msgError)}>{error}</span>}
		</fieldset>
	);
}

SelectBox.propTypes = propTypes;
SelectBox.defaultProps = defaultProps;

export default SelectBox;
