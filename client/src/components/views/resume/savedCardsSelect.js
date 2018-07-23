import React, { Component } from 'react';
import PropTypes from 'prop-types';

import domtoimage from 'dom-to-image';
import ReactGridLayout from 'react-grid-layout';
import {ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import { css } from 'aphrodite/no-important';
import { styles } from './savedCardsSelectStyles';

import Icon from '../../common/Icon';
import Button from '../../common/Button';
import TableFilter from '../../lists/patients/TableFilter';
import Pagination from '../../common/Pagination';
import Modal from '../../modals/Modal';

const propTypes = {
  type: PropTypes.string.isRequired,
  card: PropTypes.array.isRequired,
  onSelect: PropTypes.func
}

class savedCardsSelect extends React.Component {

  constructor(props) {
    super(props);
    this.renderVisual = this.renderVisual.bind(this);
    var orderedBySize = this.props.card.sort((a, b) => (a.size.w * a.size.h < b.size.w * b.size.h) ? 1 : (a.size.h * a.size.w > b.size.h * b.size.w) ? -1 : 0);
    var layout = [], max = orderedBySize[0].size.w;
    orderedBySize.filter((item, index) => {
      var pos = this.getPositionEmpty(layout, max-item.size.w, item.size.w, item.size.h);
      if (item.size.w + pos.x > max)
        max = item.size.w + pos.x;
      layout.push({...item.size, x: pos.x, y: pos.y, i: layout.length.toString()});
      return true;
    });
    this.state = {
      renderElement: this.props.type === 'reminder' ? this.renderReminder : this.props.type === 'image' ? this.renderImage : this.renderVisual,
      card: orderedBySize,
      deleteModal: false,
      tooLarge: [],
      refresh: {},
      load: true,
      delete: {},
      last: {},
      total: 0,
      layout,
      max
    }
  }

  componentDidMount() {
    if (this.state.load) {
      var tooLarge = [], layout = [], max = this.state.card[0].size.w, htis = this;
      var card = this.state.card.filter((item, index) => {
        if (item.size.w > 8) {
          this.state.total += 1;
          var findDom = setInterval(() => {
            if (htis.refs['card_'+index]) {
              htis.domtopng(htis.refs['card_'+index], item, 'card_'+index);
              clearInterval(findDom);
            }
          }, 200);
          return false;
        }
        var pos = this.getPositionEmpty(layout, 8-item.size.w, item.size.w, item.size.h);
        if (item.size.w + pos.x > max)
          max = item.size.w + pos.x;
        layout.push({...item.size, x: pos.x, y: pos.y, i: layout.length.toString()});
        return true;
      });
      if (this.state.total > 0)
        this.state.refresh = {load: false, card, layout, max: 8};
      else
        this.setState({load: false, card, layout, max: 8});
    }
  }
  domtopng = async (dom, item, name) => {
    domtoimage.toPng(dom)
    .then((dataUrl) => {
      var htis = this;
      setTimeout(() => {
        var last = htis.state.last[name];
        htis.state.last[name] = dataUrl;
        if (dataUrl === last && dataUrl !== 'data:,') {
          htis.state.tooLarge.push({...item, url: dataUrl});
          if (htis.state.tooLarge.length === htis.state.total)
            htis.setState({...htis.state.refresh});
        }
        else
          htis.domtopng(dom, item, name);
      }, 500);
    })
    .catch((error) => console.error('Erro ao criar miniatura de modelo', error));
  }

  getPositionEmpty(grid, columns, w, h) {
    for (var x=0; x>=0; x++)
      for (var y=0; y<=columns; y++)
        if (this.FillPosition(grid, x, y, w, h))
          return {x, y};
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
      if (x>=grid[i].x && x<grid[i].x+grid[i].w &&
          y>=grid[i].y && y<grid[i].y+grid[i].h)
        return true;
    return false;
  }

  getKeys (cardType) {
    switch (cardType) {
      case 'patient':
        return {
          infos: { name: { type: 'String' } },
          label: 'Pacientes'
        }
      case 'agenda':
        return {
          infos: { patient: { type: 'String' } },
          label: 'Agendamentos'
        }
    }
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
  }

  renderReminder(crd, index) {
    return (
      crd.element.map((elmnt, ndx) => (
        <div key={elmnt.layout.key}>
          <div style={{height: '100%', overflow: 'auto'}} dangerouslySetInnerHTML={{__html: elmnt.model}} ></div>
        </div>
      ))
    )
  }
  renderImage(crd, index) {
    return (
      crd.element.map((elmnt, ndx) => (
        <div key={elmnt.layout.key}>
          <div className={css(styles.gridElementAlign)}>
            <img className={css(styles.imageContainer)} src={elmnt.src} />
          </div>
        </div>
      ))
    )
  }
  renderVisual(card, index) {
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
            {inside}
          </div>
        );
      })
    );
  }

  render() {
    return (
      <div className={css(styles.containerCard)}>
        <Modal
          isOpen={this.state.deleteModal}
          header={"Excluir modelo"}
          adjustStyle={styles.deleteModal}
        >
          <div style={{padding: '1rem'}}>
            <center>Deseja excluir esse modelo?</center>
            <div style={{marginTop: '1rem'}}>
              <Button
                text={"Confirmar"}
                color="green"
                onClick={() => this.props.deleteSaved(this.state.delete._id, () => {
                  this.state[this.state.delete.array].splice(this.state.delete.index, 1);
                  this.setState({deleteModal: false});
                })}
              />
              <Button
                text="Cancelar"
                color="secondary"
                onClick={() => this.setState({deleteModal: false})}
                right
              />
            </div>
          </div>
        </ Modal>
        {this.state.load &&
          <div className={css(styles.gridElementAlign, styles.loading)}><span>Carregando Modelos</span></div>
        }
        <div className={css(styles.card, styles.containerNew)}>
          <div className={css(styles.gridElementAlign, styles.hoverNew)} onClick={() => this.props.newCard()}><b>Novo Card</b></div>
        </div>
        {this.state.tooLarge.map((item, index) =>
          <div key={'img_'+index} className={css(styles.card)} style={{backgroundColor: item.color?item.color:'#fff', margin: '10px 10px 0px 10px'}}>
            <div className={css(styles.gridElementAlign, styles.hoverCard)}
              onClick={() => {
                var copy = {...item};
                delete copy.url;
                this.props.onSelect(copy)
              }}
            >
              <center><b>Selecionar<br/>Modelo</b></center>
            </div>
            <Button
              icon="delete"
              text="Excluir"
              color="white"
              iconColor="red"
              style={{position: 'absolute', zIndex: '2', bottom: '10px', right: '10px'}}
              onClick={() => this.setState({deleteModal: true, delete: {...item, index, array: 'tooLarge'}})}
            />
            <img className={css(styles.cardInside)} style={{width: '100%'}} src={item.url} />
          </div>
        )}
        <ReactGridLayout
          isDraggable={false}
          isResizable={false}
          rowHeight={85}
          compactType={null}
          margin={[10, 10]}
          cols={this.state.max}
          width={this.state.max*95+10}
          layout={this.state.layout}
        >
          {this.state.card.map((crd, index) => 
            <div key={index} className={css(styles.card)} style={{backgroundColor: crd.color?crd.color:'#fff'}}>
              <div className={css(styles.gridElementAlign, styles.hoverCard)} onClick={() => this.props.onSelect(crd)}><center><b>Selecionar<br/>Modelo</b></center></div>
              <Button
                icon="delete"
                text="Excluir"
                color="white"
                iconColor="red"
                style={{position: 'absolute', zIndex: '2', bottom: '10px', right: '10px'}}
                onClick={() => this.setState({deleteModal: true, delete: {...crd, index, array: 'card'}})}
              />
              <div className={css(styles.cardInside)} style={{padding: '10px'}} ref={'card_'+index} style={{backgroundColor: crd.color?crd.color:'#fff'}}>
                <ReactGridLayout
                  isDraggable={false}
                  isResizable={false}
                  compactType={crd.element.length>1?'vertical':'horizontal'}
                  rowHeight={(crd.size.h*95-30)/crd.size.h-5}
                  margin={[5, 5]}
                  cols={crd.size.w}
                  width={crd.size.w*95-30} //*crd.layout.grid.w*95-95
                  layout={crd.element.map((item) => { return {...item.layout.grid, i: item.layout.key} })}
                >
                  {this.state.renderElement(crd, index)}
                </ReactGridLayout>
              </div>
            </div>
          )}
        </ReactGridLayout>
      </div>
    )
  }
}

savedCardsSelect.propTypes = propTypes;

export default savedCardsSelect;