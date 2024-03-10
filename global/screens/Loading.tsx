import { MotiView } from "moti";
import { FadeInFromBottom } from "../../components/animation/Animations";
import { FillAndCenter } from "../styles/Styles";
import LottieView from "lottie-react-native";

export default function Loading() {
    return(
        <MotiView { ...FadeInFromBottom } style={{ ...FillAndCenter }}>
            <LottieView
                autoPlay
                style={{
                  width: 200,
                  height: 200
                }}
                source={require('../animation/loading.json')}
            />
        </MotiView>
    );
}