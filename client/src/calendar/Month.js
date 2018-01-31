import React, { Component } from 'react';
import '../css/Month.css';
import DaysOfMonth from './DaysOfMonth.js';
import MonthHeader from './MonthHeader.js';



class Month extends Component {
    render(){
        return (
            <div className="month-container">
                <MonthHeader viewDate={this.props.viewDate} />
                <DaysOfMonth currentDate={this.props.currentDate} viewDate={this.props.viewDate} onClickDay={this.props.onClickDay}/>
            </div>
        );
    }
}

export default Month;
