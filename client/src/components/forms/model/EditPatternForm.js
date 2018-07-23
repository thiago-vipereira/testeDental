import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './EditPatternFormStyles';

import { updateClinic } from '../../../actions/auth';
import { showMessage } from '../../../actions/systemMsg';
import { getMention } from '../../../actions/model';

import WysiwygMention from '../../common/WysiwygMention';
import Button from '../../common/Button';

import InputSearch from '../../forms/InputSearch';
import Icon from '../../common/Icon';
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

// editPatternForm handles the form where the user enter the app
class EditPatternForm extends Component {
	constructor(props) {
    super(props);
    this.newList = this.newList.bind(this);
    this.state = {
      header: '',
      footer: '',
      menu: [],
      logo: {src: '', file: ''}
    }
  }

  newList() {
    const { updateClinic, showMessage, clinic } = this.props;
    var formData = new FormData();
    if (this.state.logo.file) {
      formData.append("file", this.state.logo.file);
      axios.post('/api/image/clinic', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
        .then((response) => updateClinic({ document_header: this.state.header, document_footer: this.state.footer, logo_url: response.data.link }, clinic._id, clinic.clinic_data, () => {}))
        .catch(error => showMessage({message: "Erro no upload da imagem", type: 'danger'}));
    }
    else
      updateClinic({ document_header: this.state.header, document_footer: this.state.footer, logo_url: this.state.logo.src }, clinic._id, clinic.clinic_data, () => {});
	}

	componentWillMount() {
    const { clinic, menu, getMention } = this.props;
    this.setState({ header: clinic.document_header, footer: clinic.document_footer, logo: {src: clinic.logo_url, file: ''} });
    if (menu === undefined)
      getMention((menu) => this.setState({menu}));
    else
      this.setState({menu});
  }

	render() {
		return (
      <div className={css(styles.grid)}>
        <form className={css(styles.form)} ref={"form"}>
          <h3 className={css(styles.sectionTitle)}>CABEÇALHO</h3>
          <div className={css(styles.headerGrid)}>
            <div style={{overflow: 'hidden'}}>
              <div className={css(styles.picture)}>
                <div className={css(styles.pictureInside)}>
                  {this.state.logo.src?
                    <div className={css(styles.closePosition)}>
                      <div className={css(styles.close)} onClick={(e) => this.setState({logo: { src: '', file: '' }})}>
                        <Icon icon="x" size="extra-small" color="white" />
                      </div>
                    </div>
                  :null}
                  {this.state.logo.src?
                    <img className={css(styles.pictureImg)} src={this.state.logo.src} />
                  :
                    <div>
                      <input id="file-upload" type="file" accept="image/*" style={{display: 'none'}} 
                        onChange={(e)=> {
                          let imagefile = e.target.files || e.dataTransfer.files;
                          var reader = new FileReader();
                          reader.onload = (e) => this.setState({ logo:{ src: e.target.result, file: imagefile[0] } });
                          reader.readAsDataURL(imagefile[0]);
                        }}
                      />
                      <label htmlFor="file-upload" className={css(styles.plus)}>
                        <Icon icon="plus" size="small" color="grey" />
                      </label>
                      <label style={{cursor: 'pointer'}} htmlFor="file-upload">Adicionar Imagem</label>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div style={{overflow: 'auto'}}>
              <WysiwygMention
                type={"Cabeçalho"}
                menu={this.state.menu}
                url={'/api/image/clinic'}
                model={this.state.header}
                onModelChange={(model) => this.setState({header: model})}
              />
            </div>
          </div>
          <h3 className={css(styles.sectionTitle)}>RODAPÉ</h3>
          <div className={css(styles.footer)}>
            <div style={{overflow: 'auto'}}>
              <WysiwygMention
                type={"Rodapé"}
                menu={this.state.menu}
                url={'/api/image/clinic'}
                model={this.state.footer}
                onModelChange={(model) => this.setState({footer: model})}
              />
            </div>
          </div>
          <Button style={{width: 'fit-content'}} text="Atualizar cabeçalho e rodapé" onClick={this.newList} />
        </form>
      </div>
		);
	}
}

const editPatternForm = reduxForm({
	//validate,
	enableReinitialize: true,
	form: 'editPatternForm'
})(EditPatternForm);

function mapStateToProps(state) {
  return { 
    //clinicConfig: state.clinicConfig, 
    user: state.auth.user, 
    clinic: state.auth.clinic,
    menu: state.model.mention
  };  
}

export default connect(mapStateToProps, { updateClinic, showMessage, getMention })(editPatternForm);