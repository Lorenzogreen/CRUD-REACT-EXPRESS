import React,{ useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import useCustomeContext from '../Context/useCustomeContext';

function CustomToast() {
    const [delay, setDelay] = useState(10000)

    const {
        showToast,
        setShowToast,
        isSuccess,
        setIsSuccess,
        toastMessage, 
        setToastMessage,
        toastTitle,
        setToastTitle
    } = useCustomeContext();

    const color = isSuccess ? '#4AAE88' : '#E6443A'

    const closeToast = () => {
        setShowToast(false)
        setToastMessage('')
        setToastTitle('')

    }

    return (
        <ToastContainer containerPosition='fixed' position='top-center' className="p-3">
            <Toast
                style={{background: 'white', color: color}}
                onClose={ closeToast }
                show={ showToast}
                delay= { delay }
                autohide
            >
                <Toast.Header style={{color: color}}>
                    <strong className="me-auto">{ toastTitle }</strong>
                    <small>à l'instant</small>
                </Toast.Header>

                <Toast.Body style={{color: color}}>
                 { toastMessage }
                </Toast.Body>
            </Toast>
      </ToastContainer>
    )
}

export default CustomToast;