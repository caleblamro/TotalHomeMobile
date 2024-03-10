import { useNavigation } from "@react-navigation/native";
import { MotiView } from "moti";
import { FadeInFromBottom } from "../../components/animation/Animations";
import { FlexRow, NavigationStyle } from "../styles/Styles";
import { Ionicons } from '@expo/vector-icons';
import { Units } from "../styles/Constants";
import { Dimensions, Pressable } from "react-native";
import { useTheme } from "../hooks/Hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { RootStackParamList } from "./ScreenStack";

export default function ScreenNav() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const theme = useTheme();
    const [currentScreen, setCurrentScreen] = useState(0);
    const screenWidth = Dimensions.get("screen").width;

    interface MenuInterface {
        name: "Home" | "Settings" | "Search" | "Services";
        icon: React.ReactElement;
    }
    
    const menuRoutes: MenuInterface[] = [
        {
            name: "Home",
            icon: <Ionicons name="home" size={Units.LARGE} color={currentScreen === 0 ? theme.palette.primary.on : theme.palette.tertiary.main} />
        },
        {
            name: "Search",
            icon: <Ionicons name="search" size={Units.LARGE} color={currentScreen === 1 ? theme.palette.primary.on : theme.palette.tertiary.main} />
        },
        {
            name: "Services",
            icon: <Ionicons name="calendar" size={Units.LARGE} color={currentScreen === 2 ? theme.palette.primary.on : theme.palette.tertiary.main} />
        },
        {
            name: "Settings",
            icon: <Ionicons name="settings" size={Units.LARGE} color={currentScreen === 3 ? theme.palette.primary.on : theme.palette.tertiary.main} />
        },
    ]

    const navigateTo = (obj: MenuInterface, index: number) => {
        setCurrentScreen(index);
        navigation.navigate(obj.name, {});
    }

    
    const menuItemWidth = screenWidth / menuRoutes.length;
    const iconWidth = Units.LARGE; // Assuming this is the width of the icon

    return(
        <MotiView { ...FadeInFromBottom(0) } style={{ ...NavigationStyle, backgroundColor: theme.palette.secondary.on }}>
            {menuRoutes.map((obj, index) => {
                return(
                    <Pressable accessibilityLabel={`Press to navigate to ${obj.name} screen`} style={{width: Units.LARGE * 2, height: Units.LARGE * 2, ...FlexRow, alignItems: "center", justifyContent: "center"}} key={`menuButton${index}`} onPress={() => navigateTo(obj, index)}>
                        <MotiView>
                            {obj.icon}
                        </MotiView>
                    </Pressable>
                );
            })}
        </MotiView>
    );
}