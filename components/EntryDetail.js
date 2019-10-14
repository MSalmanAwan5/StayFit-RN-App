import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { timeToString, getDailyReminder } from '../utils/helpers'
import MetricCard from './metricCard'
import { white } from '../utils/colors'
import { addEntry } from '../actions'
import { removeEntry } from '../utils/api'
class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    const year = entryId.slice(0, 4)
    const month = entryId.slice(5,7)
    const day = entryId.slice(8)

    return {
      title: `${month}/${day}/${year}`
    }
  }
  reset = () => {
    const { remove, goBack, entryId } = this.props

    remove()
    goBack()
    removeEntry(entryId)
  }
  shouldComponentUpdate (nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today
  }
  render() {
    const { metrics } = this.props
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <View style={styles.center}>
          <TouchableOpacity  onPress={this.reset}>
            <Text>RESET</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  center:{
    flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 30,
      marginRight: 30,
  }
})

function mapStateToProps (state, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    entryId,
    metrics: state[entryId],
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    remove: () => dispatch(addEntry({
      [entryId]: timeToString() === entryId
        ? getDailyReminder()
        : null
    })),
    goBack: () => navigation.goBack(),
  }
}


export default connect(
  mapStateToProps,mapDispatchToProps
)(EntryDetail) 

