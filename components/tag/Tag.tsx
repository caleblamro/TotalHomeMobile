import { View, Text } from "react-native";
import { textBodyStyles, flexRow } from "../../global/styles/Styles";
import { FontSizes, Units } from "../../global/styles/Constants";

interface TagProps {
    name: string;
    icon: React.ReactElement;
    color: string;
}

export default function Tag({name, icon, color}: TagProps) {
    return(
        <View style={{
            ...flexRow,
            height: Units.EXTRA_LARGE,
            alignItems: "center",
            gap: Units.SMALL,
            paddingHorizontal: Units.SMALL,
            borderWidth: 1,
            borderColor: color,
            borderRadius: Units.SMALL
        }}>
            {icon}
            <Text style={{...textBodyStyles, fontSize: FontSizes.SMALL, color: color}}>{name}</Text>
        </View>
    );
}