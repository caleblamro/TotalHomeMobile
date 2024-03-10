import { Service } from "../../global/api/Api";
import CardContainer, { CardContainerProps } from "./CardContainer";
import { BodyStyles, FlexColumn, FlexColumnFullWidth, FlexRow, IconButtonStyle, NoPadding, TitleStyles } from "../../global/styles/Styles";
import { View, Text } from "react-native";
import { FontSizes, Units } from "../../global/styles/Constants";
import { useTheme } from "../../global/hooks/Hooks";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Button, { ButtonType } from "../button/Button";
import ServiceTagMapping from "../tag/ServiceTagMappings";
import Tag from "../tag/Tag";


interface ServiceCardProps extends CardContainerProps {
    service: Service;
}

export default function ServiceCard({ animationProps, style, service }: ServiceCardProps) {
    const theme = useTheme();

    return (
        <CardContainer animationProps={animationProps} style={{ ...style, padding: Units.LARGE, paddingTop: Units.LARGE, paddingBottom: Units.LARGE, marginTop: Units.LARGE }}>
            <View style={{ ...FlexRow, gap: Units.MEDIUM, alignItems: "center" }}>
                <View style={{ width: Units.EXTRA_LARGE, height: Units.EXTRA_LARGE }}>
                    {/* SERVICE PICTURE ? OR MAYBE PROFILE PICTURE */}
                    <Ionicons name="person-circle-outline" size={Units.EXTRA_LARGE} color={theme.palette.primary.on} />
                </View>
                <View style={{ ...FlexColumn }}>
                    <Text style={{ ...TitleStyles, fontSize: FontSizes.LARGE, color: theme.palette.primary.on }}>
                        {service.name}
                    </Text>
                    <Text style={{ ...TitleStyles, fontSize: FontSizes.MEDIUM, color: theme.palette.tertiary.main }}>
                        {service.providedBy}
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                    <Button style={{ ...IconButtonStyle, ...NoPadding, shadowOpacity: 0, backgroundColor: theme.palette.secondary.on }} type={ButtonType.FILLED} onPress={() => console.log("chat")} accessibilityLabel={`Chat with ${service.providedBy}`}>
                        <MaterialCommunityIcons
                            name="chat-plus"
                            size={Units.LARGE}
                            color={theme.palette.primary.on}
                        />
                    </Button>
                </View>
            </View>
            <View style={{ ...FlexRow, justifyContent: "space-evenly", alignItems: "center", marginTop: Units.MEDIUM }}>
                <View style={{ ...FlexRow, gap: 2 }}>
                    {Array.from({ length: service.rating }, (_value, index) => (
                        <Ionicons
                            key={`service${service.name}Rating${index}`}
                            name="star"
                            size={Units.SMALL + 4}
                            color={theme.palette.alert.special}
                        />
                    ))}
                </View>
                <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: theme.palette.tertiary.main }} />
                <Text style={{ ...TitleStyles, fontSize: FontSizes.SMALL, color: theme.palette.primary.on }}>
                    {service.recurring ? service.recurringFrequency : "One Time"}
                </Text>
                <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: theme.palette.tertiary.main }} />
                <Text style={{ ...TitleStyles, fontSize: FontSizes.SMALL, color: theme.palette.alert.success }}>
                    {!service.needQuote ? "$ " + service.price : "Quoted"}
                </Text>
            </View>
            <View style={{ ...FlexRow, marginTop: Units.MEDIUM, gap: Units.SMALL }}>
                <ServiceTagMapping type={service.type} />
                <Tag
                    icon={<MaterialCommunityIcons name={service.negotiable ? "handshake" : "cancel"} size={Units.MEDIUM} color={service.negotiable ? "#7cb24f" : theme.palette.alert.error} />}
                    color={service.negotiable ? "#7cb24f" : theme.palette.alert.error}
                    name={service.negotiable ? "Negotiable" : "Non-Negotiable"}
                />
            </View>
            <View style={{ ...FlexRow, gap: Units.SMALL, marginTop: Units.MEDIUM }}>
                <Text style={{ ...TitleStyles, fontSize: FontSizes.MEDIUM, color: theme.palette.tertiary.main, fontFamily: "Poppins-Medium" }}>
                    {"    " + service.description}
                </Text>
            </View>
            <View style={{ ...FlexColumn, gap: Units.MEDIUM, marginTop: Units.MEDIUM }}>
                <Button style={{ shadowOpacity: 0, justifyContent: "center", backgroundColor: theme.palette.primary.on }} type={ButtonType.FILLED} onPress={() => console.log("+ Event on service")} accessibilityLabel={`Click to start activation process for ${service.name}`}>
                    <Ionicons name={service.needQuote ? "send" : "add-circle-sharp"} size={Units.LARGE} color={theme.palette.primary.main} />
                    <Text style={{ ...BodyStyles, color: theme.palette.primary.main, fontFamily: "Poppins-Medium" }}>
                        {service.needQuote ? "Request Quote" : "Activate Service"}
                    </Text>
                </Button>
            </View>
        </CardContainer>
    );
}