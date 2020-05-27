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
        width: "70%",
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
    list: {
        marginTop: 50,
        width: "70%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderBottomWidth: 3,
        borderBottomColor: "#8e8e8e",
        paddingBottom: 3,
    },
    listItens: {
        fontFamily: "Roboto",
        fontSize: 17,
    },
    itens: {
        height: "auto",
        maxHeight: "42%",
        width: "70%",
        borderWidth: 1,
        borderColor: "#8e8e8e",
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomColor: "#8e8e8e",
        borderBottomWidth: 2,
    },
    itemName: {
        width: 70,
        textAlign: "center",
        marginLeft: 2,
    },
    itemQuant: {
        width: 35,
        textAlign: "center",
        marginLeft: -28,
    },
    itemAction: {
        width: 20,
        marginRight: 30,
    },
    requests: {
        marginTop: 20,
        height: "auto",
        maxHeight: "25%",
    },  
    headerRequests: {
        fontFamily: "Roboto",
        fontSize: 18,
        fontWeight: "700",
    },
    requestList: {
        marginTop: 5,
        width: 240,
    },
    request: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomColor: "#8e8e8e",
        borderBottomWidth: 2,
    },
    requestName: {
        fontSize: 17,
        marginRight: 10,
        width: "auto",
        maxWidth: 100,
        textAlign: "center",
    },
    requestAction: {
        marginRight: 15,
        marginLeft: 15,
    },

});

export default styles;