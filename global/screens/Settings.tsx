import { Text, View } from 'react-native';
import { MotiView, ScrollView } from 'moti';
import { FadeInFromBottom, FadeInFromLeft } from '../../components/animation/Animations';
import { FillScreen, FillWidthAndCenter, FlexRow, TitleStyles } from '../styles/Styles';
import { useTheme } from '../hooks/Hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './ScreenStack';
import { FontSizes, Units } from '../styles/Constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import CardContainer from '../../components/cards/CardContainer';
import ModalController from '../../components/modal/ModalController';
import Constants from 'expo-constants';
import React from 'react';
import { getSections } from './SettingsSection';
import BaseScreen from './BaseScreen';

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;
export default function Settings({ navigation }: Props) {
    const theme = useTheme();
    const sections = getSections(theme);


    return (
        <BaseScreen title="Settings" style={{padding: Units.EXTRA_LARGE, paddingTop: 0, paddingBottom: 0}}>
            {sections.map((section, index) => (
                <React.Fragment key={`settingsSection${index}`}>
                    <MotiView key={`settingsSectionTitle${index}`} {...FadeInFromBottom(index + 1)} style={{ marginTop: Units.EXTRA_LARGE, marginBottom: Units.SMALL + 4 }}>
                        <Text style={{ ...TitleStyles, fontSize: FontSizes.MEDIUM, color: theme.palette.tertiary.main }}>{section.title}</Text>
                    </MotiView>
                    <CardContainer animationProps={{ ...FadeInFromBottom(2 + index) }} style={{ display: "flex", flexDirection: "column", gap: Units.SMALL }}>
                        {section.items.map((item) => (
                            <ModalController key={`settingsOption${item.title}`} title={item.title} icon={item.icon}>
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