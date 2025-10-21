"use client";
import { useState, useEffect } from "react";
import { apiService } from "../../services/api";
import Link from "next/link";

export default function EmployeeSchedule() {
    const [salaries, setSalaries] = useState([]);
    const [selectedSalarie, setSelectedSalarie] = useState("");
    const [interventions, setInterventions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSalaries();
    }, []);

    useEffect(() => {
        if (selectedSalarie) {
            fetchEmployeeSchedule(selectedSalarie);
        }
    }, [selectedSalarie]);

    const fetchSalaries = async () => {
        try {
            const data = await apiService.getSalaries();
            setSalaries(data);
        } catch (err) {
            setError(err.message);
            console.error("Erreur lors du chargement des salariés:", err);
        }
    };

    const fetchEmployeeSchedule = async (salarieId) => {
        try {
            setLoading(true);
            const data = await apiService.getEmployeeSchedule(salarieId);
            setInterventions(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Erreur lors du chargement du planning:", err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Planning des Salariés</h1>
                <Link
                    href="/"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Retour au tableau de bord
                </Link>
            </div>

            <div className="mb-6">
                <label htmlFor="salarie" className="block text-sm font-medium text-gray-700 mb-2">
                    Sélectionner un salarié:
                </label>
                <select
                    id="salarie"
                    value={selectedSalarie}
                    onChange={(e) => setSelectedSalarie(e.target.value)}
                    className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Choisir un salarié</option>
                    {salaries.map((salarie) => (
                        <option key={salarie.id} value={salarie.id}>
                            {salarie.prenom} {salarie.nom}
                        </option>
                    ))}
                </select>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <strong>Erreur:</strong> {error}
                </div>
            )}

            {loading && (
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Chargement du planning...</div>
                </div>
            )}

            {!loading && selectedSalarie && interventions.length === 0 && (
                <div className="bg-gray-100 p-6 rounded-lg text-center">
                    <p className="text-gray-600">Aucune intervention prévue pour ce salarié.</p>
                </div>
            )}

            {!loading && interventions.length > 0 && (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <h2 className="text-lg font-semibold">
                            Planning de {interventions[0]?.salarie?.prenom} {interventions[0]?.salarie?.nom}
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {interventions.map((intervention) => (
                            <div key={intervention.id} className="px-6 py-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {formatDate(intervention.date)}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {formatTime(intervention.date)} - {intervention.duree} heures
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Projet: {intervention.projet?.nom}
                                        </p>
                                    </div>
                                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {intervention.duree}h
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}