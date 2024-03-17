import { MotiView } from "moti";
import { ViewStyle, Text } from "react-native";
import { useTheme } from "../../../hooks/Hooks";
import Form from "../../../../components/input/Form";
import { passwordFormData } from "../../../../components/input/Forms";
import Button, { ButtonType } from "../../../../components/button/Button";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { Units } from "../../../styles/Constants";
import { BodyStyles } from "../../../styles/Styles";



interface FormProps {
    style?: ViewStyle;
    onFormValidated: ([key]: any) => void;
}

export default function PasswordForm({ onFormValidated }: FormProps) {
    const [data, setData] = useState([]);
    const theme = useTheme();

    const onFormCompleted = (obj:any) => {
        setData(obj);
        onFormValidated(data);
    }

    return (
        <MotiView>
            <Form fields={passwordFormData(theme)} onSubmit={(obj) => onFormCompleted(obj)} />
            <Button onPress={() => onFormValidated(data)} accessibilityLabel="Click to finish account setup" type={ButtonType.FILLED}>
                <Ionicons name="enter-sharp" size={Units.LARGE} color={theme.palette.primary.main} />
                <Text style={{ ...BodyStyles, color: theme.palette.primary.main, fontFamily: "Poppins-Medium" }}>
                    Finish
                </Text>
            </Button>
        </MotiView>
    );
}