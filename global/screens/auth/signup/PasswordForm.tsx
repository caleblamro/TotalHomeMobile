import { MotiView } from "moti";
import { ViewStyle, Text } from "react-native";
import { useTheme } from "../../../hooks/Hooks";
import Form from "../../../../components/input/Form";
import { passwordFormData } from "../../../../components/input/Forms";
import Button, { ButtonType } from "../../../../components/button/Button";
import { Ionicons } from '@expo/vector-icons';
import { Units } from "../../../styles/Constants";
import { textBodyStyles, flexRow } from "../../../styles/Styles";
import { fadeInFromBottom } from "../../../../components/animation/Animations";



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
            <MotiView {...fadeInFromBottom(3)} style={{marginTop: Units.MEDIUM, display: "flex", flexDirection: "row", justifyContent: "space-evenly", gap: Units.MEDIUM}}>
                <Button style={{...flexRow, justifyContent: "center", borderColor: theme.palette.alert.error}} onPress={() => console.error("Not implemented!")} accessibilityLabel="Click to finish account setup" type={ButtonType.OUTLINED}>
                    <Ionicons name="close-circle" size={Units.LARGE} color={theme.palette.alert.error} />
                    <Text style={{ ...textBodyStyles, color: theme.palette.alert.error, fontFamily: "Poppins-Medium" }}>
                        Clear
                    </Text>
                </Button>
                <Button style={{...flexRow, justifyContent: "center"}} onPress={() => console.error("Not implemented!")} accessibilityLabel="Click to finish account setup" type={ButtonType.FILLED}>
                    <Ionicons name="enter-sharp" size={Units.LARGE} color={theme.palette.primary.main} />
                    <Text style={{ ...textBodyStyles, color: theme.palette.primary.main, fontFamily: "Poppins-Medium" }}>
                        Finish
                    </Text>
                </Button>
            </MotiView>
        </MotiView>
    );
}