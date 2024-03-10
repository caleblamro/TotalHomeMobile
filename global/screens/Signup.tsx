import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { MotiView } from 'moti';
import { FadeInFromBottom } from '../../components/animation/Animations';
import { FillAndCenter } from '../styles/Styles';
import { useTheme } from '../hooks/Hooks';
import { RootStackParamList } from './ScreenStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

export default function Signup({navigation}: Props) {
    const theme = useTheme();

    return(
        <MotiView 
            { ...FadeInFromBottom }
            style={{ ...FillAndCenter, backgroundColor: theme.palette.primary.main }}>
          <Text>Open up App.tsx to start working on your app!</Text>
          <StatusBar style="auto" />
        </MotiView>
    );
}