import { AnimatePresence, MotiView } from "moti";
import { useEffect, useReducer, useRef, useState } from "react";
import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "../hooks/Hooks";
import { FadeInFromBottom } from "../../components/animation/Animations";
import { BodyStyles, FillScreen, FillWidthAndCenter, FlexColumnFullWidth, TextInputStyle, TitleStyles } from "../styles/Styles";
import { Units } from "../styles/Constants";
import Logo from "../theme/Logo";
import Button, { ButtonType } from "../../components/button/Button";
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "./ScreenStack";
import LottieView from "lottie-react-native";


type Props = NativeStackScreenProps<RootStackParamList, "Auth">;

export default function Auth({ navigation, }: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [isSignInLoadingVisible, toggleLoadingElements] = useReducer((s) => !s, true);
    const containerRef = useRef(null);
    const usernameInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const theme = useTheme();

    const onSubmit = async () => {
        Keyboard.dismiss();
        console.log("Submitted");
        toggleLoadingElements();
        setTimeout(() => {
            toggleLoadingElements();
            setTimeout(() => {
                navigation.navigate("Home", { userId: "1" });
            }, 1000);
        }, 1000);
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    }

    const onNext = () => {
        if (passwordInputRef.current) {
            passwordInputRef.current.focus();
        }
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
        <TouchableWithoutFeedback onPress={dismissKeyboard} style={{ width: "100%", height: "100%" }}>
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
                    <MotiView {...FadeInFromBottom(2)} style={{ width: "100%", marginTop: Units.MEDIUM }}>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="email"
                            ref={usernameInputRef}
                            returnKeyType="next"
                            returnKeyLabel="Next"
                            clearButtonMode="while-editing"
                            value={username}
                            onChangeText={setUsername}
                            style={{ ...TextInputStyle, color: theme.palette.text.default, borderColor: theme.palette.secondary.main, height: 48 }}
                            placeholder="Username / email"
                            onSubmitEditing={onNext}
                        />
                    </MotiView>
                    <MotiView {...FadeInFromBottom(3)} style={{ width: "100%", marginTop: Units.SMALL }}>
                        <TextInput
                            ref={passwordInputRef}
                            autoCapitalize="none"
                            returnKeyType="done"
                            returnKeyLabel="Submit"
                            clearButtonMode="while-editing"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            style={{ ...TextInputStyle, color: theme.palette.text.default, borderColor: theme.palette.secondary.main, height: 48 }}
                            placeholder="Password"
                            onSubmitEditing={onSubmit}
                        />
                    </MotiView>
                    <MotiView {...FadeInFromBottom(3)} style={{ ...FillWidthAndCenter, flexDirection: "row-reverse", justifyContent: "space-between", marginTop: Units.MEDIUM }}>
                        <Button onPress={onSubmit} accessibilityLabel="Click to log in" type={ButtonType.FILLED}>
                            <Ionicons name="enter-sharp" size={Units.LARGE} color={theme.palette.primary.main} />
                            <Text style={{ ...BodyStyles, color: theme.palette.primary.main, fontFamily: "Poppins-Medium" }}>
                                Login
                            </Text>
                        </Button>
                        <Button onPress={() => navigation.navigate("Signup", { username: username, password: password })} accessibilityLabel="Click to sign up" type={ButtonType.OUTLINED} style={{ borderColor: theme.palette.primary.on }}>
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