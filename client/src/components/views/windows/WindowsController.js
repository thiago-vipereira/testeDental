import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './WindowsStyles';
import moment from 'moment';
import 'moment/locale/pt-br';

import ModalWindows from '../../modals/ModalWindows';
import Button from '../../common/Button';
import InputField from '../../forms/InputField';

import { removeToWindows } from '../../../actions/windowsController';

import ModalTreatment from '../../forms/windows/ModalTreatment';

class WindowsController extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.minModal = this.minModal.bind(this);
		this.mountMinModal = this.mountMinModal.bind(this);

		this.state = {
			modal: false,
			windows: null,
			itemOpened: null,
		}
	}

	componentWillMount() {
		const { defaultOdontogram, selectedPatient, windowsFromProps } = this.props;
		if(windowsFromProps){
			this.setState({
				windows: windowsFromProps,
			});	
		}else {
			this.setState({
				windows: [],
			});
		}
	}

	componentWillReceiveProps(nextProps, prevState){

		if(nextProps.windowsFromProps){
			var itemOpened = null;
			nextProps.windowsFromProps.map((window) => {
				if(window.opened){
					itemOpened = window;
				}
			});
			this.setState({
				modal: itemOpened ? true : false,
				itemOpened: itemOpened,
				windows: nextProps.windowsFromProps,
			});
		}else {
			this.setState({
				windows: [],
			});
		}
	}

	openModal(item) {
		this.state.windows.map((window) => {
			if(window.id == item.id){
				item.opened = true;
			}
		});
		this.setState({
			itemOpened: item,
			modal: true,
		});
	}

	closeModal(item) {
		const { removeToWindows } = this.props
		// COLOCAR EFEITO DE FECHAR AS WINDOWS MINIMIZADAS AQUI
		var newMin = this.state.windows.filter((window) => {
			if(window.id == item.id){
				return false;
			}
			return true;
		});

		removeToWindows(newMin, (res)=>{
			console.log(res);
		});

		this.setState({
			itemOpened: null,
			modal: false,
		});
	}

	minModal(item) {
		this.state.windows.map((window) => {
			if(window.id == item.id){
				item.opened = false;
			}
		});
		this.setState({
			itemOpened: null,
			modal: false,
		});
	}

	mountMinModal() {

		return (
            this.state.windows.map((item, index) => {
				if(!item.opened){
					return (
						<div key={index} style={{ marginRight: index*300+'px' }} className={css(styles.minDiv)}>
							<div className={css(styles.flexMinDiv)} onClick={() => { this.openModal(item); } }>
								{item.id}
							</div>
							<div className={css(styles.closeIco)} onClick={() => { this.closeModal(item); } }>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill='#fff'>
									<path d="M2.7,31.4.8,29.6a2.1,2.1,0,0,1-.1-3L26.5.6a2.1,2.1,0,0,1,2.9,0l1.9,1.8a2.1,2.1,0,0,1,.1,3L5.6,31.4A2.1,2.1,0,0,1,2.7,31.4Z"/>
									<path d="M29.4,31.4l1.9-1.8a2.1,2.1,0,0,0,.1-3L5.6.6A2.1,2.1,0,0,0,2.7.6L.8,2.4a2.1,2.1,0,0,0-.1,3l25.8,26A2.1,2.1,0,0,0,29.4,31.4Z"/>
								</svg>
							</div>
							<div className={css(styles.minIco)} onClick={() => { this.openModal(item); } }>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill='#fff'>
									<path d="M27,5V27H5V5H27m2.3-5H2.8A2.8,2.8,0,0,0,0,2.7V29.2A2.8,2.8,0,0,0,2.8,32H29.3A2.7,2.7,0,0,0,32,29.2V2.7A2.7,2.7,0,0,0,29.3,0Z"/>
								</svg>
							</div>
						</div>
					);
				}
            },this)
        );
	}

	onSubmit(values) {
	}

	render() {
		return (
			<div className={css(styles.flex)} style={{ marginTop: '-32px' }} >
				{this.mountMinModal()}

				<ModalWindows
					isOpen={this.state.modal}
					header={"Tratamento"}
					adjustStyle={ styles.modal_odontogram }
					onClose={ this.closeModal }
					onMin={ this.minModal }
					myItem={ this.state.itemOpened }
				>
				{
					this.state.itemOpened && this.state.itemOpened.type == 'TREATMENT' ? 
					<ModalTreatment
						myItem={ this.state.itemOpened }
					/>
					: ''
				}
				</ModalWindows>
			</div>
		);
	}
}

const windowsController = reduxForm({
	form: 'windowsController'
})(WindowsController);

function mapStateToProps(state) {
	var windowsFromProps = []
	if(state.windows.windows){
		state.windows.windows.forEach((item)=>{
			windowsFromProps.push(item);
		});
	}
	return {
		windowsFromProps: windowsFromProps,
	};
}

export default connect(mapStateToProps, { removeToWindows })(windowsController);