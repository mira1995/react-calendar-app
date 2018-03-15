import React, { Component } from 'react';
import {Route} from 'react-router';
import { Row, Col } from 'react-grid-system';
import '../css/Day.css';

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
           arr[j] = (calendar[i].events);
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

   onClickDelete = (eventObj,e) => {
      e.stopPropagation();
      this.props.deleteEvent(eventObj);
   }

   onClickAdd = (eventObj, e) => {
      e.stopPropagation();
      //this.props.addEvent(eventObj);

   }

	onClickEdit(e, eventObj, history) {
		this.props.onClickEditDayEvent(eventObj);
		history.push("/event/edit");
	}

    render(){
      //parse through props.viewDate to match what is in the props.calendar
      var arr = this.getDayEvents(this.props.viewDate, this.props.calendar);

		const list = arr.map((eventObj) => {
		    let spanInfo;
		    if(eventObj.startDate !== eventObj.endDate){
		        spanInfo = eventObj.startDate.date("YYYY-MM-DD")+"-"+eventObj.endDate.date("YYYY-MM-DD");
		    }else{
		        spanInfo = eventObj.startDate.date("YYYY-MM-DD");
		    }
		    return(
				 <Route render={ ({history}) => (
					<div className="day-card" onClick={(e)=> (this.onClickEdit(e, eventObj, history))} >
					   <Row>
					      <Col xs={3}><div className="day-time btn pill">{eventObj.startTime}</div></Col>
					      <Col xs={6}><div className="day-title">{eventObj.name}</div></Col>
					      <Col xs={3}><button className="delete-btn btn pill" onClick={this.onClickDelete.bind(this,eventObj)}>Delete</button></Col>
					  </Row>
					  <div>
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
