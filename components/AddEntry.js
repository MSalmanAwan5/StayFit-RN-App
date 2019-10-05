import React,{Component} from 'react'
import {View, Text,  TouchableOpacity} from 'react-native'
import {getMetricMetaInfo, timeToString, getDailyReminder} from '../utils/helpers' 
import MySlider from './Slider'
import Stepper from './Stepper'
import DateHeader from './DateHeader'
import {submitEntry,removeEntry} from '../utils/api'
import {connect} from 'react-redux'
import {addEntry} from '../actions'
import { Ionicons } from '@expo/vector-icons'
import { Platform } from '@unimodules/core'
function SubmitBtn({onPress}) {
    return(
        <TouchableOpacity onPress={onPress}>
            <Text>Submit</Text>
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

        submitEntry({key,entry})
        this.props.alreadyLogged = true
    }

    reset = ()=>{
        const key = timeToString()
        removeEntry(key)
        this.props.dispatch(addEntry({
            [key]:getDailyReminder()
        }))

    }
    render()
    {   
        const metaInfo = getMetricMetaInfo()
        if (this.props.alreadyLogged)
        return(
            <View>
                {Platform.OS === 'ios'}
                <Ionicons name='ios-happy'
                size={100}/>
                ?
                <Ionicons name='md-happy'
                size={100}/>
                <Text>
                    You already logged your information for today!
                </Text>
                <TouchableOpacity onPress={this.reset}>
                    <Text>Reset</Text>
                </TouchableOpacity>

            </View>
        )
        else 
        return(
            <View>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
               {Object.keys(metaInfo).map((key)=>{
                   const {type,getIcon,...rest} = metaInfo[key]
                   const value = this.state[key]
                   return (
                    <View key={key}>
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

function mapStateToProps(state) {
    const key = timeToString()
    return {
    alreadyLogged : state[key]  && typeof state[key].today === 'undefined',
    }
}

export default connect(mapStateToProps)(AddEntry)