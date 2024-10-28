// src/components/GrammyNomination.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { grammyApi } from '../api/grammyApi';

const MUSIC_GENRES = ['RAP', 'HIP_HOP', 'JAZZ', 'POST_ROCK'];

export const GrammyNomination = () => {
    const { bandId } = useParams();
    const [genre, setGenre] = useState('RAP');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNominate = async () => {
        if (!bandId) return;

        setLoading(true);
        setStatus('');

        try {
            await grammyApi.nominateBand(bandId, genre);
            setStatus('Nomination successful!');
        } catch (error) {
            setStatus(error.response?.status === 404
                ? 'Band not found'
                : 'Error nominating band');
        } finally {
            setLoading(false);
        }
    };

    const handleReward = async () => {
        if (!bandId) return;

        setLoading(true);
        setStatus('');

        try {
            await grammyApi.rewardBand(bandId, genre);
            setStatus('Band successfully rewarded!');
        } catch (error) {
            setStatus(error.response?.status === 404
                ? 'Band not found'
                : 'Error rewarding band');
        } finally {
            setLoading(false);
        }
    };

    if (!bandId) {
        return (
            <div className="grammy-container">
                <div className="grammy-error">
                    No band selected. Please select a band first.
                </div>
            </div>
        );
    }

    return (
        <div className="grammy-container">
            <h1 className="grammy-title">Grammy Awards</h1>

            <div className="grammy-form">
                <div className="form-group">
                    <label className="form-label">Select Genre:</label>
                    <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="form-select"
                        disabled={loading}
                    >
                        {MUSIC_GENRES.map(g => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>

                {status && (
                    <div className={`grammy-status ${status.includes('successful') ? 'success' : 'error'}`}>
                        {status}
                    </div>
                )}

                <div className="grammy-actions">
                    <button
                        onClick={handleNominate}
                        disabled={loading}
                        className="grammy-button nominate"
                    >
                        {loading ? 'Nominating...' : 'Nominate'}
                    </button>
                    <button
                        onClick={handleReward}
                        disabled={loading}
                        className="grammy-button reward"
                    >
                        {loading ? 'Rewarding...' : 'Reward'}
                    </button>
                </div>
            </div>
        </div>
    );
};