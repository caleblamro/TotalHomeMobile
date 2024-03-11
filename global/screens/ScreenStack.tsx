import { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AppState, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, tokens, Theme } from "../theme/Theme";
import { ThemeContext } from "../hooks/Hooks";
import Home from './Home';
import Auth from "./Auth";
import Signup from "./Signup";
import ScreenNav from "./ScreenNav";
import Settings from "./Settings";
import Search from "./Search";
import Services from "./Services";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../api/supabase/supabase";
import { OwnerUser, ProviderUser, getCurrentUserInformation } from "../api/Api";


export type RootStackParamList = {
    Home: {
        userId?: string;
        session: Session | null;
    };
    Auth: {
        session: Session | null;
    };
    Signup: {
        username: string;
        password: string;
        session: Session | null;
    };
    Search: {
        session: Session | null;
    };
    Settings: {
        session: Session | null;
    };
    Services: {
        session: Session | null;
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
    if (storedTheme === "light") {
        return ThemeMode.DARK;
    } else if (storedTheme === "dark") {
        return ThemeMode.DARK;
    }
    return result;
};

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

export default function ScreenStack() {
    const [mode, _setMode] = useState<ThemeMode>(prefersDarkScheme ? ThemeMode.DARK : ThemeMode.LIGHT);
    const [theme, setTheme] = useState<Theme>(tokens(ThemeMode.LIGHT));
    const [session, setSession] = useState<Session | null>(null);
    const [userInfo, setUserInfo] = useState<OwnerUser | ProviderUser | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

    }, []);

    useEffect(() =>{
        const fn = async () => {
            const data = await getCurrentUserInformation(session)
            console.log(data);
            setUserInfo(data);
        }
        fn();
    }, [session]);

    const isLoggedIn = session !== undefined && session !== null && session?.user;


    return (
        <NavigationContainer key={isLoggedIn ? "loggedIn" : "notLoggedIn"}>
            <ThemeContext.Provider value={theme}>
                <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Auth"} screenOptions={{ headerShown: false, animation: "none" }}>
                    {/* SET gestureEnabled: false to disable swipe back */}
                    <Stack.Screen name="Home" options={{ gestureEnabled: false }} initialParams={{ session: session }} component={Home} />
                    <Stack.Screen name="Settings" options={{ gestureEnabled: false }} initialParams={{ session: session }} component={Settings} />
                    <Stack.Screen name="Search" options={{ gestureEnabled: false }} initialParams={{ session: session }} component={Search} />
                    <Stack.Screen name="Services" options={{ gestureEnabled: false }} initialParams={{ session: session }} component={Services} />
                    <Stack.Screen name="Auth" component={Auth} />
                    <Stack.Screen name="Signup" component={Signup} />
                </Stack.Navigator>
                {isLoggedIn && <ScreenNav session={session} />}
            </ThemeContext.Provider>
        </NavigationContainer>
    );
}
