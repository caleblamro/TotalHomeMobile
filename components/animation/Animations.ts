import { MotiProps } from "moti";
import { ViewStyle } from "react-native";

const DELAY = 100;

export const fadeInFromBottom = (number: number) => {
    return {
        from: { opacity: 0, translateY: 20 },
        animate: { opacity: 1, translateY: 0 },
        transition: { type: 'spring', delay: number * DELAY } as const,
        exit: { opacity: 0, translateY: 20 }
    }
}

export const fadeInOutFromBottom: MotiProps<ViewStyle> = {
    from: {
        opacity: 0,
        translateY: 20,
    },
    animate: {
        opacity: 1,
        translateY: 0,
    },
    exit: {
        opacity: 0,
        translateY: 20,
    }
}

export const fadeInFromTop = (number: number) => {
    return {
        from: { opacity: 0, translateY: -20 },
        animate: { opacity: 1, translateY: 0 },
        transition: { type: 'spring', delay: number * DELAY } as const,
        exit: { opacity: 0, translateY: -20 }
    }
}

export const fadeInFromLeft = (number: number) => {
    return {
        from: { opacity: 0, translateX: -20 },
        animate: { opacity: 1, translateX: 0 },
        transition: { type: 'spring', delay: number * DELAY } as const
    }
}

export const fadeInFromRight = (number: number) => {
    return {
        from: { opacity: 0, translateX: 20 },
        animate: { opacity: 1, translateX: 0 },
        transition: { type: 'spring', delay: number * DELAY } as const
    }
}