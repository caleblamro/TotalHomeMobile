import { MotiProps, MotiView } from "moti";
import { Text, View, ViewStyle } from "react-native";
import { FillWidthAndCenter, FlexColumn, FlexRow, TitleStyles } from "../../global/styles/Styles";
import { FontSizes, Units } from "../../global/styles/Constants";
import { useTheme } from "../../global/hooks/Hooks";

interface StepProps {
    title: string;
    subTitle: string;
    number: number;
    animationProps: MotiProps<ViewStyle>;
    style?: ViewStyle;
}

export default function Step({ title, number, animationProps, subTitle, style }: StepProps) {
    const theme = useTheme();

    return(
        <MotiView { ...animationProps } style={style}>
            <View style={{ ...FlexRow, alignItems: "center", gap: Units.MEDIUM }}>
                <View style={{ ...FillWidthAndCenter, width: Units.EXTRA_LARGE + 16, height: Units.EXTRA_LARGE + 16, borderColor: theme.palette.alert.info, borderWidth: 1, borderRadius: (Units.EXTRA_LARGE + 16) / 2 }}>
                    <Text style={{ ...TitleStyles, color: theme.palette.alert.info, fontFamily: "Poppins-Medium" }}>
                        { number }
                    </Text>
                </View>
                <View style={{ ...FlexColumn }}>
                    <Text style={{ ...TitleStyles, color: theme.palette.primary.on, fontSize: FontSizes.LARGE}}>{ title }</Text>
                    <Text style={{ ...TitleStyles, color: theme.palette.tertiary.main, fontSize: FontSizes.MEDIUM}}>{ subTitle }</Text>
                </View>
            </View>
        </MotiView>
    );
}