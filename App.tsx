import React from "react";
import ScreenStack from "./global/screens/util/ScreenStack";
import { useFonts } from 'expo-font';
import Loading from "./global/screens/util/Loading";
import { StatusBar } from "expo-status-bar";

export default function App() {
    const fonts = [
        "./assets/font/Poppins-Black.ttf",
        "./assets/font/Poppins-BlackItalic.ttf",
        "./assets/font/Poppins-Bold.ttf",
        "./assets/font/Poppins-BoldItalic.ttf",
        "./assets/font/Poppins-ExtraBold.ttf",
        "./assets/font/Poppins-ExtraBoldItalic.ttf",
        "./assets/font/Poppins-ExtraLight.ttf",
        "./assets/font/Poppins-ExtraLightItalic.ttf",
        "./assets/font/Poppins-Italic.ttf",
        "./assets/font/Poppins-Light.ttf",
        "./assets/font/Poppins-LightItalic.ttf",
        "./assets/font/Poppins-Medium.ttf",
        "./assets/font/Poppins-MediumItalic.ttf",
        "./assets/font/Poppins-Regular.ttf",
        "./assets/font/Poppins-SemiBold.ttf",
        "./assets/font/Poppins-SemiBoldItalic.ttf",
        "./assets/font/Poppins-Thin.ttf",
        "./assets/font/Poppins-ThinItalic.ttf"
    ]
    const [fontsLoaded] = useFonts({
        "Poppins-Medium": require("./assets/font/Poppins-Medium.ttf"),
        "Poppins-Regular": require("./assets/font/Poppins-Regular.ttf"),
        "Poppins-Bold": require("./assets/font/Poppins-Bold.ttf"),
    });

    return (
        <React.Fragment>
            <StatusBar style="dark" />
            { fontsLoaded && <ScreenStack /> }
            { !fontsLoaded && <Loading /> }
        </React.Fragment>
    );
}