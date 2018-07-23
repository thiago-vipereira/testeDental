import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { css } from 'aphrodite/no-important';
import { styles } from './EditAnamnesisFormStyles';

import { getAnamnese, createAnamnese, updateAnamnese } from '../../../actions/anamnesis';

import Button from '../../common/Button';

import InputField from '../../forms/InputField';
import InputSearch from '../../forms/InputSearch';
import SelectBox from '../../common/SelectBox';
import Icon from '../../common/Icon';
import Toggle from '../../common/Toggle';

// editAnamnesisForm handles the form where the user enter the app
class EditAnamnesisForm extends Component {
	constructor(props) {
		super(props);
		this.save = this.save.bind(this);
		this.newQuestion = this.newQuestion.bind(this);
		this.removeQuestion = this.removeQuestion.bind(this);
		this.newOption = this.newOption.bind(this);
		this.removeOption = this.removeOption.bind(this);
		this.change = this.change.bind(this);
		this.state = {
			questions: [
				{
					kind: 'radio',
					question: '',
					options:[
						{
							content: '',
							alert: false
						}
					]
				}
			],
			types: [{value: 'radio', label: 'Resposta única'}, {value: 'check', label: 'Múltiplas respostas'}, {value: 'open', label: 'Campo aberto'}],
			name: '',
		};
	}

	save() {
		console.log(this.state.questions);
		const { history, match, createAnamnese, updateAnamnese } = this.props;
		var copy = [...this.state.questions].map((item) => {
			if (item.kind === 'open')
				return {kind: item.kind, question: item.question};
			return item;
		})
		if (match.params.anamneseId)
		  	updateAnamnese({ name: this.state.name, questions: copy }, match.params.anamneseId, () => {});
		else
			createAnamnese({ name: this.state.name, questions: copy }, ret => {
				history.push(`${match.url}/${ret._id}`);
			});
  	}
  
	newQuestion() {
		var newelement = {
		kind: 'radio',
		question: '',
		options:[
			{
			content: '',
			alert: false
			}
		]
		};
		this.setState(prevState => ({
		questions: [...prevState.questions, newelement]
		}));
	}

	removeQuestion(index) {
		if (this.state.questions.length>1) {
		var copy = [...this.state.questions];
		copy.splice(index, 1);
		this.setState({questions: copy});
		}
	}

	newOption(index) {
		var copy = [...this.state.questions];
		copy[index].options.push({
		content: '',
		alert: false
		});
		this.setState({questions: copy});
	}

	removeOption(indexQuestion, indexOption) {
		if (this.state.questions[indexQuestion].options.length>1) {
			var copy = [...this.state.questions];
			copy[indexQuestion].options.splice(indexOption, 1);
			this.setState({questions: copy});
		}
	}

	change(indexQuestion, type, value, indexOption, oType) {
		var copy = [...this.state.questions];
		if (type === 'option')
			copy[indexQuestion].options[indexOption][oType] = value;
		else
			copy[indexQuestion][type] = value;
		this.setState({questions: copy})
	}
	
	componentWillMount() {
		const { getAnamnese, match } = this.props;
		if (match.params.anamneseId)
			getAnamnese(match.params.anamneseId, ret => this.setState({name: ret.name, questions: ret.questions.map((item) => {
				if (item.kind === 'open')
					return {...item, options: [{alert: false, content: ''}]}
				return item;
			})}));
	}

	render() {
		const { match } = this.props;
		return (
			<div className={css(styles.grid)}>
				<form className={css(styles.form)} name={"editAnamnesisForm"}>
				<div className={css(styles.nameGrid)}>
					<InputField
						input={{
							name: 'name',
							onChange: (e) => this.setState({name: e.currentTarget.value}),
							value: this.state.name
						}}
						label={'Nome'}
					/>
				</div>
				{this.state.questions.map((item, index) => {
					return (
						<div key={index}>
							<h3 className={css(styles.sectionTitle)}>
								PERGUNTA {index+1}
								<div className={css(styles.close)} data-index={index} onClick={(e) => this.removeQuestion(e.currentTarget.dataset.index)}>
									<Icon icon="x" size="extra-small" color="grey" />
								</div>
							</h3>
							<div className={css(styles.htmlGrid)}>
								<div>
								<fieldset className={css(styles.fieldset)}>
									<label className={css(styles.label)}>Tipo de pergunta</label>
									<select onChange={(e) => this.change(index, 'kind', e.target.value)} value={item.kind} className={css(styles.input)}>
										{this.state.types.map((itm) =>
											<option key={itm.value} value={itm.value}>{itm.label}</option>
										)}
									</select>
								</fieldset>
								</div>
								<div>
									<InputField
										input={{
											name: 'question_'+index,
											onChange: (e) => this.change(index, 'question', e.currentTarget.value),
											value: item.question
										}}
										label={'Pergunta'}
									/>
									<div style={{paddingLeft: '.5rem'}}>
										{item.kind === 'open'?null:item.options.map((option, indx) => {
											return (
												<div className={css(styles.optionGrid)} key={index+'.'+indx}>
													<InputField
														label={'Opção '+(indx+1)}
														input={{
															onChange: (e) => this.change(index, 'option', e.currentTarget.value, indx, 'content'),
															value: option.content
														}}
													/>
													<Toggle
														label={'Alerta'}
														defaultValue={option.alert}
														change={(e) => this.change(index, 'option', e, indx, 'alert')}
													/>
													<div>
														<div className={css(styles.closeCircle)} data-index={index} onClick={(e) => this.removeOption(e.currentTarget.dataset.index, indx)}>
															<Icon icon="x" size="extra-small" color="white" />
														</div>
													</div>
												</div>
											);
										})}
										{item.kind === 'open' ? null :
											<div style={{marginTop: '-.5rem'}}>
												<span className={css(styles.link)} data-index={index} onClick={(e) => this.newOption(e.currentTarget.dataset.index)}>Incluir opção</span>
											</div>
										}
									</div>
								</div>
							</div>
						</div>
					);
				})}
				<div>
					<Button style={{width: 'fit-content', display: 'inline-block'}} text="Salvar" onClick={this.save} color={"green"} />
					<Button style={{width: 'fit-content', display: 'inline-block'}} text="Adicionar pergunta" onClick={this.newQuestion} />
				</div>
				</form>
			</div>
		);
	}
}

const editAnamnesisForm = reduxForm({
	form: 'editAnamnesisForm'
})(EditAnamnesisForm);

function mapStateToProps(state) {
	return {
		selectedAnamnesis: state.anamnesis.selectedAnamnesis,
		initialValues: {}
	};
}
export default connect(mapStateToProps, { getAnamnese, createAnamnese, updateAnamnese })(editAnamnesisForm);