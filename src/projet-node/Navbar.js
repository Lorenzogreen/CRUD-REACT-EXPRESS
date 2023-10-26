import { NavLink } from 'react-router-dom'

const Navbar = ()=>{
    return(
        <div className = "navbar-top">
            <ul className = "ul-nav">
                <li className = "nav-item"><NavLink to = "/acceuil">Acceuil</NavLink></li>
                <li className = "nav-item"><NavLink to = "/personnel">Personnel</NavLink></li>
                <li className = "nav-item"><NavLink to = "/absence">Abscence</NavLink></li>
                <li className = "nav-item"><NavLink to = "/conge">Conge</NavLink></li>
                <li className = "nav-item"><NavLink to = "/carriere">carriere</NavLink></li>
                <li className = "nav-item"><NavLink to = "/">Se deconnecter</NavLink></li>
            </ul>
        </div>
    )
}

export default Navbar;