import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "../hooks/Hooks";
import { FillScreen, FillWidthAndCenter, FlexRow, TitleStyles } from "../styles/Styles";
import { ScrollView, MotiView } from "moti";
import { View, Text, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FadeInFromLeft, FadeInFromRight } from "../../components/animation/Animations";
import { FontSizes, Units } from "../styles/Constants";

interface BaseScreenProps {
    title: string;
    subtitle?: string;
    rightAction?: React.ReactNode;
    children?: React.ReactNode;
    scrollEnabled?: boolean;
    style?: ViewStyle;
}

export default function BaseScreen({ title, subtitle, rightAction, scrollEnabled=true, children, style }: BaseScreenProps) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const isFocused = useIsFocused();



    return(
        <ScrollView scrollEnabled={scrollEnabled} showsVerticalScrollIndicator={false} key={isFocused ? 'focused' : 'unfocused'} style={{ ...FillScreen, backgroundColor: theme.palette.primary.main }}>
            <View style={{ ...FillScreen, ...insets }}>
                <View style={{ width: "100%", padding: Units.EXTRA_LARGE, paddingTop: Units.EXTRA_LARGE, paddingBottom: 0 }}>
                    <MotiView style={{ ...FillWidthAndCenter, ...FlexRow, justifyContent: "space-between" }}>
                        <MotiView {...FadeInFromLeft(0)}>
                            <Text style={{...TitleStyles, fontSize: FontSizes.EXTRA_LARGE, color: theme.palette.primary.on}}>{title}</Text>
                            {subtitle && <Text style={{...TitleStyles, fontSize: FontSizes.MEDIUM, color: theme.palette.tertiary.main }}>{subtitle}</Text>}
                        </MotiView>
                        { rightAction && <MotiView {...FadeInFromRight(0)}>
                            { rightAction }
                        </MotiView> }
                    </MotiView>
                </View>
                <View style={{width: "100%", ...style}}>
                    { children }
                </View>
            </View>
        </ScrollView>
    );
}