"use client";
import { useState, useEffect } from "react";
import { apiService } from "../../services/api";
import Link from "next/link";

export default function ProjectOverview() {
    const [projets, setProjets] = useState([]);
    const [selectedProjet, setSelectedProjet] = useState("");
    const [timeSummary, setTimeSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjets();
    }, []);

    useEffect(() => {
        if (selectedProjet) {
            fetchProjectTimeSummary(selectedProjet);
        }
    }, [selectedProjet]);

    const fetchProjets = async () => {
        try {
            const data = await apiService.getProjets();
            setProjets(data);
        } catch (err) {
            setError(err.message);
            console.error("Erreur lors du chargement des projets:", err);
        }
    };

    const fetchProjectTimeSummary = async (projetId) => {
        try {
            setLoading(true);
            const data = await apiService.getProjectTimeSummary(projetId);
            setTimeSummary(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Erreur lors du chargement du résumé du projet:", err);
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

    const getProgressPercentage = () => {
        if (!timeSummary) return 0;
        return Math.min(100, (timeSummary.totalTime / 100) * 100); // 100 hours total project duration
    };

    const getProgressColor = (percentage) => {
        if (percentage < 50) return 'bg-green-600';
        if (percentage < 80) return 'bg-yellow-600';
        return 'bg-red-600';
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Vue d'ensemble des Projets</h1>
                <Link
                    href="/"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Retour au tableau de bord
                </Link>
            </div>

            <div className="mb-6">
                <label htmlFor="projet" className="block text-sm font-medium text-gray-700 mb-2">
                    Sélectionner un projet:
                </label>
                <select
                    id="projet"
                    value={selectedProjet}
                    onChange={(e) => setSelectedProjet(e.target.value)}
                    className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Choisir un projet</option>
                    {projets.map((projet) => (
                        <option key={projet.id} value={projet.id}>
                            {projet.nom}
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
                    <div className="text-lg">Chargement des données du projet...</div>
                </div>
            )}

            {!loading && timeSummary && (
                <div className="space-y-6">
                    {/* Project Summary Card */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Résumé du Projet</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-blue-800">Temps total passé</h3>
                                <p className="text-2xl font-bold text-blue-900">{timeSummary.totalTime} heures</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-green-800">Temps restant</h3>
                                <p className="text-2xl font-bold text-green-900">{timeSummary.remainingTime} heures</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-800">Nombre d'interventions</h3>
                                <p className="text-2xl font-bold text-gray-900">{timeSummary.interventions.length}</p>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Progression du projet</h3>
                        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                            <div
                                className={`h-4 rounded-full ${getProgressColor(getProgressPercentage())}`}
                                style={{ width: `${getProgressPercentage()}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>0h</span>
                            <span>{Math.round(getProgressPercentage())}%</span>
                            <span>100h</span>
                        </div>
                    </div>

                    {/* Interventions List */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <h3 className="text-lg font-semibold">Interventions sur ce projet</h3>
                        </div>
                        {timeSummary.interventions.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">
                                Aucune intervention pour ce projet.
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {timeSummary.interventions.map((intervention) => (
                                    <div key={intervention.id} className="px-6 py-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-md font-medium text-gray-900">
                                                    {formatDate(intervention.date)}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    Durée: {intervention.duree} heures
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Salarié: {intervention.salarie?.prenom} {intervention.salarie?.nom}
                                                </p>
                                            </div>
                                            <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                                {intervention.duree}h
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}