import { useState, useEffect } from 'react';
import { TbSearch, TbCheck, TbX } from 'react-icons/tb';
import axios from 'axios';
import useCustomeContext from '../../Components/Context/useCustomeContext';

const Modification = ({isModification, cacherModification, donnee})=>{

    // context personnalisE
    const {
        setShowToast,
        setIsSuccess,
        setToastMessage,
        setToastTitle,
    } = useCustomeContext();

    const [ absenceModifier, setAbsenceModifier ] = useState({
        rf_absence: donnee.rf_absence,
        CIN: donnee.CIN,
        Date_debut: donnee.Date_debut,
        Date_fin: donnee.Date_fin,
        Type: donnee.Type
    })

    useEffect(()=>{
        setAbsenceModifier(donnee)
    },[donnee])

    const classModification = isModification ? "modification-page afficher" : "modification-page cacher"

    const changeAbsence = e=>{
        setAbsenceModifier({...absenceModifier, [e.target.id]: e.target.value})
    }

    const handleSubmit = e=>{
        e.preventDefault()
        console.log(absenceModifier)
        axios.put(`http://localhost:3001/personnel/modif/${absenceModifier.rf_absence}`, absenceModifier)
        .then(reponse =>{
            setToastTitle("Modification d'absence")
            setToastMessage("Modification effectuée")
            setIsSuccess(true)
            setShowToast(true)
            cacherModification();
        })
        .catch(erreur =>{
            setToastTitle("Modification d'absence")
            setToastMessage("Erreure de la modification!Veuillez reessayer")
            setIsSuccess(false)
            setShowToast(true)
        })
    }

    return(
        <div className = { classModification }>
            <div className = "modification-container">
                <div className = "entete">
                    <h5>Modification d'absence</h5>
                </div>
                <div>
                    <form onSubmit = { handleSubmit }>
                        <div className = "container-input">
                            <label>rf_absence :</label>
                            <input type = "number" id = "rf_absence" value = {absenceModifier.rf_absence} disabled required onChange = {changeAbsence} />
                        </div>
                        <div className = "container-input">
                            <label>CIN : </label>
                            <input type = "number" id = "CIN" value = {absenceModifier.CIN} required onChange = {changeAbsence} />
                        </div>
                        <div className = "container-input">
                            <label>Date_debut : </label>
                            <input type = "date" id = "Date_debut"  value = {absenceModifier.Date_debut} required onChange = {changeAbsence} />
                        </div>
                        <div className = "container-input">
                            <label>Date_fin : </label>
                            <input type = "date" id = "Date_fin" value = {absenceModifier.Date_fin} required onChange = {changeAbsence} />
                        </div>
                        <div className = "container-input">
                            <label>Type : </label>
                            <input type = "text" id = "Type" value = {absenceModifier.Type} required onChange = {changeAbsence} />
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