import React, { Component } from 'react';
import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import { styles } from './TopBarStyles';

import ActionButton from '../common/ActionButton';
import PatientsSearch from '../forms/PatientsSearch';

import ReactTooltip from 'react-tooltip';

import Modal from '../modals/Modal';
import NewPatientForm from '../forms/NewPatientForm';
import { hideMessage } from '../../actions/systemMsg';
import { ravelOut } from '../../actions/undoAction';
import { inUse } from '../../actions/auth';

class TopBar extends Component {
	constructor(props) {
		super(props);

		this.onBack = this.onBack.bind(this);
		this.onForward = this.onForward.bind(this);
		this.undoAction = this.undoAction.bind(this);
		this.onNewPatient = this.onNewPatient.bind(this);
		this.onCloseNewPatient = this.onCloseNewPatient.bind(this);

		this.state = {
			showModal: false,
			undoObject: {},
			hideMessage: false
		}
	}

	componentWillMount() {
		const { inUse, history } = this.props;

		function logged(){
			setTimeout(() => {
				inUse('check', ret =>{
					if(ret){
						logged();
					}
					else{
						history.push('/login');
					}
				});
			}, 10000);
		}
		logged();
	}

	//notification 
	componentDidUpdate() {
			const { show, hideMessage } = this.props;
			clearTimeout(this.state.hideMessage);
			if (show) {
					this.state.hideMessage = setTimeout(() => hideMessage(), 10000);
			}
    }
	
	onBack() {
		const { history } = this.props;
		history.goBack();
	}

	onForward() {
		const { history } = this.props;
		history.goForward();
	}

	onNewPatient() {
		this.setState({
			showModal: true
		});
	}

	onCloseNewPatient() {
		this.setState({
			showModal: false
		});
	}

	undoAction() {console.log(this.state.undoObject);
		const { ravelOut } = this.props;
    ravelOut({ db: this.state.undoObject.db, props: this.state.undoObject.props.send },
      (res) => { this.state.undoObject.props.response(this.state.undoObject.props.send.map(value => value.find._id)); }
    );
	}

	render() {
		//const { history } = this.props;
		//const history is for notification usage
		const { history, message, show, type, undo } = this.props;
		this.state.undoObject = undo;
		return (
			<div className={css(styles.topbar)}>
			
			<div className={css(styles.notification, styles[type], show && styles.show )}>
				<span className={css(styles.notificationMessage)} > {message ? message : ''} 
				{undo?
					<span className={css(styles.undoButton)} onClick={() => this.undoAction()}>(desfazer)</span>
				:null}
				</span>
			</div>

				<div className={css(styles.left)}>

					<ActionButton onClick={this.onBack} data-for='toptips' size="small" tipid="tipleft" icon="leftArrow" tip="Voltar" color={show ? 'white' : 'grey' } />
					<ActionButton onClick={this.onForward} icon="rightArrow" size="small" tipid="tipright" tip="Avançar" color={show ? 'white' : 'grey' }  />
				</div>

				<div className={css(styles.right)}>
					<ActionButton onClick={this.onNewPatient} icon="newPatient" size="normal" tipid="tipleft" tip="Novo Paciente" color={show ? 'white' : 'grey' }  />

					<PatientsSearch localId="mainSearch" history={history} />
				</div>

				<Modal
					isOpen={this.state.showModal}
					header="Novo Paciente"
					adjustStyle={styles.patientModal}
				>
					<NewPatientForm history={history} onCancel={this.onCloseNewPatient}/>
				</Modal>

				<ReactTooltip place="left" effect="solid" id="tipleft" ></ReactTooltip> 
				<ReactTooltip place="bottom" effect="solid" id="tipbottom" ></ReactTooltip>
				<ReactTooltip place="right" effect="solid" id="tipright" ></ReactTooltip>

			</div>
		);
	}
}

function mapStateToProps({ systemMsg }) {
	return {
        message: systemMsg.message,
        show: systemMsg.show,
				type: systemMsg.type,
				undo: systemMsg.undo
	}
}


//export default TopBar;
export default connect(mapStateToProps, { hideMessage, ravelOut, inUse })(TopBar);
