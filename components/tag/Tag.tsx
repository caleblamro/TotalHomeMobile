import { View, Text } from "react-native";
import { BodyStyles, FlexRow } from "../../global/styles/Styles";
import { FontSizes, Units } from "../../global/styles/Constants";

interface TagProps {
    name: string;
    icon: React.ReactElement;
    color: string;
}

export default function Tag({name, icon, color}: TagProps) {
    return(
        <View style={{
            ...FlexRow,
            height: Units.EXTRA_LARGE,
            alignItems: "center",
            gap: Units.SMALL,
            paddingHorizontal: Units.SMALL,
            borderWidth: 1,
            borderColor: color,
            borderRadius: Units.SMALL
        }}>
            {icon}
            <Text style={{...BodyStyles, fontSize: FontSizes.SMALL, color: color}}>{name}</Text>
        </View>
    );
}