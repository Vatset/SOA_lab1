
// src/api/grammyApi.js
import axios from 'axios';

const GRAMMY_API_URL = 'http://localhost/grammy';

export const grammyApi = {
    nominateBand: async (bandId, genre) => {
        await axios.post(`${GRAMMY_API_URL}/band/${bandId}/nominate/${genre}`);
    },

    rewardBand: async (bandId, genre) => {
        await axios.post(`${GRAMMY_API_URL}/band/${bandId}/reward/${genre}`);
    }
};