import { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AppState, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, tokens, Theme } from "../../theme/Theme";
import { AlertContext, ThemeContext } from "../../hooks/Hooks";
import OwnerHome from '../owner/home/OwnerHome';
import Auth from "../auth/login/Auth";
import Signup from "../auth/signup/Signup";
import OwnerScreenNav from "../owner/OwnerScreenNav";
import OwnerSettings from "../owner/settings/OwnerSettings";
import OwnerSearch from "../owner/search/OwnerSearch";
import OwnerServices from "../owner/services/OwnerServices";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../api/supabase/supabase";
import { AccountType, OwnerUser, ProviderUser, getCurrentUserInformation } from "../../api/Api";
import Alert, { AlertProps, AlertType } from "../../../components/alert/Alert";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProviderHome from "../provider/home/ProviderHome";
import ProviderSearch from "../provider/search/ProviderSearch";
import ProviderClients from "../provider/clients/ProviderClients";
import ProviderSettings from "../provider/settings/ProviderSettings";


export type RootStackParamList = {
    OwnerHome: {
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
    OwnerSearch: {
        session: Session | null;
    };
    OwnerSettings: {
        session: Session | null;
    };
    OwnerServices: {
        session: Session | null;
    };
    ProviderHome: {
        session: Session | null;
    };
    ProviderClients: {
        session: Session | null;
    };
    ProviderSettings: {
        session: Session | null;
    };
    ProviderSearch: {
        session: Session | null;
    };
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
            if(session) {
                const data = await getCurrentUserInformation(session);
                setUserInfo(data);
            }
        }
        fn();
    }, [session]);

    
    const isLoggedIn = session !== undefined && session !== null && session?.user;
    const isUserHomeOwner = userInfo?.accountType === AccountType.OWNER;
    const initialRoute = isLoggedIn ? ( isUserHomeOwner ? "OwnerHome" : "ProviderHome" ) : "Auth";


    return (
        <NavigationContainer key={isLoggedIn ? "loggedIn" : "notLoggedIn"}>
            <AlertContext.Provider value={{ props: alertProps, info, warning, error }}>
                <ThemeContext.Provider value={theme}>
                    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false, animation: "none" }}>
                        <Stack.Screen name="Auth" options={{ gestureEnabled: false }} component={Auth} />
                        <Stack.Screen name="Signup" options={{ gestureEnabled: false }} component={Signup} />
                        <Stack.Screen name="OwnerHome" options={{ gestureEnabled: false }} initialParams={{ session: session }} component={OwnerHome} />
                        <Stack.Screen name="OwnerSettings" options={{ gestureEnabled: false }} initialParams={{ session: session }} component={OwnerSettings} />
                        <Stack.Screen name="OwnerSearch" options={{ gestureEnabled: false }} initialParams={{ session: session }} component={OwnerSearch} />
                        <Stack.Screen name="OwnerServices" options={{ gestureEnabled: false }} initialParams={{ session: session }} component={OwnerServices} />
                        <Stack.Screen name="ProviderHome" options={{ gestureEnabled: false }} initialParams={{ session: session }} component={ProviderHome} />
                        <Stack.Screen name="ProviderSearch" options={{ gestureEnabled: false }} initialParams={{ session: session }} component={ProviderSearch} />
                        <Stack.Screen name="ProviderClients" options={{ gestureEnabled: false }} initialParams={{ session: session }} component={ProviderClients} />
                        <Stack.Screen name="ProviderSettings" options={{ gestureEnabled: false }} initialParams={{ session: session }} component={ProviderSettings} />
                    </Stack.Navigator>
                    <SafeAreaProvider style={{position: "absolute", width: "100%"}}>
                        <Alert type={alertProps.type} message={alertProps.message} show={alertProps.show} />
                    </SafeAreaProvider>
                    {isUserHomeOwner && isLoggedIn && <OwnerScreenNav session={session} />}
                </ThemeContext.Provider>
            </AlertContext.Provider>
        </NavigationContainer>
    );
}
