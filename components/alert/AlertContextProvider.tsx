import { useState } from "react";
import { AlertContext } from "../../global/hooks/Hooks";
import Alert, { AlertProps, AlertType } from "./Alert";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface Props {
    children?: React.ReactNode;
}

export default function AlertContextProvider({ children }: Props) {
    const [alertProps, setAlertProps] = useState<AlertProps>({ show: false, message: '', type: AlertType.INFO });
    const info = (message: string) => {
        setAlertProps({ show: true, message, type: AlertType.INFO });
        setTimeout(() => {
            setAlertProps((prev) => { 
                return { ...prev, show: false };
            })
        }, 2500);
    }
    const warning = (message: string) => {
        setAlertProps({ show: true, message, type: AlertType.WARNING });
        setTimeout(() => {
            setAlertProps((prev) => { 
                return { ...prev, show: false };
            })
        }, 2500);
    }
    const error = (message: string) => {
        setAlertProps({ show: true, message, type: AlertType.ERROR });
        setTimeout(() => {
            setAlertProps((prev) => { 
                return { ...prev, show: false };
            })
        }, 2500);
    }
    
    return(
        <AlertContext.Provider value={{ props: alertProps, info, warning, error }}>
            { children }
            <SafeAreaProvider style={{position: "absolute", width: "100%"}}>
                <Alert type={alertProps.type} message={alertProps.message} show={alertProps.show} />
            </SafeAreaProvider>
        </AlertContext.Provider>
    );
}