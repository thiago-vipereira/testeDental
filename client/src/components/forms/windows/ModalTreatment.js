import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './OdontogramFormStyles';

import OndontogramComponent from './OndontogramComponent';

class ModalTreatment extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			errorMsg: null,
			value: null,
		}
	}

	onSubmit() {}

	render() {
		const { myItem } = this.props;

		if(myItem){
			return (
				<OndontogramComponent myItem={myItem}/>
			);
		}
		return null;
	}
}

const modalTreatment = reduxForm({
	form: 'modalTreatment'
})(ModalTreatment);

function mapStateToProps(state, props) {
	return {};
}

export default connect(mapStateToProps, {})(modalTreatment);
