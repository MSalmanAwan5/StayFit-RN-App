import React from 'react';
import {Slider, StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import EntryDetail from './components/EntryDetail'
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
import Live from './components/Live'
import { setLocalNotification } from './utils/helpers'
import {Constants} from 'expo-constants'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


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
    },
    Live: {
      screen: Live,
      navigationOptions: {
        tabBarLabel: 'Live',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
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
  componentDidMount() {
    setLocalNotification();
  }
  
    state = {
      value:10
    }
   render(){
     return(
        <Provider store={createStore(reducer)}>
          <View style={{flex:1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
           <MainNavigator/>
            
          </View>
        </Provider>
    
     )}
}

