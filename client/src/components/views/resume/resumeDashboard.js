import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactGridLayout from 'react-grid-layout';
import {ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import ReactTooltip from 'react-tooltip'
import { GithubPicker } from 'react-color';

import { css } from 'aphrodite/no-important';
import { styles } from './resumeDashboardStyles';

import Icon from '../../common/Icon';
import SearchFilter from '../../common/SearchFilter';
import Button from '../../common/Button';
import Pagination from '../../common/Pagination';
import RadioInput from '../../forms/RadioInput'; 
import InputField from '../../forms/InputField';
import Modal from '../../modals/Modal';
import TableFilter from '../../lists/patients/TableFilter';
import SavedCardsSelect from './savedCardsSelect';

import { advancedFilter as patientFilter } from '../../../actions/patientsSearch';
import { advancedFilter as agendaFilter } from '../../../actions/agendaSearch';
import { getGrid, updateGrid, save, deleteSaved, getSaved } from '../../../actions/resumeDashboard';
// import { getDashboard, updateDashboard, deleteCard, saveCard } from '../../../actions/auth'; 

import $ from 'jquery';
import jQuery from 'jquery';
import FroalaEditor from 'react-froala-wysiwyg';

window.$ = $;
window.jQuery = jQuery;
window.jquery = jQuery;

require('froala-editor/js/froala_editor.pkgd.min.js');
require('froala-editor/css/froala_editor.pkgd.min.css');
require('font-awesome/css/font-awesome.css');

require('react-grid-layout/css/styles.css');
require('react-resizable/css/styles.css');

// import { editPatients } from '../../../actions/patientsSearch';
// import { clearPatient } from '../../../actions/patientsCreation';

class MenuActions extends React.Component {
	constructor(props) {
    super(props);
    if (!this.props.response.load);
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.addCard = this.addCard.bind(this);
    this.addElement = this.addElement.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.FillPosition = this.FillPosition.bind(this);
    this.renderElements = this.renderElements.bind(this);
    this.isCordinateFill = this.isCordinateFill.bind(this);
    this.resizeContainer = this.resizeContainer.bind(this);
    this.getPositionEmpty = this.getPositionEmpty.bind(this);
    this.state = {
      src: '',
      page: 1,
      rows: 0,
      columns: 0,
      timer: {},
      model: '',
      edit: false,
      showAdd: false,
      showAddElement: {},
      cardSelected: {},
      savedCard: {label: '', type: '', array: []},
      textElements: [],
      textElementEdit: -1,
      last: {x: 0, y: 0},
      mouse: {x: 0, y: 0},
      selectedElement: {
        filters: {}
      },
      cardTypes: [
        {label: "Pacientes", value: "patient", modal: 'visual', icon: 'patient'},
        {label: "Consultas", value: "agenda", modal: 'visual', icon: 'calendar'},
        {label: "Lembretes", value: "reminder", modal: 'text', icon: 'reminder'},
        {label: "Galeria", value: "image", modal: 'image', icon: 'image'}
      ],
      elementType: [
        {label: "Tabela", value: "table"},
        {label: "Gráfico", value: "chart"},
        {label: "Texto", value: "text"}
      ],
      timeTypes: [
        { value: 'day', label: (days) => days==1?'Dia':'Dias', max: 20 },
        { value: 'week', label: (weeks) => weeks==1?'Semana':'Semanas', max: 12 },
        { value: 'month', label: (months) => months==1?'Mês':'Meses', max: 11 }
      ],
      card: [],
      optionsPatient: [
        { value: 'add', label: 'Selecione' },
        { value: 'name.string', label: 'Nome' },
        { value: 'email.string', label: 'E-mail' },
        { value: 'telephones.string', label: 'Telefone' },
        { value: 'state.string', label: 'Estado' },
        { value: 'city.string', label: 'Cidade' },
        { value: 'zip.string', label: 'CEP' },
        { value: 'registry.int', label: 'Cadastro' },
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
      realOptions: {
        name: { type: 'string', label: 'Nome'},
        email: { type: 'string', label: 'E-mail'},
        telephones: { type: 'string', label: 'Telefone'},
        state: { type: 'string', label: 'Estado'},
        city: { type: 'string', label: 'Cidade'},
        zip: { type: 'string', label: 'CEP'},
        registry: { type: 'int', label: 'Cadastro'},
        birthday: { type: 'date', label: 'Aniversário'},
        age: { type: 'int', label: 'Idade'},
        gender: { type: 'select', suggestions: [{value: 'M', label: 'Masculino'}, {value: 'F', label: 'Feminino'}], label: 'Gênero'},
        profession: { type: 'string', label: 'Profissão'},
        civil_id: { type: 'string', label: 'RG'},
        cpf: { type: 'string', label: 'CPF'},
        company: { type: 'string', label: 'Empresa'},
        father: { type: 'string', label: 'Pai'},
        mother: { type: 'string', label: 'Mãe'},
        father_profession: { type: 'string', label: 'Profissão do Pai'},
        mother_profession: { type: 'string', label: 'Profissão do Mãe'},
        insurance: { type: 'string', label: 'Plano de saúde'},
        insurance_number: { type: 'int', label: 'Plano de saúde - número'},
        sponsor: { type: 'string', label: 'Responsável'},
        sponsor_insurance_number: { type: 'int', label: 'Responsável - Plano de saúde'},
        sponsor_cpf: { type: 'string', label: 'Responsável - CPF'},
        indication: { type: 'string', label: 'Indicação'},
        first_appointment: { type: 'date', label: 'Primeira consulta'},
        treatment_time: { type: 'string', label: 'Tempo de tratamento'},
        status: { type: 'string', label: 'Status'},
        active: { type: 'select', suggestions: [{value: false, label: 'Arquivado'}, {value: true, label: 'Ativo'}], label: 'Situação' }
      },
      optionsAppointment: [
        { value: 'add', label: 'Selecione' },
        { value: 'title.string', label: 'Título' },
        { value: 'patient.string', label: 'Paciente' },
        { value: 'desc.string', label: 'Descrição' },
        { value: 'status.string', label: 'Status' }
      ],
    };
    document.onmousemove = (e) => this.state.mouse = {x: e.clientX, y: e.clientY};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clinic && nextProps.clinic._id) {
      const { getGrid } = this.props;
      getGrid((grid) => {
        var state = {card: grid}
        if (grid.length>0) {
          var columns = grid[0].layout.grid.x + grid[0].layout.grid.w;
          var rows = grid[0].layout.grid.y + grid[0].layout.grid.h;
          state.card[0].element = state.card[0].element.map((item) => { return {...item, page: 1} });
          for (var i=1; i<grid.length; i++) {
            if (grid[i].layout.grid.x + grid[i].layout.grid.w > columns)
              columns = grid[i].layout.grid.x + grid[i].layout.grid.w;
            if (grid[i].layout.grid.y + grid[i].layout.grid.h > rows)
              rows = grid[i].layout.grid.y + grid[i].layout.grid.h;
            state.card[i].element = state.card[i].element.map((item) => { return {...item, page: 1} });
          }
          state.columns = columns+1;
          state.rows = rows+1;
        }
        this.setState(state);
      });
    }
    // else {
    //   const { grid } = this.props;
    //   this.state.card = grid;
    //   if (grid.length>0) {
    //     var columns = grid[0].layout.grid.x + grid[0].layout.grid.w;
    //     var rows = grid[0].layout.grid.y + grid[0].layout.grid.h;
    //     for (var i=1; i<grid.length; i++) {
    //       if (grid[i].layout.grid.x + grid[i].layout.grid.w > columns)
    //         columns = grid[i].layout.grid.x + grid[i].layout.grid.w;
    //       if (grid[i].layout.grid.y + grid[i].layout.grid.h > rows)
    //         rows = grid[i].layout.grid.y + grid[i].layout.grid.h;
    //     }
    //     this.state.columns = columns;
    //     this.state.rows = rows;
    //   }
    // }
  }

  getKeys (cardType) {
    switch (cardType) {
      case 'patient':
        return {
          infos: { name: { type: 'String' } },
          label: 'Pacientes',
          key: 'created_at',
          keySelector: () => (
            <span style={{marginRight: '.5rem'}}>
              Pacientes
              <select
                style={{width: '135px', margin: '0 .5rem'}}
                value={this.state.selectedElement.cottar.key}
                onChange={(e) => {
                  var key = e.target.value;
                  this.state.selectedElement.cottar.advancedFilter({...this.state.selectedElement, cottar: {...this.state.selectedElement.cottar, key}}, (array) => {
                    this.state.selectedElement.cottar.key = key;
                    this.state.selectedElement.cottar.next = (key==='birthday');
                    this.state.selectedElement.array = array;
                    this.setState({});
                  }, key);
                }}
              >
                <option value='created_at'>criados</option>
                <option value='birthday'>aniversariantes</option>
              </select>
              nos
            </span>
          ),
          advancedFilter: (selected, callback, key) => this.props.patientFilter(this.submit(selected, key?key:this.state.selectedElement.cottar?this.state.selectedElement.cottar.key:'created_at'), () => {
            const { response } = this.props;
            callback(response);
          }),
          next: false
        }
      case 'agenda':
        return {
          infos: { patient: { type: 'String' } },
          label: 'Agendamentos',
          key: 'start',
          keySelector: () => <span>Agendamentos marcados nos </span>,
          advancedFilter: (selected, callback) => this.props.agendaFilter(this.submit(selected, 'start'), () => {
            const { agenda } = this.props;
            callback(agenda);
          }),
          next: true
        }
    }
  }

  resizeContainer(newElement) {
    if (newElement.x+(2+newElement.w) > this.state.columns)
      this.setState((prevState) => { return {columns: newElement.x+(2+newElement.w)} });
    if (newElement.y+(2+newElement.h) >= this.state.rows)
      this.setState((prevState) => { return {rows: newElement.y+(2+newElement.h)} });
    if (this.state.mouse.x > this.state.last.x && (newElement.x+(2+newElement.w))*95+10 >= this.refs.container.offsetWidth) {
      if (this.refs.resizable.offsetWidth < (newElement.x+(2+newElement.w))*95+10)
        this.refs.resizable.style.width = (newElement.x+(2+newElement.w))*95+10 + "px";
      this.refs.container.scrollBy(20, 0);
    }
    if (this.state.mouse.x < this.state.last.x && (newElement.x-newElement.w)*95+10 < this.refs.container.scrollLeft)
      this.refs.container.scrollBy(-20, 0);
    if (this.state.mouse.y > this.state.last.y && (newElement.y+(2+newElement.h))*95+10 >= this.refs.container.offsetHeight) {
      if (this.refs.resizable.offsetHeight < (newElement.y+(2+newElement.h))*95+10)
        this.refs.resizable.style.height = (newElement.y+(2+newElement.h))*95+10 + "px";
      this.refs.container.scrollBy(0, 20);
    }
    if (this.state.mouse.y < this.state.last.y && (newElement.y-newElement.h)*95+10 < this.refs.container.scrollTop)
      this.refs.container.scrollBy(0, -20);
    this.state.last = {x: this.state.mouse.x, y: this.state.mouse.y};
  }

  editElement() {
    var copy = {};
    switch (this.state.selectedElement.kind) {
      case 'chart':
        copy = {...this.state.selectedElement};
        break;
      case 'table':
        copy = {...this.state.selectedElement};
        break;
      case 'text':
        copy = {
          kind: 'text',
          component: [...this.state.textElements],
          cottar: this.state.selectedElement.cottar,
          elmnt: this.state.selectedElement.elmnt,
          layout: this.state.card[this.state.selectedElement.card].element[this.state.selectedElement.elmnt].layout
        };
        break;
      default:
        break;
    }
    delete copy.card;
    copy.key = this.state.selectedElement.cottar.key;
    this.state.card[this.state.selectedElement.card].element[copy.elmnt] = copy;
    this.setState({});
  }

  addElement() {
    if (this.state.selectedElement.card === -1)
      this.addCard();
    var copy = {}, size = {};
    switch (this.state.selectedElement.kind) {
      case 'chart':
        size = {minW: 3, minH: 2, w: 7, h: 4};
        copy = {...this.state.selectedElement};
        break;
      case 'table':
        size = {minW: 6, minH: 3, w: 7, h: 4};
        copy = {...this.state.selectedElement};
        break;
      case 'text':
        size = {minW: 2, w: 2, h: 2};
        copy = {kind: 'text', component: [...this.state.textElements]};
        break;
      default:
        break;
    }
    var card = {...this.state.card[this.state.selectedElement.card]};
    var pos = this.getPositionEmpty(card.element, card.layout.grid.w, 7, 4);
    if (pos[0] + 7 > card.layout.grid.w) {
      this.state.card[this.state.selectedElement.card].layout.grid.w = pos[0] + 7;
      if (pos[0] + 7 + card.layout.grid.x > this.state.columns)
        this.state.columns = pos[0] + 7 + card.layout.grid.x;
    }
    if (pos[1] + 4 > card.layout.grid.h) {
      this.state.card[this.state.selectedElement.card].layout.grid.h = pos[1] + 4;
      if (pos[1] + 4 + card.layout.grid.y > this.state.rows)
        this.state.rows = pos[1] + 4 + card.layout.grid.y;
    }
    for (var i=0; i<card.element.length; i++)
      if (card.element.findIndex((item) => item.layout.key === i.toString()) === -1)
        break;
    copy.layout = {key: i.toString(), grid: {...size, x: pos[0], y: pos[1] }};
    copy.page = 1;
    copy.key = this.state.selectedElement.cottar.key;
    delete copy.card;
    delete copy.cottar;
    this.state.card[this.state.selectedElement.card].element.push(copy);
    this.setState({});
  }

  editElementReminder() {
    this.state.card[this.state.selectedElement.card].element[this.state.selectedElement.elmnt].model = this.state.model;
    this.setState({});
  }

  addElementReminder() {
    if (this.state.selectedElement.card === -1)
      this.addCard();
    var card = {...this.state.card[this.state.selectedElement.card]};
    var pos = this.getPositionEmpty(card.element, card.layout.grid.w, 3, 3);
    if (pos[0] + 3 > card.layout.grid.w) {
      this.state.card[this.state.selectedElement.card].layout.grid.w = pos[0] + 3;
      if (pos[0] + 3 + card.layout.grid.x > this.state.columns)
        this.state.columns = pos[0] + 3 + card.layout.grid.x;
    }
    if (pos[1] + 3 > card.layout.grid.h) {
      this.state.card[this.state.selectedElement.card].layout.grid.h = pos[1] + 3;
      if (pos[1] + 3 + card.layout.grid.y > this.state.rows)
        this.state.rows = pos[1] + 3 + card.layout.grid.y;
    }
    for (var i=0; i<card.element.length; i++)
      if (card.element.findIndex((item) => item.layout.key === i.toString()) === -1)
        break;
    this.state.card[this.state.selectedElement.card].element.push({
      layout: {key: i.toString(), grid: {minW: 1, minH: 1, w: 3, h: 2, x: pos[0], y: pos[1] }},
      model: this.state.model
    });
    this.setState({});
  }

  addElementGallery() {
    if (this.state.selectedElement.card === -1)
      this.addCard();
    var card = {...this.state.card[this.state.selectedElement.card]};
    var pos = this.getPositionEmpty(card.element, card.layout.grid.w, 3, 3);
    if (pos[0] + 3 > card.layout.grid.w) {
      this.state.card[this.state.selectedElement.card].layout.grid.w = pos[0] + 3;
      if (pos[0] + 3 + card.layout.grid.x > this.state.columns)
        this.state.columns = pos[0] + 3 + card.layout.grid.x;
    }
    if (pos[1] + 3 > card.layout.grid.h) {
      this.state.card[this.state.selectedElement.card].layout.grid.h = pos[1] + 3;
      if (pos[1] + 3 + card.layout.grid.y > this.state.rows)
        this.state.rows = pos[1] + 3 + card.layout.grid.y;
    }
    for (var i=0; i<card.element.length; i++)
      if (card.element.findIndex((item) => item.layout.key === i.toString()) === -1)
        break;
    this.state.card[this.state.selectedElement.card].element.push({
      layout: {key: i.toString(), grid: {minW: 1, minH: 1, w: 3, h: 2, x: pos[0], y: pos[1] }},
      src: this.state.src
    });
    this.setState({});
  }

  addCard() {
    for (var i=0; i<this.state.card.length; i++)
      if (this.state.card.findIndex((item) => item.layout.key === i.toString()) === -1)
        break;
    var pos = this.getPositionEmpty(this.state.card, this.state.columns, 3, 2);
    this.state.card.push({
      kind: this.state.cardSelected.value,
      layout: {
        key: i.toString(),
        grid: { x: pos[0], y: pos[1], w: 0, h: 0, minW: 2, minH: 2 }
      },
      element: []
    });
    if (pos[0] + 3 > this.state.columns)
      this.state.columns = pos[0] + 3;
    if (pos[1] + 2 > this.state.rows)
      this.state.rows = pos[1] + 2;
    this.state.selectedElement.card = this.state.card.length-1;
  }

  getPositionEmpty(grid, columns, w, h) {
    for (var x=0; x<columns+1; x++) {
      for (var y=0; y<=x; y++) {
        if (this.FillPosition(grid, x, y, w, h))
          return [x, y];
        if (this.FillPosition(grid, y, x, w, h))
          return [y, x];
      }
      if (this.FillPosition(grid, x, x, w, h))
        return [x, x];
    }
  }
  
  FillPosition (grid, x, y, w, h) {
    for (var i=0; i<w; i++)
      for (var k=0; k<h; k++)
        if (this.isCordinateFill(grid, x+i, y+k))
          return false;
    return true;
  }

  isCordinateFill (grid, x, y) {
    for (var i=0; i<grid.length; i++)
      if (x>=grid[i].layout.grid.x && x<grid[i].layout.grid.x+grid[i].layout.grid.w &&
          y>=grid[i].layout.grid.y && y<grid[i].layout.grid.y+grid[i].layout.grid.h)
        return true;
    return false;
  }

  change (ret) {
    var copy = {...this.state.selectedElement};
    if (copy.filters[ret.name] !== "add")
      this.clearInput(ret.name, true);
    copy.filters[ret.name] = ret.value;
    copy.filters[ret.name+"_input1"] = "";
    if (copy.filters[ret.name+"_input2"])
      copy.filters[ret.name+"_input2"] = "";
    this.setState({selectedElement: copy}, () =>{
      this.state.selectedElement.cottar.advancedFilter(copy, (array) =>
        this.setState({selectedElement: {...copy, array}})
      )
    });
  }

  clearInput (name, more) {
    document.getElementsByName(name+"_input1")[0].removeAttribute("style");
    if (more && document.getElementsByName(name+"_input2")[0] !== undefined)
      document.getElementsByName(name+"_input2")[0].removeAttribute("style");
    document.getElementById(name+"_msg").innerHTML = "";
  }

  errorInput (name, msg, more) {
    document.getElementsByName(name+"_input1")[0].style.border = "1px solid #CC4C29";
    if (more)
      document.getElementsByName(name+"_input2")[0].style.border = "1px solid #CC4C29";
    document.getElementById(name+"_msg").innerHTML = msg;
    return true;
  }

  removeFilter(field) {
    var copy = {...this.state.selectedElement};
    delete copy.filters[field];
    delete copy.filters[field+"_input1"];
    delete copy.filters[field+"_input2"];
    this.setState({selectedElement: copy}, (res) =>
      this.state.selectedElement.cottar.advancedFilter(copy, (array) =>
        this.setState({selectedElement: {...copy, array}})
      )
    );
  }

  changeFilter(name, value, type) {
    var copy = {...this.state.selectedElement};    
    copy.filters[name] = value;
    if (type === "input") {
      if (this.state.timer)
        clearTimeout(this.state.timer);
      var copy_this = this;
      this.state.timer = setTimeout(() => {
        copy_this.setState({selectedElement: copy}, () =>
          copy_this.state.selectedElement.cottar.advancedFilter(copy, (array) =>
            copy_this.setState({selectedElement: {...copy, array}})
          )
        );
        copy_this.state.timer = false;
      }, 1500);
    }
    else {
      this.setState({selectedElement: copy}, () =>
        this.state.selectedElement.cottar.advancedFilter(copy, (array) =>
          this.setState({selectedElement: {...copy, array}})
        )
      );
    }
  }
  
  renderFilters(type) {
    return (
      <form className={css(styles.filterForm)}>
        <h3 className={css(styles.sectionTitle)}>Critérios</h3>
        <div id="conteiner_filters" className={css(styles.filterContainer)}>
          {Object.entries(this.state.selectedElement.filters).length>0 ?
            Object.entries(this.state.selectedElement.filters).filter((obj)=>{return !obj[0].includes("_input")}).map((field, index) => {
              var select = [...type==='patient'?this.state.optionsPatient:type==='agenda'?this.state.optionsAppointment:[]], content = null;
              if (field[1] !== "add") {
                select.splice(0, 1);
                var type = field[1].split(".")[1];
                if (type == "string") {
                  if (!this.state.selectedElement.filters[field[0]+"_input2"])
                    this.state.selectedElement.filters[field[0]+"_input2"] = 's';
                  content=(
                    <div>
                      <select
                        key={field[0]+"_input2"}
                        name={field[0]+"_input2"}
                        onChange={(e) => this.changeFilter(e.target.name, e.target.value, "select")}
                        className={css(styles.input)}
                        defaultValue={this.state.selectedElement.filters[field[0]+"_input2"]}
                      >
                        {[{value: 's', label: 'Começa'}, {value: 'c', label: 'Contém'}, {value: 'e', label: 'Termina'}].map((itm) => 
                          <option key={itm.value} value={itm.value}>{itm.label}</option>
                        )}
                      </select>
                      <InputField
                        input={{
                          name: field[0]+"_input1",
                          onChange: (e) => this.changeFilter(e.target.name, e.target.value, "input"),
                          defaultValue: this.state.selectedElement.filters[field[0]+"_input1"],
                          placeholder: 'Buscar'
                        }}
                        label={''}
                        key={field[0]+"_input1"}
                      />
                    </div>
                  );
                }
                else if (type === "int")
                  content=(
                    <div className={css(styles.content)}>
                      <span className={css(styles.infoFilter)} style={{paddingLeft: '0px'}}>De</span>
                      <InputField
                        input={{
                          name: field[0]+"_input1",
                          onChange: (e) => this.changeFilter(e.target.name, e.target.value, "input"),
                          defaultValue: this.state.selectedElement.filters[field[0]+"_input1"],
                          mask: "9999999999"
                        }}
                        label={''}
                        key={field[0]+"_input1"}  
                      />
                      <span className={css(styles.infoFilter)}>Até</span>
                      <InputField
                        input={{
                          name: field[0]+"_input2",
                          onChange: (e) => this.changeFilter(e.target.name, e.target.value, "input"),
                          defaultValue: this.state.selectedElement.filters[field[0]+"_input2"],
                          mask: "9999999999"
                        }}
                        label={''}
                        key={field[0]+"_input2"}  
                      />
                    </div>
                  );
                else if (type == "date")
                  content=(
                    <div className={css(styles.content)}>
                      <span className={css(styles.infoFilter)} style={{paddingLeft: '0px'}}>De</span>
                      <InputField
                        input={{
                          name: field[0]+"_input1",
                          onChange: (e) => this.changeFilter(e.target.name, e.target.value, "input"),
                          defaultValue: this.state.selectedElement.filters[field[0]+"_input1"],
                          mask: "99/99/9999",
                          placeholder: "DD / MM / AAAA"
                        }}
                        label={''}
                        key={field[0]+"_input1"}  
                      />
                      <span className={css(styles.infoFilter)}>Até</span>
                      <InputField
                        input={{
                          name: field[0]+"_input2",
                          onChange: (e) => this.changeFilter(e.target.name, e.target.value, "input"),
                          defaultValue: this.state.selectedElement.filters[field[0]+"_input2"],
                          mask: "99/99/9999",
                          placeholder: "DD / MM / AAAA"
                        }}
                        label={''}
                        key={field[0]+"_input2"}  
                      />
                    </div>
                  );
                else if (type == "gender") {
                  if (!this.state.selectedElement.filters[field[0]+"_input1"])
                    this.state.selectedElement.filters[field[0]+"_input1"] = 'M';
                  content=(
                    <select
                      key={field[0]+"_input1"}
                      name={field[0]+"_input1"}
                      onChange={(e) => this.changeFilter(e.target.name, e.target.value, "select")}
                      defaultValue={this.state.selectedElement.filters[field[0]+"_input1"]}
                      className={css(styles.input)}
                    >
                      {[{value: 'M', label: 'Masculino'}, {value: 'F', label: 'Feminino'}].map((itm) => 
                        <option key={itm.value} value={itm.value}>{itm.label}</option>
                      )}
                    </select>
                  );
                } else if (type == "boolean") {
                  if (!this.state.selectedElement.filters[field[0]+"_input1"])
                    this.state.selectedElement.filters[field[0]+"_input1"] = false;
                  content=(
                    <select
                      key={field[0]+"_input1"}
                      name={field[0]+"_input1"}
                      onChange={(e) => this.changeFilter(e.target.name, e.target.value, "select")}
                      defaultValue={this.state.selectedElement.filters[field[0]+"_input1"]}
                      className={css(styles.input)}
                    >
                      {[{value: false, label: 'Arquivado'}, {value: true, label: 'Ativo'}].map((itm) => 
                        <option key={itm.value} value={itm.value}>{itm.label}</option>
                      )}
                    </select>
                  );
                }
              }
              return (
                <div  key={'conteiner'+field[0]} className={css(styles.item)} style={index%2==0 ? {backgroundColor: '#e9e9e9'}: null}>
                  <span data-field={field[0]} onClick={(e) => this.removeFilter(e.currentTarget.dataset.field)} style={{cursor: 'pointer'}} >
                    <Icon icon="x" size="extra-small"  right color="grey" />
                  </span>
                  <label className={css(styles.label)}>Campo</label>
                  <select
                    key={field[0]}
                    name={field[0]}
                    onChange={(e) => this.change({name: e.target.name, value: e.target.value})}
                    defaultValue={this.state.selectedElement.filters[field[0]]}
                    className={css(styles.input)}
                  >
                    {select.map((itm) => 
                      <option key={itm.value} value={itm.value}>{itm.label}</option>
                    )}
                  </select>
                  {content}
                  <span className={css(styles.msgFilter)} id={field[0]+"_msg"}></span>
                </div>
              )
            })
          :
            <div className={css(styles.defaultConteiner)}>
              <div className={css(styles.defaultMsg)}>Todos</div>
            </div>
          }
        </div>
        <Button
          style={styles.row._definition}
          text="Adicionar Critério"
          color="primary"
          onClick={() => {
            var add = false;
            for (var key in this.state.selectedElement.filters) {
              if (this.state.selectedElement.filters[key] == "add") {
                add = true;
                break;
              }
            }
            if (!add) {
              for (var i=0; i<=Object.entries(this.state.selectedElement.filters).length; i++) {
                if (!this.state.selectedElement.filters["filter"+i]) {
                  this.state.selectedElement.filters["filter"+i] = "add";
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
      </form>
    )
  }

  renderModal() {
    console.log(this.state.cardSelected.modal);
    console.log(this.state.showAddElement);
    switch (this.state.cardSelected.modal) {
      case 'text':
        return (
          <Modal
            isOpen={this.state.showAddElement.text}
            header={this.state.selectedElement.elmnt>=0?"Editar lembrete":"Inserir lembrete"}
            adjustStyle={styles.addElementModalText}
          >
            <div style={{padding: '1rem'}}>
              <FroalaEditor
                tag='textarea'
                config={{
                  heightMin: '250px',
                  heightMax: '250px',
                  charCounterCount: true,
                  toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color'],
                  pluginsEnabled: ['fontFamily', 'fontSize', 'colors']
                }}
                model={this.state.model}
                onModelChange={(model) => this.setState({model})}
              />
              <div style={{marginTop: '.5rem'}}>
                <Button
                  color="green"
                  text={this.state.selectedElement.elmnt>=0?"Salvar":"Adicionar"}
                  onClick={() => {
                    this.state.selectedElement.elmnt >= 0 ? this.editElementReminder() : this.addElementReminder();
                    this.setState((prevState)=> {return {showAddElement: {...prevState.showAddElement, text: false}} });
                  }}
                />
                <Button
                  text="Cancelar"
                  color="secondary"
                  onClick={() => this.setState((prevState)=> {return {showAddElement: {...prevState.showAddElement, text: false}} })}
                  right
                />
              </div>
            </div>
          </Modal>
        );
      case 'image':
        return (
          <div>
            <Modal
              header={"Inserir imagem"}
              isOpen={this.state.showAddElement.image}
              adjustStyle={styles.addElementModalText}
            >
              <div style={{padding: '1rem', height: '370px'}}>
                <div className={css(styles.insertImageForm)}>
                  <div style={{width: '46px'}} key={this.state.src}>
                    <FroalaEditor
                      tag='textarea'
                        // heightMax: '0px',
                      config={{
                        heightMax: '0px',
                        toolbarButtons: ['insertImage'],
                        pluginsEnabled: ['image', 'imageManager'],
                        imageUploadURL: '/api/image/clinic',
                        imageUploadParams: { type: 'Dashboard' },
                        imageManagerLoadURL: '/api/image/clinic',
                        imageManagerDeleteURL: '/api/image/clinic',
                        imageManagerDeleteMethod: "DELETE",
                        events: {
                          'froalaEditor.image.loaded': (e, editor, img) => img[0].src && this.setState({src: img[0].src}),
                          'froalaEditor.image.uploaded': (e, editor, response) => this.setState({src: {...JSON.parse(response)}.link})
                        }
                      }}
                      model={''}
                    />
                  </div>
                  <div style={{textAlign: 'center'}}>
                    <img className={css(styles.imageContainer)} src={this.state.src} />
                  </div>
                </div>
                <div style={{marginTop: '.5rem'}}>
                  <Button
                    color="green"
                    text={"Adicionar"}
                    onClick={() => {
                      this.addElementGallery();
                      this.setState((prevState)=> {return {showAddElement: {...prevState.showAddElement, image: false}} });
                    }}
                  />
                  <Button
                    text="Cancelar"
                    color="secondary"
                    onClick={() => this.setState((prevState)=> {return {showAddElement: {...prevState.showAddElement, image: false}} })}
                    right
                  />
                </div>
              </div>
            </Modal>
          </div>
        );
      case 'visual':
        var max = this.state.selectedElement.time?this.state.timeTypes[this.state.timeTypes.findIndex((item) => item.value === this.state.selectedElement.time.type)].max:0;
        return (
          <Modal
            isOpen={this.state.showAddElement.visual}
            header={this.state.selectedElement.elmnt>=0?"Editar elemento":"Inserir elemento"}
            adjustStyle={styles.addElementModalVisual}
          >
            <div className={css(styles.form)}>
              <div className={css(styles.gridForm)}>
                <div>
                  {this.state.elementType.map((item, index) => 
                    <RadioInput
                      key={"element_type_"+index}
                      label={item.label}
                      input={{
                        value: item.value,
                        name: "element_type",
                        onChange: (e) => { this.state.selectedElement.kind = e.target.value; this.setState({}); },
                        checked: this.state.selectedElement.kind === item.value
                      }}
                    />
                  )}
                </div>
                <div className={css(styles.gridElement)}>
                  <div style={{overflow: 'auto'}}>
                    {/*<SearchFilter title={'CRITÉRIOS'} name={'seach_filters'} filter={{}} options={this.state.realOptions} />*/}
                    {this.renderFilters(this.state.cardSelected.modal)}
                  </div>
                  <div className={css(styles.gridElementInfos)}>
                    {this.state.selectedElement.kind === "text"?
                      <div className={css(styles.gridElementText)}>
                        <span className={css(styles.numberTextElement)}>{this.state.selectedElement.array.length}</span>
                        <InputField
                          input={{
                            onChange: (e) => {this.state.selectedElement.title = e.target.value; this.setState({})},
                            value: this.state.selectedElement.title,
                            style: {display: 'inline-block'}
                          }}
                          label={''}
                        />
                        { this.state.textElementEdit===-1 ?
                          <Button
                            size={'medium'}
                            icon={'plus'}
                            onClick={() => {
                              this.setState((prevState) => {
                                return {
                                  textElements: [...prevState.textElements,
                                    {
                                      text: this.state.selectedElement.title,
                                      filters: this.submit(this.state.selectedElement, this.state.selectedElement.cottar.key),
                                      frontFilters: {...this.state.selectedElement.filters},
                                      time: {...this.state.selectedElement.time},
                                      array: [...this.state.selectedElement.array]
                                    }
                                  ]
                                }
                              }, () => {
                                this.state.selectedElement.title = '';
                                this.state.selectedElement.filters = {};
                                this.state.selectedElement.time = { type: "day", last: 7, next: 0 };
                                this.state.selectedElement.cottar.advancedFilter(this.state.selectedElement, (array) => {
                                  this.state.selectedElement.array = [...array];
                                  this.setState({});
                                });
                              });
                            }}
                          />
                        :
                          <Button
                            icon={'save'}
                            size={'medium'}
                            color={'green'}
                            onClick={() => {
                              this.state.textElements[this.state.textElementEdit] = {
                                text: this.state.selectedElement.title,
                                filters: this.submit(this.state.selectedElement, this.state.selectedElement.cottar.key),
                                frontFilters: {...this.state.selectedElement.filters},
                                time: {...this.state.selectedElement.time},
                                array: [...this.state.selectedElement.array]
                              }
                              this.state.textElementEdit = -1;

                              this.state.selectedElement.title = '';
                              this.state.selectedElement.filters = {};
                              this.state.selectedElement.time = { type: "day", last: 7, next: 0 };
                              this.state.selectedElement.cottar.advancedFilter(this.state.selectedElement, (array) => {
                                this.state.selectedElement.array = array;
                                this.setState({});
                              });
                            }}
                          />
                        }
                      </div>
                    :
                      <div>
                        <div>Título</div>
                        <div>
                          <InputField
                            input={{
                              onChange: (e) => {this.state.selectedElement.title = e.target.value; this.setState({})},
                              value: this.state.selectedElement.title
                            }}
                            label={''}
                          />
                        </div>
                      </div>
                    }
                    <div className={css(styles.gridElementAlign)}>
                      <div className={css(styles.gridElementMiddle)}>
                        {this.state.selectedElement.kind === "chart"?
                          <AreaChart width={650} height={300} data={this.chartArrayConvert(this.state.selectedElement.array, this.state.selectedElement.time, this.state.selectedElement.cottar.key, this.state.selectedElement.cottar.label)} margin={{top: 0, right: 0, left: -20, bottom: 0}}>
                            <XAxis dataKey="name"/>
                            <YAxis tick={{dx: -5}} />
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey={this.state.selectedElement.cottar.label} stroke="#45AFE5" fill="#99dbfc" activeDot={{r: 8}}/>
                          </AreaChart>
                        :this.state.selectedElement.kind === "table"?
                          <div>
                            <div className={css(styles.tableContainer)}>
                              <TableFilter
                                width="650px"
                                array={this.state.selectedElement.array?this.state.selectedElement.array.slice((this.state.page-1)*5, this.state.page*5):new Array(5).toString().split(",")}
                                infos={this.state.selectedElement.cottar.infos}
                                limit={5}
                                header={false}
                              />
                            </div>
                            <div style={{marginTop: '1rem'}}>
                              <Pagination 
                                changePage={(page) => this.setState({page: parseInt(page, 10)})}
                                page={this.state.page}
                                limit={5}
                                length={this.state.selectedElement.array?this.state.selectedElement.array.length:0}
                                size={"small"}
                              />
                            </div>
                          </div>
                        :this.state.selectedElement.kind === "text"?
                          <div>
                            {this.state.textElements.map((item, index) =>
                              <div className={css(styles.textElementList)} key={'text_element_'+index}>
                                <span className={css(styles.numberTextElement)}>{item.array.length}</span>
                                <span className={css(styles.stringTextElement)}>{item.text}</span>
                                {this.state.textElementEdit!==index ?
                                  <Button
                                    style={{margin: '0'}}
                                    color={'secondary'}
                                    size={'medium'}
                                    icon={'edit'}
                                    onClick={() => {
                                      this.state.textElementEdit = index;
                                      this.state.selectedElement.filters = {...this.state.textElements[index].frontFilters};
                                      this.state.selectedElement.time = {...this.state.textElements[index].time};
                                      this.state.selectedElement.title = this.state.textElements[index].text;
                                      this.state.selectedElement.array = [...this.state.textElements[index].array];
                                      this.setState({});
                                    }}
                                  />
                                :
                                  <div></div>
                                }
                                <Button
                                  color={'red'}
                                  size={'medium'}
                                  icon={'x'}
                                  onClick={() => {
                                    this.state.textElements.splice(index, 1);
                                    this.setState({});
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        :null}
                      </div>
                    </div>
                    <div>
                      <center style={{marginBottom: '.5rem'}}>
                        {this.state.selectedElement.cottar.keySelector()}
                        {this.state.selectedElement.time.type==="week" ? "última":"último"}{this.state.selectedElement.time.last>1?'s':''}
                        <select
                          style={{width: '60px', margin: '0 .5rem'}}
                          value={this.state.selectedElement.time.last}
                          onChange={(e) => {
                            var copy = {...this.state.selectedElement};
                            copy.time.last = parseInt(e.target.value, 10);
                            var total = copy.time.last + copy.time.next;
                            if (total>max)
                              copy.time.next = max - copy.time.last;
                            this.state.selectedElement.cottar.advancedFilter(copy, (array) =>
                              this.setState({selectedElement: {...copy, array}})
                            );
                          }}
                          className={css(styles.input)}
                        >
                          {[...Array(max+1).keys()].map((itm) => 
                            <option key={'last_'+itm} value={itm}>{itm}</option>
                          )}
                        </select>
                        {this.state.selectedElement.cottar && this.state.selectedElement.cottar.next?
                          <span>
                            {"e "}
                            {this.state.selectedElement.time.type==="week"?"próxima":"próximo"}{this.state.selectedElement.time.next>1?'s':''}
                            <select
                              style={{width: '60px', margin: '0 .5rem'}}
                              value={this.state.selectedElement.time.next}
                              onChange={(e) => {
                                var copy = {...this.state.selectedElement};
                                copy.time.next = parseInt(e.target.value, 10);
                                this.state.selectedElement.cottar.advancedFilter(copy, (array) =>
                                  this.setState({selectedElement: {...copy, array}})
                                );
                              }}
                              className={css(styles.input)}
                            >
                              {[...Array(max+1-this.state.selectedElement.time.last).keys()].map((itm) => 
                                <option key={'next_'+itm} value={itm}>{itm}</option>
                              )}
                            </select>
                          </span>
                        :null}
                        <select
                          style={{width: '100px'}}
                          value={this.state.selectedElement.time.type}
                          onChange={(e) => {
                            var copy = {...this.state.selectedElement};
                            if (copy.time.type === "day" && e.target.value !== "day") {
                              if (copy.time.last>12)
                                copy.time.last = 12;
                              if (copy.time.next>12)
                                copy.time.next = 12;
                            }
                            copy.time.type = e.target.value;
                            this.state.selectedElement.cottar.advancedFilter(copy, (array) =>
                              this.setState({selectedElement: {...copy, array}})
                            );
                          }}
                          className={css(styles.input)}
                        >
                          {this.state.timeTypes.map((itm) => 
                            <option key={itm.value} value={itm.value}>{itm.label(this.state.selectedElement.time.last)}</option>
                          )}
                        </select>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  color="green"
                  text={this.state.selectedElement.elmnt>=0?"Salvar":"Adicionar"}
                  onClick={() => {
                    this.state.selectedElement.elmnt >= 0 ? this.editElement() : this.addElement();
                    this.setState((prevState)=> {return {showAddElement: {...prevState.showAddElement, visual: false}} });
                  }}
                />
                <Button
                  text="Cancelar"
                  color="secondary"
                  onClick={() => this.setState((prevState)=> {return {showAddElement: {...prevState.showAddElement, visual: false}} })}
                  right
                />
              </div>
            </div>
          </Modal>
        );
    }
  }

  submit (element, key) {
    var error = false, back = {};
    Object.entries(element.filters).filter((obj)=>{return !obj[0].includes("_input")}).map((field) => {
      var type = field[1].split(".")[1];
      if (type == "string") {
        if (!element.filters[field[0]+"_input1"])
          error = this.errorInput(field[0], "A busca precisa estar preenchida", false);
        else
          this.clearInput(field[0], false);
      }
      else if (type == "int") {
        var input1 = element.filters[field[0]+"_input1"] ? parseInt(element.filters[field[0]+"_input1"]) : "",
        input2 = element.filters[field[0]+"_input2"] ? parseInt(element.filters[field[0]+"_input2"]) : "";
        if (!input1 && !input2)
          error = this.errorInput(field[0], "Pelo menos um campo precisa estar preenchido", true);
        else if (input1 !== "" && input2 !== "" && input2 < input1)
          error = this.errorInput(field[0], "O campo 'até' deve ser maior ou igual ao campo 'de'", true);
        else
          this.clearInput(field[0], true);
      }
      else if (type == "date") {
        var valid1 = element.filters[field[0]+"_input1"] ? this.isValidDate(element.filters[field[0]+"_input1"]) : true,
        valid2 = element.filters[field[0]+"_input2"] ? this.isValidDate(element.filters[field[0]+"_input2"]) : true,
        filled = element.filters[field[0]+"_input1"] && element.filters[field[0]+"_input2"];
        if (!element.filters[field[0]+"_input1"] && !element.filters[field[0]+"_input2"])
          error = this.errorInput(field[0], "Pelo menos um campo precisa estar preenchido", true);
        else if (!valid1 || !valid2) {
          if (!valid1)
            document.getElementsByName(field[0]+"_input1")[0].style.border = "1px solid #CC4C29";
          if (!valid2)
            document.getElementsByName(field[0]+"_input2")[0].style.border = "1px solid #CC4C29";
          document.getElementById(field[0]+"_msg").innerHTML = "Data invalida";
          error=true;
        }
        else if (filled && element.filters[field[0]+"_input1"].length !== element.filters[field[0]+"_input2"].length)
          error = this.errorInput(field[0], "As datas devem estar no mesmo formato", true);
        else if (filled && element.filters[field[0]+"_input1"].length === 10
              && this.isAfter(element.filters[field[0]+"_input1"], element.filters[field[0]+"_input2"]))
          error = this.errorInput(field[0], "A data 'até' deve ser depois ou igual a data 'de'", true);
        else
          this.clearInput(field[0], true);
      }
      if (!error && field[1]!=="add") {
        back[field[1].split(".")[0]] = {};
        back[field[1].split(".")[0]].type = type;
        if (type == "int" || type == "date") {
          if (element.filters[field[0]+"_input1"])
            back[field[1].split(".")[0]].since = element.filters[field[0]+"_input1"];
          if (element.filters[field[0]+"_input2"])
            back[field[1].split(".")[0]].to = element.filters[field[0]+"_input2"];
        }
        else {
          if (type == "string")
            back[field[1].split(".")[0]].regex = element.filters[field[0]+"_input2"];
          back[field[1].split(".")[0]].content = element.filters[field[0]+"_input1"];
        }
      }
    });
    var today = new Date();
    var tomorrow = new Date();
    switch (element.time.type) {
      case "day":
        today.setDate(today.getDate() - element.time.last);
        tomorrow.setDate(tomorrow.getDate() + element.time.next);
        break;
      case "week":
        today.setDate(today.getDate() - element.time.last*7);
        tomorrow.setDate(tomorrow.getDate() + element.time.next*7);
        break;
      case "month":
        today.setMonth(today.getMonth() - element.time.last);
        today.setDate(1);
        tomorrow.setMonth(tomorrow.getMonth() + element.time.next);
        tomorrow.setDate(31);
        break;
      default:
        break;
    }
    back[key] = {type: "date"};

    var dd = ('0'+today.getDate()).slice(-2);
    var mm = ('0'+(today.getMonth()+1)).slice(-2);
    if (element.cottar.key === 'birthday')
      back[key].since = dd+'/'+mm;
    else {
      var yyyy = today.getFullYear();
      back[key].since = dd+'/'+mm+'/'+yyyy;
    }
  
    dd = ('0'+tomorrow.getDate()).slice(-2);
    mm = ('0'+(tomorrow.getMonth()+1)).slice(-2);
    if (element.cottar.key === 'birthday')
      back[key].to = dd+'/'+mm;
    else {
      yyyy = tomorrow.getFullYear();
      back[key].to = dd+'/'+mm+'/'+yyyy;
    }
    
    return back;
  }

  renderElements(card, index) {
    var cottar = this.getKeys(card.kind);
    return (
      card.element.map((elmnt, ndx) => {
        var inside;
        switch (elmnt.kind) {
          case 'table':
            inside = (
              <div className={css(styles.gridElementTitle)}>
                <div className={css(styles.title)}>{elmnt.title}</div>
                <div className={css(styles.defaultConteiner)}>
                  <div className={css(styles.gridElementMiddle)}>
                    <div className={css(styles.tableContainer)}>
                      <TableFilter
                        width="100%"
                        array={elmnt.array?elmnt.array.slice((elmnt.page-1)*5, elmnt.page*5):new Array(5).toString().split(",")}
                        infos={cottar.infos}
                        limit={5}
                        header={false}
                      />
                    </div>
                    <div style={{marginTop: '1rem'}}>
                      <Pagination 
                        changePage={(page) => { this.state.card[index].element[ndx].page = parseInt(page, 10); this.setState({}); }}
                        page={elmnt.page}
                        limit={5}
                        length={elmnt.array?elmnt.array.length:0}
                        size={"small"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
            break;
          case 'chart':
            inside = (
              <div style={{height: '100%'}}>
                <div className={css(styles.title)}>{elmnt.title}</div>
                <div style={{height: 'calc(100% - 26px)'}}>
                  <ResponsiveContainer>
                    <AreaChart data={this.chartArrayConvert(elmnt.array, elmnt.time, elmnt.key, cottar.label)} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5bbdef" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#5bbdef" stopOpacity={0.1}/>
                      </linearGradient>
                     
                    </defs>
                      <XAxis dataKey="name"/>
                      <YAxis tick={{dx: -15}} />
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey={cottar.label} stroke="#45AFE5" fillOpacity={1} fill="url(#colorUv)" activeDot={{r: 8}} isAnimationActive={false}/>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
            break;
          case 'text':
            var style = {};
            if (elmnt.layout.grid.y!==0 && !this.FillPosition(card.element, elmnt.layout.grid.x, elmnt.layout.grid.y-1, elmnt.layout.grid.w, 1))
              style = {borderTop: '3px solid #d9d9d9'};
            if (elmnt.layout.grid.x+elmnt.layout.grid.w!==card.layout.grid.w && !this.FillPosition(card.element, elmnt.layout.grid.x+elmnt.layout.grid.w, elmnt.layout.grid.y, 1, elmnt.layout.grid.h))
              style = {...style, borderRight: '3px solid #d9d9d9'};
            if (elmnt.layout.grid.y+elmnt.layout.grid.h!==card.layout.grid.h && !this.FillPosition(card.element, elmnt.layout.grid.x, elmnt.layout.grid.y+elmnt.layout.grid.h, elmnt.layout.grid.w, 1))
              style = {...style, borderBottom: '3px solid #d9d9d9'};
            if (elmnt.layout.grid.x!==0 && !this.FillPosition(card.element, elmnt.layout.grid.x-1, elmnt.layout.grid.y, 1, elmnt.layout.grid.h))
              style = {...style, borderLeft: '3px solid #d9d9d9'};
            inside = (
              <div className={css(styles.gridElementAlign)} style={{...style, width: '100%'}}>
                <div className={css(styles.gridElementMiddle)}>
                  {elmnt.component.map((item, index) =>
                    <div className={css(styles.textElementListGrid)} key={'text_element__'+index}>
                      <span className={css(styles.numberTextElement)}>{item.array.length}</span>
                      <span className={css(styles.stringTextElement)}>{item.text}</span>
                    </div>
                  )}
                </div>
              </div>
            );
            break;
        }
        return (
          <div key={elmnt.layout.key}>
            {this.state.edit?
              <div className={css(styles.headerElement)}>
                <div style={{cursor: 'pointer', float: 'left'}}
                  onMouseDown={() => {
                    if (elmnt.kind === 'text') {
                      var copy = {
                        array: [],
                        card: index,
                        elmnt: ndx,
                        title: '',
                        kind: "text",
                        filters: {},
                        time: { type: "day", last: 7, next: 0 },
                        cottar
                      };
                      copy.cottar.key = elmnt.key;
                      cottar.advancedFilter(copy, (array) =>
                        this.setState({
                          cardSelected: {modal: 'text'},
                          selectedElement: {...copy, array},
                          textElements: elmnt.component
                        },
                        () => this.setState((prevState) => { return {showAddElement: {...prevState.showAddElement, visual: true}} }))
                      )
                    }
                    else
                      this.setState({
                        cardSelected: {modal: elmnt.kind === 'chart' ? 'visual' : 'image'},
                        selectedElement: {...elmnt, card: index, elmnt: ndx, filters: elmnt.filters?elmnt.filters:{}, cottar: {...cottar, key: elmnt.key, next: (elmnt.key==='birthday')}},
                        textElements: []
                      },
                      () => this.setState((prevState)=> {return {showAddElement: {...prevState.showAddElement, visual: true}} }))
                  }}
                >
                  <Icon icon="edit" size="14px" color="grey" />
                </div>
                <div style={{float: 'right', cursor: 'pointer'}} onMouseDown={() => {this.state.card[index].element.splice(ndx, 1); this.setState({})}}>
                  <Icon icon="x" size="extra-small" color="grey" />
                </div>
              </div>
            :null}
            {inside}
          </div>
        );
      })
    );
  }

  chartArrayConvert(array, time, key, label) {
    if (array.length === 0)
      return [];
    var getKey, newArray = [];
    switch (time.type) {
      case 'day':
        getKey = (date) => date.substring(8,10)+'/'+date.substring(5,7);
        for (var i=(time.last*-1); i<=time.next; i++) {
          var today = new Date();
          today.setDate(today.getDate() + i);
          newArray.push({name: ('0'+today.getDate()).slice(-2)+'/'+('0'+(today.getMonth()+1)).slice(-2), [label]: 0});
        }
        break;
      case 'week':
        getKey = (date) => {
          var dt = new Date(date);
          var weekStart = new Date(dt.setDate(dt.getDate() - dt.getDay()));
          return ('0'+weekStart.getDate()).slice(-2) + '/' + ('0'+(weekStart.getMonth()+1)).slice(-2);
        };
        for (var i=(time.last*-1); i<=time.next; i++) {
          var today = new Date();
          today.setDate(today.getDate() - today.getDay() + i*7);
          newArray.push({name: ('0'+today.getDate()).slice(-2)+'/'+('0'+(today.getMonth()+1)).slice(-2), [label]: 0});
        }
        break;
      case 'month':
        if (key === 'birthday') {
          getKey = (date) => {
            var today = new Date(date);
            var month = today.toLocaleString('pt-BR', { month: "short" });
            return month;
          };
          for (var i=(time.last*-1); i<=time.next; i++) {
            var today = new Date();
            today.setMonth(today.getMonth() + i);
            var month = today.toLocaleString('pt-BR', { month: "short" });
            newArray.push({name: month, [label]: 0});
          }
        }
        else {
          getKey = (date) => date.substring(5,7)+'/'+date.substring(2,4);
          for (var i=(time.last*-1); i<=time.next; i++) {
            var today = new Date();
            today.setMonth(today.getMonth() + i);
            newArray.push({name: ('0'+(today.getMonth()+1)).slice(-2)+'/'+today.getFullYear().toString().substring(2,4), [label]: 0});
          }
        }
        break;
    }
    array.map((item) => {
      var index = newArray.findIndex((itm) => itm.name === getKey(item[key]));
      item[key] && index>=0?newArray[index][label]++:null
    });
    return newArray;
    // .sort((a, b) => {
    //   var sa = sortFilter(a.name), sb = sortFilter(b.name);
    //   return (sa > sb) ? 1 : (sa < sb) ? -1 : 0;
    // })
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

  render() {
    return (
      <div ref="container" className={css(styles.container)} style={{paddingTop: this.state.edit?"20px":"0px"}}>
        <div onClick={() => this.setState({showAdd: true})} style={{right: this.state.edit?"80px":"20px"}} className={css(styles.circle, styles.plus)}><Icon icon="plus" size = "small"/></div>
        <Modal
					isOpen={this.state.showAdd}
					header="Novo Card"
					adjustStyle={styles.addModal}
				>
          <div>
            <div>
              {this.state.cardTypes.map((option, index) =>
                <div key={'card'+index} className={css(styles.cardOption)}
                  onClick={() => this.setState({showAdd: false}, () => {
                    // this.addCard();
                    const { getSaved } = this.props;
                    getSaved({kind: option.value}, (res) => {
                      if (res.length === 0) {
                        switch (option.value) {
                          case 'reminder':
                            this.setState((prevState) => {
                              return {
                                cardSelected: option,
                                model: '',
                                selectedElement: {card: -1, elmnt: -1},
                                showAddElement: {...prevState.showAddElement, text: true}
                              }
                            });
                            break;
                          case 'image':
                            this.setState((prevState) => {
                              return {
                                cardSelected: option,
                                src: '',
                                selectedElement: {card: -1, elmnt: -1},
                                showAddElement: {...prevState.showAddElement, image: true}
                              }
                            });
                            break;
                          default:
                            var cottar = this.getKeys(option.value),
                            copy = {
                              card: -1,
                              elmnt: -1,
                              array: [],
                              title: '',
                              kind: "chart",
                              filters: {},
                              time: { type: "day", last: 7, next: 0 },
                              cottar
                            };
                            cottar.advancedFilter(copy, (array) =>
                              this.setState({
                                selectedElement: {...copy, array},
                                textElements: []
                              }, () => this.setState((prevState) => { return {cardSelected: option, showAddElement: {...prevState.showAddElement, visual: true}} }))
                            )
                            break;
                        }
                      }
                      else
                        this.setState({savedCard: {label: option.label, type: option.value, array: res}});
                    });
                  })}
                >
                  <Icon icon={option.icon} size="20px" color="grey" />
                  <div style={{lineHeight: '24px'}}>{option.label}</div>
                </div>
              )}
            </div>
            <div className={css(styles.footer)}>
              <Button
                text="Cancelar"
                color="secondary"
                onClick={() => this.setState({showAdd: false})}
                right
              />
            </div>
          </div>
				</Modal>
        <Modal
          isOpen={this.state.savedCard.array.length>0}
          header={"Modelos de Card de "+this.state.savedCard.label}
          adjustStyle={styles.savedCardsModal}
        >
          <div className={css(styles.gridSavedCards)}>
            {this.state.savedCard.array.length>0 &&
              <SavedCardsSelect
                type={this.state.savedCard.type}
                card={this.state.savedCard.array}
                deleteSaved={this.props.deleteSaved}
                onSelect={(card) => {
                  for (var i=0; i<this.state.card.length; i++)
                    if (this.state.card.findIndex((item) => item.layout.key === i.toString()) === -1)
                      break;
                  var pos = this.getPositionEmpty(this.state.card, this.state.columns, 3, 2);
                  this.state.card.push({
                    kind: card.kind,
                    layout: {
                      key: i.toString(),
                      grid: { x: pos[0], y: pos[1], w: card.size.w, h: card.size.h }
                    },
                    element: card.element,
                    color: card.color
                  });
                  if (pos[0] + card.size.w > this.state.columns)
                    this.state.columns = pos[0] + card.size.w;
                  if (pos[1] + card.size.h > this.state.rows)
                    this.state.rows = pos[1] + card.size.h;
                  this.setState({savedCard: {label: '', type: '', array: []}});
                }}
                newCard={() => {
                  var cardSelected = this.state.cardTypes.filter((item) => item.value === this.state.savedCard.type)[0];
                  switch (this.state.savedCard.type) {
                    case 'reminder':
                      this.setState((prevState) => {
                        return {
                          model: '',
                          selectedElement: {card: -1, elmnt: -1},
                          showAddElement: {...prevState.showAddElement, text: true},
                          savedCard: {label: '', type: '', array: []},
                          cardSelected
                        }
                      });
                      break;
                    case 'image':
                      this.setState((prevState) => {
                        return {
                          src: '',
                          selectedElement: {card: -1, elmnt: -1},
                          showAddElement: {...prevState.showAddElement, image: true},
                          savedCard: {label: '', type: '', array: []},
                          cardSelected
                        }
                      });
                      break;
                    default:
                      var cottar = this.getKeys(this.state.savedCard.type),
                      copy = {
                        card: -1,
                        elmnt: -1,
                        array: [],
                        title: '',
                        kind: "chart",
                        filters: {},
                        time: { type: "day", last: 7, next: 0 },
                        cottar
                      };
                      cottar.advancedFilter(copy, (array) =>
                        this.setState({
                          selectedElement: {...copy, array},
                          textElements: []
                        }, () => this.setState((prevState) => { return {showAddElement: {...prevState.showAddElement, visual: true}, savedCard: {label: '', type: '', array: []}, cardSelected} }))
                      )
                      break;
                  }
                }}
              />
            }
            <div className={css(styles.footer)}>
              <Button
                text="Cancelar"
                color="secondary"
                onClick={() => this.setState({savedCard: {label: '', type: '', array: []}})}
                right
              />
            </div>
          </div>
        </Modal>
        <div onClick={() => {
          if (this.state.edit) {
            const { updateGrid } = this.props;
            updateGrid(this.state.card);
          }
          this.setState((prevState) => { return {edit: !prevState.edit} })}
        } className={css(styles.circle, this.state.edit?styles.edit:styles.save)}>{this.state.edit?<Icon icon="save" size="20px" />:<Icon icon="edit" color = "white" size="20px" />}</div>
        <div ref="resizable" className={css(styles.resizable, this.state.edit?styles.squares:null)}>
          <ReactGridLayout
            isDraggable={this.state.edit}
            isResizable={false}
            rowHeight={85}
            compactType={null}
            margin={[10, 10]}
            cols={this.state.columns}
            width={this.state.columns*95+10}
            draggableHandle={'#header'}
            preventCollision={true}
            onLayoutChange={(layout) => {
              layout.map((card, index) => {
                this.state.card[index].layout.grid.x = card.x;
                this.state.card[index].layout.grid.y = card.y;
                this.state.card[index].layout.grid.w = card.w;
                this.state.card[index].layout.grid.h = card.h;
              });
              if (layout.length>0) {
                var columns = layout[0].x + layout[0].w;
                var rows = layout[0].y + layout[0].h;
                for (var i=1; i<layout.length; i++) {
                  if (layout[i].x + layout[i].w > columns)
                    columns = layout[i].x + layout[i].w;
                  if (layout[i].y + layout[i].h > rows)
                    rows = layout[i].y + layout[i].h;
                }
                if (this.refs.resizable) {
                  this.refs.resizable.style.width = ((columns+1)*95 + 10) + "px";
                  this.refs.resizable.style.height = ((rows+1)*95 + 10) + "px";
                }
                this.setState({columns: columns+1, rows: rows+1});
              }
            }}
            onDrag={(layouts, element, newElement) => this.resizeContainer(newElement)}
            layout={this.state.card.map((item) => { return {...item.layout.grid, i: item.layout.key} })}
          >
            {this.state.card.map((crd, index) => 
              <div key={crd.layout.key} className={css(styles.card)} style={{zIndex: crd.layout.grid.y + 3 + (this.state.rows - crd.layout.grid.x), backgroundColor: crd.color?crd.color:'#fff'}}>
                {this.state.edit?
                  <div id={"header"} className={css(styles.header)}>
                    <div style={{cursor: 'pointer'}}
                      onMouseDown={() => {
                        switch (crd.kind) {
                          case 'reminder':
                            this.setState((prevState) => {
                              return {
                                model: '',
                                cardSelected: {modal: 'text'},
                                selectedElement: {card: index, elmnt: -1},
                                showAddElement: {...prevState.showAddElement, text: true,}
                              }
                            });
                            break;
                          case 'image':
                            this.setState((prevState) => {
                              return {
                                src: '',
                                cardSelected: {modal: 'image'},
                                selectedElement: {card: index, elmnt: -1},
                                showAddElement: {...prevState.showAddElement, image: true}
                              }
                            });
                            break;
                          default:
                            var cottar = this.getKeys(crd.kind),
                            copy = {
                              array: [],
                              card: index,
                              title: '',
                              kind: "chart",
                              filters: {},
                              time: { type: "day", last: 7, next: 0 },
                              cottar
                            };
                            cottar.advancedFilter(copy, (array) =>
                              this.setState({
                                cardSelected: {modal: 'visual'},
                                selectedElement: {...copy, array},
                                textElements: []
                              }, () => this.setState((prevState) => { return {showAddElement: {...prevState.showAddElement, visual: true}} }))
                            )
                            break;
                        }
                      }}
                    >
                      <Icon icon="plus" size="10px" color="grey" />
                    </div>
                    <div className={css(styles.cardDescription)}>{this.state.cardTypes[this.state.cardTypes.findIndex((item) => item.value === crd.kind)].label}</div>
                    <div style={{cursor: 'pointer'}} data-tip data-for={'confirmSplice'+index} data-event='click'>
                      <Icon icon="gear" size="12px" color="grey" />
                    </div>
                    <ReactTooltip id={'confirmSplice'+index} place="right" effect="solid" className={css(styles.tooltip)} globalEventOff='click'>
                      <div className={css(styles.tooltipOption)}
                        onClick={() => {
                          const {save} = this.props, {kind, element, color} = crd;
                          save({
                            kind,
                            color,
                            size: {w: crd.layout.grid.w, h: crd.layout.grid.h},
                            element: element.map((item) => {
                              var copy = {...item};
                              if (copy.kind === 'text')
                                for (var i=0; i<copy.component.length; i++)
                                  delete copy.component[i].array;
                              else
                                delete copy.array;
                              return copy;
                            })
                          });
                        }}
                      >
                        <Icon icon="save" size="14px" color="grey" />
                        <div style={{lineHeight: '17px'}}>Salvar</div>
                      </div>
                      <div className={css(styles.tooltipOption)}
                        onClick={() => {
                          this.state.card[index].layout.grid.static ?
                            this.state.card[index].layout.grid.static = false
                          :
                            this.state.card[index].layout.grid.static = true;
                          this.setState({});
                        }}
                      >
                        <Icon icon={this.state.card[index].layout.grid.static?"upArrow":"downArrow"} size="14px" color="grey" />
                        <div style={{lineHeight: '17px'}}>{this.state.card[index].layout.grid.static?"Desafixar":"Fixar"}</div>
                      </div>
                      <div className={css(styles.tooltipOption)}>
                        <label className={css(styles.cardColor)} style={{backgroundColor: this.state.card[index].color}}
                          onMouseEnter={ () => this.refs['timePicker'+index].style.display = 'block' }
                          onMouseLeave={ () => this.refs['timePicker'+index].style.display = 'none' }
                        >
                          <div className={css(styles.colorPicker)} ref={'timePicker'+index}>
                            <div className={css(styles.arrowRight)}></div>
                            <GithubPicker width={'112px'} color={ this.state.card[index].color?this.state.card[index].color:'#ffffff' } triangle='hide' onChange={ (color) => { this.state.card[index].color = color.hex; this.setState({}); } } />
                          </div>
                        </label>
                        <div style={{lineHeight: '17px'}}>Cor</div>
                      </div>
                      <div className={css(styles.tooltipOption)}
                        onClick={() => {
                          this.state.card.splice(index, 1);
                          this.state.selectedElement.card = -1;
                          this.setState({})
                        }}
                      >
                        <Icon icon="delete" size="14px" color="grey" />
                        <div style={{lineHeight: '17px'}}>Excluir</div>
                      </div>
                    </ReactTooltip>
                  </div>
                :null}
                <div style={{padding: '10px'}}>
                  <ReactGridLayout
                    isDraggable={this.state.edit}
                    isResizable={this.state.edit}
                    compactType={crd.element.length>1?'vertical':'horizontal'}
                    rowHeight={(crd.layout.grid.h*95-30)/crd.layout.grid.h-5}
                    margin={[5, 5]}
                    cols={2*crd.layout.grid.w}
                    width={(crd.layout.grid.w*95-30)*2} //*crd.layout.grid.w*95-95
                    onLayoutChange={(layouts) => {
                      layouts.map((card) => {
                        var ndx = this.state.card[index].element.findIndex((item) => item.layout.key === card.i);
                        this.state.card[index].element[ndx].layout.grid.x = card.x;
                        this.state.card[index].element[ndx].layout.grid.y = card.y;
                        this.state.card[index].element[ndx].layout.grid.w = card.w;
                        this.state.card[index].element[ndx].layout.grid.h = card.h;
                      });
                      if (layouts.length>0) {
                        var columns = layouts[0].x + layouts[0].w;
                        var rows = layouts[0].y + layouts[0].h;
                        for (var i=1; i<layouts.length; i++) {
                          if (layouts[i].x + layouts[i].w > columns)
                            columns = layouts[i].x + layouts[i].w;
                          if (layouts[i].y + layouts[i].h > rows)
                            rows = layouts[i].y + layouts[i].h;
                        }
                        this.state.card[index].layout.grid.w = columns;
                        this.state.card[index].layout.grid.h = rows;
                        if (this.state.card[index].layout.grid.x + columns > this.state.columns)
                          this.state.columns = this.state.card[index].layout.grid.x + columns;
                        this.setState({});
                      }
                    }}
                    layout={crd.element.map((item) => { return {...item.layout.grid, i: item.layout.key} })}
                  >
                    {
                      crd.kind === 'reminder' ?
                        crd.element.map((elmnt, ndx) => (
                          <div key={elmnt.layout.key}>
                            {this.state.edit?
                              <div className={css(styles.headerElement)}>
                                <div style={{cursor: 'pointer', float: 'left'}}
                                  onMouseDown={() => {
                                    this.setState((prevState) => { return {selectedElement: {card: index, elmnt: ndx}, model: elmnt.model, showAddElement: {...prevState.showAddElement, text: true}} })
                                  }}
                                >
                                  <Icon icon="edit" size="14px" color="grey" />
                                </div>
                                <div style={{float: 'right', cursor: 'pointer'}} onMouseDown={() => {this.state.card[index].element.splice(ndx, 1); this.setState({})}}>
                                  <Icon icon="x" size="extra-small" color="grey" />
                                </div>
                              </div>
                            :null}
                            <div style={{height: '100%', overflow: 'auto'}} dangerouslySetInnerHTML={{__html: elmnt.model}} ></div>
                          </div>
                        ))
                      :crd.kind === 'image' ?
                        crd.element.map((elmnt, ndx) => (
                          <div key={elmnt.layout.key}>
                            {this.state.edit?
                              <div className={css(styles.headerElement)}>
                                <div style={{float: 'right', cursor: 'pointer'}} onMouseDown={() => {this.state.card[index].element.splice(ndx, 1); this.setState({})}}>
                                  <Icon icon="x" size="extra-small" color="grey" />
                                </div>
                              </div>
                            :null}
                            <div className={css(styles.gridElementAlign)}>
                              {/* <div className={css(styles.gridElementMiddle)}> */}
                                <img className={css(styles.imageContainer)} src={elmnt.src} />
                              {/* </div> */}
                            </div>
                          </div>
                        ))
                      :this.renderElements(crd, index)
                    }
                  </ReactGridLayout>
                </div>
              </div>
            )}
          </ReactGridLayout>
        </div>
        {this.renderModal()}
        
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    response: state.patientsSearch.suggestions,
    agenda: state.agenda.suggestions,
    clinic: state.auth.clinic
    // dashboard: state.auth.user.dashboard,
    // grid: state.resumeDashboard.currentGrid,
    // loaded: state.resumeDashboard.loaded,
  }
}

export default connect(mapStateToProps, { patientFilter, agendaFilter, getGrid, updateGrid, save, deleteSaved, getSaved } )(MenuActions);