import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "../../hooks/Hooks";
import { fillScreen, fillWidthAndCenter, flexRow, textTitleStyles } from "../../styles/Styles";
import { ScrollView, MotiView } from "moti";
import { View, Text, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fadeInFromLeft, fadeInFromRight } from "../../../components/animation/Animations";
import { FontSizes, Units } from "../../styles/Constants";

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
        <ScrollView scrollEnabled={scrollEnabled} showsVerticalScrollIndicator={false} key={isFocused ? 'focused' : 'unfocused'} style={{ ...fillScreen, backgroundColor: theme.palette.primary.main }}>
            <View style={{ ...fillScreen, ...insets }}>
                <View style={{ width: "100%", padding: Units.EXTRA_LARGE, paddingTop: Units.EXTRA_LARGE, paddingBottom: 0 }}>
                    <MotiView style={{ ...fillWidthAndCenter, ...flexRow, justifyContent: "space-between" }}>
                        <MotiView {...fadeInFromLeft(0)}>
                            <Text style={{...textTitleStyles, fontSize: FontSizes.EXTRA_LARGE, color: theme.palette.primary.on}}>{title}</Text>
                            {subtitle && <Text style={{...textTitleStyles, fontSize: FontSizes.MEDIUM, color: theme.palette.tertiary.main }}>{subtitle}</Text>}
                        </MotiView>
                        { rightAction && <MotiView {...fadeInFromRight(0)}>
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