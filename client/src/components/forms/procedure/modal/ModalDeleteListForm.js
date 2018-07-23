import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../ProcedureFormStyles';

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
		const { del, idList, onCancel } = this.props;
		del(idList);
		onCancel();
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
					<span>Deseja mesmo excluir a Lista de Procedimentos?</span>
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

	return {};
}

export default connect(mapStateToProps, { })(modalDeleteListForm);
