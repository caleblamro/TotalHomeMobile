export enum ThemeMode {
    LIGHT = 'LIGHT',
    DARK = 'DARK'
}

export type Palette = {
    mode: ThemeMode;
    text: {
        default: string;
        secondary: string;
        subtext: string;
    };
    primary: {
        main: string;
        on: string;
    };
    secondary: {
        main: string;
        on: string;
    };
    tertiary: {
        main: string;
        on: string;
    };
    alert: {
        success: string;
        warning: string;
        error: string;
        info: string;
        special: string;
        highlight: string;
    };
}

export type Theme = {
    mode: ThemeMode;
    palette: Palette
}

export enum Colors {
    L1 = "#f2f8fd",
    L2 = "#ffffff",
    L3 = "#7f848d",
    D1 = "#46516a",
    D2 = "#adb4c0",
    D3 = "#737b90"
}

export const tokens = (mode: ThemeMode) => ({
    mode: mode,
    palette: (mode === ThemeMode.LIGHT) ? {
        text: {
            default: Colors.D1,
            secondary: Colors.L1,
            subtext: Colors.D2,
        },
        primary: {
            main: Colors.L1,
            on: Colors.D1
        },
        secondary: {
            main: Colors.D2,
            on: Colors.L2
        },
        tertiary: {
            main: Colors.D3,
            on: Colors.L3
        },
        alert: {
            success: "#357c38", // Light Green
            warning: "#ee8e00", // Light Orange
            error: "#a72d25", // Light Red
            info: "#2b8ad9", // Light Blue
            special: "#e8d534", // Light Yellow
            highlight: "#85be55",
        }
    } : {
        text: {
            default: Colors.L1,
            secondary: Colors.D1,
            special: Colors.L2,
            subtext: Colors.L2
        },
        primary: {
            main: Colors.D1,
            on: Colors.L1
        },
        secondary: {
            main: Colors.L2,
            on: Colors.D1
        },
        tertiary: {
            main: Colors.L3,
            on: Colors.D1
        },
        alert: {
            success: "#388E3C", // Dark Green
            warning: "#F57C00", // Dark Orange
            error: "#D32F2F", // Dark Red
            info: "#1976D2", // Dark Blue
            special: "#FBC02D", // Dark Yellow
            highlight: "#0097A7", // Dark Cyan
        }
    }
} as Theme);