import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
const HomeScreen = ({navigation}) => {

const { height, width } = useWindowDimensions();
  return (
<SafeAreaView>
   <View>
     


     
   </View>

</SafeAreaView>
  )
}

export default HomeScreen