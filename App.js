import React from 'react';
import {Slider, StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import AddEntry from './components/AddEntry'
import History from './components/History'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducers'
import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
import {purple, white } from './utils/colors'
import {FontAwesome, Ionicons} from '@expo/vector-icons'  
import {EntryDetail} from './components/EntryDetail'




const Tabs = createBottomTabNavigator(
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
})

const MainNavigator = createAppContainer(createStackNavigator({
  home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    }),
  },
}));



export default class App extends React.Component {
    state = {
      value:10
    }
   render(){
     return(
        <Provider store={createStore(reducer)}>
          <View style={{flex:1}}>
            <View style={{backgroundColor:purple}}>
            <StatusBar translucent backgroundColor={purple}/>
            </View>
           
           <MainNavigator/>
            
          </View>
        </Provider>
    
     )};
}

