import React, { Component } from 'react';

import { css } from 'aphrodite/no-important';
import { styles } from './TableFilterStyles';

import InputSearch from '../../forms/InputSearch';
import Icon from '../../common/Icon';

import ReactTooltip from 'react-tooltip';

class TableFilter extends Component {
	constructor(props) {
        super(props);
        this.header = this.header.bind(this);
        this.body = this.body.bind(this);
        this.arrayScroll = this.arrayScroll.bind(this);
        this.state = {
            column: this.props.column,
            order: this.props.order,
            scroll: {},
            hasWarning: 'false',
            totalWarnings: 0
        }
    }

    componentWillMount(){
        for(let i = 0; i < this.props.array.length; i++){

            if(this.props.array[i].warning == 'true'){
                console.log('tem warning');
                this.setState({hasWarning: 'true'});
                this.setState({totalWarnings: this.state.totalWarnings + 1});
            }

        }
    }

    componentDidUpdate() {



        if (this.props.limit && this.props.limit !== 0) {
            var height = document.getElementById('head').clientHeight;
            var check = false;
            for (var info in this.props.infos) {
                if (this.props.infos[info].type == "CheckBox") {
                    check = true;
                    break;
                }
            }
            height += this.props.limit * (check ? 32 : 28);
            document.getElementById("conteiner").style.height = height + "px";
        }
    }

    header () {
        var head = [], inputs = [];
        for (var info in this.props.infos) {
            if (this.props.infos[info].type == "CheckBox") {
                head.push(<td style={{width: this.props.infos[info].width}} key={'check_head_'+info}></td>);
                var checkAll=<div className={css(styles.checkAll)} style={{backgroundColor: '#fff'}}>
                                 <Icon icon="check" size="small" color="white" />
                             </div>;
                if (this.props.infos[info].disabled) {
                    checkAll=<div className={css(styles.checkAll)} style={{backgroundColor: '#ccc'}}></div>;
                } else if (this.props.infos[info].selected.length>0) {
                    if (this.props.infos[info].unselected.length==0)
                        checkAll=<div className={css(styles.checkAll)} style={{backgroundColor: '#45AFE5'}}>
                                    <Icon icon="check" size="small" color="white" />
                                </div>;
                    else
                        checkAll=<div className={css(styles.checkAll)} style={{backgroundColor: '#fff'}}>
                                    <Icon icon="check" size="small" color="primary" />
                                </div>;
                }
                inputs.push(<td key={'check_all_'+info} style={{padding: '4px 4px 4px 8px'}}>
                                {this.props.infos[info].disabled ? 
                                    <div data-info={info}
                                        className={css(styles.check)}
                                    >
                                        {checkAll}
                                    </div>
                                :
                                    <div data-info={info}
                                        className={css(styles.check)}
                                        onClick={(e) => this.props.selectAll(e.currentTarget.dataset.info, 1)}
                                        onDoubleClick={(e) => this.props.selectAll(e.currentTarget.dataset.info, 2)}
                                    >
                                        {checkAll}
                                    </div>
                                }
                            </td>);
            }
            else if(this.props.infos[info].type == "Warning"){
                if(this.state.hasWarning == "true"){
                head.push(<td style={{width: '30px'}} > </td>);
                inputs.push(<td style={{padding: '4px 4px 4px 8px'}}>
                 <span style={ this.state.hasWarning ? {} : {display: 'none'} } className={css(styles.warning)}> {this.state.totalWarnings} </span>
                </td>);
                }
            }
            else if (this.props.infos[info].type == "String" || this.props.infos[info].type == "Array") {
                var order = null;
                if (this.props.infos[info].content !== undefined) {
                    inputs.push(<td key={'string_input_'+info} style={{padding: '4px', width: this.props.infos[info].width}}>
                                    <InputSearch data={info}
                                                 value={this.props.infos[info].content}
                                                 onChange={event => {
                                                     this.props.onWrite(event.currentTarget.dataset.tag, event.target.value);
                                                     this.setState({dotExpanded: false});
                                                 }}
                                    />
                                </td>);
                    if (info == this.state.column) {
                        if (this.state.order)
                            order = <Icon icon="downArrow" size="small" color="grey" right />
                        else
                            order = <Icon icon="upArrow" size="small" color="grey" right />
                        order = <div style={{float: 'right'}}>{order}</div>
                    }
                }
                else
                    inputs.push(<td key={'link_empty_'+info}></td>);
                if (this.props.infos[info].head)
                    head.push(<th key={'string_head_'+info}
                                  data-info={info}
                                  style={this.props.infos[info].width ? {padding: '4px 4px 0px 4px', width: this.props.infos[info].width} : {padding: '4px 4px 0px 4px'}}
                                  onClick={(e) => {
                                      this.props.infos[e.currentTarget.dataset.info].content !== undefined ? 
                                          this.props.orderTable(e.currentTarget.dataset.info, this.state.order = (e.currentTarget.dataset.info == this.state.column ? 
                                              !this.state.order
                                          :
                                              true)
                                          )
                                      :
                                          null
                                      ;
                                      this.state.column = e.currentTarget.dataset.info; 
                                  }}
                              >
                                  {this.props.infos[info].head}{order}
                              </th>);
                else
                    head.push(<td key={'link_head_'+info}
                                  style={this.props.infos[info].width ? {padding: '4px 4px 0px 4px', width: this.props.infos[info].width} : {padding: '4px 4px 0px 4px'}}
                              ></td>);
            }
        }
        return (
            <thead id="head">
                <tr key='head' style={{textAlign: 'left'}}>
                    {head}
                </tr>
                <tr key='inputs'>
                    {inputs}
                </tr>
            </thead>
        )
    }

    arrayScroll (id) {
        if (this.state.scroll[id].move && document.getElementById(id).scrollTop !== this.state.scroll[id].last) {
            this.state.scroll[id].move = false;
            const me = this,
            scrollStep = Math.PI / ( 250 / 2 ),
            scrollDown = document.getElementById(id).scrollTop > this.state.scroll[id].last,
            cosParameter = document.getElementById(id).offsetHeight / 2;
            var scrollCount = 0,
            scrollMargin = -1,
            focus = me.state.scroll[id].last + document.getElementById(id).offsetHeight * (scrollDown ? 1 : -1);
            // document.getElementById(id).style.overflowY = "-webkit-paged-y";
            var scrollInterval = setInterval( function () {
                if (Math.ceil(scrollMargin) !== document.getElementById(id).offsetHeight) {
                    scrollCount = scrollCount + 1;
                    scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
                    var posY = ( me.state.scroll[id].last + scrollMargin * (scrollDown ? 1 : -1) );
                    // document.getElementById(id).style.overflowY = "auto";
                    document.getElementById(id).scrollTo(0,  posY);
                    // document.getElementById(id).style.overflowY = "-webkit-paged-y";
            
                }
                else {
                    document.getElementById(id).scrollTo(0,  focus);
                    me.state.scroll[id].last = focus;
                    clearInterval(scrollInterval);
                    me.state.scroll[id].move = true;
                    // document.getElementById(id).style.overflowY = "auto";
                }
            }, 2 );
        }
    }

    body (element, index) {
        var content = [];
        
        for (var info in this.props.infos) {
          
            if (this.props.infos[info].type == "Array") {
                var id = index+'_'+info;
                this.state.scroll[id] = {};
                this.state.scroll[id].move = true;
                this.state.scroll[id].last = 0;
                var filter = this.props.infos[info].content;
                if (filter!=="") {
                    var me = this;
                    element[info].sort(function(a, b) {
                        return ((me.props.infos[info].show ? a[me.props.infos[info].show] : a).includes(filter) ? -1 : (b.value.includes(filter) ? 1 : 0));
                    });
                }
                content.push(<td  key={id}>
                                <div id={id} onScroll={(e) => this.arrayScroll(e.currentTarget.id)} style={{overflowY: 'auto', height: '31px'}}>
                                    {element[info].length > 0 ?
                                        element[info].map((item, idx) => {
                                            var match = (this.props.infos[info].show ? item[this.props.infos[info].show] : item).toString().split(new RegExp("("+filter.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&')+")", 'gi'));
                                            for (var k=1; k < match.length; k+=2)
                                                match[k] = <b key={index + '_array_' + info + '_b_' + k}>{match[k]}</b>;
                                            return <div key={'array_'+index+'_'+idx} style={{padding: '6px'}}>{match}
                                                       {this.props.infos[info].obs ?
                                                           <div style={{float: 'right', color: '#999', fontSize: '10px'}}>{item[this.props.infos[info].obs]}</div>
                                                       : null}
                                                   </div>;
                                        })
                                    : null}
                                </div>
                            </td>);
            } else if (this.props.infos[info].type == "CheckBox") {
                var item = {}, findIndexOf;
                if (this.props.infos[info].parameters) {
                    var lgth = this.props.infos[info].parameters.length;
                    if (lgth == 1) {
                        findIndexOf = (array, item) => { return array.indexOf(item); };
                        item = element[this.props.infos[info].parameters[0]].toString();
                    } else {
                        findIndexOf = (array, object, inf) => { return array.findIndex((e) => {
                            for (var k=0; k<lgth; k++)
                                if (e[this.props.infos[inf].parameters[k]] !== object[this.props.infos[inf].parameters[k]])
                                    return false;
                            return true;
                        })};
                        for (var k=0; k<lgth; k++)
                            item[this.props.infos[info].parameters[k]] = element[this.props.infos[info].parameters[k]];
                    }
                }
                else {
                    findIndexOf = (array, object) => { return array.findIndex((e) => { return e === object }); };
                    item = element;
                }
                content.push(<td key={index+'_'+info} style={{padding: '4px 4px 4px 8px'}}>
                                <div className={css(styles.check)}>
                                    <div data-info={info}
                                         onClick={ (e) => {
                                            var ndx = findIndexOf(this.props.infos[e.currentTarget.dataset.info].content, item, e.currentTarget.dataset.info);
                                            if (ndx !== -1) {
                                                this.props.infos[e.currentTarget.dataset.info].content.splice(ndx, 1);
                                                this.props.infos[e.currentTarget.dataset.info].selected.splice(findIndexOf(this.props.infos[e.currentTarget.dataset.info].selected, item, e.currentTarget.dataset.info), 1);
                                                this.props.infos[e.currentTarget.dataset.info].unselected.push(item);
                                            } else {
                                                this.props.infos[e.currentTarget.dataset.info].content.push(item);
                                                this.props.infos[e.currentTarget.dataset.info].unselected.splice(findIndexOf(this.props.infos[e.currentTarget.dataset.info].unselected, item, e.currentTarget.dataset.info), 1);
                                                this.props.infos[e.currentTarget.dataset.info].selected.push(item);
                                            }
                                            this.setState({});
                                         }}>
                                         {findIndexOf(this.props.infos[info].content, item, info) === -1 ?
                                            <Icon icon="check" size="small" color="white" />
                                         :
                                            <Icon icon="check" size="small" color="primary" />
                                         } 
                                    </div>
                                </div>
                            </td>);
            }else if(this.props.infos[info].type == "Warning"){
                    

                   
                        if(this.state.hasWarning == 'true'){
                            content.push(
                                <td style={{width: '30px', paddingLeft: '10px'}} >
                                        
                                    
                                { element.warning == 'true' ? <Icon icon='atention' color='red' size='small' /> : "" }
                                    

                                </td>
                            );
                        }
                   
                    
           
            }else if (this.props.infos[info].type == "String") {
                var inside = null;
                if (this.props.infos[info].placeholder) {
                    if (typeof this.props.infos[info].placeholder === "string")
                        inside = <div style={{textAlign: 'center'}}>{this.props.infos[info].placeholder}</div>
                    else if (typeof this.props.infos[info].placeholder === "object") {
                        for (var i=0; i<this.props.infos[info].placeholder.props.length; i++) {
                            if (element[this.props.infos[info].placeholder.key] === this.props.infos[info].placeholder.props[i].value) {
                                inside = <div style={{textAlign: 'center'}}>{this.props.infos[info].placeholder.props[i].text}</div>;
                                break;
                            }
                        }
                    }
                } else if (element[info]) {

                    

                    if(element.registry_type == 'in'){
                        element.registry_type = 'Entrada'
                    }else if(element.registry_type == 'out'){
                        element.registry_type = 'Saída'
                    }
                   
                    inside = element[info].toString().split(new RegExp("("+this.props.infos[info].content.toString().replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&')+")", 'gi'));
                    
                    for (var k=1; k < inside.length; k+=2)
                       
                        inside[k] = <b key={index + '_string_' + info + '_b_' + k}>{inside[k]}</b>;
                }
                var lineInfo;
                if (this.props.infos[info].link) {
                    var parameters = {};
                    
                    if (this.props.infos[info].link.parameters)
                    
                        for (var i=0; i<this.props.infos[info].link.parameters.length; i++){
                            parameters[this.props.infos[info].link.parameters[i]] = (element[this.props.infos[info].link.parameters[i]]);
                           // console.log(this.props.infos[info].link.parameters[i]);
                        }
                    else
                        parameters = element;
                    lineInfo=<a className={css(styles.link)}
                                data-info={info}
                                data-item={JSON.stringify(parameters)}
                                style={this.props.infos[info].style?this.props.infos[info].style:null}
                                onClick={e => this.props.infos[e.currentTarget.dataset.info].link.function(JSON.parse(e.currentTarget.dataset.item))}
                             >
                                 {inside}
                             </a>;
                } else
               
                    lineInfo=<a
                                style={this.props.infos[info].style?this.props.infos[info].style:null}
                             >
                                 {inside}
                            </a>;
                let cor;
                if(element.registry_type == "Entrada" && (info == 'registry_type') ){
                    content.push(<td key={index+'_'+info} className={css(styles.defaultText)} style={this.props.infos[info].margin ? {paddingLeft: this.props.infos[info].margin, width: this.props.infos[info].width}:{ padding: '0px', width: this.props.infos[info].width}}>
                    <div style={{height: '27px', width: '4px', backgroundColor: '#12B23B', float: 'left', marginRight: '5px'}}> </div>
                    {lineInfo}
                    </td>
                    );
                } else if(element.registry_type == "Saída" && (info == 'registry_type' ) ){
                    content.push(<td key={index+'_'+info} className={css(styles.defaultText)} style={this.props.infos[info].margin ? {paddingLeft: this.props.infos[info].margin, width: this.props.infos[info].width}:{ padding: '0px', width: this.props.infos[info].width}}>
                    <div style={{height: '27px', width: '4px', backgroundColor: '#CC4C29', float: 'left', marginRight: '5px'}}> </div>
                    {lineInfo}
                    </td>
                    );
                } else {
                    content.push(<td key={index+'_'+info} className={css(styles.defaultText)} style={this.props.infos[info].margin ? {paddingLeft: this.props.infos[info].margin, width: this.props.infos[info].width}:{padding: '4px', width: this.props.infos[info].width}}>
                                {lineInfo}
                            </td>
                    );
                }
                 

            }
        }
        return (
            
            <tr className={  css(styles.border)  }  key={index}>
                {content}
                
            </tr>
        )
    }
    
    render() {
        return (
        <div>
			<div id="conteiner" style={{minHeight: 'fit-content'}}>
                
                <table className={css(styles.tableFilter)} style={{width: '100%'}}>{this.header()} </table>
            
                <div className={this.props.type == "materials" ? css(styles.listMaterials) : css(styles.list) } >
                <table className={css(styles.table)} style={{width: this.props.width, }}>
                    
                    <tbody style={{"overflowY": "scroll"}}>
                    {this.props.array.map((element, index) => {
                        return (this.body(element, index));
                    })}
                    </tbody>
                   

                </table>
                </div>
            </div>
        </div>
		);
	}
}

export default TableFilter