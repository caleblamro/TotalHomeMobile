import { MotiView } from "moti";
import { ViewStyle } from "react-native";
import { useTheme } from "../../../hooks/Hooks";
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