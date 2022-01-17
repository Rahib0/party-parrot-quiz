import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { CreateGame, Homepage, JoinGame, ErrorPage, Leaderboard } from "./Pages";


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />}/>
                    <Route path='/create' element={<CreateGame />} />
                    <Route path='/join' element={<JoinGame />} />
                    <Route path='/leaderboards' element={<Leaderboard />} />
                    <Route path='*' element={<ErrorPage />} />
                    
                </Routes>
            </Router>
        </>
    )
}

export default App;
