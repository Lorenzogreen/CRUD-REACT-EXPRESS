import axios from 'axios'
import { useEffect, useState } from 'react'
import edit from '../img/edit.png';
import del from '../img/delete.png';
import { TbSearch, TbCheck, TbX } from 'react-icons/tb';
import Modification from './Modification';
import NouveauPersonnel from './NouveauPersonnel';
import useCustomeContext from '../../Components/Context/useCustomeContext';


const Personnel = ()=>{

    
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
    const [ personnelModifier, setPersonnelModifier ] = useState({})
    const [ personnelAjouter, setpersonnelAjouter ] = useState({})

    const classSuppression = isSuppression ? "suppression-page afficher" : "suppression-page cacher"

    useEffect(()=>{
        recupererListe();
    })

    useEffect(()=>{
        document.title = "Gestion de Personnel"
    },[])

    const recupererListe = _=>{
        axios.get('http://localhost:3001/personnel/liste')
        .then(reponse =>{
            setPersonnel(reponse.data.resultat)
        })
        .catch(erreure =>{
            setPersonnel([])
            console.log(erreure.response)
        })
    }

    const personnelAfficher = personnel.filter(item =>
        item.CIN.toString().toLowerCase().includes(filtre.toString().toLowerCase()) ||
        item.Nom.toString().toLowerCase().includes(filtre.toString().toLowerCase()) ||
        item.Prenom.toString().toLowerCase().includes(filtre.toString().toLowerCase()) ||
        item.Adresse.toString().toLowerCase().includes(filtre.toString().toLowerCase()) ||
        item.Date_naissance.toString().toLowerCase().includes(filtre.toString().toLowerCase()) ||
        item.Sexe.toString().toLowerCase().includes(filtre.toString().toLowerCase()) ||
        item.Contact.toString().toLowerCase().includes(filtre.toString().toLowerCase()) ||
        item.Email.toString().toLowerCase().includes(filtre.toString().toLowerCase()) ||
        item.Date_recrutement.toString().toLowerCase().includes(filtre.toString().toLowerCase()) ||
        item.Lieu_recrutement.toString().toLowerCase().includes(filtre.toString().toLowerCase()) ||
        item.Poste.toString().toLowerCase().includes(filtre.toString().toLowerCase()) 
        )

    const changeFilter = e =>{
        setFiltre(e.target.value)
    }

    const afficherModification = (objet)=>{
        setPersonnelModifier(objet)
        setIsModification(true)
    }

    const afficherAjout = (objet)=>{
        setpersonnelAjouter(objet)
        setIsAjout(true)
    }
    
    const cacherModification = _=>setIsModification(false)
   
    const cacherAjout = _=>setIsAjout(false)

    const afficherSuppression = numero=>{
        setPersonnelEffacer(numero)
        setIsSuppression(true)
    }

    const handleDelete = _=>{
        axios.delete(`http://localhost:3001/personnel/supprimer/${personnelEffacer}`)
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
            <Modification isModification = { isModification } cacherModification = { cacherModification } donnee = { personnelModifier } />
            <NouveauPersonnel  isAjout = { isAjout } cacherAjout = { cacherAjout } donnee = { personnelAjouter} />

            <div className =  { classSuppression } >
                <div className = "suppression-container">
                <div className = "entete-suppression">
                        <h5>Suppression de visiteur</h5>
                    </div>
                    <div className = "contenu-suppression">
                        <p>Voulez-vous continuer la suppression ?</p>
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
                             <th>CIN</th>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Adresse</th>
                            <th>Date_naissance</th>
                            <th>Sexe</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Date_recrutement</th>
                            <th>Lieu_recrutement</th>
                            <th>Poste</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            personnelAfficher.map((personnel, key) =>
                                <tr key = { key }>
                                    <td>{ personnel.CIN }</td>
                                    <td>{ personnel.Nom }</td>
                                    <td>{ personnel.Prenom }</td>
                                    <td>{ personnel.Adresse }</td>
                                    <td>{ personnel.Date_naissance }</td>
                                    <td>{ personnel.Sexe }</td>
                                    <td>{ personnel.Contact }</td>
                                    <td>{ personnel.Email }</td>
                                    <td>{ personnel.Date_recrutement }</td>
                                    <td>{ personnel.Lieu_recrutement }</td>
                                    <td>{ personnel.Poste }</td>
                                    <td>
                                        <button title = "Modifier" onClick = { ()=>afficherModification(personnel) }><img src = {edit} /></button>
                                        <button title = "supprimer" onClick = { ()=>afficherSuppression(personnel.CIN)}><img src = {del} /></button>
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

export default Personnel;