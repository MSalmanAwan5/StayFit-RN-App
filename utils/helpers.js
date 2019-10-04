import React from 'react'
import {View} from 'react-native'
import {FontAwesome, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons'
import white from './colors'
export function isBetween (num, x, y) {
    if (num >= x && num <= y) {
      return true
    }
  
    return false
  }
  
  export function calculateDirection (heading) {
    let direction = ''
  
    if (isBetween(heading, 0, 22.5)) {
      direction = 'North'
    } else if (isBetween(heading, 22.5, 67.5)) {
      direction = 'North East'
    } else if (isBetween(heading, 67.5, 112.5)) {
      direction = 'East'
    } else if (isBetween(heading, 112.5, 157.5)) {
      direction = 'South East'
    } else if (isBetween(heading, 157.5, 202.5)) {
      direction = 'South'
    } else if (isBetween(heading, 202.5, 247.5)) {
      direction = 'South West'
    } else if (isBetween(heading, 247.5, 292.5)) {
      direction = 'West'
    } else if (isBetween(heading, 292.5, 337.5)) {
      direction = 'North West'
    } else if (isBetween(heading, 337.5, 360)) {
      direction = 'North'
    } else {
      direction = 'Calculating'
    }
  
    return direction
  }
  
  export function timeToString (time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
  }

  export function getMetricMetaInfo(metric = null)
  {
      info = {
          run:{
              displayName:'Run',
              unit:'miles',
              max:50,
              step:1,
              type:'steppers',
              getIcon(){
                return (
                <View>
                    <MaterialIcons
                        name='directions-run'
                        size={35}
                        color={'black'}
                    />
                  </View>
                )
                }
                 
          },
          bike:{
            displayName:'Bike',
            unit:'miles',
            max:100,
            step:1,
            type:'steppers',
            getIcon(){
                return (<View>
                  <MaterialCommunityIcons
                      name='bike'
                      size={35}
                      color={'black'}
                  />
                </View>
                )
              }
          },
          swim:{
            displayName:'Swim',
            unit:'meters',
            max:9900,
            step:100,
            type:'steppers',
            getIcon(){
                return (<View>
                  <MaterialCommunityIcons
                      name='swim'
                      size={35}
                      color={'black'}
                  />
                </View>
                )
              }
          },
          sleep:{
            displayName:'Sleep',
            unit:'hours',
            max:24,
            step:1,
            type:'slider',
            getIcon(){
                return (<View>
                  <FontAwesome
                      name='bed'
                      size={35}
                      color={'black'}
                  />
                </View>
                )
              }
          },
          eat:{
            displayName:'Eat',
              unit:'rating',
              max:10,
              step:1,
              type:'slider',
              getIcon(){
                  return( <View>
                    <MaterialCommunityIcons
                        name='food'
                        size={35}
                        color={'black'}
                    />
                  </View>
                  )
                 
                }
          }
      }

      return metric === null ? info : info[metric]
  }

  export function getDailyReminder()
  {
    return{
      "today":"👋 hey! dont forget to log your data today!"
    }
  }