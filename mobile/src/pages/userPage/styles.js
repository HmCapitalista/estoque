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
        marginTop: 20,
        width: 300,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textHeader: {
        width: 200,
        fontFamily: "Roboto",
        fontWeight: "600",
        fontSize: 20,
    },

});

export default styles;