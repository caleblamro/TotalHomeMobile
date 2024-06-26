import { MotiView } from "moti";
import { View, ViewStyle, Modal as NativeModal, Text } from "react-native";
import { fadeInFromBottom } from "../animation/Animations";
import { fillScreen, fillWidthAndCenter, flexRow, iconButtonStyle, noPadding, textTitleStyles } from "../../global/styles/Styles";
import Button, { ButtonType } from "../button/Button";
import { Ionicons } from '@expo/vector-icons';
import { Units, FontSizes } from "../../global/styles/Constants";
import { useTheme } from "../../global/hooks/Hooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fadeInFromLeft, fadeInFromRight } from "../../components/animation/Animations";


interface ModalProps {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
    style?: ViewStyle;
    onClose: () => void;
    open: boolean;
}
const Modal: React.FC<ModalProps> = ({ title, subtitle, onClose, children, open, style }) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <NativeModal animationType="slide" visible={open} presentationStyle="fullScreen" style={{backgroundColor: theme.palette.primary.main}}>
            <View style={{ ...fillScreen, padding: Units.EXTRA_LARGE, paddingTop: Units.EXTRA_LARGE + insets.top, backgroundColor: theme.palette.primary.main }}>
                <MotiView>
                    <MotiView style={{ ...fillWidthAndCenter, ...flexRow, justifyContent: "space-between" }}>
                        <MotiView {...fadeInFromLeft(4)}>
                            <Text style={{ ...textTitleStyles, fontSize: FontSizes.EXTRA_LARGE, color: theme.palette.primary.on }}>{title}</Text>
                            {subtitle && <Text style={{ ...textTitleStyles, fontSize: FontSizes.MEDIUM, color: theme.palette.tertiary.main }}>{subtitle}</Text>}
                        </MotiView>
                        <MotiView {...fadeInFromRight(4)}>
                            <Button type={ButtonType.FILLED} style={{ ...iconButtonStyle, ...noPadding, width: Units.EXTRA_LARGE + Units.SMALL, height: Units.EXTRA_LARGE + Units.SMALL, shadowOpacity: 0 }} onPress={() => onClose()} accessibilityLabel={`Press to close ${title} modal`}>
                                <Ionicons name="close" size={Units.LARGE} color={theme.palette.primary.main} />
                            </Button>
                        </MotiView>
                    </MotiView>

                </MotiView>
                <MotiView {...fadeInFromBottom(5)} style={{marginTop: Units.LARGE, ...style}}>
                    {children}
                </MotiView>
            </View>
        </NativeModal>
    );
}

export default Modal;