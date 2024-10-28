// src/api/mockBandApi.js
import { mockApi } from '../mock/bands';

export const musicBandApi = {
    getAllBands: mockApi.getAllBands,
    getBandById: mockApi.getBandById,
    createBand: mockApi.createBand,
    updateBand: mockApi.updateBand,
    deleteBand: mockApi.deleteBand
};