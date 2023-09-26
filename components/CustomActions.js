//components/CustomActions.js
import { TouchableOpacity, StyleSheet, View, Text, Alert } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
 
const CustomActions = ({ wrapperStyle, iconTextStyle}) => {
    const actionSheet = useActionSheet();
    const onActionPress = () => {
        const options = ['Choose from Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length -  1;
        actionSheet.showActionSheetWithOptions({
            options, cancelButtonIndex,
        },
        async (buttonIndex) => {
            switch(buttonIndex) {
                case 0: 
                    pickImage();
                    return;
                case 1: 
                    takePhoto();
                    return;
                case 2: 
                    getLocation();
                default:
                }
            }
        )
    }

// allow user to access images from device 
    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(permissions?.granted) {
            const result= await ImagePicker.launchImageLibraryAsync();
            if(!result.canceled) {
                console.log('Uploading and uploading the image occurs here');
            } else { Alert.alert('Permission has not been granted')}
        }
    }

// allow user to use camera from device 
    const takePhoto = async () => {
        let permissions= await ImagePicker.requestCameraPermissionsAsync();

        if(permissions?.granted) {
            const result = await ImagePicker.launchCameraAsync();
            if(!result.canceled) {
                console.log('uploading and uploading the image occurs here');
            } else { Alert.alert('Permissions has not been granted ')}
        }
    }

// allows the user to get location from device 
    const getLocation = async () => {
        let permissions= await Location. requestForegroundPermissionsAsync();

        if(permissions?.granted) {
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
                console.log('sending the location occurs here');
            } else {Alert.alert('Error occred while fetching location')}
        } else {Alert.alert('Permissions has not been granted')}
    }

    return (
        <TouchableOpacity style={styles.container}
            onPress={onActionPress}>
                <View style={[styles.wrapper, wrapperStyle]}>
                    <Text style={[styles.iconText, iconTextStyle]}>+</Text>
                </View>
        </TouchableOpacity>
    )
} 

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10
    },
    wrapper : {
        borderRadius: 13,
        borderWidth: 2,
        borderColor: '#b2b2b2',
        flex: 1
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: 'transparent',
        textAlign: 'center'
    }
})

export default CustomActions;