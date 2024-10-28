// src/components/BandList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { musicBandApi } from '../api/musicBandApi';
import { musicBandApi } from '../api/mockMusicBandApi';
//import { api } from '../api';
import '../styles/main.css';


const MUSIC_GENRES = ['RAP', 'HIP_HOP', 'JAZZ', 'POST_ROCK'];
const PAGE_SIZES = [5, 10, 20, 50];
const SORT_FIELDS = [
    { value: 'name', label: 'Name' },
    { value: 'numberOfParticipants', label: 'Participants' },
    { value: 'singlesCount', label: 'Singles' },
    { value: 'genre', label: 'Genre' }
];

export const BandList = () => {

    const [nameFilter, setNameFilter] = useState('');
    const [genreFilters, setGenreFilters] = useState([]);
    const [minParticipants, setMinParticipants] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [averageParticipants, setAverageParticipants] = useState(null);
    const [lessThanParticipants, setLessThanParticipants] = useState('');
    const [filteredByParticipants, setFilteredByParticipants] = useState([]);
    const [singlesCountToDelete, setSinglesCountToDelete] = useState('');


    const fetchAverageParticipants = async () => {
        try {
            const average = await musicBandApi.getAverageParticipants();
            setAverageParticipants(average);
        } catch (error) {
            console.error('Error fetching average participants:', error);
            alert('Failed to fetch average participants');
        }
    };


    const handleFetchLessParticipants = async () => {
        if (!lessThanParticipants) {
            alert('Please enter number of participants');
            return;
        }

        try {
            const bands = await musicBandApi.getBandsWithLessParticipants(lessThanParticipants);
            setFilteredByParticipants(bands);
        } catch (error) {
            console.error('Error fetching bands by participants:', error);
            alert('Failed to fetch bands');
        }
    };


    const handleDeleteBySingles = async () => {
        if (!singlesCountToDelete) {
            alert('Please enter singles count');
            return;
        }

        if (window.confirm(`Are you sure you want to delete all bands with ${singlesCountToDelete} singles?`)) {
            try {
                await musicBandApi.deleteBySinglesCount(singlesCountToDelete);
                alert('Bands deleted successfully');
                fetchBands(); // Обновляем список после удаления
            } catch (error) {
                console.error('Error deleting bands:', error);
                alert('Failed to delete bands');
            }
        }
    };


    useEffect(() => {
        fetchAverageParticipants();
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this band?')) {
            try {
                await musicBandApi.deleteBand(id);
                // После успешного удаления обновляем список
                fetchBands();
            } catch (error) {
                console.error('Error deleting band:', error);
                alert('Failed to delete band. Please try again.');
            }
        }
    };


    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');


    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);


    const [bands, setBands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBands();
    }, [nameFilter, genreFilters, minParticipants, maxParticipants, sortField, sortDirection, page, pageSize]);

    const fetchBands = async () => {
        try {
            setLoading(true);
            const params = {
                name: nameFilter || undefined,
                genre: genreFilters,
                minParticipants: minParticipants || undefined,
                maxParticipants: maxParticipants || undefined,
                sortBy: sortField,
                sortDirection,
                page,
                size: pageSize
            };

            const response = await musicBandApi.getAllBands(params);
            setBands(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Error fetching bands:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGenreToggle = (genre) => {
        setGenreFilters(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        );
        setPage(1);
    };

    const handleSortChange = (field) => {
        if (field === sortField) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
        setPage(1);
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(Number(newSize));
        setPage(1);
    };

    return (
        <div className="band-list">
            <h1 className="band-list-header">Music Bands</h1>
            <div className="additional-operations">
                <div className="operation-group">
                    <h3>Average Participants</h3>
                    {averageParticipants !== null && (
                        <div className="average-value">
                            {averageParticipants.toFixed(2)}
                        </div>
                    )}
                    <button
                        onClick={fetchAverageParticipants}
                        className="refresh-button"
                    >
                        Refresh
                    </button>
                </div>

                <div className="operation-group">
                    <h3>Filter by Participants</h3>
                    <div className="input-with-button">
                        <input
                            type="number"
                            value={lessThanParticipants}
                            onChange={(e) => setLessThanParticipants(e.target.value)}
                            placeholder="Max participants"
                            className="operation-input"
                            min="1"
                        />
                        <button
                            onClick={handleFetchLessParticipants}
                            className="operation-button"
                        >
                            Filter
                        </button>
                    </div>
                </div>

                <div className="operation-group">
                    <h3>Delete by Singles Count</h3>
                    <div className="input-with-button">
                        <input
                            type="number"
                            value={singlesCountToDelete}
                            onChange={(e) => setSinglesCountToDelete(e.target.value)}
                            placeholder="Singles count"
                            className="operation-input"
                            min="1"
                        />
                        <button
                            onClick={handleDeleteBySingles}
                            className="operation-button delete"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>


            {filteredByParticipants.length > 0 && (
                <div className="filtered-results">
                    <h3>Bands with less than {lessThanParticipants} participants:</h3>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Genre</th>
                            <th>Participants</th>
                            <th>Singles</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredByParticipants.map((band) => (
                            <tr key={band.id}>
                                <td>{band.name}</td>
                                <td>{band.genre}</td>
                                <td>{band.numberOfParticipants}</td>
                                <td>{band.singlesCount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>)}
            {/* Фильтры */}
            <div className="filters-section">
                <div className="filter-group">
                    <label className="filter-label">Band Name:</label>
                    <input
                        type="text"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        className="filter-input"
                        placeholder="Filter by name..."
                    />
                </div>

                <div className="filter-group">
                    <label className="filter-label">Genres:</label>
                    <div className="genre-checkboxes">
                        {MUSIC_GENRES.map(genre => (
                            <label key={genre} className="genre-checkbox">
                                <input
                                    type="checkbox"
                                    checked={genreFilters.includes(genre)}
                                    onChange={() => handleGenreToggle(genre)}
                                />
                                {genre}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="filter-group">
                    <label className="filter-label">Participants:</label>
                    <div className="participants-range">
                        <input
                            type="number"
                            value={minParticipants}
                            onChange={(e) => setMinParticipants(e.target.value)}
                            className="filter-input"
                            placeholder="Min"
                            min="1"
                        />
                        <span>to</span>
                        <input
                            type="number"
                            value={maxParticipants}
                            onChange={(e) => setMaxParticipants(e.target.value)}
                            className="filter-input"
                            placeholder="Max"
                            min="1"
                        />
                    </div>
                </div>
            </div>

            {/* Сортировка и размер страницы */}
            <div className="controls-section">
                <div className="sort-controls">
                    <label className="control-label">Sort by:</label>
                    <select
                        value={sortField}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="control-select"
                    >
                        {SORT_FIELDS.map(field => (
                            <option key={field.value} value={field.value}>
                                {field.label}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                        className="sort-direction-button"
                    >
                        {sortDirection === 'asc' ? '↑' : '↓'}
                    </button>
                </div>

                <div className="page-size-control">
                    <label className="control-label">Items per page:</label>
                    <select
                        value={pageSize}
                        onChange={(e) => handlePageSizeChange(e.target.value)}
                        className="control-select"
                    >
                        {PAGE_SIZES.map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Таблица */}
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Participants</th>
                        <th>Singles</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bands.map((band) => (
                        <tr key={band.id}>
                            <td>{band.name}</td>
                            <td>{band.genre}</td>
                            <td>{band.numberOfParticipants}</td>
                            <td>{band.singlesCount}</td>
                            <td className="actions-cell">
                                <Link to={`/bands/${band.id}`} className="edit-button">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(band.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                                <Link
                                    to={`/grammy/${band.id}`}
                                    className="grammy-link"
                                >
                                    Grammy
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}


            {/* Пагинация */}
            <div className="pagination">
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="pagination-button"
                >
                    Previous
                </button>

                <div className="pagination-info">
                    Page {page} of {totalPages}
                </div>

                <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="pagination-button"
                >
                    Next
                </button>
            </div>
        </div>
    );
};