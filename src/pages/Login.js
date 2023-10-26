import { useNavigation, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {

    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        // authentification
        navigate("/acceuil");
    }

    return(
        <div className = "login-page">
            <div className = "login-container">
                <form onSubmit = { handleSubmit }>
                    <input type = "text" placeholder = "Adresse email"/>
                    <input type = "password"  placeholder = "Mot de passe"/>
                    <input type = "submit" value = "Se connecter" />
                </form>
            </div>
        </div>
    )
}