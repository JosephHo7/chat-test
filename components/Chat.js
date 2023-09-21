//components/Chat.js
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useEffect, useState } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { onSnapshot, query, collection, where, orderBy, Timestamp, addDoc } from "firebase/firestore";

const Chat = ({route, navigation, db}) => {
    // get name and background color from start page
    const { name, color, userID } = route.params;

    // messges state to add and display messages
    const [messages, setMessages] = useState([]);

    // display the messages when user gets to the chat page
    useEffect(() => {
    // set user input name to the title of the screen 
        navigation.setOptions({title: name})

        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        const unsubChat = onSnapshot(q, (messageSnapshot) => {
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
            setMessages(newMessages);
        });

    // clean up code
        return() => {
            if (unsubChat) unsubChat();
        }
    },[])

    // add new messages to the setMessages state array 
    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0])
    }

    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {backgroundColor: '#000'},
                left: {backgroundColor: '#FFF'}
            }}
        /> 
    }

    return(
        <View 
// set selected background color 
            style={[styles.container,{backgroundColor: color}]}>
                <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
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