import { NavLink } from 'react-router-dom'

const Accueil = ()=>{
    return(
        <div className = "page-accueil container-fluid">
            <div className = "accueil-container container-fluid">
                <div className = "contenu-gauche">
                    <p>
                        <h1>Bienvenu</h1> sur le systeme de gestion de produit
                    </p>
                </div>
                <div className = "contenu-droite">
                    <NavLink to = "/produit"><button>Voir la liste des produits</button></NavLink>
                    <br />
                    <NavLink to = "/nouveau"><button>Ajouter un nouveau produit</button></NavLink>
                </div>
            </div>
        </div>
    )
}

export default Accueil;