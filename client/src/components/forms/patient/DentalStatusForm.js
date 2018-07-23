import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './OdontogramFormStyles';
import moment from 'moment';
import 'moment/locale/pt-br';
import ReactTooltip from 'react-tooltip';

import { getDentalStatus, updateDentalStatus } from '../../../actions/dentalStatus';

import Modal from '../../modals/Modal';
import Button from '../../common/Button';
import InputField from '../../forms/InputField';

import { defaultDentalStatus } from '../../../components/_constants/dentalStatus';
import IconDentalStatus from '../../common/IconDentalStatus';

import ModalDentalStatus from './dentalStatusModal/ModalDentalStatus';

class DentalStatusForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onClickTooth = this.onClickTooth.bind(this);
		this.onClickStatus = this.onClickStatus.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

		this.state = {
			modal: false,
			dentalStatus: null,
			toothSelected: null,
		}
	}

	componentWillMount() {
		const { defaultDentalStatus, selectedPatient, getDentalStatus } = this.props;
		var dentalStatus;

		console.log(selectedPatient);
		
		if(selectedPatient){

			getDentalStatus(selectedPatient._id, ret => {

				if(ret){

					this.setState({
						dentalStatus: ret,
					});
				} 
			});
		}

		dentalStatus = defaultDentalStatus();
		dentalStatus = dentalStatus.dentalStatus;

		this.setState({
			dentalStatus: dentalStatus
		});
	}

	componentWillUpdate(nextProps){
    }

	onSubmit(values) {
	}

	openModal() {
		this.setState({
			modal: true,
		});
	}

	closeModal() {
		this.setState({
			modal: false,
		});
	}

	onClickTooth(res) {
		this.setState({
			toothSelected: res.currentTarget.id,
		})
	}

	onClickStatus(res) {
		const { selectedPatient, updateDentalStatus } = this.props;

		if(res == 'MISSING_DECIDOUS'){
			var list = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65, 85, 84, 83, 82, 81, 71, 72, 73, 74, 75];

			list.map( number => {
				this.state.dentalStatus['tooth_'+number].status = 'MISSING';
			});

		} else if(res == 'MISSING_NORMAL'){
			var list = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

			list.map( number => {
				this.state.dentalStatus['tooth_'+number].status = 'MISSING';
			});

		} else if(res == 'MISSING_ALL'){
			var list = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38, 55, 54, 53, 52, 51, 61, 62, 63, 64, 65, 85, 84, 83, 82, 81, 71, 72, 73, 74, 75];

			list.map( number => {
				this.state.dentalStatus['tooth_'+number].status = 'MISSING';
			});

		} else if(res == 'MISSING_TOP'){
			var list = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65, 18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
			
			list.map( number => {
				this.state.dentalStatus['tooth_'+number].status = 'MISSING';
			});

		} else if(res == 'MISSING_BOT'){
			var list = [85, 84, 83, 82, 81, 71, 72, 73, 74, 75, 48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
			
			list.map( number => {
				this.state.dentalStatus['tooth_'+number].status = 'MISSING';
			});

		} else if(res == 'NORMAL_ALL'){
			var list = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38, 55, 54, 53, 52, 51, 61, 62, 63, 64, 65, 85, 84, 83, 82, 81, 71, 72, 73, 74, 75];

			list.map( number => {
				this.state.dentalStatus['tooth_'+number].status = 'NORMAL';
			});
			
		} else {
			this.state.dentalStatus[this.state.toothSelected].status = res;	
		}

		updateDentalStatus(this.state.dentalStatus, selectedPatient._id, ret => {
			this.setState({
				dentalStatus: ret,
			});
		});
		//console.log(this.state.dentalStatus);
	}

	renderOdontogram(dentalStatus){
		return(
			<div className={css(styles.status_odontogram)}> 
				<div className={css(styles.status_top)} >
					<div className={css(styles.status_top_left)} >
						<div id={'tooth_18'} className={css(styles.listItemStatusTop)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '18' } </span>
							<IconDentalStatus number={'18'} tooth={this.state.dentalStatus.tooth_18}/>
						</div>
						<div id={'tooth_17'} className={css(styles.listItemStatusTop)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '17' } </span>
							<IconDentalStatus number={'17'} tooth={this.state.dentalStatus.tooth_17}/>
						</div>
						<div id={'tooth_16'} className={css(styles.listItemStatusTop)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '16' } </span>
							<IconDentalStatus number={'16'} tooth={this.state.dentalStatus.tooth_16}/>
						</div>
						<div id={'tooth_15'} className={css(styles.listItemStatusTop)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '15' } </span>
							<IconDentalStatus number={'15'} tooth={this.state.dentalStatus.tooth_15}/>
						</div>
						<div id={'tooth_14'} className={css(styles.listItemStatusTop)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '14' } </span>
							<IconDentalStatus number={'14'} tooth={this.state.dentalStatus.tooth_14}/>
						</div>
						<div id={'tooth_13'} className={css(styles.listItemStatusTop)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '13' } </span>
							<IconDentalStatus number={'13'} tooth={this.state.dentalStatus.tooth_13}/>
						</div>
						<div id={'tooth_12'} className={css(styles.listItemStatusTop)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '12' } </span>
							<IconDentalStatus number={'12'} tooth={this.state.dentalStatus.tooth_12}/>
						</div>
						<div id={'tooth_11'} className={css(styles.listItemStatusTop)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '11' } </span>
							<IconDentalStatus number={'11'} tooth={this.state.dentalStatus.tooth_11}/>
						</div>
					</div>

					<div className={css(styles.status_top_right)} >
						<div id={'tooth_21'} className={css(styles.listItemStatusTop)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '21' } </span>
							<IconDentalStatus number={'21'} tooth={this.state.dentalStatus.tooth_21}/>
						</div>
						<div id={'tooth_22'} className={css(styles.listItemStatusTop)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '22' } </span>
							<IconDentalStatus number={'22'} tooth={this.state.dentalStatus.tooth_22}/>
						</div>
						<div id={'tooth_23'} className={css(styles.listItemStatusTop)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '23' } </span>
							<IconDentalStatus number={'23'} tooth={this.state.dentalStatus.tooth_23}/>
						</div>
						<div id={'tooth_24'} className={css(styles.listItemStatusTop)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '24' } </span>
							<IconDentalStatus number={'24'} tooth={this.state.dentalStatus.tooth_24}/>
						</div>
						<div id={'tooth_25'} className={css(styles.listItemStatusTop)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '25' } </span>
							<IconDentalStatus number={'25'} tooth={this.state.dentalStatus.tooth_25}/>
						</div>
						<div id={'tooth_26'} className={css(styles.listItemStatusTop)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '26' } </span>
							<IconDentalStatus number={'26'} tooth={this.state.dentalStatus.tooth_26}/>
						</div>
						<div id={'tooth_27'} className={css(styles.listItemStatusTop)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '27' } </span>
							<IconDentalStatus number={'27'} tooth={this.state.dentalStatus.tooth_27}/>
						</div>
						<div id={'tooth_28'} className={css(styles.listItemStatusTop)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '28' } </span>
							<IconDentalStatus number={'28'} tooth={this.state.dentalStatus.tooth_28}/>
						</div>
					</div>
				</div>

				<div className={css(styles.status_top_deciduos)} >
					<div className={css(styles.status_top_left_deciduos)} >
						<div id={'tooth_55'} className={css(styles.listItemStatusTopDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '55' } </span>
							<IconDentalStatus number={'55'} tooth={this.state.dentalStatus.tooth_55}/>
						</div>
						<div id={'tooth_54'} className={css(styles.listItemStatusTopDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '54' } </span>
							<IconDentalStatus number={'54'} tooth={this.state.dentalStatus.tooth_54}/>
						</div>
						<div id={'tooth_53'} className={css(styles.listItemStatusTopDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '53' } </span>
							<IconDentalStatus number={'53'} tooth={this.state.dentalStatus.tooth_53}/>
						</div>
						<div id={'tooth_52'} className={css(styles.listItemStatusTopDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '52' } </span>
							<IconDentalStatus number={'52'} tooth={this.state.dentalStatus.tooth_52}/>
						</div>
						<div id={'tooth_51'} className={css(styles.listItemStatusTopDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '51' } </span>
							<IconDentalStatus number={'51'} tooth={this.state.dentalStatus.tooth_51}/>
						</div>
					</div>

					<div className={css(styles.status_top_right_deciduos)} >
						<div id={'tooth_61'} className={css(styles.listItemStatusTopDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '61' } </span>
							<IconDentalStatus number={'61'} tooth={this.state.dentalStatus.tooth_61}/>
						</div>
						<div id={'tooth_62'} className={css(styles.listItemStatusTopDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '62' } </span>
							<IconDentalStatus number={'62'} tooth={this.state.dentalStatus.tooth_62}/>
						</div>
						<div id={'tooth_63'} className={css(styles.listItemStatusTopDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '63' } </span>
							<IconDentalStatus number={'63'} tooth={this.state.dentalStatus.tooth_63}/>
						</div>
						<div id={'tooth_64'} className={css(styles.listItemStatusTopDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '64' } </span>
							<IconDentalStatus number={'64'} tooth={this.state.dentalStatus.tooth_64}/>
						</div>
						<div id={'tooth_65'} className={css(styles.listItemStatusTopDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberTop)}> { '65' } </span>
							<IconDentalStatus number={'65'} tooth={this.state.dentalStatus.tooth_65}/>
						</div>
					</div>
				</div>

				<div className={css(styles.status_bot_deciduos)} >
					<div className={css(styles.status_bot_left_deciduos)} >
						<div id={'tooth_85'} className={css(styles.listItemStatusBotDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '85' } </span>
							<IconDentalStatus number={'85'} tooth={this.state.dentalStatus.tooth_85}/>
						</div>
						<div id={'tooth_84'} className={css(styles.listItemStatusBotDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '84' } </span>
							<IconDentalStatus number={'84'} tooth={this.state.dentalStatus.tooth_84}/>
						</div>
						<div id={'tooth_83'} className={css(styles.listItemStatusBotDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '83' } </span>
							<IconDentalStatus number={'83'} tooth={this.state.dentalStatus.tooth_83}/>
						</div>
						<div id={'tooth_82'} className={css(styles.listItemStatusBotDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '82' } </span>
							<IconDentalStatus number={'82'} tooth={this.state.dentalStatus.tooth_82}/>
						</div>
						<div id={'tooth_81'} className={css(styles.listItemStatusBotDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '81' } </span>
							<IconDentalStatus number={'81'} tooth={this.state.dentalStatus.tooth_81}/>
						</div>
					</div>
		
					<div className={css(styles.status_bot_right_deciduos)} >
						<div id={'tooth_71'} className={css(styles.listItemStatusBotDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '71' } </span>
							<IconDentalStatus number={'71'} tooth={this.state.dentalStatus.tooth_71}/>
						</div>
						<div id={'tooth_72'} className={css(styles.listItemStatusBotDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '72' } </span>
							<IconDentalStatus number={'72'} tooth={this.state.dentalStatus.tooth_72}/>
						</div>
						<div id={'tooth_73'} className={css(styles.listItemStatusBotDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '73' } </span>
							<IconDentalStatus number={'73'} tooth={this.state.dentalStatus.tooth_73}/>
						</div>
						<div id={'tooth_74'} className={css(styles.listItemStatusBotDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '74' } </span>
							<IconDentalStatus number={'74'} tooth={this.state.dentalStatus.tooth_74}/>
						</div>
						<div id={'tooth_75'} className={css(styles.listItemStatusBotDeciduos)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '75' } </span>
							<IconDentalStatus number={'75'} tooth={this.state.dentalStatus.tooth_75}/>
						</div>
					</div>
				</div>

				<div className={css(styles.status_bot)} >
					<div className={css(styles.status_bot_left)} >
						<div id={'tooth_48'} className={css(styles.listItemStatusBot)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '48' } </span>
							<IconDentalStatus number={'48'} tooth={this.state.dentalStatus.tooth_48}/>
						</div>
						<div id={'tooth_47'} className={css(styles.listItemStatusBot)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '47' } </span>
							<IconDentalStatus number={'47'} tooth={this.state.dentalStatus.tooth_47}/>
						</div>
						<div id={'tooth_46'} className={css(styles.listItemStatusBot)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '46' } </span>
							<IconDentalStatus number={'46'} tooth={this.state.dentalStatus.tooth_46}/>
						</div>
						<div id={'tooth_45'} className={css(styles.listItemStatusBot)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '45' } </span>
							<IconDentalStatus number={'45'} tooth={this.state.dentalStatus.tooth_45}/>
						</div>
						<div id={'tooth_44'} className={css(styles.listItemStatusBot)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '44' } </span>
							<IconDentalStatus number={'44'} tooth={this.state.dentalStatus.tooth_44}/>
						</div>
						<div id={'tooth_43'} className={css(styles.listItemStatusBot)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '43' } </span>
							<IconDentalStatus number={'43'} tooth={this.state.dentalStatus.tooth_43}/>
						</div>
						<div id={'tooth_42'} className={css(styles.listItemStatusBot)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '42' } </span>
							<IconDentalStatus number={'42'} tooth={this.state.dentalStatus.tooth_42}/>
						</div>
						<div id={'tooth_41'} className={css(styles.listItemStatusBot)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '41' } </span>
							<IconDentalStatus number={'41'} tooth={this.state.dentalStatus.tooth_41}/>
						</div>
					</div>

					<div className={css(styles.status_bot_right)} >
						<div id={'tooth_31'} className={css(styles.listItemStatusBot)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '31' } </span>
							<IconDentalStatus number={'31'} tooth={this.state.dentalStatus.tooth_31}/>
						</div>
						<div id={'tooth_32'} className={css(styles.listItemStatusBot)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '32' } </span>
							<IconDentalStatus number={'32'} tooth={this.state.dentalStatus.tooth_32}/>
						</div>
						<div id={'tooth_33'} className={css(styles.listItemStatusBot)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '33' } </span>
							<IconDentalStatus number={'33'} tooth={this.state.dentalStatus.tooth_33}/>
						</div>
						<div id={'tooth_34'} className={css(styles.listItemStatusBot)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '34' } </span>
							<IconDentalStatus number={'34'} tooth={this.state.dentalStatus.tooth_34}/>
						</div>
						<div id={'tooth_35'} className={css(styles.listItemStatusBot)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '35' } </span>
							<IconDentalStatus number={'35'} tooth={this.state.dentalStatus.tooth_35}/>
						</div>
						<div id={'tooth_36'} className={css(styles.listItemStatusBot)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '36' } </span>
							<IconDentalStatus number={'36'} tooth={this.state.dentalStatus.tooth_36}/>
						</div>
						<div id={'tooth_37'} className={css(styles.listItemStatusBot)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '37' } </span>
							<IconDentalStatus number={'37'} tooth={this.state.dentalStatus.tooth_37}/>
						</div>
						<div id={'tooth_38'} className={css(styles.listItemStatusBot)} data-tip data-event='click' onMouseUp={ this.onClickTooth }>
							<span className={css(styles.statusNumberBot)}> { '38' } </span>
							<IconDentalStatus number={'38'} tooth={this.state.dentalStatus.tooth_38}/>
						</div>
					</div>
				</div>
			</div>
		);
	};

	render() {
		if(this.state.dentalStatus){
			return (
				<div className={css(styles.flex)}>
					<form className={css(styles.form2)}>
						<div className={css(styles.sectionStatus)}>
							<div className={css(styles.flex, styles.flex2)}>
								<div className={css(styles.link)} style={ {float: 'right', padding: '8px 2px 3px 0px'} } onClick={this.openModal}>Editar Todos</div>
								{this.renderOdontogram(this.state.dentalStatus)}
								
								<div className={css(styles.subtitleBot)} >
									<div className={css(styles.subtitle)} >
										<div className={css(styles.ball)} style={ {background: '#86bfb5'} }></div>
										<span>Incluso</span>
									</div>
									<div className={css(styles.subtitle)} >
										<div className={css(styles.ball)} style={ {background: '#7a6d89'} }></div>
										<span>Agenesia</span>
									</div>
									<div className={css(styles.subtitle)} >
										<div className={css(styles.ball)} style={ {background: '#d8c74c'} }></div>
										<span>Exodontia</span>
									</div>
									<div className={css(styles.subtitle)} >
										<div className={css(styles.ball)} style={ {background: '#9dc458'} }></div>
										<span>Ausente</span>
									</div>
									<div className={css(styles.subtitle)} >
										<div className={css(styles.ball)} style={ {background: '#e2af5d'} }></div>
										<span>Perdido</span>
									</div>
								</div>
							</div>
						</div>
						<ReactTooltip place="left" globalEventOff='click' effect="solid" className={css(styles.pointer)} offset={{top: 10, left: -15}} >
							
							<div className={css(styles.btn_modal)} onClick={() => { this.onClickStatus('NORMAL'); } } >Normal</div>
							<div className={css(styles.btn_modal)} onClick={() => { this.onClickStatus('INCLUDED'); } } >Incluso</div>
							<div className={css(styles.btn_modal)} onClick={() => { this.onClickStatus('AGENESIS'); } } >Agenesia</div>
							<div className={css(styles.btn_modal)} onClick={() => { this.onClickStatus('EXODONTIA'); } } >Exodontia</div>
							<div className={css(styles.btn_modal)} onClick={() => { this.onClickStatus('IMPLANTE'); } } >Implante</div>
							<div className={css(styles.btn_modal)} onClick={() => { this.onClickStatus('MISSING'); } } >Ausente</div>
							<div className={css(styles.btn_modal)} onClick={() => { this.onClickStatus('LOST'); } } >Perdido</div>
						</ReactTooltip>

						<Modal
							isOpen={this.state.modal} 
							header={"Editar Todos"} 
							adjustStyle={styles.modalEdit} 
						>
							<ModalDentalStatus
								onCancel={ this.closeModal }
								onClickStatus={ this.onClickStatus }
							/>
						</Modal>
					</form>
				</div>
			);
		}
	}
}

// Redux Form function to handle form validation
function validate(values) {
	const errors = {};

	return errors;
}

const dentalStatusForm = reduxForm({
	validate,
	form: 'dentalStatusForm'
})(DentalStatusForm);

function mapStateToProps(state) {
    const selectedPatient = state.patientsCreation.selectedPatient;
    let initialValues = {};

	if (selectedPatient) {
        initialValues = selectedPatient;
	}

	return {
		selectedPatient: state.patientsCreation.selectedPatient,
		initialValues
	};
}

export default connect(mapStateToProps, { getDentalStatus, updateDentalStatus, defaultDentalStatus })(dentalStatusForm);