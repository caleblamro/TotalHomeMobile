import { MotiView } from "moti";
import { fadeInFromBottom } from "../../../components/animation/Animations";
import { fillAndCenter } from "../../styles/Styles";
import LottieView from "lottie-react-native";

export default function Loading() {
    return(
        <MotiView { ...fadeInFromBottom } style={{ ...fillAndCenter }}>
            <LottieView
                autoPlay
                style={{
                  width: 200,
                  height: 200
                }}
                source={require('../../animation/loading.json')}
            />
        </MotiView>
    );
}