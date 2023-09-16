//components/Chat.js
import { StyleSheet, View, Text } from "react-native";
import { useEffect } from "react";

const Chat = ({route, navigation}) => {
    // get name and background color from start page
    const { name, color } = route.params;

    // set user input name to the title of the screen 
    useEffect(() => {
        navigation.setOptions({title: name})
    }, []);

    return(
        <View 
        // set selected background color 
            style={[styles.container,{backgroundColor: color}]}>
            <Text>Welcome to the Chat</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Chat;