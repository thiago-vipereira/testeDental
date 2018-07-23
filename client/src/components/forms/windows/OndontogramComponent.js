import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './OdontogramFormStyles';
import moment from 'moment';
import 'moment/locale/pt-br';
import ReactTooltip from 'react-tooltip';

import { windowsFetchTreatment } from '../../../actions/windowsController';
import { getList } from '../../../actions/procedure';
import { defaultOdontogram } from '../../../components/_constants/odontogram';

import Button from '../../common/Button';
import InputField from '../../forms/InputField';

import IconOdontogram from '../../common/IconOdontogram';
import OdontogramIndication from '../../common/OdontogramIndication';
import OdontogramBar from '../../common/OdontogramBar';

class OndontogramComponent extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.mountOdontogram = this.mountOdontogram.bind(this);

		this.state = {
			odontogram: null,
			list: null,
		}
	}

	componentWillMount() {
		const { defaultOdontogram, myItem, windowsFetchTreatment, getList } = this.props;
		var odontogram;
		var list;
		if(myItem){
			windowsFetchTreatment(myItem.id, ret => {
				if(ret){

					odontogram = ret.data.value;
					if(odontogram.list_id){

						this.setState({
							odontogram: odontogram
						});

						getList(odontogram.list_id, retList =>{
							if(retList){
								
								this.setState({
									list: retList
								});
								this.mountOdontogram(list);
							}
						});
					}else{
						odontogram.finished = true;
						this.setState({
							odontogram: odontogram
						});
					}
				} 
			});
		}
	}

	componentDidMount() {}

	componentWillUpdate(nextProps){
	}
	
	mountOdontogram(list){

		if(!list){
			list = this.state.list;
		}
		var odontogram = this.state.odontogram;

		for( var att in odontogram ){
			if(odontogram[att].procedures){
				if(odontogram[att].procedures.length > 0){
					odontogram[att].procedures.map( procedure => {

						if(list._id == procedure.list_id){
							var procedureAux;

							list.groups.map( group => {
								procedureAux = group.procedures.find( procedureIn => {
									return procedureIn._id == procedure.procedure_id;
								});
								if(procedureAux){
									procedure.color = procedureAux.color;
									procedure.procedure_type = procedureAux.procedure_type;
									procedure.description = procedureAux.description;
								}
							});
						}
					});
				}	
			}
		}

		odontogram.finished = true;
		this.setState({
			odontogram: odontogram
		});
	}

	onSubmit(values) {
	}

	renderOdontogram(odontogram){
		return(
			<div className={css(styles.status_odontogram)}>
				<div className={css(styles.status_top)} >
					<div className={css(styles.status_top_left)}>
						<div id={'tooth_18'} className={css(styles.listItemStatusTop)} >
							<span className={css(styles.statusNumberTop)}> { '18' } </span>
							<IconOdontogram number={'18'} tooth={this.state.odontogram.tooth_18}/>
						</div>
						<div id={'tooth_17'} className={css(styles.listItemStatusTop)} >
							<span className={css(styles.statusNumberTop)}> { '17' } </span>
							<IconOdontogram number={'17'} tooth={this.state.odontogram.tooth_17}/>
						</div>
						<div id={'tooth_16'} className={css(styles.listItemStatusTop)} >
							<span className={css(styles.statusNumberTop)}> { '16' } </span>
							<IconOdontogram number={'16'} tooth={this.state.odontogram.tooth_16}/>
						</div>
						<div id={'tooth_15'} className={css(styles.listItemStatusTop)} >
							<span className={css(styles.statusNumberTop)}> { '15' } </span>
							<IconOdontogram number={'15'} tooth={this.state.odontogram.tooth_15}/>
						</div>
						<div id={'tooth_14'} className={css(styles.listItemStatusTop)} >
							<span className={css(styles.statusNumberTop)}> { '14' } </span>
							<IconOdontogram number={'14'} tooth={this.state.odontogram.tooth_14}/>
						</div>
						<div id={'tooth_13'} className={css(styles.listItemStatusTop)} >
							<span className={css(styles.statusNumberTop)}> { '13' } </span>
							<IconOdontogram number={'13'} tooth={this.state.odontogram.tooth_13}/>
						</div>
						<div id={'tooth_12'} className={css(styles.listItemStatusTop)} >
							<span className={css(styles.statusNumberTop)}> { '12' } </span>
							<IconOdontogram number={'12'} tooth={this.state.odontogram.tooth_12}/>
						</div>
						<div id={'tooth_11'} className={css(styles.listItemStatusTop)} >
							<span className={css(styles.statusNumberTop)}> { '11' } </span>
							<IconOdontogram number={'11'} tooth={this.state.odontogram.tooth_11}/>
						</div>
					</div>

					<div className={css(styles.status_top_right)} >
						<div id={'tooth_21'} className={css(styles.listItemStatusTop)} >
							<span className={css(styles.statusNumberTop)}> { '21' } </span>
							<IconOdontogram number={'21'} tooth={this.state.odontogram.tooth_21}/>
						</div>
						<div id={'tooth_22'} className={css(styles.listItemStatusTop)} >
							<span className={css(styles.statusNumberTop)}> { '22' } </span>
							<IconOdontogram number={'22'} tooth={this.state.odontogram.tooth_22}/>
						</div>
						<div id={'tooth_23'} className={css(styles.listItemStatusTop)} >
							<span className={css(styles.statusNumberTop)}> { '23' } </span>
							<IconOdontogram number={'23'} tooth={this.state.odontogram.tooth_23}/>
						</div>
						<div id={'tooth_24'} className={css(styles.listItemStatusTop)} >
							<span className={css(styles.statusNumberTop)}> { '24' } </span>
							<IconOdontogram number={'24'} tooth={this.state.odontogram.tooth_24}/>
						</div>
						<div id={'tooth_25'} className={css(styles.listItemStatusTop)} >
							<span className={css(styles.statusNumberTop)}> { '25' } </span>
							<IconOdontogram number={'25'} tooth={this.state.odontogram.tooth_25}/>
						</div>
						<div id={'tooth_26'} className={css(styles.listItemStatusTop)} >
							<span className={css(styles.statusNumberTop)}> { '26' } </span>
							<IconOdontogram number={'26'} tooth={this.state.odontogram.tooth_26}/>
						</div>
						<div id={'tooth_27'} className={css(styles.listItemStatusTop)} >
							<span className={css(styles.statusNumberTop)}> { '27' } </span>
							<IconOdontogram number={'27'} tooth={this.state.odontogram.tooth_27}/>
						</div>
						<div id={'tooth_28'} className={css(styles.listItemStatusTop)} >
							<span className={css(styles.statusNumberTop)}> { '28' } </span>
							<IconOdontogram number={'28'} tooth={this.state.odontogram.tooth_28}/>
						</div>
					</div>
				</div>

				<OdontogramBar
					procedure={this.state.odontogram.treatment} top={true}
				/>

				<div className={css(styles.status_top_deciduos)} >
					<div className={css(styles.status_top_left)} style={{ marginLeft: '10px' }} >
						<div id={'tooth_18'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTop)}> { '18' } </span>
							<IconOdontogram number={'18'} crown={true} tooth={this.state.odontogram.tooth_18}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} top={true} leftTooth={'18'} rightTooth={'17'}
						/>
						<div id={'tooth_17'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTop)}> { '17' } </span>
							<IconOdontogram number={'17'} crown={true} tooth={this.state.odontogram.tooth_17}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} top={true} leftTooth={'17'} rightTooth={'16'}
						/>
						<div id={'tooth_16'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTop)}> { '16' } </span>
							<IconOdontogram number={'16'} crown={true} tooth={this.state.odontogram.tooth_16}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} top={true} leftTooth={'16'} rightTooth={'15'}
						/>
						<div id={'tooth_15'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTop)}> { '15' } </span>
							<IconOdontogram number={'15'} crown={true} tooth={this.state.odontogram.tooth_15}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} top={true} leftTooth={'15'} rightTooth={'14'}
						/>
						<div id={'tooth_14'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTop)}> { '14' } </span>
							<IconOdontogram number={'14'} crown={true} tooth={this.state.odontogram.tooth_14}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} top={true} leftTooth={'14'} rightTooth={'13'}
						/>
						<div id={'tooth_13'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTop)}> { '13' } </span>
							<IconOdontogram number={'13'} crown={true} tooth={this.state.odontogram.tooth_13}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} top={true} leftTooth={'13'} rightTooth={'12'}
						/>
						<div id={'tooth_12'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTop)}> { '12' } </span>
							<IconOdontogram number={'12'} crown={true} tooth={this.state.odontogram.tooth_12}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} top={true} leftTooth={'12'} rightTooth={'11'}
						/>
						<div id={'tooth_11'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTop)}> { '11' } </span>
							<IconOdontogram number={'11'} crown={true} tooth={this.state.odontogram.tooth_11}/>
						</div>
					</div>

					<OdontogramIndication
						procedure={this.state.odontogram.treatment} top={true} leftTooth={'11'} rightTooth={'21'}
					/>

					<div className={css(styles.status_top_right_deciduos)}>
						<div id={'tooth_21'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '21' } </span>
							<IconOdontogram number={'21'} crown={true} tooth={this.state.odontogram.tooth_21}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} top={true} leftTooth={'21'} rightTooth={'22'}
						/>
						<div id={'tooth_22'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '22' } </span>
							<IconOdontogram number={'22'} crown={true} tooth={this.state.odontogram.tooth_22}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} top={true} leftTooth={'22'} rightTooth={'23'}
						/>
						<div id={'tooth_23'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '23' } </span>
							<IconOdontogram number={'23'} crown={true} tooth={this.state.odontogram.tooth_23}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} top={true} leftTooth={'23'} rightTooth={'24'}
						/>
						<div id={'tooth_24'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '24' } </span>
							<IconOdontogram number={'24'} crown={true} tooth={this.state.odontogram.tooth_24}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} top={true} leftTooth={'24'} rightTooth={'25'}
						/>
						<div id={'tooth_25'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '25' } </span>
							<IconOdontogram number={'25'} crown={true} tooth={this.state.odontogram.tooth_25}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} top={true} leftTooth={'25'} rightTooth={'26'}
						/>
						<div id={'tooth_26'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '26' } </span>
							<IconOdontogram number={'26'} crown={true} tooth={this.state.odontogram.tooth_26}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} top={true} leftTooth={'26'} rightTooth={'27'}
						/>
						<div id={'tooth_27'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '27' } </span>
							<IconOdontogram number={'27'} crown={true} tooth={this.state.odontogram.tooth_27}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} top={true} leftTooth={'27'} rightTooth={'28'}
						/>
						<div id={'tooth_28'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '28' } </span>
							<IconOdontogram number={'28'} crown={true} tooth={this.state.odontogram.tooth_28}/>
						</div>
					</div>
				</div>

				<div className={css(styles.status_top_deciduos)} >
					<div className={css(styles.status_top_left_deciduos)}>
						<div id={'tooth_55'} className={css(styles.listItemStatusTopDeciduos)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '55' } </span>
							<IconOdontogram number={'55'} crown={true} tooth={this.state.odontogram.tooth_55}/>
						</div>
						<div id={'tooth_54'} className={css(styles.listItemStatusTopDeciduos)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '54' } </span>
							<IconOdontogram number={'54'} crown={true} tooth={this.state.odontogram.tooth_54}/>
						</div>
						<div id={'tooth_53'} className={css(styles.listItemStatusTopDeciduos)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '53' } </span>
							<IconOdontogram number={'53'} crown={true} tooth={this.state.odontogram.tooth_53}/>
						</div>
						<div id={'tooth_52'} className={css(styles.listItemStatusTopDeciduos)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '52' } </span>
							<IconOdontogram number={'52'} crown={true} tooth={this.state.odontogram.tooth_52}/>
						</div>
						<div id={'tooth_51'} className={css(styles.listItemStatusTopDeciduos)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '51' } </span>
							<IconOdontogram number={'51'} crown={true} tooth={this.state.odontogram.tooth_51}/>
						</div>
					</div>

					<div className={css(styles.status_top_right_deciduos)} >
						<div id={'tooth_61'} className={css(styles.listItemStatusTopDeciduos)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '61' } </span>
							<IconOdontogram number={'61'} crown={true} tooth={this.state.odontogram.tooth_61}/>
						</div>
						<div id={'tooth_62'} className={css(styles.listItemStatusTopDeciduos)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '62' } </span>
							<IconOdontogram number={'62'} crown={true} tooth={this.state.odontogram.tooth_62}/>
						</div>
						<div id={'tooth_63'} className={css(styles.listItemStatusTopDeciduos)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '63' } </span>
							<IconOdontogram number={'63'} crown={true} tooth={this.state.odontogram.tooth_63}/>
						</div>
						<div id={'tooth_64'} className={css(styles.listItemStatusTopDeciduos)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '64' } </span>
							<IconOdontogram number={'64'} crown={true} tooth={this.state.odontogram.tooth_64}/>
						</div>
						<div id={'tooth_65'} className={css(styles.listItemStatusTopDeciduos)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '65' } </span>
							<IconOdontogram number={'65'} crown={true} tooth={this.state.odontogram.tooth_65}/>
						</div>
					</div>
				</div>

				<div className={css(styles.status_bot_deciduos)} >
					<div className={css(styles.status_bot_left_deciduos)} >
						<div id={'tooth_85'} className={css(styles.listItemStatusBotDeciduos)} >
							<span className={css(styles.crownNumberBotDeciduos)}> { '85' } </span>
							<IconOdontogram number={'85'} crown={true} tooth={this.state.odontogram.tooth_85}/>
						</div>
						<div id={'tooth_84'} className={css(styles.listItemStatusBotDeciduos)} >
							<span className={css(styles.crownNumberBotDeciduos)}> { '84' } </span>
							<IconOdontogram number={'84'} crown={true} tooth={this.state.odontogram.tooth_84}/>
						</div>
						<div id={'tooth_83'} className={css(styles.listItemStatusBotDeciduos)} >
							<span className={css(styles.crownNumberBotDeciduos)}> { '83' } </span>
							<IconOdontogram number={'83'} crown={true} tooth={this.state.odontogram.tooth_83}/>
						</div>
						<div id={'tooth_82'} className={css(styles.listItemStatusBotDeciduos)} >
							<span className={css(styles.crownNumberBotDeciduos)}> { '82' } </span>
							<IconOdontogram number={'82'} crown={true} tooth={this.state.odontogram.tooth_82}/>
						</div>
						<div id={'tooth_81'} className={css(styles.listItemStatusBotDeciduos)} >
							<span className={css(styles.crownNumberBotDeciduos)}> { '81' } </span>
							<IconOdontogram number={'81'} crown={true} tooth={this.state.odontogram.tooth_81}/>
						</div>
					</div>
		
					<div className={css(styles.status_bot_right_deciduos)} >
						<div id={'tooth_71'} className={css(styles.listItemStatusBotDeciduos)} >
							<span className={css(styles.crownNumberBotDeciduos)}> { '71' } </span>
							<IconOdontogram number={'71'} crown={true} tooth={this.state.odontogram.tooth_71}/>
						</div>
						<div id={'tooth_72'} className={css(styles.listItemStatusBotDeciduos)} >
							<span className={css(styles.crownNumberBotDeciduos)}> { '72' } </span>
							<IconOdontogram number={'72'} crown={true} tooth={this.state.odontogram.tooth_72}/>
						</div>
						<div id={'tooth_73'} className={css(styles.listItemStatusBotDeciduos)} >
							<span className={css(styles.crownNumberBotDeciduos)}> { '73' } </span>
							<IconOdontogram number={'73'} crown={true} tooth={this.state.odontogram.tooth_73}/>
						</div>
						<div id={'tooth_74'} className={css(styles.listItemStatusBotDeciduos)} >
							<span className={css(styles.crownNumberBotDeciduos)}> { '74' } </span>
							<IconOdontogram number={'74'} crown={true} tooth={this.state.odontogram.tooth_74}/>
						</div>
						<div id={'tooth_75'} className={css(styles.listItemStatusBotDeciduos)} >
							<span className={css(styles.crownNumberBotDeciduos)}> { '75' } </span>
							<IconOdontogram number={'75'} crown={true} tooth={this.state.odontogram.tooth_75}/>
						</div>
					</div>
				</div>

				<div className={css(styles.status_top_deciduos)} >
					<div className={css(styles.status_top_left)} style={{ marginLeft: '10px' }} >
						<div id={'tooth_48'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTop)}> { '48' } </span>
							<IconOdontogram number={'48'} crown={true} tooth={this.state.odontogram.tooth_48}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} leftTooth={'48'} rightTooth={'47'}
						/>
						<div id={'tooth_47'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTop)}> { '47' } </span>
							<IconOdontogram number={'47'} crown={true} tooth={this.state.odontogram.tooth_47}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} leftTooth={'47'} rightTooth={'46'}
						/>
						<div id={'tooth_46'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTop)}> { '46' } </span>
							<IconOdontogram number={'46'} crown={true} tooth={this.state.odontogram.tooth_46}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} leftTooth={'46'} rightTooth={'45'}
						/>
						<div id={'tooth_45'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTop)}> { '45' } </span>
							<IconOdontogram number={'45'} crown={true} tooth={this.state.odontogram.tooth_45}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} leftTooth={'45'} rightTooth={'44'}
						/>
						<div id={'tooth_44'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTop)}> { '44' } </span>
							<IconOdontogram number={'44'} crown={true} tooth={this.state.odontogram.tooth_44}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} leftTooth={'44'} rightTooth={'43'}
						/>
						<div id={'tooth_43'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTop)}> { '43' } </span>
							<IconOdontogram number={'43'} crown={true} tooth={this.state.odontogram.tooth_43}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} leftTooth={'43'} rightTooth={'42'}
						/>
						<div id={'tooth_42'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTop)}> { '42' } </span>
							<IconOdontogram number={'42'} crown={true} tooth={this.state.odontogram.tooth_42}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} leftTooth={'42'} rightTooth={'41'}
						/>
						<div id={'tooth_41'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTop)}> { '41' } </span>
							<IconOdontogram number={'41'} crown={true} tooth={this.state.odontogram.tooth_41}/>
						</div>
					</div>

					<OdontogramIndication
						procedure={this.state.odontogram.treatment} leftTooth={'41'} rightTooth={'31'}
					/>

					<div className={css(styles.status_top_right_deciduos)} >
						<div id={'tooth_31'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '31' } </span>
							<IconOdontogram number={'31'} crown={true} tooth={this.state.odontogram.tooth_31}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} leftTooth={'31'} rightTooth={'32'}
						/>
						<div id={'tooth_32'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '32' } </span>
							<IconOdontogram number={'32'} crown={true} tooth={this.state.odontogram.tooth_32}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} leftTooth={'32'} rightTooth={'33'}
						/>
						<div id={'tooth_33'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '33' } </span>
							<IconOdontogram number={'33'} crown={true} tooth={this.state.odontogram.tooth_33}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} leftTooth={'33'} rightTooth={'34'}
						/>
						<div id={'tooth_34'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '34' } </span>
							<IconOdontogram number={'34'} crown={true} tooth={this.state.odontogram.tooth_34}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} leftTooth={'34'} rightTooth={'35'}
						/>
						<div id={'tooth_35'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '35' } </span>
							<IconOdontogram number={'35'} crown={true} tooth={this.state.odontogram.tooth_35}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} leftTooth={'35'} rightTooth={'36'}
						/>
						<div id={'tooth_36'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '36' } </span>
							<IconOdontogram number={'36'} crown={true} tooth={this.state.odontogram.tooth_36}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} leftTooth={'36'} rightTooth={'37'}
						/>
						<div id={'tooth_37'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '37' } </span>
							<IconOdontogram number={'37'} crown={true} tooth={this.state.odontogram.tooth_37}/>
						</div>
						<OdontogramIndication
							procedure={this.state.odontogram.treatment} leftTooth={'37'} rightTooth={'38'}
						/>
						<div id={'tooth_38'} className={css(styles.listItemStatusTopCrown)} >
							<span className={css(styles.crownNumberTopDeciduos)}> { '38' } </span>
							<IconOdontogram number={'38'} crown={true} tooth={this.state.odontogram.tooth_38}/>
						</div>
					</div>
				</div>

				<OdontogramBar
					procedure={this.state.odontogram.treatment} top={false}
				/>

				<div className={css(styles.status_bot)} >
					<div className={css(styles.status_bot_left)} >
						<div id={'tooth_48'} className={css(styles.listItemStatusBot)} >
							<span className={css(styles.statusNumberBot)}> { '48' } </span>
							<IconOdontogram number={'48'} tooth={this.state.odontogram.tooth_48}/>
						</div>
						<div id={'tooth_47'} className={css(styles.listItemStatusBot)} >
							<span className={css(styles.statusNumberBot)}> { '47' } </span>
							<IconOdontogram number={'47'} tooth={this.state.odontogram.tooth_47}/>
						</div>
						<div id={'tooth_46'} className={css(styles.listItemStatusBot)} >
							<span className={css(styles.statusNumberBot)}> { '46' } </span>
							<IconOdontogram number={'46'} tooth={this.state.odontogram.tooth_46}/>
						</div>
						<div id={'tooth_45'} className={css(styles.listItemStatusBot)} >
							<span className={css(styles.statusNumberBot)}> { '45' } </span>
							<IconOdontogram number={'45'} tooth={this.state.odontogram.tooth_45}/>
						</div>
						<div id={'tooth_44'} className={css(styles.listItemStatusBot)} >
							<span className={css(styles.statusNumberBot)}> { '44' } </span>
							<IconOdontogram number={'44'} tooth={this.state.odontogram.tooth_44}/>
						</div>
						<div id={'tooth_43'} className={css(styles.listItemStatusBot)} >
							<span className={css(styles.statusNumberBot)}> { '43' } </span>
							<IconOdontogram number={'43'} tooth={this.state.odontogram.tooth_43}/>
						</div>
						<div id={'tooth_42'} className={css(styles.listItemStatusBot)} >
							<span className={css(styles.statusNumberBot)}> { '42' } </span>
							<IconOdontogram number={'42'} tooth={this.state.odontogram.tooth_42}/>
						</div>
						<div id={'tooth_41'} className={css(styles.listItemStatusBot)} >
							<span className={css(styles.statusNumberBot)}> { '41' } </span>
							<IconOdontogram number={'41'} tooth={this.state.odontogram.tooth_41}/>
						</div>
					</div>

					<div className={css(styles.status_bot_right)} >
						<div id={'tooth_31'} className={css(styles.listItemStatusBot)} >
							<span className={css(styles.statusNumberBot)}> { '31' } </span>
							<IconOdontogram number={'31'} tooth={this.state.odontogram.tooth_31}/>
						</div>
						<div id={'tooth_32'} className={css(styles.listItemStatusBot)} >
							<span className={css(styles.statusNumberBot)}> { '32' } </span>
							<IconOdontogram number={'32'} tooth={this.state.odontogram.tooth_32}/>
						</div>
						<div id={'tooth_33'} className={css(styles.listItemStatusBot)} >
							<span className={css(styles.statusNumberBot)}> { '33' } </span>
							<IconOdontogram number={'33'} tooth={this.state.odontogram.tooth_33}/>
						</div>
						<div id={'tooth_34'} className={css(styles.listItemStatusBot)} >
							<span className={css(styles.statusNumberBot)}> { '34' } </span>
							<IconOdontogram number={'34'} tooth={this.state.odontogram.tooth_34}/>
						</div>
						<div id={'tooth_35'} className={css(styles.listItemStatusBot)} >
							<span className={css(styles.statusNumberBot)}> { '35' } </span>
							<IconOdontogram number={'35'} tooth={this.state.odontogram.tooth_35}/>
						</div>
						<div id={'tooth_36'} className={css(styles.listItemStatusBot)} >
							<span className={css(styles.statusNumberBot)}> { '36' } </span>
							<IconOdontogram number={'36'} tooth={this.state.odontogram.tooth_36}/>
						</div>
						<div id={'tooth_37'} className={css(styles.listItemStatusBot)} >
							<span className={css(styles.statusNumberBot)}> { '37' } </span>
							<IconOdontogram number={'37'} tooth={this.state.odontogram.tooth_37}/>
						</div>
						<div id={'tooth_38'} className={css(styles.listItemStatusBot)} >
							<span className={css(styles.statusNumberBot)}> { '38' } </span>
							<IconOdontogram number={'38'} tooth={this.state.odontogram.tooth_38}/>
						</div>
					</div>
				</div>
			</div>
		);
	};

	render() {
		if(this.state.odontogram && this.state.odontogram.finished){
			return (
				<div className={css(styles.flex)}>
					<form className={css(styles.form)}>
						{this.renderOdontogram(this.state.odontogram)}
					</form>
				</div>
			);
		}
		return (
			<div className={css(styles.flex)}></div>
		);
	}
}

// Redux Form function to handle form validation

const odontogramComponent = reduxForm({
	form: 'odontogramComponent'
})(OndontogramComponent);

function mapStateToProps(state) {
    let initialValues = {};

	return {
		initialValues
	};
}

export default connect(mapStateToProps, { windowsFetchTreatment, defaultOdontogram, getList })(odontogramComponent);