import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { baseButtonStyle } from '../../global/styles/Styles';
import { useTheme } from '../../global/hooks/Hooks';
import { MotiPressable } from 'moti/interactions';

export enum ButtonType {
    FILLED,
    OUTLINED,
}

interface ButtonProps {
    style?: ViewStyle;
    type: ButtonType;
    children: React.ReactNode; // Using the children prop
    onPress: () => void;
    accessibilityLabel: string;
    
}

export default function Button({ style, type, children, onPress, accessibilityLabel }: ButtonProps) {
    const theme = useTheme();

    const typeStyle: ViewStyle = type === ButtonType.FILLED
        ? { backgroundColor: theme.palette.primary.on, borderColor: theme.palette.primary.on }
        : { backgroundColor: 'transparent', borderColor: theme.palette.secondary.main, borderWidth: 1 };

    return (
        <MotiPressable
            animate={useMemo(
                () => ({ hovered, pressed }) => {
                    'worklet'

                    return {
                        scale: hovered || pressed ? 0.95 : 1.05,
                    }
                },
                []
            )} accessibilityLabel={accessibilityLabel} onPress={onPress} style={[baseButtonStyle, typeStyle, style]}>
            {children}
        </MotiPressable>
    );
}