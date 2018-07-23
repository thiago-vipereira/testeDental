import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../AgendaFormStyles';

import { agendaPatientCriation } from '../../../../actions/component';

import Button from '../../../common/Button';

class ModalCreatePatientForm extends Component {
	constructor(props) {
		super(props);

		this.submit = this.submit.bind(this);
		this.cancel = this.cancel.bind(this);
		
        this.state = {
			showModal: false,
		}
	}

	componentDidMount() {
	}

	submit() {
		const { onSubmit, agendaPatientCriation } = this.props;
		onSubmit();
		agendaPatientCriation();
	}

	cancel() {
		const { onCancel } = this.props;
		onCancel();

	}

	render() {
		const { onCancel, onSubmit } = this.props;

		return (
            <form className={css(styles.form_modal)}>
				<div className={css(styles.listContainer)}>
					<span>Deseja cadastrar o Paciente agendado?</span>
				</div>
                <Button
                    text="Sim"
                    color="green"
                    onClick={this.submit}
                />

                <Button
                    text="Não"
                    color="red"
                    onClick={this.cancel}
                    right
                />
            </form>
		);
	}
}

const modalCreatePatientForm = reduxForm({
	form: 'modalCreatePatientForm'
})(ModalCreatePatientForm);

function mapStateToProps(state, props) {

	let initialValues = {};

	return {
		clinic: state.auth.clinic,
		initialValues
	};
}

export default connect(mapStateToProps, { agendaPatientCriation })(modalCreatePatientForm);