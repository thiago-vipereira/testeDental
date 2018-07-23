import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function requireAuth(ComposedComponent) {
	const propTypes = {
		/**  The text of the Button */
		history: PropTypes.object.isRequired
	}

	class RequireAuth extends Component {

		componentDidMount() {
			if (!this.props.auth.authenticated) {
				this.props.history.push('/login');
			}
		}

		componentDidUpdate() {
			if (!this.props.auth.authenticated) {
				this.props.history.push('/login');
			}
		}

		render() {
			return <ComposedComponent {...this.props} />
		}
	}

	RequireAuth.propTypes = propTypes;

	const composedComponentName = ComposedComponent.displayName
		|| ComposedComponent.name
		|| 'Component';

	RequireAuth.displayName = `requireAuth(${composedComponentName})`;

	function mapStateToProps(state) {
		return { auth: state.auth };
	}

	return connect(mapStateToProps)(RequireAuth);
}
