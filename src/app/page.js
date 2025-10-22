"use client";
import { useState, useEffect } from "react";
import { apiService } from "../services/api";

export default function Dashboard() {
  const [interventions, setInterventions] = useState([]);
  const [materielsByIntervention, setMaterielsByIntervention] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInterventions();
  }, []);

  const fetchInterventions = async () => {
    try {
      setLoading(true);
      const data = await apiService.getInterventions();
      setInterventions(data);
      setError(null);

      // Récupérer les matériels pour chaque intervention
      const materielsData = {};
      for (const intervention of data) {
        try {
          const materiels = await apiService.getMaterielsByIntervention(intervention.id);
          materielsData[intervention.id] = materiels;
        } catch (err) {
          console.error(`Erreur lors du chargement des matériels pour l'intervention ${intervention.id}:`, err);
          materielsData[intervention.id] = [];
        }
      }
      setMaterielsByIntervention(materielsData);
    } catch (err) {
      setError(err.message);
      console.error("Erreur lors du chargement des interventions:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Chargement des interventions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <strong>Erreur:</strong> {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tableau de bord - Interventions</h1>
      </div>

      {interventions.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p className="text-gray-600">Aucune intervention trouvée.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durée (heures)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salarié
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Matériels
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {interventions.map((intervention) => (
                <tr key={intervention.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(intervention.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {intervention.duree}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {intervention.projet?.nom || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {intervention.salarie ? `${intervention.salarie.prenom} ${intervention.salarie.nom}` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {materielsByIntervention[intervention.id]?.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {materielsByIntervention[intervention.id].map(materiel => (
                          <li key={materiel.id}>{materiel.designation}</li>
                        ))}
                      </ul>
                    ) : (
                      'Aucun matériel'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
