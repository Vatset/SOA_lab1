// src/api/musicBandApi.js
import axios from 'axios';

const API_URL = 'http://localhost/api';

export const musicBandApi = {

    getAllBands: async ({
                            name,
                            genre,
                            minParticipants,
                            maxParticipants,
                            sortBy,
                            sortDirection,
                            page,
                            size
                        }) => {
        try {
            const params = new URLSearchParams();

            if (name) params.append('name', name);
            if (genre?.length) genre.forEach(g => params.append('genre', g));
            if (minParticipants) params.append('minParticipants', minParticipants);
            if (maxParticipants) params.append('maxParticipants', maxParticipants);
            if (sortBy) params.append('sortBy', sortBy);
            if (sortDirection) params.append('sortDirection', sortDirection);
            if (page) params.append('page', page);
            if (size) params.append('size', size);

            const response = await axios.get(`${API_URL}/bands?${params.toString()}`);
            return {
                data: response.data,
                totalPages: parseInt(response.headers['x-total-pages'] || 1)
            };
        } catch (error) {
            console.error('Error fetching bands:', error);
            throw error;
        }
    },


    getBandById: async (id) => {
        const response = await axios.get(`${API_URL}/bands/${id}`);
        return response.data;
    },


    createBand: async (bandData) => {
        const response = await axios.post(`${API_URL}/bands`, bandData);
        return response.data;
    },


    updateBand: async (id, bandData) => {
        const response = await axios.put(`${API_URL}/bands/${id}`, bandData);
        return response.data;
    },


    deleteBand: async (id) => {
        await axios.delete(`${API_URL}/bands/${id}`);
    },

    deleteBySinglesCount: async (singlesCount) => {
        await axios.delete(`${API_URL}/bands/deleteBySinglesCount`, {
            params: { singlesCount }
        });
    },


    getAverageParticipants: async () => {
        const response = await axios.get(`${API_URL}/bands/averageNumberOfParticipants`);
        return response.data;
    },


    getBandsWithLessParticipants: async (number) => {
        const response = await axios.get(`${API_URL}/bands/lessThanNumberOfParticipants`, {
            params: { number }
        });
        return response.data;
    }
};
