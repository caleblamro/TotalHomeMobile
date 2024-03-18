import { iconButtonStyle } from '../../../styles/Styles';
import { useTheme } from '../../../hooks/Hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../util/ScreenStack';
import { Units } from '../../../styles/Constants';
import Button, { ButtonType } from '../../../../components/button/Button';
import { Ionicons } from '@expo/vector-icons';
import BaseScreen from '../../util/BaseScreen';

type Props = NativeStackScreenProps<RootStackParamList, "OwnerServices">;
export default function OwnerServices({ navigation }: Props) {
    const theme = useTheme();
    
    const rightActionButton = (
        <Button type={ButtonType.FILLED} style={{ ...iconButtonStyle, paddingLeft: 0, paddingRight: 0, shadowOpacity: 0 }} onPress={() => console.error("Not implemented!")} accessibilityLabel={'Press to open payment settings'} >
            <Ionicons name="card" size={Units.LARGE} color={theme.palette.primary.main} />
        </Button>
    )

    return (
        <BaseScreen title="Active Services" subtitle="View and Manage" rightAction={rightActionButton}>
        </BaseScreen>
    );
}