export const mockBands = [
    {
        id: 1,
        name: "The Rolling Code",
        coordinates: {
            x: 120.5,
            y: 45
        },
        creationDate: "2020-01-15T14:30:00.000Z",
        numberOfParticipants: 4,
        singlesCount: 12,
        genre: "ROCK",
        bestAlbum: {
            name: "Digital Dreams",
            length: 2460
        }
    },
    {
        id: 2,
        name: "Binary Jazz Ensemble",
        coordinates: {
            x: 85.3,
            y: 90
        },
        creationDate: "2019-08-22T10:15:00.000Z",
        numberOfParticipants: 5,
        singlesCount: 8,
        genre: "JAZZ",
        bestAlbum: {
            name: "Midnight Algorithms",
            length: 3120 // 52 minutes
        }
    },
    {
        id: 3,
        name: "Code Flow",
        coordinates: {
            x: 150.7,
            y: 30
        },
        creationDate: "2021-03-10T16:45:00.000Z",
        numberOfParticipants: 3,
        singlesCount: 15,
        genre: "HIP_HOP",
        bestAlbum: {
            name: "Debug Life",
            length: 1980 // 33 minutes
        }
    },
    {
        id: 4,
        name: "Silicon Sound System",
        coordinates: {
            x: 95.2,
            y: 70
        },
        creationDate: "2018-11-30T20:00:00.000Z",
        numberOfParticipants: 2,
        singlesCount: 20,
        genre: "POST_ROCK",
        bestAlbum: {
            name: "Quantum Waves",
            length: 2760 // 46 minutes
        }
    },
    {
        id: 5,
        name: "The Recursive Rebels",
        coordinates: {
            x: 180.0,
            y: 55
        },
        creationDate: "2022-05-17T12:20:00.000Z",
        numberOfParticipants: 4,
        singlesCount: 6,
        genre: "RAP",
        bestAlbum: {
            name: "Infinite Loops",
            length: 2280 // 38 minutes
        }
    },
    {
        id: 6,
        name: "Async Aurora",
        coordinates: {
            x: 110.5,
            y: 85
        },
        creationDate: "2021-09-05T15:30:00.000Z",
        numberOfParticipants: 3,
        singlesCount: 10,
        genre: "POST_ROCK",
        bestAlbum: {
            name: "Promise Land",
            length: 2940 // 49 minutes
        }
    },
    {
        id: 7,
        name: "The Git Punks",
        coordinates: {
            x: 75.8,
            y: 40
        },
        creationDate: "2020-07-12T18:45:00.000Z",
        numberOfParticipants: 5,
        singlesCount: 14,
        genre: "RAP",
        bestAlbum: {
            name: "Merge Conflicts",
            length: 2100 // 35 minutes
        }
    },
    {
        id: 8,
        name: "Quantum Query",
        coordinates: {
            x: 160.3,
            y: 95
        },
        creationDate: "2019-12-25T11:10:00.000Z",
        numberOfParticipants: 4,
        singlesCount: 9,
        genre: "JAZZ",
        bestAlbum: {
            name: "Database Dreams",
            length: 3300 // 55 minutes
        }
    },
    {
        id: 9,
        name: "The Stack Overflow",
        coordinates: {
            x: 130.9,
            y: 60
        },
        creationDate: "2022-01-08T14:15:00.000Z",
        numberOfParticipants: 6,
        singlesCount: 5,
        genre: "HIP_HOP",
        bestAlbum: {
            name: "Exception Handling",
            length: 2520 // 42 minutes
        }
    },
    {
        id: 10,
        name: "Neural Network",
        coordinates: {
            x: 90.4,
            y: 75
        },
        creationDate: "2021-11-20T17:50:00.000Z",
        numberOfParticipants: 3,
        singlesCount: 11,
        genre: "POST_ROCK",
        bestAlbum: {
            name: "Deep Learning",
            length: 2640 // 44 minutes
        }
    }
];

// Вспомогательные функции для работы с моковыми данными
export const mockApi = {
    getAllBands: ({ page = 1, size = 10, name, genre, minParticipants, maxParticipants, sortBy = 'name', sortDirection = 'asc' }) => {
        let filteredBands = [...mockBands];

        // Фильтрация по имени
        if (name) {
            filteredBands = filteredBands.filter(band =>
                band.name.toLowerCase().includes(name.toLowerCase())
            );
        }

        // Фильтрация по жанру
        if (genre && genre.length > 0) {
            filteredBands = filteredBands.filter(band =>
                genre.includes(band.genre)
            );
        }

        // Фильтрация по количеству участников
        if (minParticipants) {
            filteredBands = filteredBands.filter(band =>
                band.numberOfParticipants >= minParticipants
            );
        }
        if (maxParticipants) {
            filteredBands = filteredBands.filter(band =>
                band.numberOfParticipants <= maxParticipants
            );
        }

        // Сортировка
        filteredBands.sort((a, b) => {
            let compareResult = 0;
            if (sortBy === 'name') {
                compareResult = a.name.localeCompare(b.name);
            } else if (sortBy === 'numberOfParticipants') {
                compareResult = a.numberOfParticipants - b.numberOfParticipants;
            } else if (sortBy === 'singlesCount') {
                compareResult = a.singlesCount - b.singlesCount;
            } else if (sortBy === 'genre') {
                compareResult = a.genre.localeCompare(b.genre);
            }
            return sortDirection === 'asc' ? compareResult : -compareResult;
        });

        // Пагинация
        const start = (page - 1) * size;
        const paginatedBands = filteredBands.slice(start, start + size);
        const totalPages = Math.ceil(filteredBands.length / size);

        return {
            data: paginatedBands,
            totalPages,
            currentPage: page,
            totalItems: filteredBands.length
        };
    },

    getBandById: (id) => {
        const band = mockBands.find(band => band.id === Number(id));
        if (!band) {
            throw new Error('Band not found');
        }
        return band;
    },

    createBand: (bandData) => {
        const newBand = {
            ...bandData,
            id: Math.max(...mockBands.map(b => b.id)) + 1,
            creationDate: new Date().toISOString()
        };
        mockBands.push(newBand);
        return newBand;
    },

    updateBand: (id, bandData) => {
        const index = mockBands.findIndex(band => band.id === Number(id));
        if (index === -1) {
            throw new Error('Band not found');
        }
        mockBands[index] = { ...mockBands[index], ...bandData };
        return mockBands[index];
    },

    deleteBand: (id) => {
        const index = mockBands.findIndex(band => band.id === Number(id));
        if (index === -1) {
            throw new Error('Band not found');
        }
        mockBands.splice(index, 1);
    }


};