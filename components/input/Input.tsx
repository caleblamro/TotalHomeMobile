import React from 'react';
import { MotiProps, MotiView } from "moti";
import { ViewStyle, View } from "react-native";
import { useTheme } from "../../global/hooks/Hooks";
import { AntdInputWrapperStyle, AntdTextInputStyle } from "../../global/styles/Styles";
import { InputItem } from "@ant-design/react-native";
import { InputItemProps as AntdInputItemProps } from "@ant-design/react-native/lib/input-item";

interface InputItemProps extends AntdInputItemProps {
  ref?: React.RefObject<InputItem>;
}

export interface InputFieldProps {
    animationProps?: MotiProps<ViewStyle>;
    style?: ViewStyle;
    inputProps?: InputItemProps;
    icon?: React.ReactNode;
}

export default function Input({ animationProps, style, inputProps, icon }: InputFieldProps) {
    const theme = useTheme();

    return (
        <MotiView {...animationProps} style={{ borderColor: theme.palette.tertiary.main, ...AntdInputWrapperStyle, ...style }}>
            {icon}
            <View style={{flex: 1}}>
                <InputItem
                    {...inputProps}
                    clearButtonMode="while-editing"
                    styles={{ ...AntdTextInputStyle, input: { color: theme.palette.primary.on } }}
                    placeholderTextColor={theme.palette.tertiary.on}
                    last
                />
            </View>
        </MotiView>
    );
}