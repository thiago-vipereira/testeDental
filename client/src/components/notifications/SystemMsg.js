import React, { Component } from 'react';
import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import { styles } from './SystemMsgStyles';

import { hideMessage } from '../../actions/systemMsg';

class SystemMsg extends Component {
	/*constructor(props) {
		super(props);
    }*/

	render() {
		const { message, show, type } = this.props;

		return (
			<div >
			</div>
		);
	}
}

function mapStateToProps({ systemMsg }) {
	return {
        message: systemMsg.message,
        show: systemMsg.show,
        type: systemMsg.type
	}
}

export default connect(mapStateToProps, { hideMessage })(SystemMsg);
