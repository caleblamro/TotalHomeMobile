import { MotiProps, MotiView } from "moti";
import { ViewStyle } from "react-native";
import { BaseCardStyle } from "../../global/styles/Styles";

export interface CardContainerProps {
    animationProps?: MotiProps<ViewStyle>;
    style?: ViewStyle;
    children?: React.ReactNode;
}

export default function CardContainer({ animationProps, style, children }: CardContainerProps) {

    return(
        <MotiView { ...animationProps } style={{ ...BaseCardStyle, ...style }}>
            { children }
        </MotiView>
    );
}