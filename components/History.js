import React from 'react'
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {addEntry, receiveEntries} from '../actions/index'
import {getDailyReminder,timeToString} from '../utils/helpers'
import {getCalendarResults} from '../utils/api'
import UdaciFitnessCalendar from 'udacifitness-calendar'
import {white} from '../utils/colors'
import DateHeader from './DateHeader'

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

  renderItem = ({today, ...metrices},formattedDate, key)=>{
      return(
      <View style={styles.item}>
          { today ? 
            <View>
              <DateHeader date={formattedDate}></DateHeader>
              <Text style={styles.noDateTxt}>today</Text>
            </View> :
            <TouchableOpacity onPress={()=>console.log("pressed!")}>
              <Text>{JSON.stringify(metrices)}</Text>
            </TouchableOpacity>
          }
      </View>
      )
  }
  renderEmptyDate = (formattedDate) => {
      return(
      <View style={styles.item}>
          <DateHeader date={formattedDate}/>
          <Text style={styles.noDateTxt}>You didn't log any data on this day.</Text>
      </View>
      )
  }

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

const styles = StyleSheet.create({
  noDateTxt:{
    fontSize:20,
    paddingTop:20,
    paddingBottom:20,
  },
  item:{
    backgroundColor:white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding:20,
    justifyContent:'center',
    marginLeft:10,
    marginRight:10,
    marginTop:17,
    shadowRadius:3,
    shadowOpacity:0.8,
    shadowColor:'rgba(0,0,0,0.24)',
    shadowOffset:{
      width:0,
      height:3
    }
  }
 
})

export default connect(mapStateToProps)(History)