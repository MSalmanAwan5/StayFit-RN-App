import React from 'react'
import {View, Text,TouchableOpacity} from 'react-native'
import {FontAwesome, Entypo} from '@expo/vector-icons'
export default function Stepper({value,increment,decrement}){
    return(
        <View>
        <View>
            <TouchableOpacity onPress={decrement}>
                <FontAwesome name='minus' color='black'/>
              
            </TouchableOpacity>
            <TouchableOpacity onPress={increment}>
                <FontAwesome name='plus' color='black'/>
               
            </TouchableOpacity>
        </View>
            <Text>{value}</Text>
        </View>
    )
}