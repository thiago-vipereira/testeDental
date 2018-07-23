import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../ProcedureFormStyles';

import { deleteProcedure } from '../../../../actions/procedure';

import Button from '../../../common/Button';

class ModalDeleteProcedureForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
        this.render = this.render.bind(this);
        
        this.state = {
            showModal: false 
        }
	}

	componentDidMount() {
	}

	onSubmit(values) {

		const { list, group, procedure, deleteProcedure, onCancel } = this.props;
		
		deleteProcedure(list._id, group, procedure, ret => {
			onCancel();
		});
    }
    
    renderAuthMsg() {
        const { errorMsg } = this.state;
        
		if(errorMsg) {
			return (
				<div className={css(styles.msgAuth_modal)}>
					<span>{errorMsg}</span>
				</div>
			);
		}
	}

	render() {
		const { handleSubmit, onCancel } = this.props;

		return (
            <form className={css(styles.form_modal)} onSubmit={handleSubmit(this.onSubmit)}>
                {this.renderAuthMsg()}
				<div className={css(styles.listContainer)}>
					<span>Deseja mesmo excluir o Procedimento?</span>
				</div>
                <Button
                    text="Excluir"
                    color="red"
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

const modalDeleteProcedureForm = reduxForm({
	form: 'modalDeleteProcedureForm'
})(ModalDeleteProcedureForm);

function mapStateToProps(state, props) {

	return {
		selectedProcedure: state.procedureConfig.selectedProcedure,
	};
}

export default connect(mapStateToProps, { deleteProcedure })(modalDeleteProcedureForm);
