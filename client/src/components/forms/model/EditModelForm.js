import React, { Component } from 'react';

import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import WysiwygMention from '../../common/WysiwygMention';

import { css } from 'aphrodite/no-important';
import { styles } from './EditModelFormStyles';

import { getModel, getMention, createModel, updateModel } from '../../../actions/model';

import Button from '../../common/Button';

import InputField from '../../forms/InputField';
import InputSearch from '../../forms/InputSearch';
import Icon from '../../common/Icon';

// editModelForm handles the form where the user enter the app
class EditModelForm extends Component {
	constructor(props) {
    super(props);
    this.newList = this.newList.bind(this);
    this.state = {
      editorState: '',
      menu: [],
      listName: null,
      filter: '',
      name: '',
    };
  }

  newList() {
    const { history, match, createModel, updateModel } = this.props;
    if (match.params.modelId)
      updateModel({name: this.state.name, html: this.state.editorState }, match.params.modelId, () => {});
    else
      createModel({name: this.state.name, html: this.state.editorState, type: match.params.type }, ret => {
        history.push(`${match.url}/${ret._id}`);
      });
	}

	componentWillMount() {
		const { getModel, getMention, match, menu } = this.props;
    if (match.params.modelId) {
      getModel(match.params.modelId, ret => {
        this.props.change('name', ret.name)
        this.setState({name: ret.name, editorState: ret.html})
      });
    }
    if (menu === undefined)
      getMention((menu) => this.setState({menu}));
    else
      this.setState({menu});
	}

	render() {
    const { match, menu } = this.props;
    return (
      <div className={css(styles.grid)}>
        <form className={css(styles.form)}>
          <div className={css(styles.nameGrid)}>
            <Field
              type={'input'}
              name={'name'}
              label={'Nome'}
              onChange={(e) => this.state.name = e.currentTarget.value}
              component={InputField}
            />
          </div>
          <div className={css(styles.htmlGrid)}>
            <WysiwygMention
              maxHeight={500}
              type={"E-mail"}
              menu={this.state.menu}
              url={'/api/image/clinic'}
              model={this.state.editorState}
              onModelChange={(editorState) => this.setState({editorState})}
            />
            <div>
              <h3 className={css(styles.sectionTitle)}>VARIÁVEIS</h3>
              <InputSearch onChange={(e) => {
                var value = e.currentTarget.value;
                this.setState((prevState) => {
                  return {filter: value, menu: prevState.menu.map((item) => { return {...item, open: true} } )};
                })
              }} value={this.state.filter} />
              <div className={css(styles.variables)}>
                {
                  this.state.menu.map((item, index) => {
                    var suggestions = [];
                    if (item.open) {
                      item.suggestions.filter((itm) => itm.includes(this.state.filter)).map((itm) => {
                        var inside = itm.split(new RegExp("("+this.state.filter.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&')+")", 'gi'));
                        for (var k=1; k < inside.length; k+=2)
                          inside[k] = <b key={index + '_string_b_' + k}>{inside[k]}</b>;
                        suggestions.push(<div key={item.name+'.'+itm} className={css(styles.subItemMenu)}>{inside}</div>)
                      });
                      if (suggestions.length === 0)
                        suggestions = <div className={css(styles.subItemMenu)}><i>Sem resultados</i></div>
                    }
                    return (
                      <div key={item.name+"_container"}>
                        <div className={css(styles.itemMenu)} data-index={index} onClick={(e) => {
                          var copy = this.state.menu;
                          copy[e.currentTarget.dataset.index].open = !copy[e.currentTarget.dataset.index].open;
                          this.setState({menu: copy});
                        }} key={item.name}>
                          {item.name}
                          <div key={item.name+"_itens"} style={{float: 'right', display: 'grid'}}>
                           {item.open?<Icon icon="upArrow" size="small" color="grey" right />:<Icon icon="downArrow" size="small" color="grey" right />}
                          </div>
                        </div>
                        {suggestions}
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
          <Button style={{width: 'fit-content'}} text="Salvar Modelo" onClick={this.newList} />
        </form>
      </div>
		);
	}
}

const editModelForm = reduxForm({
	//validate,
	enableReinitialize: true,
	form: 'editModelForm'
})(EditModelForm);

function mapStateToProps(state) {
  return {
    selectedModel: state.model.selectedModel,
    menu: state.model.mention
	};
}
export default connect(mapStateToProps, { getModel, getMention, createModel, updateModel })(editModelForm);