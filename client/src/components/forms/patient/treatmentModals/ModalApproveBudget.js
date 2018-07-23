import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../PatientFormStyles';

import Button from '../../../common/Button';

class ModalApproveBudget extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.render = this.render.bind(this);

		this.state = {}
	}

	onSubmit(values) {
		const { onSubmit, treatment, procedure } = this.props;
		
		onSubmit(treatment, procedure);
    }
    
	render() {
		const { handleSubmit, onCancel } = this.props;

		return (
            <form className={css(styles.form_modal)} onSubmit={handleSubmit(this.onSubmit)} >
                <div className={css(styles.fieldset)}>Deseja EXCLUIR o Procedimento?</div>
                <Button
                    text="Sim"
                    color="green"
                    submit
                />

                <Button
                    text="Cancelar"
                    color="secondary"
                    onClick={onCancel}
                    right
                />
            </form>
		);
	}
}

const modalApproveBudget = reduxForm({
	form: 'modalApproveBudget'
})(ModalApproveBudget);

function mapStateToProps() {
	return {};
}

export default connect(mapStateToProps, {})(modalApproveBudget);
