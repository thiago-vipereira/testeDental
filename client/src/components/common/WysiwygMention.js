import React, { Component } from 'react';
import { css } from 'aphrodite/no-important';

import { styles } from './WysiwygMentionStyles';

import $ from 'jquery';
import jQuery from 'jquery';
import FroalaEditor from 'react-froala-wysiwyg';
import './WysiwygMention.css';
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

window.$ = $;
window.jQuery = jQuery;
window.jquery = jQuery;
require('froala-editor/js/froala_editor.pkgd.min.js');
require('froala-editor/css/froala_editor.pkgd.min.css');
require('font-awesome/css/font-awesome.css');

class WysiwygMention extends Component {
  constructor (props) {
    super(props);
    this.fillSelection = this.fillSelection.bind(this);
    this.firstSelected = this.firstSelected.bind(this);
    this.secondSelected = this.secondSelected.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.state = {
      model: this.props.model,
      position: { top: 0, left: 0 },
      display: false,
      filter: '',
      first: '',
      data: this.props.menu,
      dataset: this.props.menu,
      start: 0,
      middle: 0,
      selected: 0,
      config: {
        placeholderText: this.props.type,
        charCounterCount: true,
        height: this.props.height,
        heightMax: this.props.maxHeight,
        fontSize: ['8', '10', '12', '14', '16', '18', '24', '36', '60'],
        imageUploadURL: this.props.url,
        imageUploadParams: {
          kind: this.props.type
        },
        imageManagerLoadURL: this.props.url,
        imageManagerDeleteURL: this.props.url,
        imageManagerDeleteMethod: "DELETE",
        events : {
          'froalaEditor.keydown' : (e, editor, inputEvent) => {
            var s = window.getSelection();
            if (this.state.display) {
              var up = inputEvent.keyCode === 38;
              if (up || inputEvent.keyCode === 40) {
                inputEvent.preventDefault();
                if (up ? (this.state.selected>0) : (this.state.selected < this.state.data.length - 1))
                  this.setState((prevState) => {
                    return { selected: prevState.selected + (up?-1:+1) };
                  });
                var position = this.state.selected * 28;
                if (this.refs.menu.scrollTop > position)
                  this.refs.menu.scrollTo(0, position);
                position = this.state.selected * 28;
                if (this.refs.menu.scrollTop + 255 < position)
                  this.refs.menu.scrollTo(0, position - 255);
              }
              else if (inputEvent.keyCode === 13) {
                var e = jQuery.Event("keydown");
                e.which = 8;
                $(editor.$el[0]).trigger(e);
                this.fillSelection(this.state.selected);
                this.state.first === '' ?
                  this.firstSelected(this.state.data[this.state.selected])
                :
                  this.secondSelected(this.state.data[this.state.selected]);
              }
            }
            else {
              if (inputEvent.keyCode === 8 && s.baseOffset === 0 && s.baseNode.parentElement) {
                var childNodes = s.baseNode.parentElement.childNodes, nodes = [];
                for (var i=0; childNodes[i] !== s.baseNode; i++);
                if (i>0 && childNodes[i-1] && childNodes[i-1].nodeName === "SPAN" && childNodes[i-1].classList.value === "mention" && childNodes[i-1].contentEditable === "false")
                  s.baseNode.parentElement.removeChild(childNodes[i-1]);
              }
              else if (inputEvent.keyCode === 46 && s.baseOffset === s.baseNode.textContent.length) {
                var childNodes = s.baseNode.parentElement.childNodes, nodes = [];
                for (var i=0; childNodes[i] !== s.baseNode; i++);
                if (childNodes[i+1] && childNodes[i+1].nodeName === "SPAN" && childNodes[i+1].classList.value === "mention" && childNodes[i+1].contentEditable === "false")
                  s.baseNode.parentElement.removeChild(childNodes[i+1]);
              }
              else if (inputEvent.key === '@' && s.baseNode.textContent && (s.baseNode.textContent.charCodeAt(s.baseOffset-1)===32 || s.baseNode.textContent.charCodeAt(s.baseOffset-1)===160)) {
                var oRange = s.getRangeAt(0);
                var oRect = oRange.getBoundingClientRect();
                document.addEventListener('click', this.handleOutsideClick, false);
                this.setState({
                  position: { left: oRect.x, top: oRect.y + this.getFontSize(document.queryCommandValue('FontSize')) },
                  start: s.baseOffset+1,
                  display: true,
                  data: this.props.menu,
                  dataset: this.props.menu,
                  middle: s.baseOffset+1,
                  filter: ''
                });
              }
            }
          },
          'froalaEditor.keyup' : (e, editor, inputEvent) => {
            var s = window.getSelection();
            if (this.state.display) {
              var first = this.state.dataset.filter((item) => item.name === this.state.filter || (typeof item === "object" && item.name.toLowerCase() === this.state.filter)),
              second = this.state.dataset.filter((item) => item === s.baseNode.textContent.substring(this.state.middle, s.baseOffset) || (typeof item === "string" && item.toLowerCase() === s.baseNode.textContent.substring(this.state.middle, s.baseOffset)));
              if (inputEvent.key === '.' && first.length === 1)
                this.firstSelected(first[0]);
              else if (second.length === 1)
                this.secondSelected(second[0]);
              else {
                var state = {};
                state.filter = s.baseNode.textContent.substring(this.state.middle, s.baseOffset);
                state.data = this.state.dataset.filter((item) => {
                  if (typeof item === "object")
                    item = item.name;
                  return item.includes(state.filter) || item.toLowerCase().includes(state.filter)
                });
                if (state.data.length === 0) {
                  state.data = this.props.menu;
                  state.filter = '';
                  state.display = false;
                }
                this.setState({...state});
              }
            }
          }
        }
      }
    }
  }
  componentDidMount() {
    this.setState({});
  }

  handleOutsideClick(e) {
		if (this.refs.mention === null || (this.refs.mention && this.refs.mention.contains(e.target.parentNode)))
      return;
		if (this.state.display !== false) {
      this.setState({display: false});
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
	}

  getFontSize(number) {
    switch (number) {
      case '1':
        return 8;
      case '2':
        return 11;
      case '3':
        return 15;
      case '4':
        return 17;
      case '5':
        return 25;
      case '6':
        return 38;
      case '7':
        return 70;
    }
  }

  fillSelection(index) {
    var s = window.getSelection(),
    slctd = this.state.first === ''?this.state.data[index].name:this.state.data[index];
    s.baseNode.textContent = s.baseNode.textContent.substring(0, this.state.middle) + slctd + '.' + s.baseNode.textContent.substring(s.baseOffset);
    var sel = window.getSelection();
    if (s.baseNode.nodeName === "#text")
      sel.collapse(s.baseNode, this.state.middle + slctd.length + 1);
  }

  firstSelected(item) {
    var s = window.getSelection();
    var oRange = s.getRangeAt(0);
    var oRect = oRange.getBoundingClientRect();
    this.setState({
      position: { left: oRect.x, top: oRect.y + this.getFontSize(document.queryCommandValue('FontSize')) },
      first: item.name,
      data: item.suggestions,
      dataset: item.suggestions,
      middle: s.baseOffset,
      selected: 0,
      filter: ''
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({model: nextProps.model});
  }

  secondSelected(item) {
    var s = window.getSelection();
    var childNodes = s.baseNode.parentElement.childNodes, nodes = [];
    for (var i=0; childNodes[i] !== s.baseNode; i++);
    for (var k=childNodes.length-1; k>i; k--) {
      nodes.push(childNodes[k]);
      s.baseNode.parentElement.removeChild(childNodes[k]);
    }
    var span = document.createElement('span');
    span.appendChild(document.createTextNode("@"+this.state.first+'.'+item));
    span.contentEditable = "false";
    span.classList.add("mention");
    s.baseNode.parentElement.appendChild(span);
    s.baseNode.parentElement.appendChild(document.createTextNode(String.fromCharCode(160) + s.baseNode.textContent.substring(s.baseOffset)));
    for (k=nodes.length-1; k>=0; k--)
      s.baseNode.parentElement.appendChild(nodes[k]);
    childNodes[i].textContent = childNodes[i].textContent.substring(0, this.state.start-1);
    var sel = window.getSelection();
    sel.collapse(s.baseNode.parentElement.childNodes[i+2], 1);
    this.setState({
      dataset: this.props.menu,
      filter: '',
      first: '',
      selected: 0,
      display: false
    });
  }

  render() {
    return (
      <div className={css(styles.container)}>
        <FroalaEditor
          tag='textarea'
          config={this.state.config}
          model={this.state.model}
          onModelChange={(model) => this.props.onModelChange(model)}
          {...this.props.more}
        />
        <div className="fr-popup fr-desktop fr-active" style={{top: this.state.position.top, left: this.state.position.left, display: this.state.display?"block":"none"}} ref="mention">
          <span className="fr-arrow"></span>
          <div className={css(styles.menu)} ref="menu">
            {this.state.data.map((item, index) =>
              <div 
                key={'suggestion.'+index}
                className={css(styles.itemMenu, this.state.selected === index ? styles.itemMenuSelected :null)}
                onClick={() => {
                  this.fillSelection(index);
                  this.state.first === '' ?
                    this.firstSelected(this.state.data[index])
                  :
                    this.secondSelected(this.state.data[index]);
                }}
              >
                {typeof item === "string"?item:item.name}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default WysiwygMention;