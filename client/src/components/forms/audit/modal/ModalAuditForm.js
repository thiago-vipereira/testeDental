import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './AuditFormStyles';

import Button from '../../../common/Button';

import { reverseAudit } from '../../../../actions/audit'; 

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
		const { onCancel, selectedAudit, reverseAudit } = this.props;
		
		reverseAudit(selectedAudit, ret => {
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
					<span>Deseja mesmo reverter à alteração?</span>
				</div>
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

const modalDeleteListForm = reduxForm({
	form: 'modalDeleteListForm'
})(ModalDeleteListForm);

function mapStateToProps(state, props) {

	return {};
}

export default connect(mapStateToProps, { reverseAudit })(modalDeleteListForm);
