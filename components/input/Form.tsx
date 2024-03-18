import React, { useRef, useState, useEffect } from 'react';
import { MotiView } from 'moti';
import Input, { InputFieldProps } from './Input'; // Assuming this is your customized Input component
import { useTheme } from '../../global/hooks/Hooks';
import { fadeInFromBottom } from '../animation/Animations';
import { InputItem } from '@ant-design/react-native';


export interface FormField {
    key: string;
    halfWidth?: boolean;
    props: InputFieldProps; // Contains all necessary props for the Input component, including the onChangeText handler
    validationRegex?: RegExp;
}

interface FormProps {
    fields: FormField[];
    animationDelay?: number;
    onSubmit: (data: { [key: string]: any }) => void; // Callback function for form submission
}

interface FormData {
    [key: string]: React.RefObject<InputItem>
}

export default function Form({ fields, onSubmit, animationDelay = 0 }: FormProps) {
    const theme = useTheme();
    const [formState, setFormState] = useState<FormData>({});
    const [allFieldsValid, setAllFieldsValid] = useState<boolean>(false);

    // Create refs for inputs dynamically
    const inputRefs:FormData = fields.reduce((acc, field) => {
        acc[field.key] = useRef(null);
        return acc;
    }, {});

    // Update form state
    const updateField = (key: string) => (value: any) => {
        setFormState(prev => ({ ...prev, [key]: value }));
    };

    // Validate form fields here as needed
    useEffect(() => {
        // Example validation (add your own logic)
        setAllFieldsValid(true);
    }, [formState]);

    // Handle form submission
    const handleSubmit = () => {
        if (allFieldsValid) {
            onSubmit(formState);
        } else {
            console.error('Validation failed');
        }
    };

    return (
        <MotiView style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between" }}>
            {fields.map((field, index) => (
                <MotiView key={field.key} style={{ ...field.props.style, width: field.halfWidth ? "49%" : "100%" }}>
                    <Input
                        animationProps={{ ...fadeInFromBottom(index + animationDelay) }}
                        icon={field.props.icon}
                        inputProps={{
                            ...field.props.inputProps,
                            onChangeText: updateField(field.key),
                            onSubmitEditing: () => {
                                const nextField = fields[index + 1];
                                if (nextField) {
                                    inputRefs[nextField.key].current?.focus();
                                } else {
                                    handleSubmit();
                                }
                            },
                            ref: inputRefs[field.key]
                        }}
                    />
                </MotiView>
            ))}
        </MotiView>
    );
}