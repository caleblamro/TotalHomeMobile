const DELAY = 100;

export const FadeInFromBottom = (number: number) => {
    return {
        from: { opacity: 0, translateY: 20 },
        animate: { opacity: 1, translateY: 0 },
        transition: { type: 'spring', delay: number * DELAY } as const,
        exit: { opacity: 0, translateY: 20 }
    }
}
export const FadeInFromTop = (number: number) => {
    return {
        from: { opacity: 0, translateY: -20 },
        animate: { opacity: 1, translateY: 0 },
        transition: { type: 'spring', delay: number * DELAY } as const,
        exit: { opacity: 0, translateY: -20 }
    }
}

export const FadeInFromLeft = (number: number) => {
    return {
        from: { opacity: 0, translateX: -20 },
        animate: { opacity: 1, translateX: 0 },
        transition: { type: 'spring', delay: number * DELAY } as const
    }
}

export const FadeInFromRight = (number: number) => {
    return {
        from: { opacity: 0, translateX: 20 },
        animate: { opacity: 1, translateX: 0 },
        transition: { type: 'spring', delay: number * DELAY } as const
    }
}