import axios from 'axios'
import { useEffect, useState } from 'react'
import edit from '../img/edit.png';
import del from '../img/delete.png';
import Modification from './Modification';
import { TbSearch, TbCheck, TbX } from 'react-icons/tb';
import useCustomeContext from '../../Components/Context/useCustomeContext';
import Nouveauconge from './Nouveauconge';


const    Conge = ()=>{

    
    // context personnalisE
    const {
        setShowToast,
        setIsSuccess,
        setToastMessage,
        setToastTitle,
    } = useCustomeContext();

    const [ personnel, setPersonnel ] = useState([])
    const [ filtre, setFiltre ] = useState("")
    const [ isModification, setIsModification ] = useState(false)
    const [ isAjout, setIsAjout ] = useState(false)
    const [ isSuppression, setIsSuppression ] = useState(false)
    const [ personnelEffacer, setPersonnelEffacer ] = useState("")
    const [ abModifier, setabModifier ] = useState({})
    const [ congeAjouter, setcongeAjouter ] = useState({})

    const classSuppression = isSuppression ? "suppression-page afficher" : "suppression-page cacher"

    useEffect(()=>{
        recupererListe();
    })

    useEffect(()=>{
        document.title = "Gestion de Personnel"
    },[])

    const recupererListe = _=>{
        axios.get('http://localhost:3001/personnel/listere')
        .then(reponse =>{
            setPersonnel(reponse.data.resultat)
        })
        .catch(erreure =>{
            setPersonnel([])
            console.log(erreure.response)
        })
    }

    const personnelAfficher = personnel.filter(item =>
        item.rf_conge.toString().toLowerCase().includes(filtre.toString().toLowerCase()) ||
        item.CIN.toString().toLowerCase().includes(filtre.toString().toLowerCase()) ||
        item.Date_debut.toString().toLowerCase().includes(filtre.toString().toLowerCase()) ||
        item.Date_fin.toString().toLowerCase().includes(filtre.toString().toLowerCase()) ||
        item.Motif.toString().toLowerCase().includes(filtre.toString().toLowerCase()) 
        )

    const changeFilter = e =>{
        setFiltre(e.target.value)
    }

    const afficherModification = (objet)=>{
        setabModifier(objet)
        setIsModification(true)
    }

    const afficherAjout = (objet)=>{
        setcongeAjouter(objet)
        setIsAjout(true)
    }

    const cacherModification = _=>setIsModification(false)

    const cacherAjout = _=>setIsAjout(false)

    const afficherSuppression = numero=>{
        setPersonnelEffacer(numero)
        setIsSuppression(true)
    }

    const handleDelete = _=>{
        axios.delete(`http://localhost:3001/personnel/suppri/${personnelEffacer}`)
        .then(reponse =>{
            setToastTitle("Suppression de Visiteur")
            setToastMessage("Suppression effectuée avec succès")
            setIsSuccess(true)
            setShowToast(true)
            cacherSuppression();
        })
        .catch(erreur =>{
            setToastTitle("Suppression de visiteur")
            setToastMessage("Erreure de la suppression!Veuillez recommencer dans quelques instants")
            setIsSuccess(false)
            setShowToast(true)
        })
        console.log(personnelEffacer)
    }

    const cacherSuppression = _=>setIsSuppression(false)

    return(
        <div className = "container container-fce-page">
            <Modification isModification = { isModification } cacherModification = { cacherModification } donnee = { abModifier } />
            <Nouveauconge  isAjout = { isAjout } cacherAjout = { cacherAjout } donnee = { congeAjouter } />

            <div className =  { classSuppression } >
                <div className = "suppression-container">
                    <div className = "entete-suppression">
                        <h5>Suppression de Personnel</h5>
                    </div>
                    <div className = "contenu-suppression">
                        <p>Voulez-vous continuer la suppression ?</p>
                    </div>
                    <div className = "bouton-suppression">
                        <button onClick = { handleDelete }> <i><TbCheck /></i>Continuer</button>
                        <button onClick = { cacherSuppression }> <i><TbX /></i>Annuler</button>
                    </div>
                </div>
            </div>
            <div className = "container container-fce">
                
            <div className = "add">
                    <div><button title = "Ajouter" onClick = { ()=>afficherAjout(personnel) }>Add</button></div>
                    <div className = "entete">
                        <input type = "text" placeholder = "recherche" onChange = { changeFilter } /> <i className = "search-icon"> <TbSearch /></i>
                    </div>
                </div>
                <table className = "table table-hover">
                    <thead>
                        <tr>
                             <th>rf_conge</th>
                            <th>CIN</th>
                            <th>Date_debut</th>
                            <th>Date_fin</th>
                            <th>Motif</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            personnelAfficher.map((personnel, key) =>
                                <tr key = { key }>
                                    <td>{ personnel.rf_conge }</td>
                                    <td>{ personnel.CIN }</td>
                                    <td>{ personnel.Date_debut }</td>
                                    <td>{ personnel.Date_fin }</td>
                                    <td>{ personnel.Motif }</td>
                                    <td>
                                        <button title = "Modifier" onClick = { ()=>afficherModification(personnel) }><img src = {edit} /></button>
                                        <button title = "supprimer" onClick = { ()=>afficherSuppression(personnel.rf_conge)}><img src = {del} /></button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Conge;