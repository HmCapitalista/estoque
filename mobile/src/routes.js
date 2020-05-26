import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Login from './pages/Login';
import userPage from './pages/userPage';

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LoginPage" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="UserPage" component={userPage} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );

}