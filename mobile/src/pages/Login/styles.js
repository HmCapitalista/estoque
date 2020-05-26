import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    default: {
        paddingTop: Constants.statusBarHeight,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    header: {
        marginTop: 15,
        marginBottom: 50,
        padding: 5,
        borderRadius: 5,
        backgroundColor: "#672b9e",
        fontSize: 24,
        fontWeight: "600",
        color: "white",
    },
    formView: {
        height: 230,
        backgroundColor: "white",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
    },  
    formText: {
        width: 300,
        textAlign: "center",
        fontSize: 22,
        fontWeight: "700",
        color: "#0d0d17",
        borderStyle: "solid",
        borderBottomColor: "#0d0d17",
        borderBottomWidth: 2,
    },
    formInput: {
        width: 250,
        height: 50,
        paddingRight: 10,
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: "400",
        color: "#333334",
    },
    formInputBorder: {
        borderWidth: 1,
        borderRadius: 5,
    },
    formButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0997fe",
        borderRadius: 3,
        width: 80,
        height: 45,
    },
    formTextButton: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
    }

});

export default styles;