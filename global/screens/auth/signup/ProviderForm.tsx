
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

interface FormItem {
    label: string;

}

interface FormProps {
    animationProps: MotiProps<ViewStyle>;
    style?: ViewStyle;
}

export default function ProviderForm({ animationProps }: FormProps) {
    const theme = useTheme();
    const firstNameRef = useRef<InputItem | null>(null);
    const [firstName, setFirstName] = useState<string>("");
    const lastNameRef = useRef<InputItem | null>(null);
    const [lastName, setLastName] = useState<string>("");
    const emailInputRef = useRef<InputItem>(null);
    const [email, setEmail] = useState<string>("");
    const addressInputRef = useRef<InputItem>(null);
    const [address, setAddress] = useState<string>("");
    const businessNameRef = useRef<InputItem>(null);
    const [businessName, setBusinessName] = useState<string>("");
    const usernameInputRef = useRef<InputItem>(null);
    const [username, setUsername] = useState<string>("");


    return (
        <MotiView>
            <MotiView style={{ ...FlexRow, width: "100%", justifyContent: "space-between" }}>
                <MotiView style={{ ...FlexRow, width: "100%", marginTop: Units.MEDIUM, justifyContent: "space-between" }}>
                    <Input
                        animationProps={{ ...FadeInFromBottom(1) }}
                        style={{ width: "49%" }}
                        icon={<Ionicons name="person-circle" color={theme.palette.primary.on} size={Units.LARGE} />}
                        inputProps={{
                            autoCapitalize: "words",
                            autoCorrect: true,
                            autoComplete: "cc-given-name",
                            type: "default",
                            returnKeyType: "next",
                            returnKeyLabel: "Next",
                            value: firstName,
                            onChangeText: setFirstName,
                            accessibilityLabel: "Enter first name",
                            placeholder: "First Name",
                            ref: lastNameRef,
                            onSubmitEditing: () => lastNameRef.current?.focus()
                        }}
                    />
                    <Input
                        animationProps={{ ...FadeInFromBottom(1) }}
                        style={{ width: "49%" }}
                        inputProps={{
                            autoCapitalize: "words",
                            autoCorrect: true,
                            autoComplete: "cc-family-name",
                            returnKeyType: "next",
                            returnKeyLabel: "Next",
                            value: lastName,
                            onChangeText: setLastName,
                            accessibilityLabel: "Enter last name",
                            placeholder: "Last Name",
                            ref: lastNameRef,
                            onSubmitEditing: () => emailInputRef.current?.focus()
                        }}
                    />
                </MotiView>
            </MotiView>
            <Input
                animationProps={{ ...FadeInFromBottom(2) }}
                style={{ width: "100%" }}
                icon={<Ionicons name="mail" color={theme.palette.primary.on} size={Units.LARGE} />}
                inputProps={{
                    autoCapitalize: "none",
                    autoCorrect: true,
                    type: "email-address",
                    autoComplete: "email",
                    returnKeyType: "next",
                    returnKeyLabel: "Next",
                    value: email,
                    onChangeText: setEmail,
                    accessibilityLabel: "Enter email",
                    placeholder: "Email",
                    ref: emailInputRef,
                    onSubmitEditing: () => businessNameRef.current?.focus()
                }}
            />
            <Input
                animationProps={{ ...FadeInFromBottom(2) }}
                style={{ width: "100%" }}
                icon={<Ionicons name="person-add" color={theme.palette.primary.on} size={Units.LARGE} />}
                inputProps={{
                    autoCapitalize: "words",
                    autoCorrect: true,
                    type: "text",
                    returnKeyType: "next",
                    returnKeyLabel: "Next",
                    value: username,
                    onChangeText: setUsername,
                    accessibilityLabel: "Enter username",
                    placeholder: "Enter Username",
                    ref: usernameInputRef,
                    onSubmitEditing: () => addressInputRef.current?.focus()
                }}
            />
            <Input
                animationProps={{ ...FadeInFromBottom(3) }}
                style={{ width: "100%" }}
                icon={<Ionicons name="business" color={theme.palette.primary.on} size={Units.LARGE} />}
                inputProps={{
                    autoCapitalize: "words",
                    autoCorrect: true,
                    type: "text",
                    returnKeyType: "next",
                    returnKeyLabel: "Next",
                    value: businessName,
                    onChangeText: setBusinessName,
                    accessibilityLabel: "Enter business name",
                    placeholder: "Business Name",
                    ref: businessNameRef,
                    onSubmitEditing: () => addressInputRef.current?.focus()
                }}
            />
            <Input
                animationProps={{ ...FadeInFromBottom(4) }}
                style={{ width: "100%" }}
                icon={<Ionicons name="pin-sharp" color={theme.palette.primary.on} size={Units.LARGE} />}
                inputProps={{
                    autoCapitalize: "sentences",
                    autoCorrect: true,
                    type: "text",
                    autoComplete: "address-line1",
                    returnKeyType: "next",
                    returnKeyLabel: "Next",
                    value: address,
                    onChangeText: setAddress,
                    accessibilityLabel: "Enter business address",
                    placeholder: "Business Address",
                    ref: addressInputRef
                }}
            />
        </MotiView>
    );
}