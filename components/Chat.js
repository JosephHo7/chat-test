//components/Chat.js
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useEffect, useState } from "react";
import { GiftedChat, Bubble, InputToolbar, Actions } from "react-native-gifted-chat";
import { onSnapshot, query, collection, where, orderBy, Timestamp, addDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from "./CustomActions";

const Chat = ({route, navigation, db, isConnected}) => {
    // get name and background color from start page
    const { name, color, userID } = route.params;

    // messges state to add and display messages
    const [messages, setMessages] = useState([]);

    let unsubChat;
        // display the messages when user gets to the chat page
    useEffect(() => {
        // set user input name to the title of the screen 
        navigation.setOptions({title: name})

        if (isConnected === true) {       
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        unsubChat = onSnapshot(q, (messageSnapshot) => {
            let newMessages = [];
            messageSnapshot.forEach((doc) => {
                const data = doc.data();
                //convert timestamp to date
                const createdAt = data.createdAt.toDate();

                const message = {
                    id: doc.id,
                    ...data,
                    createdAt
                }
                newMessages.push(message)
            });
            cacheMessages(newMessages);
            setMessages(newMessages);
        })} else {
            loadFromCache();
        }

    // clean up code
        return() => {
            if (unsubChat) unsubChat();
        }
    },[isConnected]);

    // saves messages to the cache 
    const cacheMessages = async(messagesToCache) => {
        try { await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));}
        catch(error) {console.log(error.message)}
    }

    // load messages from Async Storage rather than Firestore db
    const loadFromCache = async () => {
        const messagesFromCache = await AsyncStorage.getItem('messages') || [];
        setMessages(JSON.parse(messagesFromCache));
    }

    // add new messages to the setMessages state array 
    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0])
    }

    // change render bubble styling
    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {backgroundColor: '#000'},
                left: {backgroundColor: '#FFF'}
            }}
        /> 
    }

    const renderInputToolbar = (props) => {
        if (isConnected)
            return <InputToolbar 
            {...props} 
            />; 
        else return null; 
    }

    const renderCustomActions = (props) => {
        return <CustomActions {...props}/>
    };

    return(
        <View 
// set selected background color 
            style={[styles.container,{backgroundColor: color}]}>
                <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                renderActions={renderCustomActions}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name
                }}
                />
{/* adjusts keyboard view so user can see the message as they type */}
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default Chat;