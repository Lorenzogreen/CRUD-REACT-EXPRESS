import { useState } from 'react';
import useCustomeContext from '../../Components/Context/useCustomeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TbCheck, TbX } from 'react-icons/tb'

const NouveauPersonnel = ({isAjout, cacherAjout })=>{

        
    // context personnalisE
    const {
        setShowToast,
        setIsSuccess,
        setToastMessage,
        setToastTitle,
    } = useCustomeContext();

    const navigate = useNavigate();

    const [ peronnel, setPersonnel ] = useState({});

    const classAjout = isAjout? "modification-page afficher" : "modification-page cacher"

    const changePersonnel = e=>{
        setPersonnel({...peronnel, [e.target.id]: e.target.value})
    }

    const handleSubmit = e=>{
        e.preventDefault()
        axios.post('http://localhost:3001/personnel/ajout', peronnel)
        .then(reponse =>{
            setToastTitle("Nouveau visiteur")
            setToastMessage("Visiteur ajouté avec succès")
            setIsSuccess(true)
            setShowToast(true)
            navigate("/personnel")
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
                    <h5>Ajout Personnel</h5>
                </div>
                <div>
                    <form onSubmit = { handleSubmit }>
                        <div className = "container-input">
                            <label>CIN :</label>
                            <input type = "text" id = "CIN" required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Nom : </label>
                            <input type = "text" id = "Nom" required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Prenom : </label>
                            <input type = "text" id = "Prenom" required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Adresse : </label>
                            <input type = "text"c id = "Adresse" required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Date_naissane : </label>
                            <input type = "date" id = "Date_naissance" required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Sexe : </label>
                            <input type = "text" id = "Sexe" required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Contact : </label>
                            <input type = "int" id = "Contact" required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Email : </label>
                            <input type = "text" id = "Email" required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Date_recrutement : </label>
                            <input type = "date" id = "Date_recrutement" required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Lieu_recrutement : </label>
                            <input type = "text" id = "Lieu_recrutement" required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Poste : </label>
                            <input type = "text" id = "Poste" required onChange = {changePersonnel} />
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

export default NouveauPersonnel;