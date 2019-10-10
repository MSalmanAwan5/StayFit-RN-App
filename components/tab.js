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
  export default Tabs;