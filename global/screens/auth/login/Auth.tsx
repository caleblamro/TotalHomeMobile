import { AnimatePresence, MotiView } from "moti";
import { useEffect, useReducer, useRef, useState } from "react";
import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback, AppState } from "react-native";
import { useAlert, useTheme } from "../../../hooks/Hooks";
import { FadeInFromBottom } from "../../../../components/animation/Animations";
import { AntdInputWrapperStyle, AntdTextInputStyle, BodyStyles, FillScreen, FillWidthAndCenter, FlexColumnFullWidth, NoPadding, TextInputStyle, TitleStyles } from "../../../styles/Styles";
import { Units } from "../../../styles/Constants";
import Logo from "../../../theme/Logo";
import Button, { ButtonType } from "../../../../components/button/Button";
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../util/ScreenStack";
import { supabase } from "../../../api/supabase/supabase";
import { useIsFocused } from "@react-navigation/native";
import { InputItem } from "@ant-design/react-native";
import Input from "../../../../components/input/Input";


type Props = NativeStackScreenProps<RootStackParamList, "Auth">;

export default function Auth({ navigation, route }: Props) {
    const session = route?.params?.session;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const containerRef = useRef(null);
    const emailInputRef = useRef<InputItem>(null);
    const passwordInputRef = useRef<InputItem>(null);
    const theme = useTheme();
    const isFocused = useIsFocused();
    const alert = useAlert();

    const signUp = () => {
        navigation.navigate("Signup", { username: email, password: password, session: session });
    }

    async function signInWithEmail() {
        setLoginLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            alert?.error("Incorrect email or password");
            console.log("incorrect email or password");
        } else {
            navigation.navigate("Home", { userId: "1", session: session });
        }
        setLoginLoading(false)
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    }


    useEffect(() => {
        // Listener for keyboard will show
        const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', () => {
            setKeyboardVisible(true);
        });

        // Listener for keyboard will hide
        const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardWillShowListener.remove();
            keyboardWillHideListener.remove();
        };
    }, []);

    return (
        <TouchableWithoutFeedback key={isFocused ? 'focused' : 'unfocused'} onPress={dismissKeyboard} style={{ width: "100%", height: "100%" }}>
            <MotiView
                from={{ translateY: 0 }}
                animate={{ translateY: keyboardVisible ? -130 : 0 }}
                ref={containerRef}
                transition={{ duration: 200, type: "timing" }}
                style={{ ...FillScreen, display: "flex", justifyContent: "center", backgroundColor: theme.palette.primary.main }}>
                <View style={{ ...FlexColumnFullWidth, padding: Units.EXTRA_LARGE + Units.MEDIUM, paddingBottom: 0, paddingTop: 0 }}>
                    <MotiView {...FadeInFromBottom(0)} style={{ ...FillWidthAndCenter }}>
                        <Logo />
                    </MotiView>
                    <MotiView {...FadeInFromBottom(1)}>
                        <Text style={{ ...TitleStyles, color: theme.palette.text.default }}>
                            Login
                        </Text>
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
                            onSubmitEditing: () => passwordInputRef.current?.focus()
                        }}
                    />
                    <Input
                        animationProps={{ ...FadeInFromBottom(2) }}
                        style={{ width: "100%" }}
                        icon={<Ionicons name="lock-closed" color={theme.palette.primary.on} size={Units.LARGE} />}
                        inputProps={{
                            autoCapitalize: "none",
                            autoCorrect: true,
                            type: "password",
                            autoComplete: "password",
                            returnKeyType: "done",
                            returnKeyLabel: "Submit",
                            value: password,
                            onChangeText: setPassword,
                            accessibilityLabel: "Enter password",
                            placeholder: "Password",
                            secureTextEntry: true,
                            ref: passwordInputRef,
                            onSubmitEditing: signInWithEmail
                        }}
                    />
                    <MotiView {...FadeInFromBottom(3)} style={{ ...FillWidthAndCenter, flexDirection: "row-reverse", justifyContent: "space-between", marginTop: Units.MEDIUM }}>
                        <Button onPress={signInWithEmail} accessibilityLabel="Click to log in" type={ButtonType.FILLED}>
                            <Ionicons name="enter-sharp" size={Units.LARGE} color={theme.palette.primary.main} />
                            <Text style={{ ...BodyStyles, color: theme.palette.primary.main, fontFamily: "Poppins-Medium" }}>
                                Login
                            </Text>
                        </Button>
                        <Button onPress={signUp} accessibilityLabel="Click to sign up" type={ButtonType.OUTLINED} style={{ borderColor: theme.palette.primary.on }}>
                            <Ionicons name="person-add-sharp" size={Units.LARGE} color={theme.palette.primary.on} />
                            <Text style={{ ...BodyStyles, color: theme.palette.primary.on, fontFamily: "Poppins-Medium" }}>
                                Sign Up
                            </Text>
                        </Button>
                    </MotiView>
                    <MotiView {...FadeInFromBottom(4)} style={{ ...FillWidthAndCenter, marginTop: Units.LARGE }}>
                        <Text style={{ ...BodyStyles, color: theme.palette.primary.on, fontFamily: "Poppins-Medium" }}>
                            Forgot Password?
                        </Text>
                    </MotiView>
                </View>
            </MotiView>
        </TouchableWithoutFeedback>
    );
}