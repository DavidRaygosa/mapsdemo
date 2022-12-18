import { Routes, Route } from 'react-router-dom';
import Proximity from './components/proximity/proximity.component';
import Audience from './components/audience/audience.component';

const DefineRoute = () =>
    <Routes>
        <Route path="/mapsdemo/" element={ <Proximity />} />
        <Route path='/audience/' element={ <Audience /> } />
    </Routes>

export default DefineRoute;