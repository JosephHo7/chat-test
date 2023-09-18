//components/Chat.js
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useEffect, useState } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({route, navigation}) => {
    // get name and background color from start page
    const { name, color } = route.params;

    // messges state to add and display messages
    const [messages, setMessages] = useState([]);

    // display the first message when user gets to the chat page
    useEffect(() => {
        setMessages([
            {
                id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                }
            },
            {
                _id: 1,
                text: 'You have now joined the chat',
                createdAt: new Date(),
                system: true
              }
        ])
    },[])

    // add new messages to the setMessages state array 
    const onSend = ((newMessages) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessages),
        )
      })

    // set user input name to the title of the screen 
    useEffect(() => {
        navigation.setOptions({title: name})
    }, []);

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
                    _id: 1
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