import React from 'react';
import {Slider, StyleSheet, Text, View } from 'react-native';
import AddEntry from './components/AddEntry'
import History from './components/History'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducers'
import {TabNavigator} from 'react-navigation'
import {purple, white } from './utils/colors'
import {FontAwesome, Ionicons} from '@expo/vector-icons'  


const Tabs = TabNavigator(
  {
    History:{
      screen:History,
      navigationOptions:{
        tabBarLabel:'History',
        tabBarIcon:({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>,
      }
    },
    AddEntry:{
      screen:AddEntry,
      navigationOptions:{
        tabBarLabel:'Add Entry',
        tabBarIcon:({tintColor})=> <FontAwesome name='plus-square' size={30} color={tintColor}/>
      }
    }
  },
  {
    tabBarOptions:
    {
      activeTintColor:Platform.OS === 'ios' ? purple : white,
      style:{
        height:56,
        backgroundColor:Platform.OS === 'ios' ? white : purple,
        shadowRadius:6,
        shadowOpacity:0.8,
        shadowColor:'rgba(0,0,0,0.24)',
        shadowOffset:{
          width:0,
          height:3
        }
      }
    }
}

)

class App extends React.Component {
    state = {
      value:10
    }
   render(){
     return(
        <Provider store={createStore(reducer)}>
          <View style={{flex:1}}>
            <View style={{height:20}}/>
            <Tabs/>
            
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
