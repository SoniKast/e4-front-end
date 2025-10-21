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
};