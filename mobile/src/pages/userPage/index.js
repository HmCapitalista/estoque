import React, { useState, useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';

import api from '../../services/api';
import client from '../../services/socket';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function userPage({ navigation }) {
    
    const [name, setName] = useState('');

    const defineVariables = async () => {
        try {
            setName(await AsyncStorage.getItem('name'));

        } catch(err) {}

    }

    const socketClient = () => {
        client.on('reload');
    }

    const backFunc = async () => {
        try {
            await AsyncStorage.removeItem('name');
            navigation.goBack();

        }catch (err) {}

    }

    useEffect(() => {
        defineVariables();
        socketClient();


        const handler = BackHandler.addEventListener("hardwareBackPress", backFunc);

        return () => handler.remove();

    }, []);
    
    return (
        <View style={styles.default}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Olá {name}</Text>
                <TouchableOpacity onPress={backFunc}>
                    <Icon name="log-out" color="red" size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
}