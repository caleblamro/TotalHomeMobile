
import { MotiProps, MotiView } from "moti";
import { TextInput, View, ViewStyle, Text } from "react-native";
import { AntdInputWrapperStyle, AntdTextInputStyle, FlexRow, TextInputStyle, TitleStyles } from "../../../styles/Styles";
import { FadeInFromBottom } from "../../../../components/animation/Animations";
import { FontSizes, Units } from "../../../styles/Constants";
import { useTheme } from "../../../hooks/Hooks";
import { useRef, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { InputItem } from "@ant-design/react-native";
import Input from "../../../../components/input/Input";
import Form from "../../../../components/input/Form";
import { providerFormData } from "../../../../components/input/Forms";

interface FormItem {
    label: string;

}

interface FormProps {
    style?: ViewStyle;
}

export default function ProviderForm({ }: FormProps) {
    const theme = useTheme();


    return (
        <MotiView>
            <Form fields={providerFormData(theme)} onSubmit={(obj) => console.log("Submitted", obj)} />
        </MotiView>
    );
}