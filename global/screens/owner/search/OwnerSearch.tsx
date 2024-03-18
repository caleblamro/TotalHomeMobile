import { IconButtonStyle, TextInputStyle } from '../../../styles/Styles';
import { useTheme } from '../../../hooks/Hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../util/ScreenStack';
import { Units } from '../../../styles/Constants';
import Button, { ButtonType } from '../../../../components/button/Button';
import { Ionicons } from '@expo/vector-icons';
import BaseScreen from '../../util/BaseScreen';
import { MotiView } from 'moti';
import { FadeInFromBottom } from '../../../../components/animation/Animations';
import { useState, useRef, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { fetchServices, Service } from '../../../api/Api';
import ServiceCard from '../../../../components/cards/ServiceCard';

type Props = NativeStackScreenProps<RootStackParamList, "OwnerSearch">;
export default function OwnerSearch({ navigation }: Props) {
    const theme = useTheme();
    const [searchTextData, setSearchTextData] = useState("");
    const searchTextInputRef = useRef<TextInput>(null);
    const [searchResults, setSearchResults] = useState<Service[]>([]);
    
    const search = async () => {
        const services = await fetchServices();
        setSearchResults(services);
    }

    const rightActionButton = (
        <Button type={ButtonType.FILLED} style={{ ...IconButtonStyle, paddingLeft: 0, paddingRight: 0, shadowOpacity: 0 }} onPress={() => console.log("Filters")} accessibilityLabel={'Press to configure search filters'} >
            <Ionicons name="filter-circle" size={Units.LARGE} color={theme.palette.primary.main} />
        </Button>
    )
    
    const submitSearch = () => {
        console.log("search")
    }

    useEffect(() => {
        search();
        console.log(searchResults);
    }, [])


    return (
        <BaseScreen scrollEnabled={true} title="Search" subtitle="Available Services" rightAction={rightActionButton} style={{paddingHorizontal: Units.EXTRA_LARGE}}>
            <MotiView {...FadeInFromBottom(2)} style={{ width: "100%", marginTop: Units.MEDIUM }}>
                <TextInput
                    autoCapitalize="sentences"
                    autoCorrect={true}
                    ref={searchTextInputRef}
                    returnKeyType="done"
                    returnKeyLabel="Search"
                    clearButtonMode="while-editing"
                    value={searchTextData}
                    onChangeText={setSearchTextData}
                    style={{ ...TextInputStyle, color: theme.palette.text.default, borderColor: theme.palette.secondary.main, height: 48, width: "100%", marginTop: Units.SMALL }}
                    placeholder="Search"
                    onSubmitEditing={submitSearch}
                />
            </MotiView>
            <MotiView {...FadeInFromBottom(3)} style={{ width: "100%", marginTop: Units.MEDIUM }}>
                {/* FILTERS CONTAINER */}
            </MotiView>
            {searchResults.map((service, index) => (
                <ServiceCard service={service} key={`serviceCard${index}`} animationProps={{...FadeInFromBottom(index + 4)}} />
            ))}
            <View style={{ marginTop: 190 }} />
        </BaseScreen>
    );
}