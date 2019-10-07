import React from 'react';
import {Slider, StyleSheet, Text, View } from 'react-native';
import AddEntry from './components/AddEntry'
import History from './components/History'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducers'
export default class App extends React.Component {
    state = {
      value:10
    }
   render(){
     return(
        <Provider store={createStore(reducer)}>
          <View style={{flex:1}}>
            <View style={{height:20}}>
            <History/>
            </View>
            
          </View>
        </Provider>
    
     )};
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginLeft:10,
    marginRight:10,
    alignItems:"stretch",
    justifyContent:"center"
  }
})
