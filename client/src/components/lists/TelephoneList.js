import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import InputMask from 'react-input-mask';

import { css } from 'aphrodite/no-important';
import { styles } from '../forms/InputFieldStyles';

import Button from '../common/Button';

class TelephoneList extends Component {
    constructor(props) {
        super(props);

		this.addTelephone = this.addTelephone.bind(this);
		this.removeTelephone = this.removeTelephone.bind(this);
		this.telephoneNameChange = this.telephoneNameChange.bind(this);
		this.telephoneValueChange = this.telephoneValueChange.bind(this);
		this.setError = this.setError.bind(this);
		this.telephoneNameError = this.telephoneNameError.bind(this);
		this.telephoneValueError = this.telephoneValueError.bind(this);

		this.state = {
			name: '',
			telephones: [{ name: '', value: '' }],
			erros: [{ name: null, value: null }],
		};
	}
	
	componentWillReceiveProps(nextProps) {
			this.setState({ telephones: [...nextProps.telephones] });

			nextProps.telephones.map((telephone, sidx) => {
				this.setState({
					erros: this.state.erros.concat([{ name: null, value: null }])
				});
		   });
	}
	
	telephoneNameChange = (idx) => (evt) => {

		const { getTelephones } = this.props;

		const newTelephones = this.state.telephones.map((telephone, sidx) => {
			if (idx !== sidx) return telephone;
			return { ...telephone, name: evt.target.value };
		});
	
		this.setState({ telephones: newTelephones });

		getTelephones(newTelephones);
	}

	telephoneValueChange = (idx) => (evt) => {

		const { getTelephones } = this.props; 

		const newTelephones = this.state.telephones.map((telephone, sidx) => {
			 if (idx !== sidx) return telephone;
			return { ...telephone, value: evt.target.value };
		});
	
		this.setState({ telephones: newTelephones });
		
		getTelephones(newTelephones);
	}

	telephoneNameError = (idx) => (evt) => {

		const newErro = this.state.erros.map((erro, sidx) => {
			if (idx !== sidx) return erro;
			if(evt.target.value.trim() == '') return { ...erro, name: "Adicione um tipo" };
			else return { ...erro, name: null };
		});

		this.setState({ erros: newErro });
	}

	telephoneValueError = (idx) => (evt) => {
		const phoneRgx = /\([1-9]{2}\) [2-9][0-9]{3,4} [0-9]{4}/; 

		const newErro = this.state.erros.map((erro, sidx) => {
			if (idx !== sidx) return erro;
			if(evt.target.value.trim() == '' || !phoneRgx.test(evt.target.value)) return { ...erro, value: 'Telefone inválido' };
			else return { ...erro, value: null };
		});

		this.setState({ erros: newErro });
	}
	
	addTelephone = () => {

		const { getTelephones } = this.props;

		if(this.state.telephones[this.state.telephones.length-1].name !='' && this.state.telephones[this.state.telephones.length-1].value !=''){

			this.setState({
				telephones: this.state.telephones.concat([{ name: '', value: '' }])
			});

			this.setState({
				erros: this.state.erros.concat([{ name: null, value: null }])
			});

			getTelephones(this.state.telephones.concat([{ name: '', value: '' }]));
		}
	}
	
	removeTelephone = (idx) => () => {

		const { getTelephones } = this.props;

		this.setState({
			telephones: this.state.telephones.filter((s, sidx) => idx !== sidx)
		});

		this.setState({
			erros: this.state.erros.filter((s, sidx) => idx !== sidx)
		});

		getTelephones(this.state.telephones.filter((s, sidx) => idx !== sidx));
	}

	setError = () => {
		
		var qntErro = null;

		this.state.erros.map((erro, sidx) => {
			if (erro.name !== null || erro.value !== null){
				qntErro = true;
			}
		});

		return qntErro;
	}
	
	render() {
		const {getTelError} = this.props;

		getTelError(this.setError());
		return (
			<div>
				{this.state.telephones.map( (telephone, idx) => (
					<div key={idx} className={css(styles.row_3)} >

						<fieldset className={css(styles.fieldset)}>
							{ idx == 0 ? <label className={css(styles.label)}>Tipo</label> : ''}
							<InputMask className={css(styles.input)} type={'text'} onChange={this.telephoneNameChange(idx)} onBlur={this.telephoneNameError(idx)}
								value={telephone.name} placeholder={'Ex.: Celular, Principal...'} maskChar={''} />
							{this.state.erros[idx].name && <span className={css(styles.msgError)}>{this.state.erros[idx].name}</span>}
						</fieldset>
						
						<fieldset className={css(styles.fieldset)}>
							{ idx == 0 ? <label className={css(styles.label)}>Telefone</label> : ''}
							<InputMask className={css(styles.input)} type={'text'} onChange={this.telephoneValueChange(idx)} onBlur={this.telephoneValueError(idx)}
								value={telephone.value} placeholder={'(XX) XXXXX XXXX'} mask={'(99) 99999 9999'} maskChar={''} />
								{this.state.erros[idx].value && <span className={css(styles.msgError)}>{this.state.erros[idx].value}</span>}
						</fieldset>
						
						{ idx != 0 ? (
							<fieldset className={css(styles.fieldset)}>
								<span className={css(styles.link, styles.red)} onClick={this.removeTelephone(idx)} >Excluir</span>
							</fieldset>
						) : ''}

					</div>
				)) }
				<Button
					text='Adicionar Telefone'
					color="primary"
					onClick={this.addTelephone}
				/>
			</div>
		)
	}

}

const telephoneList = reduxForm({
	form: 'telephoneList'
})(TelephoneList);

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps, { })(telephoneList);
