import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './AdvancedSearchStyles';

import { editPatients } from '../../../actions/patientsSearch';
import SelectBox from '../../common/SelectBox';
import Button from '../../common/Button'; 
import InputField from '../../forms/InputField';
import Pagination from '../../common/Pagination';
import TableFilter from '../../lists/patients/TableFilter';
import { advancedFilter, editPatient } from '../../../actions/patientsSearch';
import Icon from '../../common/Icon';

class AdvancedSearch extends React.Component {
  
  constructor (props) {
    super(props);
    this.adjustSize = this.adjustSize.bind(this);
    document.body.onresize = this.adjustSize;
    this.onWrite = this.onWrite.bind(this);
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.returnUndo = this.returnUndo.bind(this);
    this.changePage = this.changePage.bind(this);
    this.orderTable = this.orderTable.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.actionPatient = this.actionPatient.bind(this);
    this.selectAllPatients = this.selectAllPatients.bind(this);
    this.openProfile = this.openProfile.bind(this);
    this.state = {
      infos: {
        select: { type: 'CheckBox', disabled: false, parameters: ["_id", "email", "name"], content: this.props.save.select.content, selected: this.props.save.select.selected, unselected: this.props.save.select.unselected, out: this.props.save.select.out, width: '40px' },
        registry: { type: 'String', content: this.props.save.content.registry, head: 'Cad.', width: '100px' },
        name: { type: 'String', content: this.props.save.content.name, head: 'Nome', link: { function: this.openProfile, parameters: ["_id"] } }, //link: 'function'
        email: { type: 'String', content: this.props.save.content.email, head: 'E-mail' },
        telephones: { type: 'Array', content: this.props.save.content.telephones, head: 'Telefone', show: 'value', obs: 'name', width: '200px' },
        cpf: { type: 'String', content: this.props.save.content.cpf, head: 'CPF', width: '130px' },
        archive: { type: 'String', placeholder: {key: 'active', props: [{value: true, text: 'Arquivar'}, {value: false, text: 'Ativar'}]}, link: { function: this.actionPatient }, width: '70px' }
      },
      options: [
        { value: 'add', label: 'Selecione' },
        { value: 'name.string', label: 'Nome' },
        { value: 'email.string', label: 'E-mail' },
        { value: 'telephones.string', label: 'Telefone' },
        { value: 'state.string', label: 'Estado' },
        { value: 'city.string', label: 'Cidade' },
        { value: 'zip.string', label: 'CEP' },
        { value: 'registry.int', label: 'Cadastro' },
        { value: 'birthday.date', label: 'Aniversário' },
        { value: 'age.int', label: 'Idade' },
        { value: 'gender.gender', label: 'Gênero' },
        { value: 'profession.string', label: 'Profissão' },
        { value: 'civil_id.string', label: 'RG' },
        { value: 'cpf.string', label: 'CPF' },
        { value: 'company.string', label: 'Empresa' },
        { value: 'father.string', label: 'Pai' },
        { value: 'mother.string', label: 'Mãe' },
        { value: 'father_profession.string', label: 'Profissão do Pai' },
        { value: 'mother_profession.string', label: 'Profissão do Mãe' },
        { value: 'insurance.string', label: 'Plano de saúde' },
        { value: 'insurance_number.int', label: 'Plano de saúde - número' },
        { value: 'sponsor.string', label: 'Responsável' },
        { value: 'sponsor_insurance_number.int', label: 'Responsável - Plano de saúde' },
        { value: 'sponsor_cpf.string', label: 'Responsável - CPF' },
        { value: 'indication.string', label: 'Indicação' },
        { value: 'first_appointment.date', label: 'Primeira consulta' },
        { value: 'treatment_time.string', label: 'Tempo de tratamento' },
        { value: 'status.string', label: 'Status' },
        { value: 'active.boolean', label: 'Situação' }
      ],
      filteredArray : this.props.save.filters.array,
      column: this.props.save.orderTable.column,
      order: this.props.save.orderTable.order,
      prevent: false,
      clickEvent: 0,
      actionTimer: false
    }
    var height = window.innerHeight - 288;
    var lmt = 5;
    if (height>160) {
        var total = (height/32);
        lmt = total - (total%5);
    }
    this.props.save.pagination.limit = lmt;
    if (this.props.save.update && Object.keys(this.props.save.filters.save).length > 0) {
      var back = {};
      Object.entries(this.props.save.filters.save).filter((obj)=>{return !obj[0].includes("_input")}).map((field) => {
        var name = field[1].split(".")[0], type = field[1].split(".")[1];
        back[name] = {};
        back[name].type = type;
        if (type == "int" || type == "date") {
          if (this.props.save.filters.save[field[0]+"_input1"])
            back[name].since = this.props.save.filters.save[field[0]+"_input1"];
          if (this.props.save.filters.save[field[0]+"_input2"])
            back[name].to = this.props.save.filters.save[field[0]+"_input2"];
        }
        else
          back[name].content = this.props.save.filters.save[field[0]+"_input1"];
      });
      const { advancedFilter } = this.props;
      advancedFilter(back, () => {
        const { response } = this.props;
        this.state.filteredArray.splice(0, this.state.filteredArray.length);
        this.state.filteredArray.push(...response);
        this.state.infos.select.unselected.splice(0, this.state.infos.select.unselected.length);
        this.state.infos.select.unselected.push(...this.state.filteredArray.map(value => { return { _id:value._id, name:value.name, email:value.email } }));
        for (var i=0; i<this.state.infos.select.content.length; i++)
          this.state.infos.select.unselected.splice(this.state.infos.select.unselected.findIndex((item) => item._id === this.state.infos.select.content[i]._id), 1)
        this.props.save.update = false;
        this.onWrite('cpf', this.state.infos.cpf.content);
      });
    }
  }
  adjustSize () {
    var height = window.innerHeight - 288;
    var lmt = 5;
    if (height>160) {
        var total = (height/32);
        lmt = total - (total%5);
    }
    if (lmt !== this.props.save.pagination.limit) {
        this.props.save.pagination.page = 1;
        this.props.save.pagination.limit = lmt;
        this.setState({});
    }
  }
  change (ret) {
    const { initialValues } = this.props;
    if (this.props.save.filters.status[ret.name] !== "add")
      this.clearInput(ret.name, true);
    this.props.save.filters.status[ret.name] = ret.value;
    initialValues[ret.name] = ret.value;
    this.props.save.filters.status[ret.name+"_input1"] = "";
    initialValues[ret.name+"_input1"] = "";
    if (this.props.save.filters.status[ret.name+"_input2"]) {
      this.props.save.filters.status[ret.name+"_input2"] = "";
      initialValues[ret.name+"_input2"] = "";
    }
    this.setState({});
  }
  changeField (name, value) {
    const { initialValues } = this.props;
    this.props.save.filters.status[name] = value
    initialValues[name] = value;
  }
  errorInput (name, msg, more) {
    document.getElementsByName(name+"_input1")[0].style.border = "1px solid #CC4C29";
    if (more)
      document.getElementsByName(name+"_input2")[0].style.border = "1px solid #CC4C29";
    document.getElementById(name+"_msg").innerHTML = msg;
    return true;
  }
  clearInput (name, more) {
    document.getElementsByName(name+"_input1")[0].removeAttribute("style");
    if (more && document.getElementsByName(name+"_input2")[0] !== undefined)
      document.getElementsByName(name+"_input2")[0].removeAttribute("style");
    document.getElementById(name+"_msg").innerHTML = "";
  }
  submit () {
    var error = false, back = {};
    Object.entries(this.props.save.filters.status).filter((obj)=>{return !obj[0].includes("_input")}).map((field) => {
      var type = field[1].split(".")[1];
      if (type == "string") {
        if (!this.props.save.filters.status[field[0]+"_input1"])
          error = this.errorInput(field[0], "A busca precisa estar preenchida", false);
        else
          this.clearInput(field[0], false);
      }
      else if (type == "int") {
        var input1 = this.props.save.filters.status[field[0]+"_input1"] ? parseInt(this.props.save.filters.status[field[0]+"_input1"]) : "",
        input2 = this.props.save.filters.status[field[0]+"_input2"] ? parseInt(this.props.save.filters.status[field[0]+"_input2"]) : "";
        if (!input1 && !input2)
          error = this.errorInput(field[0], "Pelo menos um campo precisa estar preenchido", true);
        else if (input1 !== "" && input2 !== "" && input2 < input1)
          error = this.errorInput(field[0], "O campo 'até' deve ser maior ou igual ao campo 'de'", true);
        else
          this.clearInput(field[0], true);
      }
      else if (type == "date") {
        var valid1 = this.props.save.filters.status[field[0]+"_input1"] ? this.isValidDate(this.props.save.filters.status[field[0]+"_input1"]) : true,
        valid2 = this.props.save.filters.status[field[0]+"_input2"] ? this.isValidDate(this.props.save.filters.status[field[0]+"_input2"]) : true,
        filled = this.props.save.filters.status[field[0]+"_input1"] && this.props.save.filters.status[field[0]+"_input2"];
        if (!this.props.save.filters.status[field[0]+"_input1"] && !this.props.save.filters.status[field[0]+"_input2"])
          error = this.errorInput(field[0], "Pelo menos um campo precisa estar preenchido", true);
        else if (!valid1 || !valid2) {
          if (!valid1)
            document.getElementsByName(field[0]+"_input1")[0].style.border = "1px solid #CC4C29";
          if (!valid2)
            document.getElementsByName(field[0]+"_input2")[0].style.border = "1px solid #CC4C29";
          document.getElementById(field[0]+"_msg").innerHTML = "Data invalida";
          error=true;
        }
        else if (filled && this.props.save.filters.status[field[0]+"_input1"].length !== this.props.save.filters.status[field[0]+"_input2"].length)
          error = this.errorInput(field[0], "As datas devem estar no mesmo formato", true);
        else if (filled && this.props.save.filters.status[field[0]+"_input1"].length === 10
              && this.isAfter(this.props.save.filters.status[field[0]+"_input1"], this.props.save.filters.status[field[0]+"_input2"]))
          error = this.errorInput(field[0], "A data 'até' deve ser depois ou igual a data 'de'", true);
        else
          this.clearInput(field[0], true);
      }
      if (!error && field[1]!=="add") {
        back[field[1].split(".")[0]] = {};
        back[field[1].split(".")[0]].type = type;
        if (type == "int" || type == "date") {
          if (this.props.save.filters.status[field[0]+"_input1"])
            back[field[1].split(".")[0]].since = this.props.save.filters.status[field[0]+"_input1"];
          if (this.props.save.filters.status[field[0]+"_input2"])
            back[field[1].split(".")[0]].to = this.props.save.filters.status[field[0]+"_input2"];
        }
        else {
          if (type == "string")
            back[field[1].split(".")[0]].regex = this.props.save.filters.status[field[0]+"_input2"];
          back[field[1].split(".")[0]].content = this.props.save.filters.status[field[0]+"_input1"];
        }
      }
    });
    if (!error) {
      const { advancedFilter } = this.props;
      advancedFilter(back, () => {
        const { response } = this.props;
        this.state.filteredArray.splice(0, this.state.filteredArray.length);
        this.state.filteredArray.push(...response);
        this.props.save.filters.save = {...this.props.save.filters.status};
        this.state.infos.select.unselected.splice(0, this.state.infos.select.unselected.length);
        this.state.infos.select.unselected.push(...response.map(value => { return { _id:value._id, name:value.name, email:value.email } }));
        this.state.infos.select.content.splice(0, this.state.infos.select.content.length);
        this.state.infos.select.selected.splice(0, this.state.infos.select.selected.length);
        this.state.infos.select.out.splice(0, this.state.infos.select.out.length);
        this.setState({});
      });
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
  };
  changePage(page) {
    this.props.save.pagination.page = parseInt(page, 10);
    this.setState({});
  }
  onWrite (column, content) {
    this.state.infos[column].content = this.props.save.content[column] = content;
    const { response } = this.props;
    this.state.filteredArray.splice(0, this.state.filteredArray.length);
    this.state.infos.select.out.splice(0, this.state.infos.select.out.length);
    this.state.infos.select.selected.splice(0, this.state.infos.select.selected.length);
    this.state.infos.select.unselected.splice(0, this.state.infos.select.unselected.length);
    this.state.filteredArray.push(...
      response.filter((item) => {
        var telephones = true;
        if (item.telephones.length>0) {
          telephones = false;
          for (var i=0; i<item.telephones.length; i++) {
            if (item.telephones[i].value.includes(this.state.infos.telephones.content)) {
              telephones = true;
              break;
            }
          }
        }
        if ((!item.registry || item.registry.toString().includes(this.state.infos.registry.content))
         && (!item.name || item.name.toLowerCase().includes(this.state.infos.name.content.toLowerCase()))
         && (!item.email || item.email.includes(this.state.infos.email.content))
         && (!item.cpf || item.cpf.includes(this.state.infos.cpf.content))
         && telephones) {
          if (this.state.infos.select.content.find((itm) => itm._id === item._id) !== undefined)
            this.state.infos.select.selected.push({_id: item._id, name: item.name, email: item.email});
          else
            this.state.infos.select.unselected.push({_id: item._id, name: item.name, email: item.email});
          return true;
        }
        else if (this.state.infos.select.content.find((itm) => itm._id === item._id) !== undefined)
          this.state.infos.select.out.push({_id: item._id, name: item.name, email: item.email});
        return false;
      }, this)
    );
    this.setState({});
  }
  orderTable(column, order) {
    if (column === "telephones") {
      var telephones = function (tel, order) {
        var sort_tel;
        if (order)
          sort_tel = tel.sort((a,b) => {
            return (a.value > b.value) ? 1 : (a.value < b.value) ? -1 : 0;
          });
        else
          sort_tel = tel.sort((a,b) => {
            return (a.value < b.value) ? 1 : (a.value > b.value) ? -1 : 0;
          });
        return sort_tel[0].value;
      }
    }
    if (order)
      this.state.filteredArray.sort((a, b) => {
        var c = (column === "telephones" ? telephones(a[column], order) : a[column]),
        d = (column === "telephones" ? telephones(b[column], order) : b[column]);
        return (c > d) ? 1 : (c < d) ? -1 : 0;
      });
    else
      this.state.filteredArray.sort((a, b) => {
        var c = (column === "telephones" ? telephones(a[column], order) : a[column]),
        d = (column === "telephones" ? telephones(b[column], order) : b[column]);
        return (c < d) ? 1 : (c > d) ? -1 : 0;
      });
    this.setState({ column: column, order: order });
  }
  selectAllPatients (info, clicks) {
    if (clicks == 1) {
      let me = this;
      this.state.clickEvent = setTimeout(function() {
        if (!me.state.prevent) {
          var all_selected = true,
          copy_unselected = [...me.state.infos.select.unselected],
          copy_selected = [...me.state.infos.select.selected],
          copy_content = [...me.state.infos.select.content];
          me.state.filteredArray.slice((me.props.save.pagination.page-1)*me.props.save.pagination.limit, me.props.save.pagination.page*me.props.save.pagination.limit).map(value => {
            var unselected_index = me.state.infos.select.unselected.findIndex((item) => item._id === value._id);
            if (unselected_index !== -1) {
              me.state.infos.select.unselected.splice(unselected_index, 1);
              me.state.infos.select.selected.push({ _id:value._id, name:value.name, email:value.email });
              me.state.infos.select.content.push({ _id:value._id, name:value.name, email:value.email });
              all_selected = false;
            }
            else if (all_selected) {
              copy_unselected.push({ _id:value._id, name:value.name, email:value.email });
              copy_selected.splice(copy_selected.findIndex((item) => item._id === value._id), 1);
              copy_content.splice(copy_content.findIndex((item) => item._id === value._id), 1);
            }
          });
          if (all_selected) {
            me.state.infos.select.unselected.splice(0, me.state.infos.select.unselected.length);
            me.state.infos.select.unselected.push(...copy_unselected);
            me.state.infos.select.selected.splice(0, me.state.infos.select.selected.length);
            me.state.infos.select.selected.push(...copy_selected);
            me.state.infos.select.content.splice(0, me.state.infos.select.content.length);
            me.state.infos.select.content.push(...copy_content);
          }
        }
        me.state.prevent = false;
        me.setState({});
      }, 200);
    }
    if (clicks == 2) {
      clearTimeout(this.state.clickEvent);
      if (this.state.infos.select.selected.length === this.state.filteredArray.length) {
        this.state.infos.select.content.splice(0, this.state.infos.select.content.length);
        this.state.infos.select.content.push(...this.state.infos.select.out);
        this.state.infos.select.unselected.splice(0, this.state.infos.select.unselected.length);
        this.state.infos.select.unselected.push(...this.state.infos.select.selected);
        this.state.infos.select.selected.splice(0, this.state.infos.select.selected.length);
      }
      else {
        this.state.infos.select.selected.splice(0, this.state.infos.select.selected.length);
        this.state.infos.select.selected.push(...this.state.filteredArray.map(value => value._id));
        this.state.infos.select.content.push(...this.state.infos.select.unselected);
        this.state.infos.select.unselected.splice(0, this.state.infos.select.unselected.length);
      }
      this.state.prevent = true;
      this.setState({});
    }
  }
  returnUndo() {
    const { response } = this.props;
    this.props.save.accumulate.map((value) => {
      var index = this.state.filteredArray.findIndex(x => x._id === value.obj._id)
      if (index === -1) {
        response.push(value.obj);
        this.state.filteredArray.push(value.obj);
        this.state.infos.select.unselected.push({ _id:value.obj._id, name:value.obj.name, email:value.obj.email });
      }
      else {
        response[response.findIndex(x => x._id === value.obj._id)].active = value.obj.active;
        this.state.filteredArray[index].active = value.obj.active;
      }
    });
    this.props.save.accumulate.splice(0, this.props.save.accumulate.length);
    this.orderTable(this.state.column, this.state.order);
    this.props.refresh("undo");
  }
  actionPatient(ret) {
    var ndx = this.props.save.accumulate.findIndex(x => x.obj._id === ret._id);
    if (ndx !== -1)
      this.props.save.accumulate.splice(ndx, 1);
    this.props.save.accumulate.push({obj: ret, back:{ find: {'_id': ret._id}, set: {active: ret.active} }});
    clearTimeout(this.state.actionTimer);
    var me = this;
    this.state.actionTimer = setTimeout(() => me.props.save.accumulate.splice(0, me.props.save.accumulate.length), 10000);
    const { editPatient } = this.props;
    var message = this.props.save.accumulate.length + ' paciente' + (this.props.save.accumulate.length>1?'s':'') + ' editados com sucesso';
    editPatient({ id: ret._id, props: {active: !ret.active}, message: message, update: {response: this.returnUndo, send: this.props.save.accumulate.map(value => value.back)} },
      (res) => {
        const { response } = this.props;
        this.props.refresh("advanced");
        var edit = true;
        for (var key in this.props.save.filters.save) {
          if (this.props.save.filters.save[key] === "active.boolean" && (this.props.save.filters.save[key+"_input1"] === "true" ? true : false) === ret.active) {
            this.state.filteredArray.splice(this.state.filteredArray.findIndex(x => x._id === ret._id), 1);
            response.splice(response.findIndex(x => x._id === ret._id), 1);
            this.state.infos.select.selected.splice(this.state.infos.select.selected.indexOf(ret._id), 1);
            this.state.infos.select.content.splice(this.state.infos.select.content.indexOf(ret._id), 1);
            this.state.infos.select.unselected.splice(this.state.infos.select.unselected.indexOf(ret._id), 1);
            edit = false;
            break;
          }
        }
        if (edit) {
          response[response.findIndex(x => x._id === ret._id)].active = !ret.active;
          this.state.filteredArray[this.state.filteredArray.findIndex(x => x._id === ret._id)].active = !ret.active;
        }
        this.setState({});
      }
    );
  }
  removeFilter(field) {
    delete this.props.save.filters.status[field];
    delete this.props.save.filters.status[field+"_input1"];
    delete this.props.save.filters.status[field+"_input2"];
    this.setState({});
  }
  openProfile(ret){
      const { history } = this.props;
      history.push(`/patients/profile/${ret._id}`);
  }
  render() {
    return(
      <div className={css(styles.grid)}>
        <form className={css(styles.form)} name='advancedSearchForm'>
          <h3 className={css(styles.sectionTitle)}>Critérios</h3>
          <div className={css(styles.backgroundCriterios)}>
            <div id="conteiner_filters" className={css(styles.conteiner)}>
              {Object.entries(this.props.save.filters.status).length>0 ?
                Object.entries(this.props.save.filters.status).filter((obj)=>{return !obj[0].includes("_input")}).map((field, index) => {
                  var select = [...this.state.options], content = null;
                  if (field[1] !== "add") {
                    select.splice(0, 1);
                    var type = field[1].split(".")[1];
                    if (type == "string") {
                      if (!this.props.save.filters.status[field[0]+"_input2"])
                        this.props.save.filters.status[field[0]+"_input2"] = 's';
                      content=<div>
                                <Field
                                    key={field[0]+"_input2"}
                                    type={'selectbox'}
                                    name={field[0]+"_input2"}
                                    label={''}
                                    onChange={(ret) => this.changeField(ret.name, ret.value)}
                                    itens={[{value: 's', label: 'Começa'}, {value: 'c', label: 'Contém'}, {value: 'e', label: 'Termina'}]}
                                    component={SelectBox}
                                />
                                <Field
                                  onChange={(e) => this.changeField(e.target.name, e.target.value)}
                                  key={field[0]+"_input1"}
                                  name={field[0]+"_input1"}
                                  placeholder='Buscar'
                                  type={'text'} 
                                  label=''
                                  component={InputField} 
                                />
                              </div>;
                    }
                    else if (type === "int")
                      content=<div className={css(styles.content)}>
                                <span className={css(styles.infoFilter)} style={{paddingLeft: '0px'}}>De</span>
                                <Field
                                  onChange={(e) => this.changeField(e.target.name, e.target.value)}
                                  mask="9999999999"
                                  key={field[0]+"_input1"}  
                                  name={field[0]+"_input1"}
                                  type={'text'} 
                                  label=''
                                  component={InputField} 
                                />
                                <span className={css(styles.infoFilter)}>Até</span>
                                <Field
                                  onChange={(e) => this.changeField(e.target.name, e.target.value)}
                                  mask="9999999999"
                                  key={field[0]+"_input2"} 
                                  name={field[0]+"_input2"}
                                  type={'text'} 
                                  label=''
                                  component={InputField} 
                                />
                              </div>;
                    else if (type == "date")
                      content=<div className={css(styles.content)}>
                                <span className={css(styles.infoFilter)} style={{paddingLeft: '0px'}}>De</span>
                                <Field
                                  onChange={(e) => this.changeField(e.target.name, e.target.value)}
                                  placeholder="DD / MM / AAAA"
                                  mask="99/99/9999"
                                  key={field[0]+"_input1"}  
                                  name={field[0]+"_input1"}
                                  type={'text'} 
                                  label=''
                                  component={InputField} 
                                />
                                <span className={css(styles.infoFilter)}>Até</span>
                                <Field
                                  onChange={(e) => this.changeField(e.target.name, e.target.value)}
                                  placeholder="DD / MM / AAAA"
                                  mask="99/99/9999"
                                  key={field[0]+"_input2"} 
                                  name={field[0]+"_input2"}
                                  type={'text'} 
                                  label=''
                                  component={InputField} 
                                />
                              </div>;
                    else if (type == "gender") {
                      if (!this.props.save.filters.status[field[0]+"_input1"])
                        this.props.save.filters.status[field[0]+"_input1"] = 'M';
                      content=<Field
                                  key={field[0]+"_input1"}
                                  type={'selectbox'}
                                  name={field[0]+"_input1"}
                                  label={''}
                                  onChange={(ret) => this.changeField(ret.name, ret.value)}
                                  itens={[{value: 'M', label: 'Masculino'}, {value: 'F', label: 'Feminino'}]}
                                  component={SelectBox}
                              />
                    } else if (type == "boolean") {
                      if (!this.props.save.filters.status[field[0]+"_input1"])
                        this.props.save.filters.status[field[0]+"_input1"] = false;
                      content=<Field
                                  key={field[0]+"_input1"}
                                  type={'selectbox'}
                                  name={field[0]+"_input1"}
                                  label={''}
                                  onChange={(ret) => this.changeField(ret.name, ret.value)}
                                  itens={[{value: false, label: 'Arquivado'}, {value: true, label: 'Ativo'}]}
                                  component={SelectBox}
                              />
                    }
                  }
                  return (
                    <div  key={'conteiner'+field[0]} className={css(styles.item)} style={index%2==0 ? {backgroundColor: '#e9e9e9'}: null}>
                      <span data-field={field[0]} onClick={(e) => this.removeFilter(e.currentTarget.dataset.field)} style={{cursor: 'pointer'}} >
                        <Icon icon="x" size="extra-small" right color="grey" />
                      </span>
                      <Field
                        key={field[0]}
                        type={'selectbox'}
                        label={'Campo'}
                        itens={select}
                        component={SelectBox}
                        name={field[0]}
                        input={{
                          value: this.props.save.filters.status[field[0]],
                          onChange: this.change,
                          name: field[0]
                        }}
                      />
                      {content}
                      <span className={css(styles.msgFilter)} id={field[0]+"_msg"}></span>
                    </div>
                  )
                })
              :
                <div className={css(styles.defaultConteiner)}>
                  <div className={css(styles.defaultMsg)}>Adicione os itens<br/>da sua pesquisa</div>
                </div>
              }
            </div>
            <Button
              style={styles.row._definition}
              text="Adicionar Critério"
              color="primary"
              onClick={() => {
                var add = false;
                for (var key in this.props.save.filters.status) {
                  if (this.props.save.filters.status[key] == "add") {
                    add = true;
                    break;
                  }
                }
                if (!add) {
                  for (var i=0; i<=Object.entries(this.props.save.filters.status).length; i++) {
                    if (!this.props.save.filters.status["filter"+i]) {
                      this.props.save.filters.status["filter"+i] = "add";
                      this.props.change("filter"+i, "add");
                      break;
                    }
                  }
                  this.setState({}, () => {
                    const element = document.getElementById("conteiner_filters");
                    element.scrollTop = element.scrollHeight - element.clientHeight;
                  });
                }
                else {
                  const element = document.getElementById("conteiner_filters");
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
        </form>
        <div className={css(styles.results)}>
          <h3 className={css(styles.sectionTitle)}>Resultados</h3>
          <div className={css(styles.backgroundResults)}>
          {this.state.filteredArray.length>0 ?
            <div>
              <TableFilter width="100%"
                            array={this.state.filteredArray.slice((this.props.save.pagination.page-1)*this.props.save.pagination.limit, this.props.save.pagination.page*this.props.save.pagination.limit)}
                            infos={this.state.infos}
                            onWrite={this.onWrite}
                            selectAll={this.selectAllPatients}
                            limit={this.props.save.pagination.limit}
                            orderTable={this.orderTable}
                            column={this.state.column}
                            order={this.state.order}
              />
              <div style={{marginTop: '1rem'}}>
                <Pagination changePage={this.changePage}
                            page={this.props.save.pagination.page}
                            limit={this.props.save.pagination.limit}
                            length={this.state.filteredArray.length}
                />
              </div>
            </div>
          :null}
          </div>
        </div>
      </div>
    );
  }
}
const advancedSearch = reduxForm({
  form: 'advancedSearchForm'
})(AdvancedSearch);

function mapStateToProps({ patientsSearch }, ownProps) {
  return { initialValues: ownProps.save.filters.status, response: patientsSearch.suggestions }
}

export default connect(mapStateToProps, { advancedFilter, editPatient } )(advancedSearch);