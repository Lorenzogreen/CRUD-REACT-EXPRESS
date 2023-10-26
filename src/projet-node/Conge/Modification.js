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

    const [ congeModifier, setCongeModifier ] = useState({
        rf_conge: donnee.rf_conge,
        CIN: donnee.CIN,
        Date_debut: donnee.Date_debut,
        Date_fin: donnee.Date_fin,
        Motif: donnee.Motif
    })

    useEffect(()=>{
        setCongeModifier(donnee)
    },[donnee])

    const classModification = isModification ? "modification-page afficher" : "modification-page cacher"

    const changeConge = e=>{
        setCongeModifier({...congeModifier, [e.target.id]: e.target.value})
    }

    const handleSubmit = e=>{
        e.preventDefault()
        console.log(congeModifier)
        axios.put(`http://localhost:3001/personnel/modifi/${congeModifier.rf_conge}`, congeModifier)
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
                    <h5>Modification d'absence</h5>
                </div>
                <div>
                    <form onSubmit = { handleSubmit }>
                        <div className = "container-input">
                            <label>rf_conge :</label>
                            <input type = "number" id = "rf_conge" value = {congeModifier.rf_conge} disabled required onChange = {changeConge} />
                        </div>
                        <div className = "container-input">
                            <label>CIN : </label>
                            <input type = "number" id = "CIN" value = {congeModifier.CIN} required onChange = {changeConge} />
                        </div>
                        <div className = "container-input">
                            <label>Date_debut : </label>
                            <input type = "date" id = "Date_debut"  value = {congeModifier.Date_debut} required onChange = {changeConge} />
                        </div>
                        <div className = "container-input">
                            <label>Date_fin : </label>
                            <input type = "date" id = "Date_fin" value = {congeModifier.Date_fin} required onChange = {changeConge} />
                        </div>
                        <div className = "container-input">
                            <label>Motif : </label>
                            <input type = "text" id = "Motif" value = {congeModifier.Motif} required onChange = {changeConge} />
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