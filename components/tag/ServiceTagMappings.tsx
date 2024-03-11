import { ServiceType } from "../../global/api/Api";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Tag from "./Tag";
import { Units } from "../../global/styles/Constants";

interface ServiceTagMappingProps {
    type: ServiceType;
}

export default function ServiceTagMapping({ type }: ServiceTagMappingProps) {
    switch(type) {
        case ServiceType.CLEANING:
            return(
                <Tag color="#2b8ad9" name="Cleaning" icon={<MaterialIcons name="cleaning-services" size={Units.MEDIUM} color="#2b8ad9" />} />
            );
        case ServiceType.LANDSCAPING:
            return(
                <Tag color="#7cb24f" name="Landscaping" icon={<MaterialCommunityIcons name="mower" size={Units.MEDIUM} color="#7cb24f" />} />
            );
        case ServiceType.POOL_CARE:
            return(
                <Tag color="#ee8e00" name="Pool Care" icon={<MaterialCommunityIcons name="pool" size={Units.MEDIUM} color="#ee8e00" />} />
            );
        case ServiceType.PEST_CONTROL:
            return(
                <Tag color="#a72d25" name="Pest Control" icon={<MaterialIcons name="pest-control" size={Units.MEDIUM} color="#a72d25" />} />
            );
        default:
            return(
                <Tag color="#a72d25" name="Implement Tag" icon={<MaterialIcons name="error" size={Units.MEDIUM} color="#a72d25" />} />
            );
    }
}