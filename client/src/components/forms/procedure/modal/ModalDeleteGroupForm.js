import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../ProcedureFormStyles';

import { deleteGroup, fetchGroup } from '../../../../actions/procedure';

import Button from '../../../common/Button';

class ModalDeleteListForm extends Component {
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

		const { idGroup, onCancel, deleteGroup, selectedProcedure, fetchGroup } = this.props;

		deleteGroup(idGroup, selectedProcedure._id, ret =>{
			fetchGroup(selectedProcedure._id, ret => {
				onCancel();
			});
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
					<span>Deseja mesmo excluir o Grupo de Procedimentos?</span>
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

const modalDeleteListForm = reduxForm({
	form: 'modalDeleteListForm'
})(ModalDeleteListForm);

function mapStateToProps(state, props) {

	return {
		selectedProcedure: state.procedureConfig.selectedProcedure,
	};
}

export default connect(mapStateToProps, { deleteGroup, fetchGroup })(modalDeleteListForm);
