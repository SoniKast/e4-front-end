"use client";
import { useState, useEffect } from "react";
import { apiService } from "../../services/api";
import { useRouter } from "next/navigation";

export default function CreateIntervention() {
    const [formData, setFormData] = useState({
        date: "",
        duree: "",
        projetId: "",
        salarieId: "",
        materiels: []
    });
    const [projets, setProjets] = useState([]);
    const [salaries, setSalaries] = useState([]);
    const [materielsList, setMaterielsList] = useState([]);
    const [selectedMateriels, setSelectedMateriels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [projetsData, salariesData, materielsData] = await Promise.all([
                apiService.getProjets(),
                apiService.getSalaries(),
                apiService.getMateriels()
            ]);
            setProjets(projetsData);
            setSalaries(salariesData);
            setMaterielsList(materielsData);
        } catch (err) {
            setError("Erreur lors du chargement des données");
            console.error("Erreur:", err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMaterielChange = (materielId) => {
        setSelectedMateriels(prev => {
            if (prev.includes(materielId)) {
                return prev.filter(id => id !== materielId);
            } else {
                return [...prev, materielId];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const interventionData = {
                date: new Date(formData.date),
                duree: parseInt(formData.duree),
                projetId: parseInt(formData.projetId),
                salarieId: parseInt(formData.salarieId),
                materiels: selectedMateriels.map(materielId => {
                    const materiel = materielsList.find(m => m.id === materielId);
                    return { designation: materiel.designation };
                })
            };

            await apiService.createIntervention(interventionData);
            router.push("/");
        } catch (err) {
            setError(err.message);
            console.error("Erreur lors de la création:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Créer une intervention</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <strong>Erreur:</strong> {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duree">
                        Durée (heures)
                    </label>
                    <input
                        type="number"
                        id="duree"
                        name="duree"
                        value={formData.duree}
                        onChange={handleChange}
                        min="1"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projetId">
                        Projet
                    </label>
                    <select
                        id="projetId"
                        name="projetId"
                        value={formData.projetId}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Sélectionner un projet</option>
                        {projets.map(projet => (
                            <option key={projet.id} value={projet.id}>
                                {projet.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salarieId">
                        Salarié
                    </label>
                    <select
                        id="salarieId"
                        name="salarieId"
                        value={formData.salarieId}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Sélectionner un salarié</option>
                        {salaries.map(salarie => (
                            <option key={salarie.id} value={salarie.id}>
                                {salarie.prenom} {salarie.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Matériels
                    </label>
                    <div className="space-y-2 max-h-40 overflow-y-auto border rounded p-2">
                        {materielsList.length === 0 ? (
                            <p className="text-gray-500 text-sm">Aucun matériel disponible</p>
                        ) : (
                            materielsList.map(materiel => (
                                <label key={materiel.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedMateriels.includes(materiel.id)}
                                        onChange={() => handleMaterielChange(materiel.id)}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {materiel.designation}
                                    </span>
                                </label>
                            ))
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Sélectionnez les matériels à associer à cette intervention
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                    >
                        {loading ? "Création..." : "Créer l'intervention"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
}