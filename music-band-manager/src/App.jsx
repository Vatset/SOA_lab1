import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { BandList } from './components/BandList';
import { BandForm } from './components/BandForm';
import { GrammyNomination } from './components/GrammyNomination';
import './styles/main.css';

export const App = () => {
    return (
        <div className="app">
            <nav className="navbar">
                <div className="navbar-content">
                    <div className="navbar-links">
                        <Link to="/" className="navbar-brand">
                            Music Band Manager
                        </Link>
                    </div>
                    <Link to="/bands/new" className="navbar-button">
                        Add New Band
                    </Link>
                </div>
            </nav>

            <main className="container">
                <Routes>
                    <Route path="/" element={<BandList />} />
                    <Route path="/bands/new" element={<BandForm />} />
                    <Route path="/bands/:id" element={<BandForm />} />
                    <Route path="/grammy/:bandId" element={<GrammyNomination />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;