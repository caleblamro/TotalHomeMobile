import { View } from "react-native";
import { Units } from "../styles/Constants";
import { useTheme } from "../hooks/Hooks";
import { dropShadow } from "../styles/Styles";


const Logo = () => {
    const theme = useTheme();

    return(
        <View style={{width: Units.LOGO, height: Units.LOGO, backgroundColor: theme.palette.secondary.main, borderRadius: Units.MEDIUM, ...dropShadow}}>

        </View>
    );
}


export default Logo;