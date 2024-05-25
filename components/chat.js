import { StyleSheet, View, Text } from 'react-native';
import { useEffect,useState } from 'react';

const Screen2 = ({route,navigation}) => {
    const {name} = route.params;
    const {color} = route.params;


  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);
 return (
   <View style={{backgroundColor:color,height:'100%'}}>
     <Text>Hello Screen2!</Text>
     <Text>{color}</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   //backgroundColor:`${color}`,
 }
});

export default Screen2;