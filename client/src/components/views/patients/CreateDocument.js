import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { NavLink, Link } from 'react-router-dom';

import { reduxForm } from 'redux-form'; 

import { css } from 'aphrodite/no-important';
import { styles } from './CreateAnamnesisStyles';

import InputField from '../../forms/InputField';
import Button from '../../common/Button';
import Modal from '../../modals/Modal';
import RadioInputSet from '../../forms/RadioInputSet'; 
import CheckBox from '../../common/CheckBox';

import { savePatientDocument } from '../../../actions/patientDocument';

import { getModel } from '../../../actions/model';

import $ from 'jquery';
import jQuery from 'jquery';
import FroalaEditor from 'react-froala-wysiwyg';

window.$ = $;
window.jQuery = jQuery;
window.jquery = jQuery;
require('froala-editor/js/froala_editor.pkgd.min.js');
require('froala-editor/css/froala_editor.pkgd.min.css');
require('font-awesome/css/font-awesome.css');

// 'ProcedureRouter' will manage the routes inside the patient module
class CreateDocument extends Component {
  constructor(props) {
    super(props);
    this.recursiveGetProps = this.recursiveGetProps.bind(this);
    this.recursiveSetProps = this.recursiveSetProps.bind(this);
    var paths = props.match.path.split('/');
    var fileOptions = { prescription: 'Nova Prescrição', attestations: 'Novo Atestado' };
    this.state = {
      selectedPatient: {},
      name: '',
      model: {
        name: '',
        html: '',
        type: paths[5]
      },
      config: {
        placeholderText: fileOptions[paths[5]],
        charCounterCount: true,
        heightMax: 500,
        fontSize: ['8', '10', '12', '14', '16', '18', '24', '36', '60'],
        imageUploadURL: '/api/image/clinic',
        imageUploadParams: {
          kind: fileOptions[paths[5]]
        },
        imageManagerLoadURL: '/api/image/clinic',
        imageManagerDeleteURL: '/api/image/clinic',
        imageManagerDeleteMethod: "DELETE",
        events : {
          'froalaEditor.keydown' : (e, editor, inputEvent) => {
            var s = window.getSelection();
            if (inputEvent.keyCode === 8 && s.baseOffset <= 1 && s.baseNode.parentElement) {
              var childNodes = s.baseNode.parentElement.childNodes, nodes = [];
              for (var i=0; childNodes[i] !== s.baseNode; i++);
              if (i>0 && childNodes[i-1] && childNodes[i-1].nodeName === "SPAN" && childNodes[i-1].classList.value === "mention" && childNodes[i-1].contentEditable === "false")
                s.baseNode.parentElement.removeChild(childNodes[i-1]);
            }
            else if (inputEvent.keyCode === 46 && s.baseOffset >= s.baseNode.textContent.length-1) {
              var childNodes = s.baseNode.parentElement.childNodes, nodes = [];
              for (var i=0; childNodes[i] !== s.baseNode; i++);
              if (childNodes[i+1] && childNodes[i+1].nodeName === "SPAN" && childNodes[i+1].classList.value === "mention" && childNodes[i+1].contentEditable === "false")
                s.baseNode.parentElement.removeChild(childNodes[i+1]);
            }
          }
        }
      },
      fileOptions
    }
  }
  componentWillMount() {
    const { getModel, match } = this.props;
		if (match.params.modelId)
			getModel(match.params.modelId, model => this.setState({model, name: model.name}, () => {
        const { selectedPatient } = this.props;
        if (selectedPatient) {
          this.state.selectedPatient = selectedPatient;
          this.recursiveGetProps(document.getElementsByClassName('fr-element fr-view')[0]);
        }
      }));
  }
  componentWillReceiveProps(nextProps, nextState) {
    const { selectedPatient } = this.props;
    if (nextProps.selectedPatient) {
      this.state.selectedPatient = nextProps.selectedPatient;
      this.recursiveGetProps(document.getElementsByClassName('fr-element fr-view')[0]);
      setTimeout(() => {
        this.state.model.html = document.getElementsByClassName('fr-element fr-view')[0].innerHTML;
        this.setState({});
      }, 1000)
    }
  }

  recursiveGetProps (node) {
    if (node.nodeName === "SPAN" && node.classList.value === "mention" && node.contentEditable === "false") {
      var text = node.textContent.split('.');
      if (text[0] === '@Paciente') {
        node.id = node.innerHTML;
        node.innerHTML = this.state.selectedPatient[text[1]];
      }
    }
    else
      for (var i=0; i<node.childNodes.length; i++)
        this.recursiveGetProps(node.childNodes[i]);
  }
  recursiveSetProps (node) {
    if (node.nodeName === "SPAN" && node.classList.value === "mention" && node.contentEditable === "false") {
      node.innerHTML = node.id;
      node.id = '';
    }
    else
      for (var i=0; i<node.childNodes.length; i++)
        this.recursiveSetProps(node.childNodes[i]);
  }
  render() {
    return (
      <div>
        <div><b>Modelo:</b> {this.state.name}</div>
        <div className={css(styles.form)}>
          <InputField
            input={{
              name: 'name',
              onChange: (e) => this.state.model.name = e.currentTarget.value,
            }}
            label={'Nome'}
          />
          <FroalaEditor
            tag='textarea'
            config={this.state.config}
            model={this.state.model.html}
            onModelChange={(model) => this.state.model.html = model}
          />
        </div>
        <Modal
					isOpen={this.state.showModal}
					header="Salvar Anamnese do Paciente"
					adjustStyle={styles.modal}
				>
          <div className={css(styles.modalForm)}>
            <div className={css(styles.modalMsg)}>Após salva essa Anamnese não poderá ser editada ou excluída.<br/> Deseja confirmar ação?</div>
            <Button
              text={'Fechar'}
              color="secondary"
              onClick={() => this.setState({showModal: false})}
            />
            <Button
              text={'Confirmar'}
              color="green"
              onClick={() => {
                this.recursiveSetProps(document.getElementsByClassName('fr-element fr-view')[0]);
                setTimeout(() => {
                  this.state.model.html = document.getElementsByClassName('fr-element fr-view')[0].innerHTML;
                  const {savePatientDocument, selectedPatient} = this.props;
                  const {html, type, name} = this.state.model;
                  savePatientDocument(selectedPatient._id, {html, type, name},
                    () => this.props.history.push(`/patients/profile/${this.props.selectedPatient._id}/files/${this.state.model.type}`))
                }, 1000)
              }}
              right
            />
          </div>
        </Modal>
        <Button
					text={'Cancelar'}
					color="secondary"
          onClick={() => this.props.history.push(`/patients/profile/${this.props.selectedPatient._id}/files/${this.state.model.type}`)}
				/>
        <Button
					text={'Salvar'}
					color="green"
          onClick={() => this.setState({showModal: true})}
          right
				/>
      </div>
    )
  }
}

const createDocument = reduxForm({
	form: 'createDocument' 
})(CreateDocument);

function mapStateToProps({ patientsCreation }) {
	return { selectedPatient: patientsCreation.selectedPatient }; 
}

export default connect(mapStateToProps, { 
  savePatientDocument,
  getModel
} )(createDocument);