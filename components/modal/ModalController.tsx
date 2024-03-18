import { View, Text } from "react-native";
import { FillWidthAndCenter, FlexRow, IconButtonStyle, NoPadding, TitleStyles } from "../../global/styles/Styles";
import { FontSizes, Units } from "../../global/styles/Constants";
import Button, { ButtonType } from "../button/Button";
import { useTheme } from "../../global/hooks/Hooks";
import { Ionicons } from '@expo/vector-icons';
import Modal from "./Modal";
import { useState } from "react";

interface ModalControllerProps {
    title: string;
    subtitle?: string;
    isLink?: boolean;
    link?: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

export default function ModalController(props: ModalControllerProps) {
    const { title, icon, children, subtitle, isLink=false } = props;
    const [modalOpen, setModalOpen] = useState(false);
    const theme = useTheme();

    const onPress = () => {
        if(!isLink) {
            setModalOpen(true);
        }else{
            // idk how to open a link yet
        }
    }

    return(
        <Button style={{ ...IconButtonStyle, ...FillWidthAndCenter, justifyContent: "space-between", backgroundColor: theme.palette.secondary.on, shadowOpacity: 0, height: "auto" }} type={ButtonType.FILLED} onPress={onPress} accessibilityLabel={`See open content related to `}>
            <View style={{ ...FlexRow, gap: Units.MEDIUM, alignItems: "center" }}>
                <View style={{ ...IconButtonStyle, ...NoPadding, width: Units.EXTRA_LARGE + Units.SMALL, height: Units.EXTRA_LARGE + Units.SMALL, backgroundColor: theme.palette.secondary.main, opacity: 0.5, shadowOpacity: 0, borderRadius: Units.SMALL + 4 }}>
                    { icon }
                </View>
                <Text style={{...TitleStyles, fontSize: FontSizes.MEDIUM, color: theme.palette.tertiary.main}}>
                    { title }
                </Text>
            </View>
            <View style={{ ...IconButtonStyle, backgroundColor: theme.palette.secondary.on, shadowOpacity: 0, padding: 2, paddingLeft: 0, paddingRight: 0, width: Units.EXTRA_LARGE + Units.SMALL, height: Units.EXTRA_LARGE + Units.SMALL  }}>
                <Ionicons name="chevron-forward" size={Units.LARGE} color={theme.palette.tertiary.main} />
            </View>
            <Modal title={title} subtitle={subtitle} style={{backgroundColor: theme.palette.primary.main}} open={modalOpen} onClose={() => setModalOpen(false)} >
                { children }
            </Modal>
        </Button>
    );
}