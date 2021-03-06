import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../PatientFormStyles';

import Button from '../../../common/Button';

class ModalDeleteTreatment extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.render = this.render.bind(this);

		this.state = {}
	}

	onSubmit(values) {
		const { onSubmit, onCancel, idOdontogram } = this.props;
		
		onSubmit(idOdontogram);
		onCancel();
    }
    
	render() {
		const { handleSubmit, onCancel } = this.props;

		return (
            <form className={css(styles.form_modal)} onSubmit={handleSubmit(this.onSubmit)} >
                <div className={css(styles.fieldset)}>Deseja EXCLUIR o tratamento?</div>
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

const modalDeleteTreatment = reduxForm({
	form: 'modalDeleteTreatment'
})(ModalDeleteTreatment);

function mapStateToProps() {
	return {};
}

export default connect(mapStateToProps, {})(modalDeleteTreatment);
