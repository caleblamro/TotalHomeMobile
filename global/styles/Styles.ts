import { Dimensions, TextStyle, ViewStyle } from "react-native"
import { FontSizes, Units } from "./Constants"
import { InputItemStyle } from "@ant-design/react-native/lib/input-item/style"

export const NoPadding: ViewStyle = {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0
}

export const FlexColumnFullWidth: ViewStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    gap: Units.SMALL
}
export const FillAndCenter: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    padding: Units.MEDIUM,
    justifyContent: 'center',
}
export const FillWidthAndCenter: ViewStyle = {
    display: "flex",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
}
export const FillScreen: ViewStyle = {
    width: "100%",
    height: "100%"
}
export const FlexRow: ViewStyle = {
    display: "flex",
    flexDirection: "row",
}
export const FlexColumn: ViewStyle = {
    display: "flex",
    flexDirection: "column",
}

//EFFECTS
export const DropShadow: ViewStyle = {
    shadowOffset: {
        width: 0, // Usually, a direct downward shadow doesn't need horizontal offset
        height: 4, // A moderate vertical offset for a subtle look
    },
    shadowColor: "#000",
    shadowOpacity: 0.2, // Lower opacity for subtlety
    shadowRadius: 6, // Softer edges for the shadow
    elevation: 6, // Elevation for Android
};
// TEXT STYLES

export const TextShadow: TextStyle = {
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
};

export const TitleStyles: TextStyle = {
    fontFamily: "Poppins-Bold",
    fontSize: FontSizes.TITLE
}

export const BodyStyles: TextStyle = {
    fontFamily: "Poppins-Regular",
    fontSize: FontSizes.MEDIUM,
}

// INPUT STYLES
export const TextInputStyle: TextStyle | ViewStyle = {
    borderWidth: 1,
    borderRadius: Units.MEDIUM,
    padding: Units.MEDIUM,
    paddingTop: Units.SMALL,
    paddingBottom: Units.SMALL,
    ...BodyStyles
}

// BUTTON STYLES
export const BaseButtonStyle: ViewStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Units.MEDIUM,
    padding: Units.LARGE,
    paddingVertical: Units.SMALL + 2,
    borderRadius: Units.MEDIUM,
    ...DropShadow
}
export const IconButtonStyle: ViewStyle = {
    ...BaseButtonStyle,
    justifyContent: "center",
    width: Units.LARGE * 2,
    height: Units.LARGE * 2
}

// NAVIGATION STYLES
export const NavigationStyle: ViewStyle = {
    position: "absolute",
    borderTopLeftRadius: Units.LARGE,
    borderTopRightRadius: Units.LARGE,
    width: "100%",
    padding: 0,
    paddingTop: Units.SMALL,
    paddingBottom: Units.LARGE,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    bottom: 0,
    left: 0,
    ...DropShadow,
    shadowOffset: {
        width: 0,
        height: -4
    },
    shadowOpacity: 0.1,

}

// CARD STYLES
export const BaseCardStyle: ViewStyle = {
    width: "100%",
    marginTop: Units.SMALL,
    padding: Units.SMALL,
    paddingBottom: Units.MEDIUM,
    paddingTop: Units.MEDIUM,
    borderRadius: Units.LARGE,
    backgroundColor: "#ffffff",
    ...DropShadow,
    shadowOffset: {
        width: 0,
        height: 8
    }
}

// ANTD INPUT STYLES

export const AntdTextInputStyle: Partial<InputItemStyle> = {
    container: {
        flex: 1,
        height: 48,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        borderWidth: 0
    },
}

export const AntdInputWrapperStyle: ViewStyle = {
    marginTop: Units.MEDIUM,
    borderWidth: 1,
    gap: Units.MEDIUM,
    minHeight: Units.EXTRA_LARGE + Units.MEDIUM,
    height: "auto",
    borderRadius: Units.MEDIUM,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: Units.MEDIUM,
}

// MODAL STYLES
export const ModalStyle: ViewStyle = {
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    zIndex: 4
}