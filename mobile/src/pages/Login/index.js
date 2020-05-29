import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import styles from './styles';

export default function Login({ navigation }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [userView, setUV] = useState(new Animated.Value(1));
    const [passwordView, setPV] = useState(new Animated.Value(1));

    const [userPos, setUP] = useState(new Animated.Value(1));
    const [passwordPos, setPP] = useState(new Animated.Value(1));

    const [formAnimation, setFA] = useState(new Animated.Value(1));

    const passwordInput = useRef(null);

    let userColor = userView.interpolate({
        inputRange: [0, 1],
        outputRange: ["#ff0909", "#87878b"]

    });
    let passwordColor = passwordView.interpolate({
        inputRange: [0, 1],
        outputRange: ["#ff0909", "#87878b"]

    });

    const auth = async () => {
        try {
            const name = await AsyncStorage.getItem('name');
            if(name) {
                navigation.navigate('UserPage');

            }

        }catch(err) {}

    }

    useEffect(() => {
        auth();
        Animated.timing(formAnimation, {
            toValue: 0,
            duration: 2500
        }).start();

    }, []);

    const enterProfile = async () => {
        if(user) {
            try {
                const response = await api.post('/enterProfile', {
                    name: user,
                    password: password,
                });

                if (response.data.accountType === "adm") {
                    alert('Use o site para acessar a conta adm');
                } else {
                    try {
                        const id = String(response.data.accountId);
                        await AsyncStorage.setItem('name', user);
                        await AsyncStorage.setItem('accountId', id);
                        
                        setTimeout(() => {
                            navigation.navigate('UserPage');
                        }, 1000);

                        

                    }catch(err) {}
                }

            } catch (err) {
                if(err.response !== undefined) {
                    if(err.response.data.error === "doesn't exist any user with this name") {
                        Animated.timing(passwordView, {
                            toValue: 1,
                            duration: 0,
                        }).start();
                        Animated.timing(userView, {
                            toValue: 0,
                            duration: 200, 
                        }).start();
                        Animated.sequence([
                            Animated.timing(userPos, {
                                toValue: 1,
                                duration: 150,
                            }),
                            Animated.timing(userPos, {
                                toValue: 0,
                                duration: 150, 
                            }),
                            Animated.timing(userPos, {
                                toValue: 2,
                                duration: 150,
                            }),
                            Animated.timing(userPos, {
                                toValue: 1,
                                duration: 150,
                            }),
            
                        ]).start();
                        setTimeout(() => {
                            Animated.timing(userView, {
                                toValue: 1,
                                duration: 200, 
                            }).start();
                        }, 5000);
    
                    } else if(err.response.data.error === "Password is wrong") {
                        Animated.timing(userView, {
                            toValue: 1,
                            duration: 0,
                        }).start();
                        Animated.timing(passwordView, {
                            toValue: 0,
                            duration: 200, 
                        }).start();
                        Animated.sequence([
                            Animated.timing(passwordPos, {
                                toValue: 1,
                                duration: 150,
                            }),
                            Animated.timing(passwordPos, {
                                toValue: 0,
                                duration: 150, 
                            }),
                            Animated.timing(passwordPos, {
                                toValue: 2,
                                duration: 150,
                            }),
                            Animated.timing(passwordPos, {
                                toValue: 1,
                                duration: 150,
                            }),
            
                        ]).start();
                        setTimeout(() => {
                            Animated.timing(passwordView, {
                                toValue: 1,
                                duration: 200, 
                            }).start();
                        }, 5000);
    
                    } else {
                        alert('Tente novamente');

                    }
                }else {
                    alert('Verifique sua conexão com a internet e tente novamente');
                }

            }

        }else if(!user) {
            Animated.timing(passwordView, {
                toValue: 1,
                duration: 0,
            }).start();
            Animated.timing(userView, {
                toValue: 0,
                duration: 200, 
            }).start();
            Animated.sequence([
                Animated.timing(userPos, {
                    toValue: 1,
                    duration: 150,
                }),
                Animated.timing(userPos, {
                    toValue: 0,
                    duration: 150, 
                }),
                Animated.timing(userPos, {
                    toValue: 2,
                    duration: 150,
                }),
                Animated.timing(userPos, {
                    toValue: 1,
                    duration: 150,
                }),

            ]).start();
            setTimeout(() => {
                Animated.timing(userView, {
                    toValue: 1,
                    duration: 200, 
                }).start();
            }, 5000);

        }

    }

    return (
        <View style={styles.default}>
            <Text style={styles.header}>Estoque Tecnet</Text>
            <Animated.View style={{...styles.formView, top: formAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '-120%'],
            })}}>
                <Text style={styles.formText}>Login</Text>
                <Animated.View style={{...styles.formInputBorder, borderColor: userColor, right: userPos.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: ['5%', '0%', '-5%']
                })}}>
                    <TextInput returnKeyType="next" onSubmitEditing={() => {passwordInput.current.focus()}} value={user} onChange={e=>{setUser(e.nativeEvent.text)}} 
                    style={styles.formInput} placeholder="Usuário" />
                </Animated.View>
                <Animated.View style={{...styles.formInputBorder, borderColor: passwordColor, right: passwordPos.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: ['5%', '0%', '-5%'],
                })}}>
                    <TextInput ref={passwordInput} returnKeyType="send" onSubmitEditing={enterProfile} secureTextEntry={true} value={password} onChange={e=>{setPassword(e.nativeEvent.text)}} style={styles.formInput} placeholder="Senha" />
                </Animated.View>
                <TouchableOpacity onPress={enterProfile} style={styles.formButton}><Text style={styles.formTextButton}>Entrar</Text></TouchableOpacity>
            </Animated.View>
        </View>
    );
}