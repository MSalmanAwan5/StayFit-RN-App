import React from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import {addEntry, receiveEntries} from '../actions/index'
import {getDailyReminder,timeToString} from '../utils/helpers'
import {getCalendarResults} from '../utils/api'
import UdaciFitnessCalendar from 'udacifitness-calendar'
class History extends React.Component{
  componentDidMount(){
      const {dispatch} = this.props;
      getCalendarResults()
     .then((entries) => dispatch(receiveEntries(entries)))
     .then((entries)=>{
       if(!entries[timeToString()])
       {
         dispatch(addEntry({
           [timeToString()]:getDailyReminder(),
         }))
       }
     })
  }

  renderItem = ({today, ...metrices},formattedDate, key)=>(
      <View>
          { today ? 
            <Text>{JSON.stringify(today)}</Text> :
            <Text>{JSON.stringify(metrices)}</Text>
          }
      </View>
  )
  renderEmptyDate = (formattedDate) => (
      <View>
          <Text>No data for today</Text>
      </View>
  )

  render()
  {
    const {entries} = this.props
    return(
    <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        />
    )
  }
}

function mapStateToProps(entries){
  return{
    entries
  }
}

export default connect(mapStateToProps)(History)