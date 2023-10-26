const express = require('express');
const dbconnection = require('./dbconnection');
const router = express.Router();

// récuperer la liste des personnels
router.get('/liste', (req,res,next) =>{
    const requete_selecte_personnel = "SELECT * FROM `personnel`";
    dbconnection.query(requete_selecte_personnel, (erreure, resultat) =>{
        if(!erreure)
        {

            res.status(200).json({resultat, message: "Liste des personnels avec les informations"})
        }
        else
        {
            res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
        }
    })
})

// ajout d'un nouveau personnel
router.post('/ajout', (req, res, next) =>{
    const corps_de_requete = req.body
    const CIN = corps_de_requete.CIN
    const Nom = corps_de_requete.Nom
    const Prenom = corps_de_requete.Prenom
    const Adresse = corps_de_requete.Adresse
    const Date_naissance = corps_de_requete.Date_naissance
    const Sexe = corps_de_requete.Sexe
    const Contact = corps_de_requete.Contact
    const Email = corps_de_requete.Email
    const Date_recrutement = corps_de_requete.Date_recrutement
    const Lieu_recrutement = corps_de_requete.Lieu_recrutement
    const Poste = corps_de_requete.Poste

    const requete_insert_personnel = "INSERT INTO `personnel`(`CIN`, `Nom`, `Prenom`, `Adresse`, `Date_naissance`, `Sexe`, `Contact`, `Email`, `Date_recrutement`, `Lieu_recrutement`, `Poste`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const verification_numero = "SELECT * FROM `personnel` WHERE `CIN` = ?";

    if(CIN && Nom && Prenom && Adresse && Date_naissance && Sexe && Contact && Email && Date_recrutement && Lieu_recrutement && Poste)
    {
        dbconnection.query(verification_numero, [CIN], (erreureVerification, resultatVerification) =>{
            if(!erreureVerification)
            {
                if(resultatVerification.length > 0)
                {
                    res.status(403).json({message: "Le numero de personnel est déjà utilisé! Veuillez saisir un autre numero"})
                }
                else
                {
                    dbconnection.query(requete_insert_personnel, [CIN, Nom, Prenom, Adresse, Date_naissance, Sexe, Contact, Email, Date_recrutement, Lieu_recrutement, Poste], (erreureInsertion, resultatInsertion) =>{
                        if(!erreureInsertion)
                        {
                            res.status(200).json({message: "Nouveau personnel ajouté avec succès!"})
                        }
                        else
                        {
                            res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
                        }
                    })
                }
            }
            else
            {
                res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
            }
        })
    }
    else
    {
        res.status(403).json({message: "Veuillez compléter tous les champs!"})
    }
})

// modification de personnel
router.put('/modifier/:CIN', (req, res, next) =>{
    const ancien_numero = req.params.CIN

    const corps_de_requete = req.body
    const CIN = corps_de_requete.CIN
    const Nom = corps_de_requete.Nom
    const Prenom = corps_de_requete.Prenom
    const Adresse = corps_de_requete.Adresse
    const Date_naissance = corps_de_requete.Date_naissance
    const Sexe = corps_de_requete.Sexe
    const Contact = corps_de_requete.Contact
    const Email = corps_de_requete.Email
    const Date_recrutement = corps_de_requete.Date_recrutement
    const Lieu_recrutement = corps_de_requete.Lieu_recrutement
    const Poste = corps_de_requete.Poste

    const modification_personnel = "UPDATE `personnel` SET `CIN`= ?,`Nom`= ?,`Prenom`= ?,`Adresse`= ?,`Date_naissance`= ?,`Sexe`= ?,`Contact`= ?,`Email`= ?,`Date_recrutement`= ?,`Lieu_recrutement`= ?,`Poste`= ? WHERE `CIN` = ?";
    const verification_numero = "SELECT * FROM `personnel` WHERE `CIN` = ?";

    if(CIN && Nom && Prenom && Adresse && Date_naissance && Sexe && Contact && Email && Date_recrutement && Lieu_recrutement && Poste)
    {
        if(ancien_numero === CIN)
        {
            dbconnection.query(modification_personnel, [CIN, Nom, Prenom, Adresse, Date_naissance, Sexe, Contact, Email, Date_recrutement, Lieu_recrutement, Poste, ancien_numero], (erreureModification, resultatModification) =>{
                if(!erreureModification)
                {
                    res.status(200).json({message: "Modification de peronnel effectuée avec succès"})
                }
                else
                {
                    res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
                }
            })
        }
        else
        {
            dbconnection.query(verification_numero, [CIN], (erreureVerification, resultatVerification) =>{
                if(!erreureVerification)
                {
                        dbconnection.query(modification_personnel, [CIN, Nom, Prenom, Adresse, Date_naissance, Sexe, Contact, Email, Date_recrutement, Lieu_recrutement, Poste, ancien_numero], (erreureModification, resultatModification) =>{
                            if(!erreureModification)
                            {
                                res.status(200).json({message: "Modification de personnel effectuée avec succès"})
                            }
                            else
                            {
                                res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
                            }
                        })
                    
                }
                else
                {
                    res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
                }
            })
        }
    }
    else
    {
        res.status(403).json({message: "Veuillez compléter tous les champs!"})
    }
})

// suppression de personnel
router.delete('/supprimer/:CIN', (req, res, next) =>{
    const CIN = req.params.CIN

    const requete_suppression_personnel = "DELETE FROM `personnel` WHERE `CIN` = ?"

    if(CIN)
    {
        dbconnection.query(requete_suppression_personnel, [CIN], (erreureSuppression,resultatSuppression) =>{
            if(!erreureSuppression)
            {
                res.status(200).json({message: "Suppression de personnel effectuée avec succès"})
            }
            else
            {
                res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
            }
        })
    }
    else
    {
        res.status(403).json({message: "Veuillez indiquer le numero du personnel à supprimer"})
    }
})

module.exports = router;





// ABSENCE

// récuperer la liste des absence
router.get('/lister', (req,res,next) =>{
    const requete_selecte_personnel = "SELECT * FROM `absence`";
    dbconnection.query(requete_selecte_personnel, (erreure, resultat) =>{
        if(!erreure)
        {

            res.status(200).json({resultat, message: "Liste des personnels avec les informations"})
        }
        else
        {
            res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
        }
    })
})


// ajout d'un absence
router.post('/ajouter', (req, res, next) =>{
    const corps_de_requete = req.body
    const rf_absence = corps_de_requete.rf_absence
    const CIN = corps_de_requete.CIN
    const Date_debut = corps_de_requete.Date_debut
    const Date_fin = corps_de_requete.Date_fin
    const Type = corps_de_requete.Type

    const requete_insert_personnel = "INSERT INTO `absence`(`rf_absence`, `CIN`, `Date_debut`, `Date_fin`, `Type`) VALUES (?, ?, ?, ?, ?)";
    const verification_numero = "SELECT * FROM `absence` WHERE `rf_absence` = ?";

    if(rf_absence && CIN && Date_debut && Date_fin && Type)
    {
        dbconnection.query(verification_numero, [rf_absence], (erreureVerification, resultatVerification) =>{
            if(!erreureVerification)
            {
                if(resultatVerification.length > 0)
                {
                    res.status(403).json({message: "Le numero de personnel est déjà utilisé! Veuillez saisir un autre numero"})
                }
                else
                {
                    dbconnection.query(requete_insert_personnel, [rf_absence, CIN, Date_debut, Date_fin, Type], (erreureInsertion, resultatInsertion) =>{
                        if(!erreureInsertion)
                        {
                            res.status(200).json({message: "Nouveau personnel ajouté avec succès!"})
                        }
                        else
                        {
                            res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
                        }
                    })
                }
            }
            else
            {
                res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
            }
        })
    }
    else
    {
        res.status(403).json({message: "Veuillez compléter tous les champs!"})
    }
})

// modification d'absence
router.put('/modif/:rf_absence', (req, res, next) =>{
    const ancien_numero = req.params.rf_absence

    const corps_de_requete = req.body
    const rf_absence = corps_de_requete.rf_absence
    const CIN = corps_de_requete.CIN
    const Date_debut = corps_de_requete.Date_debut
    const Date_fin = corps_de_requete.Date_fin
    const Type = corps_de_requete.Type
    

    const modification_personnel = "UPDATE `absence` SET `rf_absence`= ?,`CIN`= ?,`Date_debut`= ?,`Date_fin`= ?,`Type`= ? WHERE `rf_absence` = ?";
    const verification_numero = "SELECT * FROM `absence` WHERE `rf_absence` = ?";

    if(rf_absence && CIN && Date_debut && Date_fin && Type)
    {
        if(ancien_numero === rf_absence)
        {
            dbconnection.query(modification_personnel, [rf_absence, CIN, Date_debut, Date_fin, Type, ancien_numero], (erreureModification, resultatModification) =>{
                if(!erreureModification)
                {
                    res.status(200).json({message: "Modification de peronnel effectuée avec succès"})
                }
                else
                {
                    res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
                }
            })
        }
        else
        {
            dbconnection.query(verification_numero, [rf_absence], (erreureVerification, resultatVerification) =>{
                if(!erreureVerification)
                {
                        dbconnection.query(modification_personnel, [rf_absence, CIN, Date_debut, Date_fin, Type, ancien_numero], (erreureModification, resultatModification) =>{
                            if(!erreureModification)
                            {
                                res.status(200).json({message: "Modification de personnel effectuée avec succès"})
                            }
                            else
                            {
                                res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
                            }
                        })
                    
                }
                else
                {
                    res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
                }
            })
        }
    }
    else
    {
        res.status(403).json({message: "Veuillez compléter tous les champs!"})
    }
})

// suppression d'absence
router.delete('/suppr/:rf_absence', (req, res, next) =>{
    const rf_absence = req.params.rf_absence

    const requete_suppression_personnel = "DELETE From `absence` WHERE `rf_absence` = ?"

    if(rf_absence)
    {
        dbconnection.query(requete_suppression_personnel, [rf_absence], (erreureSuppression,resultatSuppression) =>{
            if(!erreureSuppression)
            {
                res.status(200).json({message: "Suppression de personnel effectuée avec succès"})
            }
            else
            {
                res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
            }
        })
    }
    else
    {
        res.status(403).json({message: "Veuillez indiquer le numero du produit à supprimer"})
    }
})

module.exports = router;



// CONGE

// récuperer la liste des CONGES
router.get('/listere', (req,res,next) =>{
    const requete_selecte_personnel = "SELECT * FROM `conge`";
    dbconnection.query(requete_selecte_personnel, (erreure, resultat) =>{
        if(!erreure)
        {

            res.status(200).json({resultat, message: "Liste des personnels avec les informations"})
        }
        else
        {
            res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
        }
    })
})


// ajout de conge
router.post('/ajoutere', (req, res, next) =>{
    const corps_de_requete = req.body
    const rf_conge = corps_de_requete.rf_conge
    const CIN = corps_de_requete.CIN
    const Date_debut = corps_de_requete.Date_debut
    const Date_fin = corps_de_requete.Date_fin
    const Motif = corps_de_requete.Motif

    const requete_insert_personnel = "INSERT INTO `conge`(`rf_conge`, `CIN`, `Date_debut`, `Date_fin`, `Motif`) VALUES (?, ?, ?, ?, ?)";
    const verification_numero = "SELECT * FROM `conge` WHERE `rf_conge` = ?";

    if(rf_conge && CIN && Date_debut && Date_fin && Motif)
    {
        dbconnection.query(verification_numero, [rf_conge], (erreureVerification, resultatVerification) =>{
            if(!erreureVerification)
            {
                if(resultatVerification.length > 0)
                {
                    res.status(403).json({message: "Le numero de personnel est déjà utilisé! Veuillez saisir un autre numero"})
                }
                else
                {
                    dbconnection.query(requete_insert_personnel, [rf_conge, CIN, Date_debut, Date_fin, Motif], (erreureInsertion, resultatInsertion) =>{
                        if(!erreureInsertion)
                        {
                            res.status(200).json({message: "Nouveau personnel ajouté avec succès!"})
                        }
                        else
                        {
                            res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
                        }
                    })
                }
            }
            else
            {
                res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
            }
        })
    }
    else
    {
        res.status(403).json({message: "Veuillez compléter tous les champs!"})
    }
})

// modification de conge
router.put('/modifi/:rf_conge', (req, res, next) =>{
    const ancien_numero = req.params.rf_conge

    const corps_de_requete = req.body
    const rf_conge = corps_de_requete.rf_conge
    const CIN = corps_de_requete.CIN
    const Date_debut = corps_de_requete.Date_debut
    const Date_fin = corps_de_requete.Date_fin
    const Motif = corps_de_requete.Motif
    

    const modification_personnel = "UPDATE `conge` SET `rf_conge`= ?,`CIN`= ?,`Date_debut`= ?,`Date_fin`= ?,`Motif`= ? WHERE `rf_conge` = ?";
    const verification_numero = "SELECT * FROM `conge` WHERE `rf_conge` = ?";

    if(rf_conge && CIN && Date_debut && Date_fin && Motif)
    {
        if(ancien_numero === rf_conge)
        {
            dbconnection.query(modification_personnel, [rf_conge, CIN, Date_debut, Date_fin, Motif, ancien_numero], (erreureModification, resultatModification) =>{
                if(!erreureModification)
                {
                    res.status(200).json({message: "Modification de peronnel effectuée avec succès"})
                }
                else
                {
                    res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
                }
            })
        }
        else
        {
            dbconnection.query(verification_numero, [rf_conge], (erreureVerification, resultatVerification) =>{
                if(!erreureVerification)
                {
                        dbconnection.query(modification_personnel, [rf_conge, CIN, Date_debut, Date_fin, Motif, ancien_numero], (erreureModification, resultatModification) =>{
                            if(!erreureModification)
                            {
                                res.status(200).json({message: "Modification de personnel effectuée avec succès"})
                            }
                            else
                            {
                                res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
                            }
                        })
                    
                }
                else
                {
                    res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
                }
            })
        }
    }
    else
    {
        res.status(403).json({message: "Veuillez compléter tous les champs!"})
    }
})

// suppression dE conge
router.delete('/suppri/:rf_conge', (req, res, next) =>{
    const rf_conge = req.params.rf_conge

    const requete_suppression_personnel = "DELETE From `conge` WHERE `rf_conge` = ?"

    if(rf_conge)
    {
        dbconnection.query(requete_suppression_personnel, [rf_conge], (erreureSuppression,resultatSuppression) =>{
            if(!erreureSuppression)
            {
                res.status(200).json({message: "Suppression de personnel effectuée avec succès"})
            }
            else
            {
                res.status(500).json({message: "Une erreur venant du serveur s'est produite! Veuillez réessayer dans quelques instants"})
            }
        })
    }
    else
    {
        res.status(403).json({message: "Veuillez indiquer le numero du produit à supprimer"})
    }
})

module.exports = router;





