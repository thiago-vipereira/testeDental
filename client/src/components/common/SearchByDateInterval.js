import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { reduxForm } from 'redux-form';  
	
import { css } from 'aphrodite/no-important';  
import DateTimePicker from '../forms/date/DateTimePicker';
import {styles} from './SearchByDateIntervalStyles';

class SearchByDateInterval extends Component {  

    constructor(props) {  
		super(props);  
 
		this.onSubmit = this.onSubmit.bind(this); 
		
		this.onInitChange = this.onInitChange.bind(this);
		this.onEndChange = this.onEndChange.bind(this);
 
		this.state = {  
			initDate: null,
			endDate: null
		}  
    }

    componentWillMount(){
		//criar data com newDate() inicial e final + codigo da clinica
		var today = new Date();
		this.setState({initDate : this.props.initDate, endDate: this.props.endDate});
	}
	
	componentDidMount() {
		this.setState({ loading: false });
	}

	onInitChange(init) {
		this.setState({
			initDate: init
        });
        this.props.callbackInit(init);
	}

	onEndChange(end) {
		this.setState({
			endDate: end
        });
        this.props.callbackEnd(end);
	}
	
	onSubmit(values) {
    } 

    
    render(){
		const { searchByDate } = this.props;

        return(
            <div className={css(styles.bar)}>
					<div className={css(styles.gridDate)}>
								<label className={css(styles.label)}>Visualizar registros do dia</label>
								<DateTimePicker audit={searchByDate ? searchByDate : ""} name="initDate" value={this.state.initDate} onChange={this.onInitChange} />
								<label className={css(styles.label)}>até</label>
								<DateTimePicker audit={searchByDate ? searchByDate : ""} name="endDate" value={this.state.endDate} onChange={this.onEndChange} />
					</div>
				</div>
        );

    }
    


}export default SearchByDateInterval;