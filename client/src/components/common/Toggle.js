import React, { Component } from 'react';
import { css } from 'aphrodite/no-important';

import { styles } from './ToggleStyles';

class Toggle extends Component {
  constructor (props) {
    super(props);
    this.change = this.change.bind(this);
    this.state = {
      selected: this.props.defaultValue?this.props.defaultValue:false,
      style: {
        backgroundColor: '#a6a6a6'
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({selected: nextProps.defaultValue?nextProps.defaultValue:false});
  }
  change() {
    this.setState(prevState => ({selected: !prevState.selected}));
    this.props.change?this.props.change(!this.state.selected):null;
  }
  render() {
    return (
      <fieldset className={css(styles.fieldset)}>
        {this.props.label?<label className={css(styles.label)}>{this.props.label}</label>:null}
        <div className={css(styles.toggleContainer)} onClick={this.change}>
          <div className={css(styles.toggleContent)} style={this.state.selected?{marginLeft: '-29px', backgroundColor: '#45afe5'}:{marginLeft: '0px', backgroundColor: '#a6a6a6'}}>
            <span>Não</span>
            <span className={css(styles.toggleCircle)}></span>
            <span>Sim</span>
          </div>
        </div>
      </fieldset>
    );
  }
}

export default Toggle;