import { useState, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, tokens, Theme } from "../theme/Theme";
import { ThemeContext } from "../hooks/Hooks";
import Home from './Home';


const Stack = createNativeStackNavigator();

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
    const [theme, setTheme] = useState<Theme>(tokens(mode));



    useEffect(() => {
        const fetchTheme = async () => {
          const preferredTheme = await getPreferredTheme();
          setTheme(tokens(preferredTheme));
        };
    
        fetchTheme();
    }, []);

    return(
        <NavigationContainer screenOptions={{ headerShown: false }}>
            <ThemeContext.Provider value={theme}>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Auth" component={Home} />
                </Stack.Navigator>
            </ThemeContext.Provider>
        </NavigationContainer>
    );
}
