import Personnel from './Personnel/Personnel';
import NouveauPersonnel from './Personnel/NouveauPersonnel';
import Navbar from './Navbar';
import Abscence from './Absence/absence';
import Conge from './Conge/conge';
import Nouveauconge from './Conge/Nouveauconge';
import Nouveauabsence from './Absence/Nouveauabsence';

import { Routes, Route } from 'react-router';
import './app.css';

const App = ()=>{
    return(
        <>
            <Navbar />
            <div className = "contenu">
                <Routes>
                    <Route path = "personnel" element = { <Personnel /> } />
                    <Route path = "nouveau" element = { <NouveauPersonnel /> } />
                    <Route path = "personnel" element = { <Personnel /> } />
                    <Route path = "absence" element = { <Abscence /> } />
                    <Route path = "NA" element = { <Nouveauabsence /> } />
                    <Route path = "conge" element = { <Conge /> } />
                    <Route path = "NC" element = { <Nouveauconge /> } />
                   
                </Routes>
            </div>
        </>
    )
}

export default App;