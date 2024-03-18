import { IconButtonStyle } from '../../../styles/Styles';
import { useTheme } from '../../../hooks/Hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../util/ScreenStack';
import { Units } from '../../../styles/Constants';
import Button, { ButtonType } from '../../../../components/button/Button';
import { Ionicons } from '@expo/vector-icons';
import BaseScreen from '../../util/BaseScreen';

type Props = NativeStackScreenProps<RootStackParamList, "ProviderClients">;
export default function ProviderClients({ navigation, route }: Props) {
    const { session } = route.params;
    const theme = useTheme();

    const rightActionButton = (
        <Button type={ButtonType.FILLED} style={{ ...IconButtonStyle, paddingLeft: 0, paddingRight: 0, shadowOpacity: 0 }} onPress={() => console.error("Not implemented!")} accessibilityLabel={'Press to open inbox'} >
            <Ionicons name="people" size={Units.LARGE} color={theme.palette.primary.main} />
        </Button>
    );

    return (
        <BaseScreen title="Clients" subtitle="View and Manage" rightAction={rightActionButton}>
        </BaseScreen>
    );
}