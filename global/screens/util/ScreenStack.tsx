import { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AppState, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, tokens, Theme } from "../../theme/Theme";
import { AlertContext, ThemeContext } from "../../hooks/Hooks";
import Home from '../owner/home/Home';
import Auth from "../auth/login/Auth";
import Signup from "../auth/signup/Signup";
import ScreenNav from "./ScreenNav";
import Settings from "../owner/settings/Settings";
import Search from "../owner/search/Search";
import Services from "../owner/services/Services";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../api/supabase/supabase";
import { OwnerUser, ProviderUser, getCurrentUserInformation } from "../../api/Api";
import Alert, { AlertProps, AlertType } from "../../../components/alert/Alert";
import { SafeAreaProvider } from "react-native-safe-area-context";


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
    const [alertProps, setAlertProps] = useState<AlertProps>({ show: false, message: '', type: AlertType.INFO });
    const info = (message: string) => {
        setAlertProps({ show: true, message, type: AlertType.INFO });
        setTimeout(() => {
            setAlertProps((prev) => { 
                return { ...prev, show: false };
            })
        }, 3500);
    }
    const warning = (message: string) => {
        setAlertProps({ show: true, message, type: AlertType.WARNING });
        setTimeout(() => {
            setAlertProps((prev) => { 
                return { ...prev, show: false };
            })
        }, 3500);
    }
    const error = (message: string) => {
        setAlertProps({ show: true, message, type: AlertType.ERROR });
        setTimeout(() => {
            setAlertProps((prev) => { 
                return { ...prev, show: false };
            })
        }, 3500);
    }

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
            <AlertContext.Provider value={{ props: alertProps, info, warning, error }}>
                <ThemeContext.Provider value={theme}>
                    <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Auth"} screenOptions={{ headerShown: false, animation: "none" }}>
                        {/* SET gestureEnabled: false to disable swipe back */}
                        <Stack.Screen name="Home" options={{ gestureEnabled: false }} initialParams={{ session: session }} component={Home} />
                        <Stack.Screen name="Settings" options={{ gestureEnabled: false }} initialParams={{ session: session }} component={Settings} />
                        <Stack.Screen name="Search" options={{ gestureEnabled: false }} initialParams={{ session: session }} component={Search} />
                        <Stack.Screen name="Services" options={{ gestureEnabled: false }} initialParams={{ session: session }} component={Services} />
                        <Stack.Screen name="Auth" options={{ gestureEnabled: false }} component={Auth} />
                        <Stack.Screen name="Signup" options={{ gestureEnabled: false }} component={Signup} />
                    </Stack.Navigator>
                    <SafeAreaProvider style={{position: "absolute", width: "100%"}}>
                        <Alert type={alertProps.type} message={alertProps.message} show={alertProps.show} />
                    </SafeAreaProvider>
                    {isLoggedIn && <ScreenNav session={session} />}
                </ThemeContext.Provider>
            </AlertContext.Provider>
        </NavigationContainer>
    );
}
