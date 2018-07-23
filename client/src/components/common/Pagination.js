import React, { Component } from 'react';

import { css } from 'aphrodite/no-important';
import { styles } from './PaginationStyles';

import Icon from './Icon';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.containsNode = this.containsNode.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.state = {
            dotExpanded: false,
            draggable_mrg: 0,
            settings : this.props.size === "small"?
            {
                margin: '28',
                width: '200',
                containerSize: 'containerSmall',
                scrollSize: 'scrollSmall',
                circleSize: 31,
                pageQtd: 7
            } : {
                margin: '36',
                width: '400',
                containerSize: 'containerNormal',
                scrollSize: 'scrollNormal',
                circleSize: 40,
                pageQtd: 9
            },
        }
    }
  
    componentWillUpdate() {
        if (this.refs[this.props.page])
            this.refs[this.props.page].removeAttribute("style");
    }

    componentDidUpdate () {
        if (this.refs[this.props.page]) {
            this.refs[this.props.page].style.border = "2px solid #45afe5";
            this.refs[this.props.page].style.fontWeight = "bold";
        }
    }

    componentWillMount() {
        if (this.refs[this.props.page])
            this.refs[this.props.page].removeAttribute("style");
    }
    componentDidMount () {
        if (this.refs[this.props.page]) {
            this.refs[this.props.page].style.border = "2px solid #45afe5";
            this.refs[this.props.page].style.fontWeight = "bold";
        }
    }

    dotScroll(id_ctn, slc) {
        const inside = [], style = {};
        if (slc=="button") {
            if (this.refs[id_ctn])
                this.refs[id_ctn].removeAttribute("style");
            inside.push(<div key={'button_'+id_ctn} onClick={(e) =>{this.state.dotExpanded = false; this.props.page!=e.target.innerHTML ? this.props.changePage(e.target.innerHTML) : null}}>{id_ctn}</div>);
        }
        else if (slc === false) {
            if (this.refs[id_ctn])
                this.refs[id_ctn].removeAttribute("style");
            inside.push(<div id="dot" key={'dot_'+id_ctn} data-idctn={id_ctn} onClick={(e) => {this.setState({dotExpanded: e.currentTarget.dataset.idctn});
                                                                  document.addEventListener('click', this.handleOutsideClick, false)}}>...</div>);
        } else {
            if (this.refs[id_ctn]) {
                this.refs[id_ctn].style.textAlign = "left";
                this.refs[id_ctn].style.cursor = "default";
                if (slc[1]-slc[0]+1<8)
                    this.refs[id_ctn].style.width = ((slc[1]-slc[0]+1)*50)+"px";
                else
                    this.refs[id_ctn].style.width = this.state.settings.width+"px";
            }
            inside.push(<div key={'scroll_'+id_ctn} className={css(styles.pageCircleScroll, styles[this.state.settings.scrollSize])}
                                data-slc={slc}
                                data-idctn={id_ctn}
                                ref="draggable_page" draggable
                                onDrag={(e) => this.dragPage(e.clientX, e.currentTarget.dataset.idctn, e.currentTarget.dataset.slc)}
                                onDragStart={(e) => {this.setState({draggable_mrg: this.refs.draggable_page.style.marginLeft.slice(0,4) == "calc" ?
                                                                    (Math.round(this.refs[e.currentTarget.dataset.idctn].style.width.slice(0,-2)) - e.clientX) :
                                                                    Math.round(this.refs.draggable_page.style.marginLeft.slice(0,-2)) - e.clientX});
                                                    e.dataTransfer.setDragImage(new Image(), 0, 0)}}
                                onDragEnd={(e) => {this.setState({dotExpanded: false});
                                                   this.props.changePage(e.target.innerHTML)}}
                                style={id_ctn == 2 ? {marginLeft: '-1px'}:{marginLeft: 'calc(100% - '+this.state.settings.margin+'px)'}}>
                                {id_ctn}
                        </div>);
        }
        return (<div ref={id_ctn} key={'conteiner_'+id_ctn} onDragOver={(e) => e.preventDefault()} className={css(styles.pageCircleContainer, styles.dot, styles[this.state.settings.containerSize])}>{inside}</div>);
    }

    dragPage (pos_x, idctn, slc) {
        slc=slc.split(',');
        if (pos_x !=0 ) {
            var pos = this.state.draggable_mrg + pos_x, max=Math.round(this.refs[idctn].style.width.slice(0,-2)) - this.state.settings.circleSize;
            if (pos<0) {
                this.refs.draggable_page.style.marginLeft = "-1px";
                this.refs.draggable_page.innerHTML = slc[0];
            } else if (pos<max) {
                this.refs.draggable_page.style.marginLeft = (pos -1)+"px";
                this.refs.draggable_page.innerHTML = parseInt(slc[0])+Math.round((slc[1] - slc[0])*pos/max);
            } else {
                this.refs.draggable_page.style.marginLeft = (max)+"px";
                this.refs.draggable_page.innerHTML = slc[1];
            }
        }
    }

    page (current) {
        return (<div key={current} ref={current}
                    className={css(styles.pageCircleContainer, styles[this.state.settings.containerSize])}
                    onClick={(e) => {
                        if (this.props.page!=e.target.innerHTML) {
                            this.props.changePage(e.target.innerHTML);
                            this.state.dotExpanded = false
                        } else
                            this.setState({dotExpanded : false});}}
                >
                    {current}
                </div>);
    }

    containsNode(node) {
        for (var keys in this.refs) {
            if (this.refs[keys] == node)
                return true;
        }
        return false;
    }

    handleOutsideClick(e) {
        if (!this.refs.node || this.refs.node.contains(e.target.parentNode) || (e.target.id === "dot") ) //this.refs.node.contains(e.target) && 
            return;
        if (this.state.dotExpanded !== false)
            this.setState({dotExpanded: false});
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    render() {
        var begin = [], end= [];
        var last = Math.ceil(this.props.length/this.props.limit);
        var center=this.props.page;
        var ceil = Math.ceil(this.state.settings.pageQtd/2), floor = Math.floor(this.state.settings.pageQtd/2)
        if (last>this.state.settings.pageQtd) {
            begin.push(this.page(1));
            if (this.props.page>ceil)
                begin.push(this.dotScroll(2, this.state.dotExpanded == 2 ? [2, this.props.page<last-floor ? this.props.page - floor+1:last-this.state.settings.pageQtd+2] : false));
            else {
                center=ceil;
                begin.push(this.dotScroll(2, "button"));
            }
            if (this.props.page<last-floor)
                end.push(this.dotScroll(last-1, this.state.dotExpanded == last-1 ? [center + floor-1, last-1] : false));
            else {
                center=last-floor;
                end.push(this.dotScroll(last-1, "button"));
            }
            end.push(this.page(last));
            for (var i=center-floor+2; i<center+floor-1; i++)
                begin.push(this.page(i));
        }
        else
            for (var i=1; i<=last; i++)
                begin.push(this.page(i));
        const begin_page = (this.props.page-1)*this.props.limit;
        return (
            <div>
                <center>
                    <div style={{display: 'table',textAlign:'center'}} ref="node">
                        { last != 1 ?
                            <div className={css(styles.pageCircleContainer, styles[this.state.settings.containerSize])}>
                                <div className={css(styles.pageCircle)} onClick={() => {this.state.dotExpanded = false; this.props.page!=1 ? this.props.changePage(this.props.page-1) : null;}}>
                                    <Icon classAdjust="arrowLeft" icon="leftArrow" size="small" color="grey" />
                                </div>
                            </div>
                        : null}
                        {begin}
                        {end}
                        { last != 1 ?
                            <div className={css(styles.pageCircleContainer, styles[this.state.settings.containerSize])}>
                                <div className={css(styles.pageCircle)} onClick={() => {this.state.dotExpanded = false; this.props.page!=Math.ceil(this.props.length/this.props.limit) ? this.props.changePage(this.props.page+1) : null;}}>
                                    <Icon classAdjust="arrowRight" icon="rightArrow" size="small" color="grey" />
                                </div>
                            </div>
                        : null}
                    </div>
                    <div style={{width: '-moz-fit-content'}} className={css(styles.pageInfos)}>{begin_page+1} - {begin_page+this.props.limit>this.props.length?this.props.length:begin_page+this.props.limit} / {this.props.length}</div>
                </center>
            </div>
        );
    }
}

export default Pagination;