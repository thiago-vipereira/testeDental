import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from '../DentistFormStyles';

import Button from '../../../common/Button';

import { deleteDentist, fetchDentists } from '../../../../actions/dentists';

class ModalDeleteDentist extends Component {
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

	onSubmit() {
		const { idDentist, onCancel, deleteDentist, fetchDentists } = this.props;
		deleteDentist(idDentist, ()=>{
			fetchDentists();
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
					<span>Deseja mesmo excluir o Dentista?</span>
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

const modalDeleteDentist = reduxForm({
	form: 'modalDeleteDentist'
})(ModalDeleteDentist);

function mapStateToProps(state, props) {

	return {};
}

export default connect(mapStateToProps, { deleteDentist, fetchDentists })(modalDeleteDentist);
