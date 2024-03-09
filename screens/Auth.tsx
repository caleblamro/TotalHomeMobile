import { useState } from "react";
import { View, Text } from "react-native";


export default function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    return(
        <View>
            <Text>
                Auth
            </Text>
        </View>
    );
}

const styles = {

}