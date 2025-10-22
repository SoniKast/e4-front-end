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
        materielId: ""
    });
    const [projets, setProjets] = useState([]);
    const [salaries, setSalaries] = useState([]);
    const [materielsList, setMaterielsList] = useState([]);
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
                materielId: formData.materielId ? parseInt(formData.materielId) : null
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="materielId">
                        Matériel
                    </label>
                    <select
                        id="materielId"
                        name="materielId"
                        value={formData.materielId}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Sélectionner un matériel</option>
                        {materielsList.map(materiel => (
                            <option key={materiel.id} value={materiel.id}>
                                {materiel.designation}
                            </option>
                        ))}
                    </select>
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