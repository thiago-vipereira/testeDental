import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../OdontogramFormStyles';

import Button from '../../../common/Button';
import InputField from '../../../forms/InputField';

class ModalDentalStatus extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			errorMsg: null,
		}
	}

	onSubmit() {}

	render() {
		const { handleSubmit, onCancel, onClickStatus } = this.props;

		return (
            <form className={css(styles.form_modal)} onSubmit={handleSubmit(this.onSubmit)} >
                <div className={css(styles.fieldset)}>
					<div className={css(styles.pointerConfig)} >
						<span className={css(styles.labelStatus)} >Ausentes</span>
						<div className={css(styles.btn_modal)} onClick={() => { onClickStatus('MISSING_DECIDOUS'); } } >Decíduos</div>
						<div className={css(styles.btn_modal)} onClick={() => { onClickStatus('MISSING_NORMAL'); } } >Permanentes</div>
						<div className={css(styles.btn_modal)} onClick={() => { onClickStatus('MISSING_ALL'); } } >Todos os Dentes</div>
						<div className={css(styles.btn_modal)} onClick={() => { onClickStatus('MISSING_TOP'); } } >Superiores</div>
						<div className={css(styles.btn_modal)} onClick={() => { onClickStatus('MISSING_BOT'); } } >Inferiores</div>
						<span className={css(styles.labelStatus)} >Presentes</span>
						<div className={css(styles.btn_modal)} onClick={() => { onClickStatus('NORMAL_ALL'); } } >Todos os Dentes</div>
					</div>
				</div>

				<div style={ { padding: '5px', marginBottom: '39px'} }>
					<Button
						text="Fechar"
						color="red"
						onClick={onCancel}
						right
					/>
				</div>
            </form>
		);
	}
}

const modalDentalStatus = reduxForm({
	form: 'modalDentalStatus'
})(ModalDentalStatus);

function mapStateToProps(state, props) {
	return {};
}

export default connect(mapStateToProps, {})(modalDentalStatus);
