import { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, tokens, Theme } from "../theme/Theme";
import { ThemeContext } from "../hooks/Hooks";
import Home from './Home';
import Auth from "./Auth";
import Signup from "./Signup";
import { isLoggedIn } from "../../components/auth/AuthFunctions";
import ScreenNav from "./ScreenNav";
import Settings from "./Settings";
import Search from "./Search";
import Services from "./Services";


export type RootStackParamList = {
    Home: {
        userId?: string;
    };
    Auth: {
        theme: string;
    };
    Signup: {
        username: string;
        password: string;
    };
    Search: {

    };
    Settings: {

    };
    Services: {

    }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const prefersDarkScheme = Appearance.getColorScheme() === 'dark';

const getPreferredTheme = async () => {
    let storedTheme = await AsyncStorage.getItem('TOTAL_HOME_THEME');
    let result: ThemeMode = ThemeMode.LIGHT;
    if (storedTheme === null) {
        return prefersDarkScheme ? ThemeMode.DARK : ThemeMode.LIGHT;
    }
    if(storedTheme === "light") {
        return ThemeMode.DARK;
    } else if(storedTheme === "dark") {
        return ThemeMode.DARK;
    }
    return result;
};

export default function ScreenStack() {
    const [mode, _setMode] = useState<ThemeMode>(prefersDarkScheme ? ThemeMode.DARK : ThemeMode.LIGHT);
    const [theme, setTheme] = useState<Theme>(tokens(ThemeMode.LIGHT));



    // useEffect(() => {
    //     const fetchTheme = async () => {
    //       const preferredTheme = await getPreferredTheme();
    //       setTheme(tokens(preferredTheme));
    //     };
    
    //     fetchTheme();
    // }, []);

    return(
        <NavigationContainer>
            <ThemeContext.Provider value={theme}>
                <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false, animation: "none" }}>
                    {/* SET gestureEnabled: false to disable swipe back */}
                    <Stack.Screen name="Home" options={{gestureEnabled: false}} component={Home} />
                    <Stack.Screen name="Settings" options={{gestureEnabled: false}} component={Settings} />
                    <Stack.Screen name="Search" options={{gestureEnabled: false}} component={Search} />
                    <Stack.Screen name="Services" options={{gestureEnabled: false}} component={Services} />
                    <Stack.Screen name="Auth" component={Auth} />
                    <Stack.Screen name="Signup" component={Signup} />
                </Stack.Navigator>
                { isLoggedIn() && <ScreenNav /> }
            </ThemeContext.Provider>
        </NavigationContainer>
    );
}
