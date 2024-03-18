
import { MotiView } from "moti";
import { ViewStyle } from "react-native";
import { useTheme } from "../../../hooks/Hooks";
import Form from "../../../../components/input/Form";
import { providerFormData } from "../../../../components/input/Forms";

interface FormItem {
    label: string;

}

interface FormProps {
    style?: ViewStyle;
    onFormValidated: ([key]: any) => void;
}

export default function ProviderForm({ onFormValidated }: FormProps) {
    const theme = useTheme();


    return (
        <MotiView>
            <Form fields={providerFormData(theme)} onSubmit={(obj) => onFormValidated(obj)} />
        </MotiView>
    );
}