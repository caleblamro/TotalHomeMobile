import { Text } from 'react-native';
import { MotiView } from 'moti';
import { FadeInFromBottom } from '../../../../components/animation/Animations';
import { FillWidthAndCenter, IconButtonStyle, TitleStyles } from '../../../styles/Styles';
import { useTheme } from '../../../hooks/Hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../util/ScreenStack';
import { FontSizes, Units } from '../../../styles/Constants';
import CardContainer from '../../../../components/cards/CardContainer';
import ModalController from '../../../../components/modal/ModalController';
import Constants from 'expo-constants';
import React from 'react';
import { getSections } from './ProviderSettingsSections';
import BaseScreen from '../../util/BaseScreen';
import { Ionicons } from '@expo/vector-icons';
import Button, { ButtonType } from '../../../../components/button/Button';
import { supabase } from '../../../api/supabase/supabase';

type Props = NativeStackScreenProps<RootStackParamList, "ProviderSettings">;
export default function ProviderSettings({ navigation, route }: Props) {
    const { session } = route.params;
    const theme = useTheme();
    const sections = getSections(theme);

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("API Error: Couldn't sign out ", error);
        }
        navigation.navigate("Auth", { session: null });
    }


    const rightActionButton = (
        <Button onPress={logout} type={ButtonType.FILLED} style={{ ...IconButtonStyle, paddingLeft: 0, paddingRight: 0, shadowOpacity: 0, backgroundColor: "transparent" }} accessibilityLabel={'Press to log out'} >
            <Ionicons name="log-out" size={Units.LARGE} color={theme.palette.primary.on} />
        </Button>
    )

    return (
        <BaseScreen title="Settings" style={{ padding: Units.EXTRA_LARGE, paddingTop: 0, paddingBottom: 0 }} rightAction={rightActionButton}>
            {sections.map((section, index) => (
                <React.Fragment key={`settingsSection${index}`}>
                    <MotiView key={`settingsSectionTitle${index}`} {...FadeInFromBottom(index + 1)} style={{ marginTop: Units.EXTRA_LARGE, marginBottom: Units.SMALL + 4 }}>
                        <Text style={{ ...TitleStyles, fontSize: FontSizes.MEDIUM, color: theme.palette.tertiary.main }}>{section.title}</Text>
                    </MotiView>
                    <CardContainer animationProps={{ ...FadeInFromBottom(2 + index) }} style={{ display: "flex", flexDirection: "column", gap: Units.SMALL }}>
                        {section.items.map((item) => (
                            <ModalController key={`settingsOption${item.title}`} title={item.title} subtitle={section.title} icon={item.icon}>
                                {item.modalContent}
                            </ModalController>
                        ))}
                    </CardContainer>
                </React.Fragment>
            ))}
            <MotiView {...FadeInFromBottom(sections.length + 1)} style={{ ...FillWidthAndCenter, alignItems: "center", justifyContent: "flex-start", height: 210, paddingTop: Units.EXTRA_LARGE }}>
                <Text style={{ ...TitleStyles, fontSize: FontSizes.MEDIUM, color: theme.palette.tertiary.main }}>v {Constants.expoConfig?.version}</Text>
            </MotiView>
        </BaseScreen>
    );
}