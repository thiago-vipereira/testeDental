import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-masked-input';

import { css, StyleSheet } from 'aphrodite/no-important';
import { styles } from '../ProcedureFormStyles';
import { GithubPicker } from 'react-color';

import Icon from '../../../common/Icon';
import Button from '../../../common/Button';
import SelectBox from '../../../common/SelectBox';
import InputField from '../../../forms/InputField';

import { createProcedure, editProcedure } from '../../../../actions/procedure';

import preview_apicectomia from './procedureImage/preview_apicectomia.png';
import preview_canal from './procedureImage/preview_canal.png';
import preview_coroa from './procedureImage/preview_coroa.png';
import preview_exerto_gengival from './procedureImage/preview_exerto_gengival.png';
import preview_implante_conemorse from './procedureImage/preview_implante_conemorse.png';
import preview_implante_curto from './procedureImage/preview_implante_curto.png';
import preview_implante_hexagono_interno from './procedureImage/preview_implante_hexagono_interno.png';
import preview_implante_hexagono_externo from './procedureImage/preview_implante_hexagono_externo.png';
import preview_malhaperio from './procedureImage/preview_malhaperio.png';
import preview_nucleo from './procedureImage/preview_nucleo.png';
import preview_ponte_adesiva from './procedureImage/preview_ponte_adesiva.png';
import preview_ponte_fixa from './procedureImage/preview_ponte_fixa.png';
import preview_ponte_movel from './procedureImage/preview_ponte_movel.png';
import preview_protese_total from './procedureImage/preview_protese_total.png';
import preview_raio_x from './procedureImage/preview_raio_x.png';
import preview_restauracao from './procedureImage/preview_restauracao.png';
import preview_rizectomia from './procedureImage/preview_rizectomia.png';
import preview_splinter from './procedureImage/preview_splinter.png';
import preview_bloco_metalico from './procedureImage/preview_bloco_metalico.png';
import preview_coroa_de_aco from './procedureImage/preview_coroa_de_aco.png';
import preview_Faceta from './procedureImage/preview_Faceta.png';
import preview_Pulpectomia from './procedureImage/preview_Pulpectomia.png';
import preview_selante from './procedureImage/preview_selante.png';
import preview_Reabsorcao from './procedureImage/preview_Reabsorcao.png';
import preview_implante_zigomatico from './procedureImage/preview_implante_zigomatico.png';
import preview_implante_nobel_replace_tapred from './procedureImage/preview_implante_nobel_replace_tapred.png';
import preview_rap from './procedureImage/preview_rap.png';
import preview_Frenulotomia from './procedureImage/preview_Frenulotomia.png';
import preview_extracao from './procedureImage/preview_extracao.png';

const FIELDS = [
	{ name: 'code', label: 'Código do Procedimento', placeholder: 'Código do Procedimento' },
	{ name: 'description', label: 'Nome do Procedimento', placeholder: 'Descrição do Procedimento' },
];
const FIELDS2 = [
	{ name: 'price', label: 'Valor', placeholder: 'Valor', type:'money'}
];
const OPTIONS = [
	{ value: 'NOTYPE', label: 'Nenhum'},
	{ value: 'EXTRACTION', label: 'Extração'},
	{ value: 'CROWN', label: 'Coroa'},
	{ value: 'GRAFT', label: 'Enxerto Gengival'},
	{ value: 'CONEMORSE', label: 'Implante Conemorce'},
	{ value: 'SHORT', label: 'Implante Curto'},
	{ value: 'HEXAGONAL_IN', label: 'Implante Hexagono Interno'},
	{ value: 'HEXAGONAL_OUT', label: 'Implante Hexagono Externo'},
	{ value: 'ZYGOMATIC', label: 'Implante Zigomatico'},
	{ value: 'NOBEL_REPLACE', label: 'Implante Nobel Replace Tapred'},
	{ value: 'RETAIL', label: 'Retalho Periodontal'},
	{ value: 'RESTORATION', label: 'Restauração'},
	{ value: 'RIZECTOMY', label: 'Rizectomia'},
	{ value: 'APICECTOMY', label: 'Apicectomia'},
	{ value: 'CHANNEL', label: 'Canal'},
	{ value: 'XRAY', label: 'Raio X'},
	{ value: 'DENTURES', label: 'Protese Total'},
	{ value: 'MOBILE', label: 'Ponte Móvel'},
	{ value: 'FIXED', label: 'Ponte Fixa'},
	{ value: 'ADHESIVE', label: 'Ponte Adesiva'},
	{ value: 'SPLINTER', label: 'Splinter'},
	{ value: 'STEEL_CROWN', label: 'Coroa de aço'},
	{ value: 'PULPECTOMY', label: 'Pulpectomia'},
	{ value: 'FACETS', label: 'Facetas'},
	{ value: 'CORE', label: 'Núcleo'},
	{ value: 'METAL_BLOCK', label: 'Bloco Metálico'},
	{ value: 'RESORPTION', label: 'Reabsorção de Raíz'},
	{ value: 'RAP', label: 'RAP'},
	{ value: 'FRENULOTOMY', label: 'Frenuloctomia'},
	{ value: 'SELANTE', label: 'Selante'},
];

// ModalProcedureForm handles the form where the user enter the app
class ModalProcedureForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
        this.renderFields = this.renderFields.bind(this);
		this.renderSelectBox = this.renderSelectBox.bind(this);
		this.renderPreview = this.renderPreview.bind(this);
		this.renderImage = this.renderImage.bind(this);

		this.displayColorPickerClick = this.displayColorPickerClick.bind(this);
		this.displayColorPickerClose = this.displayColorPickerClose.bind(this);
		this.displayColorPickerChange = this.displayColorPickerChange.bind(this);
		
		this.getMoney = this.getMoney.bind(this);
        
        this.state = {
			showModal: false,
			color: '#C4DEF6',
        }
	}

	componentDidMount() {
		const { getProcedure } = this.props;

		if(getProcedure){
			this.setState({
				color: getProcedure.color
			});
		}
	}

	getMoney( str ){
		return parseFloat(str.replace(/[\D]+/g,''))/100; // pega a string no formato R$ 0.000,00 e transforma em 0000.00
	}

	onSubmit(values) {
		const { selectedProcedure, thisSelectedGroup, createProcedure, onCancel, user, edit, editProcedure, getProcedure } = this.props;

		values.price = this.getMoney(values.price.toString()); // pega a string no formato R$ 0.000,00 e transforma em 0000.00
		values.color = this.state.color;
		
		if(edit){
			var editList = {value: values, updated_by: user._id };
			editProcedure(editList, selectedProcedure._id, thisSelectedGroup, getProcedure._id, ret =>{});
			onCancel();

		}else{ // create procedure
			var createList = {values: values, updated_by: user._id, group: thisSelectedGroup };

			createProcedure(createList, selectedProcedure._id, ret =>{});
			onCancel();
		}
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

	renderFields(fields) {
		// iterate through the FIELDS array and create a Field for each item
		return fields.map(field => {
			return (
				<Field
					key={field.name}
					type={(field.type) ? field.type : 'text'}
					name={field.name}
					label={field.label}
					placeholder={(field.placeholder) ? field.placeholder : ''}
					mask={(field.mask) ? field.mask : ''}
					component={InputField}
				/>
			);
		});
	}

	renderImage(fields) {

		switch(fields) {
			case 'NOTYPE':
				return null;
				break;
			case 'CROWN':
				return (<img src={preview_coroa} />);
				break;
			case 'RESTORATION':
				return (<img src={preview_restauracao} />);
				break;
			case 'RIZECTOMY':
				return (<img src={preview_rizectomia} />);
				break;
			case 'APICECTOMY':
				return (<img src={preview_apicectomia} />);
				break;
			case 'CHANNEL':
				return (<img src={preview_canal} />);
				break;
			case 'XRAY':
				return (<img src={preview_raio_x} />);
				break;
			case 'DENTURES':
				return (<img src={preview_protese_total} />);
				break;
			case 'MOBILE':
				return (<img src={preview_ponte_movel} />);
				break;
			case 'FIXED':
				return (<img src={preview_ponte_fixa} />);
				break;
			case 'ADHESIVE':
				return (<img src={preview_ponte_adesiva} />);
				break;
			case 'SPLINTER':
				return (<img src={preview_splinter} />);
				break;
			case 'GRAFT':
				return (<img src={preview_exerto_gengival} />);
				break;
			case 'CONEMORSE':
				return (<img src={preview_implante_conemorse} />);
				break;
			case 'SHORT':
				return (<img src={preview_implante_curto} />);
				break;
			case 'HEXAGONAL_IN':
				return (<img src={preview_implante_hexagono_interno} />);
				break;
			case 'HEXAGONAL_OUT':
				return (<img src={preview_implante_hexagono_externo} />);
				break;
			case 'ZYGOMATIC':
				return (<img src={preview_implante_zigomatico} />);
				break;
			case 'NOBEL_REPLACE':
				return (<img src={preview_implante_nobel_replace_tapred} />);
				break;
			case 'RETAIL':
				return (<img src={preview_malhaperio} />);
				break;
			case 'STEEL_CROWN':
				return (<img src={preview_coroa_de_aco} />);
				break;
			case 'PULPECTOMY':
				return (<img src={preview_Pulpectomia} />);
				break;
			case 'FACETS':
				return (<img src={preview_Faceta} />);
				break;
			case 'CORE':
				return (<img src={preview_nucleo} />);
				break;
			case 'METAL_BLOCK':
				return (<img src={preview_bloco_metalico} />);
				break;
			case 'RESORPTION':
				return (<img src={preview_Reabsorcao} />);
				break;
			case 'RAP': 
				return (<img src={preview_rap} />);
				break;
			case 'FRENULOTOMY':
				return (<img src={preview_Frenulotomia} />);
				break;
			case 'SELANTE':
				return (<img src={preview_selante} />);
				break;
			case 'EXTRACTION':
				return (<img src={preview_extracao} />);
				break;
			default:
				return null;
				break;
		}
	}

	renderPreview(fields) {
		
		var image = this.renderImage(fields);
		if(image){
			return (
				<div className={css(styles.preview_field)}>
					{image}
				</div>
			);
		}
		return '';
	}

	renderSelectBox(OPTIONS){
		return (
			<Field
			key={'procedure_type'}
			type={'selectbox'}
			name={'procedure_type'}
			label={'Tipo do Procedimento'}
			itens={OPTIONS}
			component={SelectBox}
		/>);
	}

	displayColorPickerClick() {
		this.setState({ displayColorPicker: !this.state.displayColorPicker })
	};

	displayColorPickerClose() {
		this.setState({ displayColorPicker: false })
	  };
	
	displayColorPickerChange(color) {
		this.setState({ color: color.hex })
		this.displayColorPickerClose();
	};

	render() {
		const { handleSubmit, onCancel, procedureType } = this.props;

		const style = StyleSheet.create({
			color: {
				width: '100%',
				height: '25px',
				borderRadius: '2px',
				background: this.state.color,
			  },
		});

		return (
            <form className={css(styles.form_modal)} onSubmit={handleSubmit(this.onSubmit)}>
                {this.renderAuthMsg()}
                
				{this.renderFields(FIELDS)}
				{this.renderSelectBox(OPTIONS)}
				{this.renderPreview(procedureType)}

				

				<div className={css(styles.backgroundCard)}>
					<label className={css(styles.label)}>Cor do Procedimento</label>
					<div className={css(styles.swatch)} onClick={ this.displayColorPickerClick }>
						<div className={css(style.color)}/>
					</div>
					{ this.state.displayColorPicker ? <div className={css(styles.popover)}>
						<div className={css(styles.cover)} onClick={ this.displayColorPickerClose }/>
							<GithubPicker color={ this.state.color } onChange={ this.displayColorPickerChange } />
						</div> :
					null }
				</div>
				{this.renderFields(FIELDS2)}
                <Button
                    text="Salvar"
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

// Redux Form function to handle form validation
function validate(values) {
	const errors = {};

    if (!values.code) {
		errors.code = 'Digite o código';
	}

	if (values.description) {
		if(values.description.trim().length <= 0){
			errors.description = 'Digite a descrição';
		}
	}
	if (!values.description) {
		errors.description = 'Digite a descrição';
	}

	if (!values.price) {
		errors.price = 'Digite o valor';
    }
	return errors;
}

const modalProcedureForm = reduxForm({
	validate,
	form: 'modalProcedureForm'
})(ModalProcedureForm);

function mapStateToProps(state, props) {

	const getProcedure = state.procedureConfig.getProcedure;
	let initialValues = {};
	const selector = formValueSelector('modalProcedureForm');
	let procedure_type = selector(state, 'procedure_type');
	
	
	if (getProcedure && props.edit) {

		const mathRound = function(number){
			number = Math.round(number * 100)/100;
			number = number.toString();
			if(number.search(/([/.]+)/g) == -1){ number = number + '.00'; }
			return number;
		};
		getProcedure.price = mathRound(getProcedure.price);
		
		initialValues = getProcedure; 
	}

	return {
		user: state.auth.user,
		getProcedure : state.procedureConfig.getProcedure,
		selectedProcedure: state.procedureConfig.selectedProcedure,
		thisSelectedGroup : state.procedureConfig.selectedGroup,
		procedureType : procedure_type,
		initialValues
	};
}

export default connect(mapStateToProps, { createProcedure, editProcedure })(modalProcedureForm);