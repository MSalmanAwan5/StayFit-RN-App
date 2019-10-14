import React,{Component} from 'react'
import {View, Text, StyleSheet,  TouchableOpacity, Platform } from 'react-native'
import {getMetricMetaInfo,
        timeToString, 
        getDailyReminder, 
        clearLocalNotification,
        setLocalNotification} from '../utils/helpers' 
import MySlider from './Slider'
import Stepper from './Stepper'
import DateHeader from './DateHeader'
import {submitEntry,removeEntry} from '../utils/api'
import {connect} from 'react-redux'
import {addEntry} from '../actions'
import { Ionicons } from '@expo/vector-icons'
import {white, purple} from '../utils/colors'
import { NavigationActions } from 'react-navigation'
function SubmitBtn({onPress}) {
    return(
        <TouchableOpacity 
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn} 
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class AddEntry extends Component{
    constructor(state)
    {
        super(state);
        this.state = {
            run:0,
            bike:0,
            swim:0,
            eat:0,
            sleep:0,
        }
    }
    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric)
        this.setState((state)=>{
            const count = state[metric] + step
            return {
                ...state,
                [metric] : count > max ? max : count
            }
        })
    }
    decrement = (metric) => {
        const {step} = getMetricMetaInfo(metric)
        this.setState((state)=>{
            const count = state[metric] - step
            return {
                ...state,
                [metric] : count < 0 ? 0 : count
            }
        })
    }
    slide = (metric, value) => {
        this.setState({
            [metric]: value
        })
    }

    submit = () => {
        const entry = this.state
        const key = timeToString()
        this.props.dispatch(addEntry({
            [key]:entry
        }))
        this.setState({
            run:0,
            bike:0,
            swim:0,
            eat:0,
            sleep:0,
        })
        this.toHome()
        submitEntry({key,entry})
        // Clear local notification
        clearLocalNotification()
        .then(setLocalNotification)
    }

    reset = ()=>{
        const key = timeToString()
        removeEntry(key)
        this.props.dispatch(addEntry({
            [key]:getDailyReminder()
        }))
        this.toHome()

    }
    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({key: 'AddEntry'}))
      }
    render()
    {   
        const metaInfo = getMetricMetaInfo()
        if (this.props.alreadyLogged)
        return(
            <View style={styles.center}>
              
                <Ionicons name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'}
                size={100}/>
                <Text>
                    You already logged your information for today!
                </Text>
                <TouchableOpacity style={{padding: 10}} onPress={this.reset}>
                    <Text >Reset</Text>
                </TouchableOpacity>

            </View>
        )
        else 
        return(
            <View style={styles.container}>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
               {Object.keys(metaInfo).map((key)=>{
                   const {type,getIcon,...rest} = metaInfo[key]
                   const value = this.state[key]
                   return (
                    <View key={key} style={styles.row}>
                        {getIcon()}
                       {type === 'slider' ?
                       <MySlider
                        value = {value}
                        onChange = { (value)=>this.slide(key,value)}
                        {...rest}
                       />
                       :
                       <Stepper
                        value = {value}
                        increment = {()=>this.increment(key)}
                        decrement = {()=>this.decrement(key)}
                        {...rest}
                       />
                    }
                    </View>

                   )
                   
               })}
               <SubmitBtn onPress={this.submit}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: white
    },
    row: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },
    iosSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40,
    },
    AndroidSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      height: 45,
      borderRadius: 2,
      alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitBtnText: {
      color: white,
      fontSize: 22,
      textAlign: 'center',
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 30,
      marginRight: 30,
    },
  })

function mapStateToProps(state) {
    const key = timeToString()
    return {
    alreadyLogged : state[key]  && typeof state[key].today === 'undefined',
    }
}

export default connect(mapStateToProps)(AddEntry)