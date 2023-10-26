import { useState } from 'react';
import useCustomeContext from '../../Components/Context/useCustomeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TbCheck, TbX } from 'react-icons/tb'

const Nouveauabsence = ({isAjout, cacherAjout })=>{

        
    // context personnalisE
    const {
        setShowToast,
        setIsSuccess,
        setToastMessage,
        setToastTitle,
    } = useCustomeContext();

    const navigate = useNavigate();

    const [ personnel, setPersonnel ] = useState({});

    const classAjout = isAjout? "modification-page afficher" : "modification-page cacher"

    const changePersonnel = e=>{
        setPersonnel({...personnel, [e.target.id]: e.target.value})
    }

    const handleSubmit = e=>{
        e.preventDefault()
        axios.post('http://localhost:3001/personnel/ajouter', personnel)
        .then(reponse =>{
            setToastTitle("Nouveau visiteur")
            setToastMessage("Visiteur ajouté avec succès")
            setIsSuccess(true)
            setShowToast(true)
            navigate("/absence")
            cacherAjout();
        })
        .catch(erreur =>{
            setToastTitle("Nouveau visiteur")
            setToastMessage("Echec de l'ajout!Veuillez reesayer")
            setIsSuccess(false)
            setShowToast(true)
        })
    }

    return(
    <div className = {classAjout}>    
        <div className = "nouveau-fce-page">
            <div className = "nouveau-fce-container">
                <div className = "entete">
                    <h5>Ajout Absence</h5>
                </div>
                <div>
                    <form onSubmit = { handleSubmit }>
                        <div className = "container-input">
                            <label>rf_absence :</label>
                            <input type = "number" id = "rf_absence" required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>CIN : </label>
                            <input type = "number" id = "CIN" required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Date_debut : </label>
                            <input type = "date" id = "Date_debut" required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Date_fin : </label>
                            <input type = "date"c id = "Date_fin" required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Type : </label>
                            <input type = "text" id = "Type" required onChange = {changePersonnel} />
                        </div>
                       
                        
                        <div className = 'section-bouton'>
                            <button type = "submit"><i><TbCheck /></i>Ajouter</button>
                            <button onClick = { cacherAjout }  type = "reset"><i><TbX /></i>Annuler</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
</div>
    )
}

export default Nouveauabsence;