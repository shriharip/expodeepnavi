import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import navigationTheme from './navigationTheme';
import { AppStack } from './AppStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRef } from 'react';
import { Linking } from 'react-native';

export default function Routes() {

    const navigationRef: any | undefined = useRef();
    const routeNameRef = useRef();

    return (
        <SafeAreaProvider>
            <NavigationContainer theme={navigationTheme} ref={navigationRef}
                onReady={() =>
                    routeNameRef.current = navigationRef?.current?.getCurrentRoute().name ?? ''}
                onStateChange={async () => {
                    const previousRouteName = routeNameRef.current;
                    const currentRouteName = navigationRef?.current.getCurrentRoute().name;

                    if (previousRouteName !== currentRouteName) {
                        // The line below uses the expo-firebase-analytics tracker
                        // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
                        // Change this line to use another Mobile analytics SDK
                        // await Analytics.setCurrentScreen(currentRouteName, currentRouteName);
                    }
                    // Save the current route name for later comparison
                    routeNameRef.current = currentRouteName;
                }}
                linking={{
                    prefixes: ['exp://'],
                    config: {
                        screens: {
                            Home: {
                                path: ''
                            },
                            Profile: {
                                path: 'profile'
                            },
                            Record: {
                                path: '/users/:id'
                            },
                            Share: {
                                path: 'share'
                            }
                        },
                    },
                }}>
                <AppStack />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}