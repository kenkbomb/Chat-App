import { StyleSheet, View, Text, Button, TextInput,ImageBackground,TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';

const Screen1 = ({ navigation }) => {
    const [name,setName] = useState("");
    //const image = {uri:'/Background Image.png'};
    const [color,setColor] = useState("");
 return (
   <View style={styles.container}>
    <ImageBackground source={require('../assets/Background Image.png')} resizeMode="cover" style={styles.image}>
     <Text style={{textAlign:'center',fontSize:45,fontWeight:600,color:'#FFFFFF',marginBottom:30}}>Hello Screen1!</Text>
     <View style={{backgroundColor:'white',height:'44%',width:'88%',marginLeft:20}}>
     <TextInput style={styles.textInput} value={name} onChangeText={setName} placeholder='please type your name'></TextInput>
     <Text style={{textAlign:'center'}}>Choose Background Color</Text>
     <View style={styles.colorsContainer}>
         <TouchableOpacity onPress={()=>{setColor('#090C08')}} style = {styles.color1}></TouchableOpacity>
        <TouchableOpacity onPress={()=>{setColor('#474056')}} style = {styles.color2}></TouchableOpacity>
        <TouchableOpacity onPress={()=>{setColor('#8A95A5')}} style = {styles.color3}></TouchableOpacity>
        <TouchableOpacity onPress={()=>{setColor('#B9C6AE')}} style = {styles.color4}></TouchableOpacity>
     </View>
     <TouchableOpacity style={styles.chatButton} title="Start Chatting" onPress={() => navigation.navigate('Screen2',{name:name,color:color})}><Text style={{textAlign:'center',alignContent:'center',color:'#FFFFFF',marginTop:10,fontSize:15}}>Start Chatting</Text></TouchableOpacity>
     </View>
     </ImageBackground>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   
   
   
   },
   chatButton:{
    fontSize:16,
    fontWeight:600,
    color:'#FFFFFF',
    backgroundColor:'#757083',
    width:'88%',
    height:40,
    borderRadius:10,
    flex:1,
    marginBottom:20,
    marginLeft:20
    
   },
 textInput:{
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:20
    
 },
 image:{
    flex:1,
    justifyContent:"center",
    width:'100%',
    height:'100%',
    position:'fixed'
 },
 colorsContainer:{
    flex:1,
    flexDirection:'row',
    marginTop:10,
    justifyContent:'center',
    marginBottom:10
 },
 color1:{
    backgroundColor:'#090C08',
    borderRadius:25,
    width:50,
    height:50,
    marginRight:5
 },
 color2:{
    backgroundColor:'#474056',
    borderRadius:25,
    width:50,
    height:50,
    marginRight:5
 },
 color3:{
    backgroundColor:'#8A95A5',
    borderRadius:25,
    width:50,
    height:50,
    marginRight:5
 },
 color4:{
    backgroundColor:'#B9C6AE',
    borderRadius:25,
    width:50,
    height:50,
    marginRight:5
 },
});

export default Screen1;