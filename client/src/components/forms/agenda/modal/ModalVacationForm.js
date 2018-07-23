import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../AgendaFormStyles';

import Button from '../../../common/Button';

class ModalVacationForm extends Component {
	constructor(props) {
		super(props);

		this.submit = this.submit.bind(this);

        this.state = {
			showModal: false,
		}
	}

	submit() {
		const { onSubmit, onCancel } = this.props;
		onSubmit();
		onCancel();
	}

	render() {
		const { onCancel, textMessage } = this.props;

		return (
            <form className={css(styles.form_modal)}>
				<div className={css(styles.listContainer)}>
					{textMessage}
				</div>
                <Button
                    text="Sim"
                    color="green"
                    onClick={this.submit}
                />

                <Button
                    text="Não"
                    color="red"
                    onClick={onCancel}
                    right
                />
            </form>
		);
	}
}

const modalVacationForm = reduxForm({
	form: 'modalVacationForm'
})(ModalVacationForm);

function mapStateToProps(state, props) {

	let initialValues = {};

	return {
		clinic: state.auth.clinic,
		initialValues
	};
}

export default connect(mapStateToProps, { })(modalVacationForm);