import { View } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { fadeInFromBottom } from '../../../../components/animation/Animations';
import { fillWidthAndCenter, iconButtonStyle } from '../../../styles/Styles';
import { useTheme } from '../../../hooks/Hooks';
import { RootStackParamList } from '../../util/ScreenStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BaseScreen from '../../util/BaseScreen';
import Button, { ButtonType } from '../../../../components/button/Button';
import { Ionicons } from '@expo/vector-icons';
import { Units } from '../../../styles/Constants';
import Step from '../../../../components/step/Step';
import { AccountType } from '../../../api/Api';
import { useEffect, useState } from 'react';
import SelectButton from '../../../../components/button/SelectButton';
import ProviderForm from './ProviderForm';
import OwnerForm from './OwnerForm';
import PasswordForm from './PasswordForm';


type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

export default function Signup({ navigation }: Props) {
    const theme = useTheme();
    const [selectedAccountType, setSelectedAccountType] = useState<AccountType | null>(null);
    const [accountTypeDataValid, setAccountTypeDataValid] = useState(false);
    const [accountData, setAccountData] = useState([]);

    const rightActionButton = (
        <Button type={ButtonType.FILLED} style={{ ...iconButtonStyle, paddingLeft: 0, paddingRight: 0, shadowOpacity: 0 }} onPress={() => navigation.navigate("Auth", { session: null })} accessibilityLabel={'Press to return to login'} >
            <Ionicons name="arrow-back-circle" size={Units.LARGE} color={theme.palette.primary.main} />
        </Button>
    );

    // Adjust based on your actual AccountType values
    const isOwnerSelected = selectedAccountType === 'OWNER';
    const isProviderSelected = selectedAccountType === 'PROVIDER';
    

    const onProviderFormValidated = (formData: any) => {
        console.log("FormData: ", formData);
        setAccountData(formData);
        setAccountTypeDataValid(true);
    }

    const onOwnerFormValidated = (formData: any) => {
        console.log("FormData: ", formData);
        setAccountData(formData);
        setAccountTypeDataValid(true);
    }


    function onFinish(formData: any): void {
        console.log("Form done: ", formData);
        console.log(accountData);
    }
    
    useEffect(() => {
        setAccountTypeDataValid(false);
    }, []);

    useEffect(() => {
        setAccountTypeDataValid(false);
    }, [selectedAccountType]);

    return (
        <BaseScreen title='Sign Up' subtitle='Create an Account' rightAction={rightActionButton} style={{ paddingHorizontal: Units.EXTRA_LARGE, paddingTop: Units.EXTRA_LARGE }}>
            <Step animationProps={{ ...fadeInFromBottom(1) }} number={1} title="Account Type" subTitle="Select account type" />
            <MotiView {...fadeInFromBottom(2)} style={{ ...fillWidthAndCenter, justifyContent: "space-between", marginTop: Units.MEDIUM, gap: Units.MEDIUM }}>
                <SelectButton
                    selectedColor={theme.palette.primary.on}
                    defaultColor={theme.palette.primary.main}
                    label={'Home Owner'}
                    iconName={'home'}
                    isSelected={isOwnerSelected}
                    onPress={() => setSelectedAccountType(AccountType.OWNER)}
                    accessibilityLabel={'Click to create a homeowner account'}
                />
                <SelectButton
                    selectedColor={theme.palette.primary.on}
                    defaultColor={theme.palette.primary.main}
                    label={'Service Provider'}
                    iconName={'business'}
                    isSelected={isProviderSelected}
                    onPress={() => setSelectedAccountType(AccountType.PROVIDER)}
                    accessibilityLabel={'Click to create a service provider account'}
                />
            </MotiView>
            <AnimatePresence>
                { selectedAccountType !== null && <Step style={{marginTop: Units.LARGE}} title={'Basic Info'} subTitle={'Enter basic account information'} number={2} animationProps={fadeInFromBottom(0)} /> }
            </AnimatePresence>
            <AnimatePresence>
                { isOwnerSelected && <OwnerForm onFormValidated={onOwnerFormValidated} /> }
                { isProviderSelected && <ProviderForm onFormValidated={onProviderFormValidated} /> }
            </AnimatePresence>
            <AnimatePresence>
                { accountTypeDataValid && <Step style={{marginTop: Units.LARGE}} title={'Enter Password'} subTitle={'Choose your password'} number={3} animationProps={fadeInFromBottom(0)} /> }
            </AnimatePresence>
            <AnimatePresence>
                { accountTypeDataValid && <PasswordForm onFormValidated={onFinish} /> }
            </AnimatePresence>
            <View style={{width: "100%", minHeight: 450}}></View>
        </BaseScreen>
    );
}