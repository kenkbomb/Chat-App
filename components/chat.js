import { StyleSheet, View, Text } from 'react-native';
import { useEffect,useState } from 'react';
import { GiftedChat,Bubble } from 'react-native-gifted-chat';
import { KeyboardAvoidingView,Platform } from 'react-native';


  

  

const Screen2 = ({route,navigation}) => {
    const {name} = route.params;
    const {color} = route.params;
    const [messages,setMessages] = useState([]);
    const onSend = (newMessages) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
        },
      ]);
    }, []);

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

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

 return (
  <View style={{flex:1,backgroundColor:color,height:'100%'}}>
<GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      renderBubble={renderBubble}
      user={{
        _id: 1
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