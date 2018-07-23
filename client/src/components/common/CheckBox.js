import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './CheckBoxStyles';

import Icon from './Icon';

class CheckBox extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      checked: props.checked ? props.checked : 'none',
      double: props.double ? props.double : false,
      disabled: props.disabled ? props.disabled : false,
      onChange: props.onChange ? props.onChange : 0,
      clickEvent: 0,
      prevent: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checked,
      double: nextProps.double,
      disabled: nextProps.disabled,
      onChange: nextProps.onChange
    });
  }
  render() {
    var event = {};
    if (!this.state.disabled) {
      if (this.state.double)
        event = {
          onClick: () => {
            var me = this;
            this.state.clickEvent = setTimeout(() => {
              if (!me.state.prevent) {
                var newState;
                if (this.state.checked ===  'check')
                  newState = 'none';
                else
                  newState = 'check';
                var res = this.state.onChange(this.state.checked, newState, 1);
                this.setState({checked: res ? res : newState});
              }
              me.state.prevent = false;
            }, 200)
          },
          onDoubleClick: () => {
            clearTimeout(this.state.clickEvent);
            this.state.prevent = true;
            var newState;
            if (this.state.checked ===  'all')
              newState = 'none';
            else
              newState = 'all';
            var res = this.state.onChange(this.state.checked, newState, 1);
            this.setState({checked: res ? res : newState});
          }
        };
      else
        event = {onClick: () => {
          var newState;
          if (this.state.checked ===  'check')
            newState = 'none';
          else
            newState = 'check';
          var res = this.state.onChange(this.state.checked, newState, 1);
          this.setState({checked: res ? res : newState});
        }};
    }
    return (
      <div className={css(styles.check)} {...event}>
        {this.state.disabled ? 
          <div className={css(styles.checkAll)} style={{backgroundColor: '#ccc'}}></div>
        : this.state.checked === 'check' ?
          <div className={css(styles.checkAll)} style={{backgroundColor: '#fff'}}>
            <Icon icon="check" color="primary" size="small" />
          </div>
        : this.state.checked === 'all' ?
          <div className={css(styles.checkAll)} style={{backgroundColor: '#45AFE5'}}>
            <Icon icon="check" color="white" size="small" />
          </div>
        :
          <div className={css(styles.checkAll)} style={{backgroundColor: '#fff'}}>
            <Icon icon="check" color="white" size="small" />
          </div>
        }
      </div>
    );
  }
}

export default CheckBox;