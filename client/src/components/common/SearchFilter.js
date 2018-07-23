import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'aphrodite/no-important';
import { reduxForm, Field } from 'redux-form';

import { styles } from './SearchFilterStyles';

import Icon from './Icon';
import Button from './Button';
import SelectBox from './SelectBox';
import InputField from '../forms/InputField';

class SearchFilter extends Component {
  constructor (props) {
    super(props);
    this.filterInputComponent = this.filterInputComponent.bind(this);
    this.renderFilterActions = this.renderFilterActions.bind(this);
    this.getFilterContent = this.getFilterContent.bind(this);
    this.findNode = this.findNode.bind(this);
    this.state = {
      add: true,
      filter: {...this.props.filter},
      options: Object.entries(this.props.options)
    }
  }
  componentWillUpdate() {
    Object.entries(this.state.filter).map((fltr) => { 
      this.props.change(fltr[0], fltr[0])
      fltr[0] !== 'add' && Object.entries(fltr[1]).map((item) => this.props.change(fltr[0]+'_'+item[0], item[1]))
    });
  }
  findNode(name, npt) {
    return ReactDOM.findDOMNode(this.refs[name+'_'+npt]).getElementsByTagName(this.filterInputComponent(name, npt))[0];
  }
  change (ret) {
    this.state.add = true;
    this.state.filter = this.replaceKey(this.state.filter, {[ret.name]: ret.value});
    if (ret.name !== "add")
      this.clearInput(ret.name);
    this.state.filter[ret.value] = this.filterInputType(ret.value)
    this.setState({});
  }
  replaceKey(object, rplc) {
    var copy = {};
    Object.entries(object).map((item) => {
      var key = rplc[item[0]] || item[0];
      copy[key] = item[1];
    });
    return copy;
  }
  errorInput (name, inputs, msg) {
    inputs.map((npt) => this.findNode(name, npt).style.border = "1px solid #CC4C29");
    this.refs[name+"_msg"].innerHTML = msg;
    return true;
  }
  clearInput (name) {
    Object.keys(this.filterInputType(name)).map((npt) => this.findNode(name, npt).removeAttribute("style"));
    this.refs[name+"_msg"].innerHTML = "";
  }
  submit () {
    var error = false;
    Object.entries(this.state.filter).map((field) => {
      if (field[0] !== 'add') {
        switch (this.props.options[field[0]].type) {
          case 'string':
            if (field[1].content === '')
              error = this.errorInput(field[0], ['content'], "A busca precisa estar preenchida");
            else
              this.clearInput(field[0]);
            break;
          case 'int':
            if (!field[1].since && !field[1].to)
              error = this.errorInput(field[0], ['since', 'to'], "Pelo menos um campo precisa estar preenchido");
            else if (field[1].since && field[1].to && parseInt(field[1].to) < parseInt(field[1].since))
              error = this.errorInput(field[0], ['since', 'to'], "O campo 'até' deve ser maior ou igual ao campo 'de'");
            else
              this.clearInput(field[0]);
            break;
          case 'date':
            var valid1 = this.isValidDate(field[1].since), valid2 = this.isValidDate(field[1].to), filled = field[1].since && field[1].to;
            if (!field[1].since && !field[1].to)
              error = this.errorInput(field[0], ['since', 'to'], "Pelo menos um campo precisa estar preenchido");
            else if (!valid1 || !valid2) {
              if (!valid1)
                this.findNode(field[0], 'since').style.border = "1px solid #CC4C29"
              if (!valid2)
                this.findNode(field[0], 'to').style.border = "1px solid #CC4C29"
              this.refs[field[0]+"_msg"].innerHTML = "Data invalida";
              error=true;
            }
            else if (filled && field[1].since.length !== field[1].to.length)
              error = this.errorInput(field[0], ['since', 'to'], "As datas devem estar no mesmo formato");
            else if (filled && field[1].since.length === 10 && this.isAfter(field[1].since, field[1].to))
              error = this.errorInput(field[0], ['since', 'to'], "A data 'até' deve ser depois ou igual a data 'de'");
            else
              this.clearInput(field[0]);
            break;
        }
      }
    });
    if (!error) {
      console.log(this.state.filter);
    }
  }
  isAfter(date1, date2) {
    var parts1 = date1.split("/"), parts2 = date2.split("/");
    var day1 = parts1[0], day2 = parts2[0];
    var month1 = parts1[1]?parts1[1]:'', month2 = parts2[1]?parts2[1]:'';
    var year1 = parts1[2]?parts1[2]:'', year2 = parts2[2]?parts2[2]:'';
    return year1+month1+day1 > year2+month2+day2;
  }
  isValidDate(dateString) {
    if (!dateString)
      return true;
    if (dateString.length == 2) {
      if(!/^\d{1,2}$/.test(dateString))
        return false;
      var day = parseInt(dateString, 10);
      return day > 0 && day <= 31; 
    }
    else if (dateString.length == 5) {
      if(!/^\d{1,2}\/\d{1,2}$/.test(dateString))
        return false;
      var parts = dateString.split("/");
      var day = parseInt(parts[0], 10);
      var month = parseInt(parts[1], 10);
      var monthLength = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
      return day > 0 && day <= monthLength[month - 1];
    }
    else if (dateString.length == 10) {
      if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
          return false;

      var parts = dateString.split("/");
      var day = parseInt(parts[0], 10);
      var month = parseInt(parts[1], 10);
      var year = parseInt(parts[2], 10);

      if(year < 1000 || year > 3000 || month == 0 || month > 12)
          return false;

      var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

      if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
          monthLength[1] = 29;

      return day > 0 && day <= monthLength[month - 1];
    }
    else
      return false;
  }
  removeFilter(field) {
    if (field === 'add')
      this.state.add = true;
    delete this.state.filter[field];
    this.setState({});
  }
  filterInputType(name) {
    switch (this.props.options[name].type) {
      case 'string':
        return {regex: 's', content: ''};
      case 'int':
        return {since: '', to: ''};
      case 'date':
        return {since: '', to: ''};
      case 'select':
        return {content: this.props.options[name].suggestions[0].value};
    }
  }
  filterInputComponent(name, key) {
    switch (this.props.options[name].type) {
      case 'string':
        switch (key) {
          case 'regex':
            return 'select';
          case 'content':
            return 'input';
        }
      case 'int':
        switch (key) {
          case 'since':
            return 'input';
          case 'to':
            return 'input';
        }
      case 'date':
        switch (key) {
          case 'since':
            return 'input';
          case 'to':
            return 'input';
        }
      case 'select':
        if (key === 'content')
          return 'select';
    }
  }
  getFilterContent(key, inside) {
    switch (this.props.options[key].type) {
      case 'string':
        return (
          <div>
            <Field
              ref={key+"_regex"}
              type={'selectbox'}
              name={key+"_regex"}
              label={''}
              onChange={(ret) => this.state.filter[key].regex = ret.value}
              itens={[{value: 's', label: 'Começa'}, {value: 'c', label: 'Contém'}, {value: 'e', label: 'Termina'}]}
              component={SelectBox}
              withRef
            />
            <Field
              onChange={(e) => this.state.filter[key].content = e.target.value}
              ref={key+"_content"}
              name={key+"_content"}
              placeholder='Buscar'
              type={'text'}
              label=''
              component={InputField} 
              withRef
            />
          </div>
        );
      case 'int':
        return (
          <div className={css(styles.content)}>
            <span className={css(styles.infoFilter)} style={{paddingLeft: '0px'}}>De</span>
            <Field
              onChange={(e) => this.state.filter[key].since = e.target.value}
              mask="9999999999"
              ref={key+"_since"}
              name={key+"_since"}
              type={'text'} 
              label=''
              component={InputField} 
              withRef
            />
            <span className={css(styles.infoFilter)}>Até</span>
            <Field
              onChange={(e) => this.state.filter[key].to = e.target.value}
              mask="9999999999"
              ref={key+"_to"}
              name={key+"_to"}
              type={'text'} 
              label=''
              component={InputField}
              withRef
            />
          </div>
        );
      case 'date':
        return (
          <div className={css(styles.content)}>
            <span className={css(styles.infoFilter)} style={{paddingLeft: '0px'}}>De</span>
            <Field
              onChange={(e) => this.state.filter[key].since = e.target.value}
              placeholder="DD / MM / AAAA"
              mask="99/99/9999"
              ref={key+"_since"}
              name={key+"_since"}
              type={'text'} 
              label=''
              component={InputField} 
              withRef
            />
            <span className={css(styles.infoFilter)}>Até</span>
            <Field
              onChange={(e) => this.state.filter[key].to = e.target.value}
              placeholder="DD / MM / AAAA"
              mask="99/99/9999"
              ref={key+"_to"}
              name={key+"_to"}
              type={'text'} 
              label=''
              component={InputField} 
              withRef
            />
          </div>
        );
      case 'select':
        return (
          <Field
            ref={key+"_content"}
            type={'selectbox'}
            name={key+"_content"}
            label={''}
            onChange={(ret) => this.state.filter[key].content = ret.value}
            itens={this.props.options[key].suggestions}
            component={SelectBox}
            withRef
          />
        );
      default:
        return null;
    }
  }
  renderFilterActions() {
    return (
      <div>
        <Button
          style={styles.row._definition}
          text="Adicionar Critério"
          color="primary"
          onClick={() => {
            if (this.state.add) {
              this.state.filter["add"] = {};
              this.setState({}, () => {
                const element = this.refs.container_filters;
                element.scrollTop = element.scrollHeight - element.clientHeight;
              });
              this.state.add = false;
            }
            else {
              const element = this.refs.container_filters;
              element.scrollTop = element.scrollHeight - element.clientHeight;
            }
          }}
        /> 
        <Button
          text="Pesquisar"
          color="green"
          onClick={() => this.submit()}
        />
      </div>
    );
  }
  render() {
    var filterEntries = Object.entries(this.state.filter)
    return (
      <form className={css(styles.form)} name={'seach_filters'}>
        {this.props.title &&
          <h3 className={css(styles.sectionTitle)}>{this.props.title}</h3>
        }
        <div className={css(styles.backgroundCriterios)}>
          <div ref="container_filters" className={css(styles.container)}>
            {filterEntries.length>0?
              filterEntries.map((object, index) => {
                var filteredOptions = object[0] === "add" ? [{value: 'add', label: 'Selecione'}] : [];
                filteredOptions.push(...this.state.options.filter((item) => item[0] === object[0] || filterEntries.findIndex((itm) => itm[0] === item[0]) === -1).map((item) => {
                  return {value: item[0], label: item[1].label}
                }));
                return(
                  <div key={'container_'+object[0]} className={css(styles.item)} style={index%2==0 ? {backgroundColor: '#e9e9e9'}: {}}>
                    <span onClick={(e) => this.removeFilter(object[0])} style={{cursor: 'pointer'}} >
                      <Icon icon="x" size="extra-small" right color="grey" />
                    </span>
                    <Field
                      key={object[0]}
                      label={'Campo'}
                      name={object[0]}
                      type={'selectbox'}
                      component={SelectBox}
                      itens={filteredOptions}
                      onChange={(ret) => this.change(ret)}
                    />
                    {object[0] !== 'add' && this.getFilterContent(object[0], object[1])}
                    <span className={css(styles.msgFilter)} ref={object[0]+"_msg"}></span>
                  </div>
                )
              })
            :
              <div className={css(styles.defaultConteiner)}>
                <div className={css(styles.defaultMsg)}>Adicione os itens<br/>da sua pesquisa</div>
              </div>
            }
          </div>
          {this.renderFilterActions()}
        </div>  
      </form>
    );
  }
}

const reduxFormFilter = reduxForm({
  form: 'seach_filters'
})(SearchFilter);

export default reduxFormFilter;