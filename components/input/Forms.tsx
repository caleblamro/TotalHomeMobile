import { Units } from "../../global/styles/Constants";
import { Theme } from "../../global/theme/Theme";
import { FormField } from "./Form";
import { Ionicons } from '@expo/vector-icons';

const usernameAndEmail = (theme: Theme): FormField[] => {
    return [
        {
            key: "email", props: {
                icon: <Ionicons name="mail" color={theme.palette.primary.on} size={Units.LARGE} />, 
                inputProps: {
                    autoCapitalize: "none",
                    autoCorrect: true,
                    type: "email-address",
                    autoComplete: "email",
                    returnKeyType: "next",
                    returnKeyLabel: "Next",
                    accessibilityLabel: "Enter email",
                    placeholder: "Email"
                }
            }
        },
        {
            key: "username",
            props: {
                icon: <Ionicons name="person-add" color={theme.palette.primary.on} size={Units.LARGE} />,
                inputProps: {
                    autoCapitalize: "words",
                    autoCorrect: true,
                    type: "text",
                    returnKeyType: "next",
                    returnKeyLabel: "Next",
                    accessibilityLabel: "Enter username",
                    placeholder: "Enter Username"
                }
            }
        },
    ]
}

const firstNameLastName = (theme: Theme): FormField[] => {
    return [
        {
            key: "first-name",
            halfWidth: true,
            props: {
                icon: <Ionicons name="person-circle" color={theme.palette.primary.on} size={Units.LARGE} />,
                inputProps: {
                    autoCapitalize: "words",
                    autoCorrect: false,
                    autoComplete: "name-given",
                    returnKeyType: "next",
                    returnKeyLabel: "Next",
                    accessibilityLabel: "Enter first name",
                    placeholder: "First Name",
                }
            }
        },
        {
            key: "last-name",
            halfWidth: true,
            props: {
                inputProps: {
                    autoCapitalize: "words",
                    autoCorrect: false,
                    autoComplete: "name-family",
                    returnKeyType: "next",
                    returnKeyLabel: "Next",
                    accessibilityLabel: "Enter last name",
                    placeholder: "Last Name"
                }
            }
        },
    ]
}


export const ownerFormData = (theme: Theme): FormField[] => {
    return [
        ...firstNameLastName(theme),
        ...usernameAndEmail(theme),
        {
            key: "home-address",
            props: {
                icon: <Ionicons name="home" color={theme.palette.primary.on} size={Units.LARGE} />,
                inputProps: {
                    autoCapitalize: "sentences",
                    autoCorrect: true,
                    type: "text",
                    autoComplete: "street-address",
                    returnKeyType: "done",
                    returnKeyLabel: "Submit",
                    accessibilityLabel: "Enter home address",
                    placeholder: "Home Address"
                }
            }
        }
    ]
}

export const providerFormData = (theme: Theme): FormField[] => {
    return [
        ...firstNameLastName(theme),
        ...usernameAndEmail(theme),
        {
            key: "business-name",
            props: {
                icon: <Ionicons name="business" color={theme.palette.primary.on} size={Units.LARGE} />,
                inputProps: {
                    autoCapitalize: "words",
                    autoCorrect: true,
                    type: "text",
                    returnKeyType: "next",
                    returnKeyLabel: "Next",
                    accessibilityLabel: "Enter business name",
                    placeholder: "Business Name",
                }
            }
        },
        {
            key: "business-address",
            props: {
                icon: <Ionicons name="pin-sharp" color={theme.palette.primary.on} size={Units.LARGE} />,
                inputProps: {
                    autoCapitalize: "sentences",
                    autoCorrect: true,
                    type: "text",
                    autoComplete: "street-address",
                    returnKeyType: "done",
                    returnKeyLabel: "Submit",
                    accessibilityLabel: "Enter business address",
                    placeholder: "Business Address"
                }
            }
        }
    ]
}

export const passwordFormData = (theme: Theme): FormField[] => {
    return [
        {
            key: "password",
            props: {
                icon: <Ionicons name="lock-closed" color={theme.palette.primary.on} size={Units.LARGE} />,
                inputProps: {
                    autoCapitalize: "words",
                    autoCorrect: false,
                    type: "text",
                    returnKeyType: "next",
                    returnKeyLabel: "Next",
                    accessibilityLabel: "Enter password",
                    placeholder: "Enter password",
                }
            }
        },
        {
            key: "confirmPassword",
            props: {
                icon: <Ionicons name="shield-checkmark" color={theme.palette.primary.on} size={Units.LARGE} />,
                inputProps: {
                    autoCapitalize: "none",
                    autoCorrect: false,
                    type: "text",
                    returnKeyType: "done",
                    returnKeyLabel: "Submit",
                    accessibilityLabel: "Confirm password",
                    placeholder: "Confirm password"
                }
            }
        }
    ]
}