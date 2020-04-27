
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screen/HomeScreen';
import AsteroidListScreen from './screen/AsteroidListScreen';
import AsteroidDetailScreen from './screen/AsteroidDetailScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Assignment' }}
                />
                <Stack.Screen
                    name="AsteroidListScreen"
                    component={AsteroidListScreen}
                    options={{ title: 'Asteroid List' }}
                />
                <Stack.Screen
                    name="AsteroidDetailScreen"
                    component={AsteroidDetailScreen}
                    options={{ title: 'Asteroid Data' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}