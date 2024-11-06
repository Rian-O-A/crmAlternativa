"use client";
import React from "react";
import CardDataStats from "./CardDataStats";
import CLIENTS from "../database/clients.json";

export default function DashboardHome() {
  // Dados estáticos para exibir no dashboard
  const cardInformations = {
    totalClients: CLIENTS.length,
    totalCPF: CLIENTS.filter((client) => client.type === "CPF").length,
    totalCNPJ: CLIENTS.filter((client) => client.type === "CNPJ").length,
  };

  return (
    <div className="p-6 w-full space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        
        <CardDataStats
          title="Clientes"
          total={cardInformations?.totalClients.toString()}
          rate="0.00%"
          levelUp
        >
          {/* Ícone de grupo de pessoas */}
          <svg
            className="fill-current text-blue-600 w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm8 0c-1.48 0-4.39.79-5.42 1.95.56.34 1.17.56 1.88.56 2.67 0 8-1.34 8-4v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </CardDataStats>
        
        <CardDataStats
          title="CPF"
          total={cardInformations?.totalCPF.toString()}
          rate="0.00%"
          levelUp
        >
          {/* Ícone de documento para CPF */}
          <svg
            className="fill-current text-green-600 w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM13 9V3.5L18.5 9H13zm-1 4h-2v-2h2v2zm0 4h-2v-2h2v2zm0-8h-2V7h2v2z" />
          </svg>
        </CardDataStats>
        
        <CardDataStats
          title="CNPJ"
          total={cardInformations?.totalCNPJ.toString()}
          rate="0.00%"
          levelUp
        >
          {/* Ícone de prédio para CNPJ */}
          <svg
            className="fill-current text-purple-600 w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 7h8v10h-2v-4h-4v4H6V7h2v3h2V7zM5 2h14v4H5V2zM10 9h4V5h-4v4zm1 8h2v2h-2v-2z" />
          </svg>
        </CardDataStats>
      </div>
    </div>
  );
}
