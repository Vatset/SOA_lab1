import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { musicBandApi } from '../api/musicBandApi';
import '../styles/main.css';

const MUSIC_GENRES = ['RAP', 'HIP_HOP', 'JAZZ', 'POST_ROCK'];

export const BandForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        coordinates: { x: 0, y: 0 },
        numberOfParticipants: 1,
        singlesCount: null,
        genre: 'RAP',
        bestAlbum: { name: '', length: 1 }
    });

    useEffect(() => {
        if (id) {
            fetchBand();
        }
    }, [id]);

    const fetchBand = async () => {
        try {
            const data = await musicBandApi.getBandById(id);
            setFormData(data);
        } catch (error) {
            console.error('Error fetching band:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await musicBandApi.updateBand(id, formData);
            } else {
                await musicBandApi.createBand(formData);
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving band:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2 className="form-title">
                {id ? 'Edit Band' : 'Create New Band'}
            </h2>

            <div className="form-group">
                <label className="form-label">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Coordinates:</label>
                <input
                    type="number"
                    step="0.1"
                    max="183"
                    value={formData.coordinates.x}
                    onChange={(e) => setFormData(prev => ({
                        ...prev,
                        coordinates: { ...prev.coordinates, x: parseFloat(e.target.value) }
                    }))}
                    className="form-input"
                    required
                />
                <input
                    type="number"
                    value={formData.coordinates.y}
                    onChange={(e) => setFormData(prev => ({
                        ...prev,
                        coordinates: { ...prev.coordinates, y: parseInt(e.target.value) }
                    }))}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Number of Participants:</label>
                <input
                    type="number"
                    name="numberOfParticipants"
                    min="1"
                    value={formData.numberOfParticipants}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Singles Count:</label>
                <input
                    type="number"
                    name="singlesCount"
                    min="1"
                    value={formData.singlesCount || ''}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label className="form-label">Genre:</label>
                <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="form-select"
                    required
                >
                    {MUSIC_GENRES.map(genre => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Best Album:</label>
                <input
                    type="text"
                    placeholder="Album name"
                    value={formData.bestAlbum.name}
                    onChange={(e) => setFormData(prev => ({
                        ...prev,
                        bestAlbum: { ...prev.bestAlbum, name: e.target.value }
                    }))}
                    className="form-input"
                    required
                />
                <input
                    type="number"
                    min="1"
                    placeholder="Album length (seconds)"
                    value={formData.bestAlbum.length}
                    onChange={(e) => setFormData(prev => ({
                        ...prev,
                        bestAlbum: { ...prev.bestAlbum, length: parseInt(e.target.value) }
                    }))}
                    className="form-input"
                    required
                />
            </div>

            <button type="submit" className="submit-button">
                {id ? 'Update Band' : 'Create Band'}
            </button>
        </form>
    );
};