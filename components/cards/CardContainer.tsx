import { MotiProps, MotiView } from "moti";
import { ViewStyle } from "react-native";
import { baseCardStyle } from "../../global/styles/Styles";

export interface CardContainerProps {
    animationProps?: MotiProps<ViewStyle>;
    style?: ViewStyle;
    children?: React.ReactNode;
}

export default function CardContainer({ animationProps, style, children }: CardContainerProps) {

    return(
        <MotiView { ...animationProps } style={{ ...baseCardStyle, ...style }}>
            { children }
        </MotiView>
    );
}