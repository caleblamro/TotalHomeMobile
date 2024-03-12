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



interface FormProps {
    animationProps: MotiProps<ViewStyle>;
    style?: ViewStyle;
}

export default function OwnerForm({ animationProps }: FormProps) {
    const theme = useTheme();
    const firstNameRef = useRef<InputItem | null>(null);
    const [firstName, setFirstName] = useState<string>("");
    const lastNameRef = useRef<InputItem | null>(null);
    const [lastName, setLastName] = useState<string>("");
    const emailInputRef = useRef<InputItem>(null);
    const [email, setEmail] = useState<string>("");
    const addressInputRef = useRef<InputItem>(null);
    const [address, setAddress] = useState<string>("");
    const usernameInputRef = useRef<InputItem>(null);
    const [username, setUsername] = useState<string>("");


    return (
        <MotiView>
            <MotiView style={{ ...FlexRow, width: "100%", marginTop: Units.MEDIUM, justifyContent: "space-between" }}>
                <Input
                    animationProps={{ ...FadeInFromBottom(1) }}
                    style={{ width: "49%" }}
                    icon={<Ionicons name="person-circle" color={theme.palette.primary.on} size={Units.LARGE} />}
                    inputProps={{
                        autoCapitalize: "words",
                        autoCorrect: false,
                        autoComplete: "name-given",
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
                        autoCorrect: false,
                        autoComplete: "name-family",
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
                    onSubmitEditing: () => usernameInputRef.current?.focus()
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
                icon={<Ionicons name="home" color={theme.palette.primary.on} size={Units.LARGE} />}
                inputProps={{
                    autoCapitalize: "sentences",
                    autoCorrect: true,
                    type: "text",
                    autoComplete: "address-line1",
                    returnKeyType: "next",
                    returnKeyLabel: "Next",
                    value: address,
                    onChangeText: setAddress,
                    accessibilityLabel: "Enter home address",
                    placeholder: "Home Address",
                    ref: addressInputRef
                }}
            />
        </MotiView>
    );
}