import { createContext, useState, useReducer } from "react";

const CustomeContext = createContext({});

export const CustomeContextProvider = ({ children }) => {

    // toast
    const [ showToast, setShowToast ] = useState(false);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ toastMessage, setToastMessage ] = useState('');
    const [ toastTitle, setToastTitle ] = useState('');

    const [modalshow, setModalshow ] = useState(false)

    // update page
    const [useReducerValue, forceUpdate ] = useReducer(x=>x+1,0)


    return (
        <CustomeContext.Provider value = {{
            // toast
            showToast, 
            setShowToast,
            isSuccess, 
            setIsSuccess,
            toastMessage, 
            setToastMessage,
            toastTitle,
            setToastTitle,

            // modal
            modalshow, 
            setModalshow ,

            // update page
            useReducerValue,
            forceUpdate
        }}>
            { children }
        </CustomeContext.Provider>
    )
}

export default CustomeContext;