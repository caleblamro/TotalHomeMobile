import { MotiView } from "moti";
import { ViewStyle, Text } from "react-native";
import { useTheme } from "../../../hooks/Hooks";
import Form from "../../../../components/input/Form";
import { passwordFormData } from "../../../../components/input/Forms";
import Button, { ButtonType } from "../../../../components/button/Button";
import { Ionicons } from '@expo/vector-icons';
import { Units } from "../../../styles/Constants";
import { BodyStyles, FlexRow } from "../../../styles/Styles";
import { FadeInFromBottom } from "../../../../components/animation/Animations";



interface FormProps {
    style?: ViewStyle;
    onFormValidated: ([key]: any) => void;
}

export default function PasswordForm({ onFormValidated }: FormProps) {
    const theme = useTheme();

    const onFormCompleted = (obj: any) => {
        onFormValidated(obj);
    }

    return (
        <MotiView>
            <Form fields={passwordFormData(theme)} onSubmit={(obj) => onFormCompleted(obj)} />
            <MotiView {...FadeInFromBottom(3)} style={{marginTop: Units.MEDIUM, display: "flex", flexDirection: "row", justifyContent: "space-evenly", gap: Units.MEDIUM}}>
                <Button style={{...FlexRow, justifyContent: "center", borderColor: theme.palette.alert.error}} onPress={() => console.log("Not implemented!")} accessibilityLabel="Click to finish account setup" type={ButtonType.OUTLINED}>
                    <Ionicons name="close-circle" size={Units.LARGE} color={theme.palette.alert.error} />
                    <Text style={{ ...BodyStyles, color: theme.palette.alert.error, fontFamily: "Poppins-Medium" }}>
                        Clear
                    </Text>
                </Button>
                <Button style={{...FlexRow, justifyContent: "center"}} onPress={() => console.log("Not implemented!")} accessibilityLabel="Click to finish account setup" type={ButtonType.FILLED}>
                    <Ionicons name="enter-sharp" size={Units.LARGE} color={theme.palette.primary.main} />
                    <Text style={{ ...BodyStyles, color: theme.palette.primary.main, fontFamily: "Poppins-Medium" }}>
                        Finish
                    </Text>
                </Button>
            </MotiView>
        </MotiView>
    );
}