import { StyleSheet, View, Text } from 'react-native';
import { useEffect,useState } from 'react';
import { GiftedChat,Bubble } from 'react-native-gifted-chat';
import { KeyboardAvoidingView,Platform } from 'react-native';
import { collection, getDocs, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { InputToolbar } from 'react-native-gifted-chat';

  const Chat = ({route,navigation,db,isConnected}) => {
    const {name,color,userID} = route.params;
    
    const [messages,setMessages] = useState([]);

    const onSend = (messages) => {
      addDoc(collection(db, "messages"), messages[0])
    }
    //-------------------------------------------------------------------------------------------------------------
    let unSubChat;
    useEffect(() => {
      if(isConnected){
      //create the query object, getting messages from the db, ordered by date in descending order
      const qMessages = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      //use onsnapshot to get the messages data, via the query made above, it returns a data object we can user to 
      //populate arrays and states below...
       unSubChat  =   onSnapshot(qMessages,async (chatData)=>{
        let newMessages = [];
        //for each document in the database, do stuff, create a new item/message object and push it to the newmessages
        //array, finally once the foreach is done, pass the newmessages array into the messages state via setmessages...
        chatData.forEach(doc => {
          let newItem = {
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.seconds*1000)//timestamp to date logic...
            };
            newMessages.push(newItem);});

            try{
              await AsyncStorage.setItem('newMessages',JSON.stringify(newMessages));
            }
            catch(error)
            {
              console.log(error);
            }

         setMessages(newMessages);
      });}
      else{
          loadCachedMessages();
      }
        //used for cleanup to avoid memory leaks...
      return () => {
          if (unSubChat) unSubChat();
      }
      
    }, [isConnected]);
//  sets the title to the name value passed thru the props from start screen...
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  const loadCachedMessages = async () => {
    const cachedLists = await AsyncStorage.getItem("newMessages") || [];
    setMessages(JSON.parse(cachedLists));
  }

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
   }

 return (
  <View style={{flex:1,backgroundColor:color,height:'100%'}}>
<GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      renderBubble={renderBubble}
      InputToolbar={renderInputToolbar}
      user={{
        _id: userID,
        name:name
      }}
      
/>
{ Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
{Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
</View>

  // <View style={{backgroundColor:color,height:'100%'}}>
    // <Text>Hello Screen2!</Text>
     //<Text>{color}</Text>
   //</View>
 );


const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   //backgroundColor:`${color}`,
 }
});
}
export default Chat;
