import React from "react";
import { tokens, ThemeMode, Theme } from "../theme/Theme";
import { AlertProps } from "../../components/alert/Alert";

export const ThemeContext = React.createContext<Theme>(tokens(ThemeMode.LIGHT));

export const useTheme = () => {
    return React.useContext<Theme>(ThemeContext);
}

export const AlertContext = React.createContext<{props: AlertProps, info: (s:string) => void, warning: (s:string) => void, error: (s:string) => void} | null>(null);

export const useAlert = () => React.useContext(AlertContext);