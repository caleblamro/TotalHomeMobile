import { AnimatePresence, MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { DropShadow, FlexRow, IconButtonStyle, NoPadding, TitleStyles } from '../../global/styles/Styles';
import { Ionicons } from '@expo/vector-icons';
import Button, { ButtonType } from '../button/Button';
import { FontSizes, Units } from '../../global/styles/Constants';
import { useTheme } from '../../global/hooks/Hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


// Define the props expected by the Alert component
export enum AlertType {
    INFO,
    ERROR,
    WARNING
}
export interface AlertProps {
    message: string; // The alert message to display
    type: AlertType;
    show: boolean;
}

const Alert: React.FC<AlertProps> = ({ message, type, show }) => {
    const theme = useTheme();
    const [close, setClose] = useState(false);
    const insets = useSafeAreaInsets();
    const onClose = () => {
        setClose(true);
    }

    useEffect(() => {
        if(show) {
            setClose(false);
        }
    }, [show]);

    return (
        <AnimatePresence>
           {show && !close && <MotiView from={{ opacity: 0, translateY: -20 }} animate={{ opacity: 1, translateY: 0 }} exit={{ opacity: 0, translateY: -20 }} exitTransition={{type: "spring"}} transition={{ type: "spring" }} style={{ position: "absolute", top: insets.top + Units.MEDIUM, left: 0, width: "100%", padding: Units.EXTRA_LARGE, paddingTop: 0, paddingBottom: 0}}>
                <View style={{...FlexRow, ...DropShadow, backgroundColor: theme.palette.primary.main, padding: Units.MEDIUM, borderRadius: Units.MEDIUM, justifyContent: "space-between"}}>
                    <View style={{...FlexRow, gap: Units.SMALL, alignItems: "center"}}>
                        {type === AlertType.INFO && <Ionicons name="information-circle" size={Units.EXTRA_LARGE} color={theme.palette.alert.info} />}
                        {type === AlertType.ERROR && <Ionicons name="alert-circle" size={Units.EXTRA_LARGE} color={theme.palette.alert.error} />}
                        {type === AlertType.WARNING && <Ionicons name="warning" size={Units.EXTRA_LARGE} color={theme.palette.alert.warning} />}
                        <Text style={{...TitleStyles, fontSize: FontSizes.MEDIUM, color: theme.palette.primary.on}}>{message}</Text>
                    </View>
                    <Button style={{ ...IconButtonStyle, ...NoPadding, width: Units.EXTRA_LARGE, height: Units.EXTRA_LARGE, backgroundColor: "transparent", opacity: 0.5, shadowOpacity: 0, borderRadius: Units.SMALL + 4 }} onPress={onClose} type={ButtonType.FILLED} accessibilityLabel={'Click to close alert'}>
                        <Ionicons name="close-circle" size={Units.LARGE} color={theme.palette.tertiary.main} />
                    </Button>
                </View>
            </MotiView>}
        </AnimatePresence>
    );
};

export default Alert;