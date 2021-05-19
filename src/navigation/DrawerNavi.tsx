
import * as React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, View, StyleSheet, Alert, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
const { Navigator, Screen } = createDrawerNavigator();
import * as Linking from 'expo-linking';

// const { Navigator, Screen } = createStackNavigator();

const ProfileScreen = () => {
    const navigation = useNavigation();
    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>PROFILE</Text>
            <Button
                onPress={() => navigation.navigate('Home')}
                title="Go to Home"
            />
        </View>

    );
}



function HomeScreen() {
    const navigation = useNavigation();

    const _handlePress = () => {
        Linking.openURL('exp://192.168.0.11:19000/users/someid');
    };
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <Button
                onPress={() => navigation.navigate('Profile')}
                title="Go to Profile"
            />
            <Button
                onPress={() => navigation.navigate('Share')}
                title="Go to Share"
            />
            <Button
                // onPress={() => navigation.navigate('Record', { id: 'userid123' })}
                onPress={_handlePress}
                title="Go to Record"
            />
        </View>
    );
}

type ParamList = {
    Record: {
        id: string;
    };
};

function RecordScreen() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<ParamList, 'Record'>>();

    React.useEffect(() => {
        console.log(route.params.id);

    });
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> Record Screen</Text>
            <Button
                onPress={() => navigation.navigate('Home')}
                title="Go Back"
            />e
        </View>
    );
}

function ShareScreen() {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> Share Screen</Text>
            <Button onPress={() => navigation.navigate('Home')} title="Go to Home" />
        </View>
    );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (

        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Record" component={RecordScreen} />
            <Drawer.Screen name="Share" component={ShareScreen} />
        </Drawer.Navigator>

    );
}