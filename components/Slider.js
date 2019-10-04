import React from 'react'
import {View, Text,Slider} from 'react-native'

export default function MySlider({max,unit,step,value,onChange}){
    return(
        <View>
        <Slider
            value={value}
            onValueChange={onChange}
            maximumValue={max}
            minimumValue={0}
            step={step}
            >
            
            </Slider>
            <View>
                <Text>{value}</Text>
            <Text>{unit}</Text>
            </View>
        </View>
           
            
    )
}