export const apiService = {
    // Interventions
    async getInterventions() {
        const response = await fetch("http://localhost:5000/interventions");
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des interventions');
        }
        return response.json();
    },

    async createIntervention(interventionData) {
        const response = await fetch("http://localhost:5000/interventions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(interventionData),
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la création de l\'intervention');
        }
        return response.json();
    },

    // Projets
    async getProjets() {
        const response = await fetch("http://localhost:5000/projets");
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des projets');
        }
        return response.json();
    },

    // Salariés
    async getSalaries() {
        const response = await fetch("http://localhost:5000/salaries");
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des salariés');
        }
        return response.json();
    },

    async createSalarie(salarieData) {
        const response = await fetch("http://localhost:5000/salaries", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(salarieData),
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la création du salarié');
        }
        return response.json();
    },

    // Projets
    async getProjets() {
        const response = await fetch("http://localhost:5000/projets");
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des projets');
        }
        return response.json();
    },

    async createProjet(projetData) {
        const response = await fetch("http://localhost:5000/projets", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projetData),
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la création du projet');
        }
        return response.json();
    },

    // Employee schedule
    async getEmployeeSchedule(salarieId) {
        const response = await fetch(`http://localhost:5000/interventions/salarie/${salarieId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du planning du salarié');
        }
        return response.json();
    },

    // Project time summary
    async getProjectTimeSummary(projetId) {
        const response = await fetch(`http://localhost:5000/projets/${projetId}/time-summary`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du temps restant du projet');
        }
        return response.json();
    },
    // Clients
    async getClients() {
        const response = await fetch("http://localhost:5000/client");
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des clients');
        }
        return response.json();
    },

    async createClient(clientData) {
        const response = await fetch("http://localhost:5000/client", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientData),
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la création du client');
        }
        return response.json();
    },

    // Materiels
    async getMateriels() {
        const response = await fetch("http://localhost:5000/materiels");
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des matériels');
        }
        return response.json();
    },

    async createMateriel(materielData) {
        const response = await fetch("http://localhost:5000/materiels", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(materielData),
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la création du matériel');
        }
        return response.json();
    },

    async getMaterielsByIntervention(interventionId) {
        const response = await fetch(`http://localhost:5000/materiels/intervention/${interventionId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des matériels de l\'intervention');
        }
        return response.json();
    },
};