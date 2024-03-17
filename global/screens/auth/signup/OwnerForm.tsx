import { MotiProps, MotiView } from "moti";
import { TextInput, View, ViewStyle, Text } from "react-native";
import { AntdInputWrapperStyle, AntdTextInputStyle, FlexRow, TextInputStyle, TitleStyles } from "../../../styles/Styles";
import { FadeInFromBottom, FadeInFromLeft, FadeInFromRight } from "../../../../components/animation/Animations";
import { FontSizes, Units } from "../../../styles/Constants";
import { useTheme } from "../../../hooks/Hooks";
import { useRef, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { InputItem } from "@ant-design/react-native";
import Input from "../../../../components/input/Input";
import Form from "../../../../components/input/Form";
import { ownerFormData } from "../../../../components/input/Forms";



interface FormProps {
    style?: ViewStyle;
    onFormValidated: ([key]: any) => void;
}

export default function OwnerForm({ onFormValidated }: FormProps) {
    const theme = useTheme();

    return (
        <MotiView>
            <Form fields={ownerFormData(theme)} onSubmit={(obj) => onFormValidated(obj)} />
        </MotiView>
    );
}