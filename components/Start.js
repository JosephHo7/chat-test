//components/Start.js
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { useState } from "react";

const Start = ({navigation}) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#FFFFFF')

    const bgColors = {
        a: '#090C08',
        b: '#474056',
        c: '#8A95A5',
        d: '#B9C6AE',
      };

    return (
        <View style={styles.titleContainer}> 
            <ImageBackground 
                source={require('../files/BackgroundImage.png')}
                resizeMode="cover" 
                style={[styles.titleContainer,{width: '100%', height: '100%'}]}>
                <View style={styles.titleContainer}> 
                    <Text style={styles.titleText}>App Title</Text>
                </View>
{/* Main Start Components */}
            <View style={styles.container}>
    {/* main text input  */}
                <View style={styles.container1}>
                    <TextInput 
                        style={styles.textInput}
                        value = {name}
                        onChangeText={setName}
                        placeholder="Your Name"
                    />
                </View>
    {/* choose background color options  */}
                <View style={styles.container2}>
                    <Text style={styles.chooseBGColorText}>Choose Background Color:</Text>
                    <View style={styles.colorBtnRow}>
                        <TouchableOpacity 
                            style={[styles.chooseBGColorBtn,
                            color === bgColors.a && styles.activeBtn,
                            {backgroundColor: bgColors.a}]}
                            onPress={() => setColor(bgColors.a)}
                        />
                        <TouchableOpacity 
                            style={[styles.chooseBGColorBtn,
                            color === bgColors.b && styles.activeBtn,
                            {backgroundColor: bgColors.b}]}
                            onPress={() => setColor(bgColors.b)}
                        />
                        <TouchableOpacity 
                            style={[styles.chooseBGColorBtn,
                            color === bgColors.c && styles.activeBtn,
                            {backgroundColor: bgColors.c}]}
                            onPress={() => setColor(bgColors.c)}
                        />
                        <TouchableOpacity 
                            style={[styles.chooseBGColorBtn,
                            color === bgColors.d && styles.activeBtn,
                            {backgroundColor: bgColors.d}]}
                            onPress={() => setColor(bgColors.d)}
                        />
                    </View>
                </View>
    {/* start chat button  */}
                <View style={styles.container3}>
                    <TouchableOpacity
                    style={styles.customButton}
                    onPress={() => navigation.navigate('Chat', {name: name, color: color})}
                    >
                        <Text style={styles.chatButText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF'
    },  
    container: {
        width: '88%',
        marginBottom: '6%',
        flex: .8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }, 
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    textInput: {
        width: '88%',
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 16,
        fontWeight:'300',
        color: '#757083',
        opacity: .5
    },
    container3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 5,
    },
    customButton: {
        width: '88%',
        height: '50%',
        backgroundColor: '#757083',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatButText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF'
    },
    container2: {
        flex: 1,
        width: '88%',
        padding: 15,
        borderWidth: 0  
    },
    chooseBGColorText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 1
    },
    colorBtnRow:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'left'
    },
    chooseBGColorBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 20,
        marginTop: 10
    },
    activeBtn: {
        borderWidth: 5,
        borderColor: '#808080'
    }
})

export default Start;