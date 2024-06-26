import React, { useEffect } from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Units } from '../../global/styles/Constants';
import { useTheme } from '../../global/hooks/Hooks';
import { MotiText, MotiView, useAnimationState } from 'moti';
import { baseButtonStyle, textBodyStyles } from '../../global/styles/Styles';

interface SelectButtonProps {
    label: string;
    iconName: keyof typeof Ionicons.glyphMap;
    isSelected: boolean;
    onPress: () => void;
    accessibilityLabel: string;
    defaultColor: string;
    selectedColor: string;
}

const SelectButton: React.FC<SelectButtonProps> = ({ label, iconName, isSelected, onPress, accessibilityLabel, defaultColor, selectedColor }) => {
    const theme = useTheme();

    const useBackgroundColorAnimation = () => {
        return useAnimationState({
            selected: {
                backgroundColor: selectedColor,
            },
            default: {
                backgroundColor: defaultColor,
                borderColor: selectedColor
            }
        })
    }

    const useColorAnimation = () => {
        return useAnimationState({
            from: {
                color: selectedColor
            },
            selected: {
                color: defaultColor
            },
            default: {
                color: selectedColor
            }
        })
    }

    const backgroundColorAnim = useBackgroundColorAnimation();
    const colorAnim = useColorAnimation();

    useEffect(() => {
        backgroundColorAnim.transitionTo((state) => {
            if(state === "default") {
                return "selected";
            }else{
                return "default";
            }
        });
        colorAnim.transitionTo((state) => {
            if(state === "default") {
                return "selected";
            }else{
                return "default";
            }
        });
    }, [isSelected])

    return (
        <Pressable onPress={onPress}>
            <MotiView state={backgroundColorAnim} style={{ ...baseButtonStyle, shadowOpacity: 0, borderColor: theme.palette.primary.on, borderWidth: 1 }} accessibilityLabel={accessibilityLabel}>
                <MotiText state={colorAnim}>
                    <Ionicons name={iconName} size={Units.LARGE} />
                </MotiText>
                <MotiText state={colorAnim} style={{ ...textBodyStyles, color: theme.palette.primary.on, fontFamily: "Poppins-Medium" }}>{label}</MotiText>
            </MotiView>
        </Pressable>
    );
};

export default SelectButton;
