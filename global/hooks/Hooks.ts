import React from "react";
import { tokens, ThemeMode, Theme } from "../theme/Theme";

export const ThemeContext = React.createContext<Theme>(tokens(ThemeMode.LIGHT));

export const useTheme = () => {
    return React.useContext<Theme>(ThemeContext);
}