"use client";
import { useState, useEffect } from "react";
import { apiService } from "../../services/api";
import { useRouter } from "next/navigation";

export default function CreateMateriel() {
    const [formData, setFormData] = useState({
        designation: "",
        interventionId: ""
    });
    const [interventions, setInterventions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchInterventions();
    }, []);

    const fetchInterventions = async () => {
        try {
            const interventionsData = await apiService.getInterventions();
            setInterventions(interventionsData);
        } catch (err) {
            setError("Erreur lors du chargement des interventions");
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
            const materielData = {
                designation: formData.designation,
                interventionId: parseInt(formData.interventionId)
            };

            await apiService.createMateriel(materielData);
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
            <h1 className="text-2xl font-bold mb-6">Ajouter un matériel</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <strong>Erreur:</strong> {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">
                        Désignation du matériel
                    </label>
                    <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="interventionId">
                        Intervention associée
                    </label>
                    <select
                        id="interventionId"
                        name="interventionId"
                        value={formData.interventionId}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Sélectionner une intervention</option>
                        {interventions.map(intervention => (
                            <option key={intervention.id} value={intervention.id}>
                                Intervention #{intervention.id} - {new Date(intervention.date).toLocaleDateString()} - {intervention.duree}h
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
                        {loading ? "Création..." : "Ajouter le matériel"}
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