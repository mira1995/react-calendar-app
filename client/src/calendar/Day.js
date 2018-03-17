import React, { Component } from 'react';
import {Route} from 'react-router';
import { Row, Col } from 'react-grid-system';
import '../css/Day.css';
import EventObject from '../event/EventObject.js';

class Day extends Component {
   constructor(props) {
      super(props);

      this.state={

      }
   }

   getDayEvents(date, calendar) {
      var arr = [], j=0;
      //console.log(calendar);
      if (!calendar) return arr;

      for(let i=0; i<calendar.length; i++) {
        let day = 0
        if(calendar[i].events) day = calendar[i].events.startDate.date('MM-DD');

        if (day === date.date('MM-DD')) {
           arr[j] = new EventObject(calendar[i].events);
           j++;
        }
      }

      //TODO: sort by time HH:MM 24-hr system
      arr = arr.sort(function(a,b) {
         if(a.startTime<b.startTime) return -1;
         if(a.startTime>b.startTime) return 1;
         return 0;
      })

      return arr;
   }

   onClickDelete = (e, eventObj, history) => {
      e.stopPropagation();
      this.props.deleteEvent(eventObj);
		history.push("/event/delete");
   }


	onClickEdit(e, eventObj, history) {
		this.props.onClickEditDayEvent(eventObj);
		history.push("/event/edit");
	}

	deleteButtonDiv = (eventObj, history) => {
		if(eventObj.eventType && !eventObj.isHoliday()) {
			return <button className="delete-btn btn pill" onClick={(e)=> (this.onClickDelete(e,eventObj,history))}>Delete</button>
		}
	}

    render() {
      //parse through props.viewDate to match what is in the props.calendar
      let arr = this.getDayEvents(this.props.viewDate, this.props.calendar);

		let list = arr.map((eventObj) => {
		    let spanInfo;
		    if(eventObj.startDate !== eventObj.endDate){
		        spanInfo = eventObj.startDate.date("YYYY-MM-DD")+" - "+eventObj.endDate.date("YYYY-MM-DD");
		    }else{
		        spanInfo = eventObj.startDate.date("YYYY-MM-DD");
		    }
		    return(
				 <Route render={ ({history}) => (
					<div className="day-card" onClick={(e)=> (this.onClickEdit(e, eventObj, history))} >
					   <Row>
					      <Col xs={3}>{eventObj.startTime && <div className="day-time btn pill">{eventObj.startTime}</div>} </Col>
					      <Col xs={6}><div className="day-title">{eventObj.name}</div></Col>
					      <Col xs={3}>{this.deleteButtonDiv(eventObj, history)}</Col>
					  </Row>
					  <div className="day-mini-date">
					          <span>{spanInfo}</span>
					  </div>
					  <hr />
					</div>
				)} />
		   );
		});


      //console.log(arr);
        return(
            <div className="day-container">
               <Row>
                  <span style={{margin: "0 auto", marginBottom: "20px"}}>
						<Route render={
							({history})=>(
								<button className="btn pill blue" onClick={()=>{history.push('/event/add')}} >Add Event</button>
							)
						} />
                  </span>
               </Row>
                {list}
            </div>
        );
    }
}

export default Day;
