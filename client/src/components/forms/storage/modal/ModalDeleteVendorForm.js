import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../VendorsFormStyles';

import Button from '../../../common/Button';

class ModalDeleteVendorForm extends Component {
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
		const { del, idVendor, onCancel } = this.props;
		del(idVendor);
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
					<span>Deseja mesmo excluir esse fornecedor?</span>
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

const modalDeleteVendorForm = reduxForm({
	form: 'modalDeleteVendorForm'
})(ModalDeleteVendorForm);

function mapStateToProps(state, props) {

	return {};
}

export default connect(mapStateToProps, { })(modalDeleteVendorForm);
