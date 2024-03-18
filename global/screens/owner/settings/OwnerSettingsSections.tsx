import { Theme } from "../../../theme/Theme";
import { Text } from "react-native";
import { Units } from '../../../styles/Constants';
import { Ionicons } from '@expo/vector-icons';

interface SettingsItem {
    title: string;
    modalContent: React.ReactNode;
    icon: React.ReactElement;
}

interface SettingsSection {
    title: string;
    items: SettingsItem[];
}

export const getSections = (theme: Theme): SettingsSection[] => {
    return [
        {
            title: "App Settings",
            items: [
                {
                    title: "General",
                    icon: <Ionicons name="settings-outline" size={Units.LARGE} color={theme.palette.primary.on} />,
                    modalContent: <Text>Modal Content</Text>
                },
                {
                    title: "Theme",
                    icon: <Ionicons name="moon-outline" size={Units.LARGE} color={theme.palette.primary.on} />,
                    modalContent: <Text>Modal Content</Text>
                },
                {
                    title: "Notifications",
                    icon: <Ionicons name="notifications-outline" size={Units.LARGE} color={theme.palette.primary.on} />,
                    modalContent: <Text>Modal Content</Text>
                },
            ]
        },
        {
            title: "Account Settings",
            items: [
                {
                    title: "Username",
                    icon: <Ionicons name="person-circle-outline" size={Units.LARGE} color={theme.palette.primary.on} />,
                    modalContent: <Text>Modal Content</Text>
                },
                {
                    title: "Password",
                    icon: <Ionicons name="lock-closed-outline" size={Units.LARGE} color={theme.palette.primary.on} />,
                    modalContent: <Text>Modal Content</Text>
                },
                {
                    title: "Personal Information",
                    icon: <Ionicons name="information-circle-outline" size={Units.LARGE} color={theme.palette.primary.on} />,
                    modalContent: <Text>Modal Content</Text>
                },
                {
                    title: "Payment",
                    icon: <Ionicons name="card-outline" size={Units.LARGE} color={theme.palette.primary.on} />,
                    modalContent: <Text>Modal Content</Text>
                },
            ]
        },
        {
            title: "Help and Support",
            items: [
                {
                    title: "Write a Review",
                    icon: <Ionicons name="star-outline" size={Units.LARGE} color={theme.palette.primary.on} />,
                    modalContent: <Text>Modal Content</Text>
                },
                {
                    title: "Report a Problem",
                    icon: <Ionicons name="alert-circle-outline" size={Units.LARGE} color={theme.palette.primary.on} />,
                    modalContent: <Text>Modal Content</Text>
                },
                {
                    title: "Share With a Friend",
                    icon: <Ionicons name="share-outline" size={Units.LARGE} color={theme.palette.primary.on} />,
                    modalContent: <Text>Modal Content</Text>
                },
                {
                    title: "Request Feature",
                    icon: <Ionicons name="construct-outline" size={Units.LARGE} color={theme.palette.primary.on} />,
                    modalContent: <Text>Modal Content</Text>
                },
                {
                    title: "Accessibility",
                    icon: <Ionicons name="accessibility-outline" size={Units.LARGE} color={theme.palette.primary.on} />,
                    modalContent: <Text>Modal Content</Text>
                },
            ]
        }
    ]
}