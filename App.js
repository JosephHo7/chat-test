import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
//import screens
import Start from './components/Start';
import Chat from './components/Chat';
//import react Navigation
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import firestore 
import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';

//Create the Navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9V51Qmwweh9Cx_2Bhcw5_ns_Hr59zDBI",
  authDomain: "chat-app-b6f9e.firebaseapp.com",
  projectId: "chat-app-b6f9e",
  storageBucket: "chat-app-b6f9e.appspot.com",
  messagingSenderId: "8763241980",
  appId: "1:8763241980:web:4d259a76e0d7c603132e79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get database 
// const db = getFirestore(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true})

// conntect to database storage 
const storage=getStorage(app);

const connectionStatus = useNetInfo();

useEffect(() => {
  if (connectionStatus.isConnected === false) {
    Alert.alert('Network Connection Lost')
    disableNetwork(db);
  } else {
    enableNetwork(db);
  }
},[connectionStatus.isConnected])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen
          name='Start'
          component={Start}
        />
        <Stack.Screen
          name='Chat'>
            {props => <Chat 
              isConnected={connectionStatus.isConnected}
              db={db} 
              storage={storage}
              {...props}
              />}
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;