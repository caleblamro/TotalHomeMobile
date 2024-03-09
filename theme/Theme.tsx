export enum ThemeMode {
    LIGHT = 'LIGHT',
    DARK = 'DARK'
}

export type Palette = {
    mode: ThemeMode;
    text: {
      default: string;
      secondary: string;
      special: string;
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
    L1 = "#e6e6e6",
    L2 = "#dfebf6",
    L3 = "#aac7d8",
    D1 = "#29353c",
    D2 = "#435662",
    D3 = "#7495d5"
}

export const tokens = (mode:ThemeMode) => ({
    mode: mode,
    palette: (mode === ThemeMode.LIGHT) ? {
        text: {
            default: Colors.D1,
            secondary: Colors.L1,
            special: Colors.D2,
            subtext: "#656565",
        },
        primary: {
            main: Colors.L1,
            on: Colors.D1
        },
        secondary: {
            main: Colors.D2,
            on: Colors.L1
        },
        tertiary: {
            main: Colors.D3,
            on: Colors.L1
        },
        alert: {

        }
    } : {
        text: {
            default: Colors.L1,
            secondary: Colors.D1,
            special: Colors.L2,
            subtext: "#b3b3b3"
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

        }
    }
} as Theme);