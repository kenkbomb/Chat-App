import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Alert} from 'react-native';
// import the screens
import Start from './components/start';
import Chat from './components/chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore,enableNetwork,disableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();
  // Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyDyAze4MTkkViimGgzRZx9ga9EW99DWFyA",

  authDomain: "chatapppro-c717d.firebaseapp.com",

  projectId: "chatapppro-c717d",

  storageBucket: "chatapppro-c717d.appspot.com",

  messagingSenderId: "886741865450",

  appId: "1:886741865450:web:472e004d21f9cdd7701893"

};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);

useEffect(() => {
  if (connectionStatus.isConnected === false) {
    Alert.alert("Connection Lost!");
    disableNetwork(db);
  } else if (connectionStatus.isConnected === true) {
    enableNetwork(db);
  }
}, [connectionStatus.isConnected]);

//----------------------------------------------------------------------------------------------------------
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="start"
      >
        <Stack.Screen
          name="start"
          component={Start}
        />
        
        <Stack.Screen name="chat">
        {props => <Chat isConnected={connectionStatus.isConnected}  db={db} storage={storage} {...props} />}
         
          </Stack.Screen>
      </Stack.Navigator>
    
    </NavigationContainer>
  );
}



export default App;