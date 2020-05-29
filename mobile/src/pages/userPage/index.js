import React, { useState, useEffect } from 'react';
import { View, Text, BackHandler, SafeAreaView } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';

import api from '../../services/api';
import client from '../../services/socket';

export default function userPage({ navigation }) {
    
    const [name, setName] = useState('');
    const [accountId, setAccountId] = useState(0);

    const [stock, setStock] = useState([]);
    const [requests, setRequests] = useState([]);
    const [active, setActive] = useState(false);
    const [atualization, setAtualization] = useState(1);

    const defineVariables = async () => {
        try {
            setName(await AsyncStorage.getItem('name'));
            setAccountId(parseInt(await AsyncStorage.getItem('accountId')));

        } catch(err) {}

    }

    let socketClient = () => {
        client.on('reload', () => {
            reloadPage();

        });

        client.emit('requestsRequest', '');

        client.on('requests', requesds => {
            setRequests(requesds);
            setAtualization(atualization+1);
            let count = 0;
            requesds.forEach(item => {
                if(item.accountId === accountId){
                    count++;

                }

            });
            if(count !== 0) {
                setActive(true);
            } else {
                setActive(false);
            }

        });

    }

    const backFunc = async () => {
        try {
            await AsyncStorage.removeItem('name');
            navigation.goBack();

        }catch (err) {}

    }

    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.itemName}>
                    {item.itemName}
                </Text>
                <Text style={styles.itemQuant}>
                    {item.itemQuant}
                </Text>
                <TouchableOpacity style={styles.itemAction} onPress={() => {requestItem(item)}}>
                    <Icon name="send" color="blue" size={20} />
                </TouchableOpacity>
            </View>
        );

    }

    const renderRequest = (item, idx) => {
        if(name === item.name) {
            return (
                <View style={styles.request}>
                    <Text style={styles.requestName}>{item.itemName}:</Text>
                    <TouchableOpacity style={styles.requestAction} onPress={() => {RequestItemAction(item, "+", idx)}}>
                        <Icon name="plus" color="#39f704" size={25} />
                    </TouchableOpacity>
                    <Text>{item.requestQuant}</Text>
                    <TouchableOpacity style={styles.requestAction} onPress={() => {RequestItemAction(item, "-", idx)}}>
                        <Icon name="minus" color="red" size={25} />
                    </TouchableOpacity>
                </View>
            );

        }

    }

    const getStock = async () => {
        try {
            const response = await api.get('/stock');

            setStock(response.data);

        }catch(err) {
            alert('Verifique sua conexão e tente novamente');
        }

    }

    useEffect(() => {
        defineVariables();
        socketClient();
        getStock();


        const handler = BackHandler.addEventListener("hardwareBackPress", backFunc);

        return () => handler.remove();

    }, []);

    const renderButton = () => {
        return (
            <TouchableOpacity style={styles.cancelButton} onPress={() => {RequestDelete()}}>
                <Text style={styles.cancelButtonText}>Cancelar pedidos</Text>
            </TouchableOpacity>
        );

    }

    let requestItem = (item) => {
        let itemName = item.itemName;
        let itemQuant = item.itemQuant;
        let requestQuant = 1;
        let id = item.id;
        switch(requests.length) {
            case 0: 
                let re = [{ name, accountId, itemName , itemQuant, id, requestQuant }];
                setRequests(re);
                setActive(true);
                client.emit('request', re);
                break;

            case 4:
                break;

            default:
                let exists = false;
                requests.forEach((iten) => {
                    if(iten.id === id) {
                        exists = true;
                    }
                });

                if(exists === false) {
                    let re = [...requests, { name, accountId, itemName , itemQuant, id, requestQuant }];
                    setRequests(re);
                    setActive(true);
                    setAtualization(atualization+1);
                    client.emit('request', re);
                }

        }

    }

    let RequestItemAction = (item, mode, idx) => {
        switch(mode) {
            case "+":
                if(requests[idx].requestQuant <= item.itemQuant - 1) {
                    item.requestQuant = item.requestQuant + 1;
                }
                requests[idx] = item;

                setRequests(requests);
                client.emit('request', requests);
                break;

            default:
                item.requestQuant = item.requestQuant - 1;
                requests[idx] = item;
                if(requests[idx].requestQuant === 0) {
                    requests.splice(idx, 1);
                    setRequests(requests);
                    if(requests.length === 0) {
                        setActive(false);
                    }

                }else {
                    setRequests(requests);

                }
                client.emit('request', requests);

        }

        setAtualization(atualization+1);

    }

    const RequestDelete = () => {
        const requesds = requests;
        let define = [];

        requesds.forEach((item, index) => {
            if(!(accountId === item.accountId)) {
                define = [...define, item];
            }
        });

        setRequests(define);
        setActive(false);
        client.emit('request', define);

    }
    
    return (
        <View style={styles.default}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Olá {name}</Text>
                <TouchableOpacity onPress={backFunc}>
                    <Icon name="log-out" color="red" size={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.list}>
                <Text style={styles.listItens}>Itens</Text>
                <Text style={styles.listItens}>Quantidade</Text>
                <Text style={styles.listItens}>Açoes</Text>
            </View>
            <SafeAreaView style={styles.itens}>
                <FlatList
                    data={stock}
                    renderItem={({ item }) => renderItem(item)}
                    keyExtractor={(i, index) => String(index)}
                />
            </SafeAreaView>
            <SafeAreaView style={styles.requests}>
                <Text style={styles.headerRequests}>Pedidos(max: 4)</Text>
                <FlatList
                    style={styles.requestList}
                    data={requests}
                    renderItem={({ item, index }) => renderRequest(item, index)}
                    keyExtractor={(i, idx) => String(idx)}
                />
                {active ? renderButton() : <View></View>}
            </SafeAreaView>
        </View>
    );
}