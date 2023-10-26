import { useState, useEffect } from 'react';
import { TbSearch, TbCheck, TbX } from 'react-icons/tb';
import axios from 'axios';
import useCustomeContext from '../Components/Context/useCustomeContext';

const Modification = ({isModification, cacherModification, donnee})=>{

    // context personnalisE
    const {
        setShowToast,
        setIsSuccess,
        setToastMessage,
        setToastTitle,
    } = useCustomeContext();

    const [ congeModifier, setCongeModifier ] = useState({
        CIN: donnee.CIN,
        Nom: donnee.Nom,
        Prenom: donnee.Prenom,
        Adresse: donnee.Adresse,
        Date_naissance: donnee.Date_naissance,
        Sexe: donnee.Sexe,
        Contact: donnee.Contact,
        Email: donnee.Email,
        Date_recrutement: donnee.Date_recrutement,
        Lieu_recrutement: donnee.Lieu_recrutement,
        Poste: donnee.Poste
    })

    useEffect(()=>{
        setCongeModifier(donnee)
    },[donnee])

    const classModification = isModification ? "modification-page afficher" : "modification-page cacher"

    const changePersonnel = e=>{
        setPersonnelModifier({...personnelModifier, [e.target.id]: e.target.value})
    }

    const handleSubmit = e=>{
        e.preventDefault()
        console.log(personnelModifier)
        axios.put(`http://localhost:3001/personnel/modifier/${personnelModifier.CIN}`, personnelModifier)
        .then(reponse =>{
            setToastTitle("Modification de visiteur")
            setToastMessage("Modification effectuée")
            setIsSuccess(true)
            setShowToast(true)
            cacherModification();
        })
        .catch(erreur =>{
            setToastTitle("Modification de visiteur")
            setToastMessage("Erreure de la modification!Veuillez reessayer")
            setIsSuccess(false)
            setShowToast(true)
        })
    }

    return(
        <div className = { classModification }>
            <div className = "modification-container">
                <div className = "entete">
                    <h5>Modification de Personnel</h5>
                </div>
                <div>
                    <form onSubmit = { handleSubmit }>
                        <div className = "container-input">
                            <label>CIN :</label>
                            <input type = "number" id = "CIN" value = {personnelModifier.CIN} disabled required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Nom : </label>
                            <input type = "text" id = "Nom" value = {personnelModifier.Nom} required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Prenom : </label>
                            <input type = "text" id = "Prenom"  value = {personnelModifier.Prenom} required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Adresse : </label>
                            <input type = "text" id = "Adresse" value = {personnelModifier.Adresse} required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Date_naissance : </label>
                            <input type = "date" id = "Date_naissance" value = {personnelModifier.Date_naissance} required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Sexe : </label>
                            <input type = "text" id = "Sexe" value = {personnelModifier.Sexe} required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Contact : </label>
                            <input type = "text" id = "Contact" value = {personnelModifier.Contact} required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Email : </label>
                            <input type = "text" id = "Email" value = {personnelModifier.Email} required onChange = {changePersonnel} />
                        </div>
                        <div className = "container-input">
                            <label>Date_recrutement : </label>
                            <input type = "date" id = "Date_recrutement" value = {personnelModifier.Date_recrutement} required onChange = {changePersonnel}/>
                        </div>
                        <div className = "container-input">
                            <label>Lieu_recrutement : </label>
                            <input type = "text" id = "Lieu_recrutement" value = {personnelModifier.Lieu_recrutement} required onChange = {changePersonnel}/>
                        </div>
                        <div className = "container-input">
                            <label>Poste : </label>
                            <input type = "text" id = "Poste" value = {personnelModifier.Poste} required onChange = {changePersonnel} />
                        </div>
                        <div className = 'section-bouton'>
                            <button type = "submit"><i><TbCheck /></i>Modifier</button>
                            <button onClick = { cacherModification } type = "reset"><i><TbX /></i>Annuler</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modification;