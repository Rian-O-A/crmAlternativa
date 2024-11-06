"use client"; // Para o Next.js, certifique-se de que os componentes possam usar hooks como useState

import { useState } from "react";
import CLIENTS from "../database/clients.json";
import CardDataStats from "./CardDataStats";

// Função para formatar a data
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleString("pt-BR", options);
};

// Componente para a linha de cliente na tabela
const ClientRow = ({ client }: { client: typeof CLIENTS[0] }) => (
  <tr key={client.id} className="hover:bg-gray-50 transition duration-200">
    <td className="p-4 border-b border-gray-200">{client.name}</td>
    <td className="p-4 border-b border-gray-200">{client.identifier}</td>
    <td className="p-4 border-b border-gray-200">{client.type}</td>
    <td className="p-4 border-b border-gray-200">{client.email}</td>
    <td className="p-4 border-b border-gray-200">R$ {client.balance.toFixed(2)}</td>
    <td className="p-4 border-b border-gray-200">{formatDate(client.lastConsultation)}</td>
  </tr>
);

// Componente para mostrar mensagem quando nenhum cliente for encontrado
const NoClientsFound = () => (
  <tr>
    <td colSpan={6} className="text-center p-4 text-gray-400">
      Nenhum cliente encontrado.
    </td>
  </tr>
);

// Função principal da tabela de clientes
export default function ClientTable() {
  const [filter, setFilter] = useState("all"); // Filtro de CNPJ ou CPF
  const [searchTerm, setSearchTerm] = useState("");
  const [newClient, setNewClient] = useState({
    name: "",
    identifier: "",
    type: "CPF",
    email: "",
    balance: 0,
    lastConsultation: new Date().toISOString(),
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade da modal

  // Função para adicionar um novo cliente
  const handleAddClient = () => {
    if (!newClient.name || !newClient.identifier || !newClient.email || newClient.balance === 0) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    CLIENTS.push({
      id: CLIENTS.length + 1, // Geração simples de ID
      name: newClient.name,
      identifier: newClient.identifier,
      type: newClient.type,
      email: newClient.email,
      balance: newClient.balance,
      lastConsultation: newClient.lastConsultation,
    });

    setNewClient({ name: "", identifier: "", type: "CPF", email: "", balance: 0, lastConsultation: new Date().toISOString() });
    setIsModalOpen(false); // Fecha a modal após adicionar o cliente
  };

  // Filtragem de clientes com base no tipo e termo de pesquisa
  const filteredClients = CLIENTS.filter(client =>
    (filter === "all" || client.type === filter) &&
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 2xl:gap-8 p-4 md:p-6 bg-gray-100 transition-colors duration-300 rounded-lg">
      <CardDataStats
          title="Clientes Registrados"
          total={filteredClients.length.toString()}
          rate="0.00%"
          levelUp
        >
          <svg className="fill-current text-blue-600 w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm8 0c-1.48 0-4.39.79-5.42 1.95.56.34 1.17.56 1.88.56 2.67 0 8-1.34 8-4v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </CardDataStats>
      <CardDataStats
          title="CPF"
          total={filteredClients.filter((client) => client.type === "CPF").length.toString()}
          rate="0.00%"
          levelUp
        >
          <svg className="fill-current text-blue-600 w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm8 0c-1.48 0-4.39.79-5.42 1.95.56.34 1.17.56 1.88.56 2.67 0 8-1.34 8-4v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </CardDataStats>
      <CardDataStats
          title="CNPJ"
          total={filteredClients.filter((client) => client.type === "CNPJ").length.toString()}
          rate="0.00%"
          levelUp
        >
          <svg className="fill-current text-blue-600 w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm8 0c-1.48 0-4.39.79-5.42 1.95.56.34 1.17.56 1.88.56 2.67 0 8-1.34 8-4v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </CardDataStats>
       
      </div>
    <div className="my-8 p-6 bg-white shadow-xl rounded-lg border border-gray-200">
         {/* Card de Estatísticas */}

      
 
      {/* Cabeçalho */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
        <div className="flex gap-4">
          <select
            className="px-4 py-2 border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="CPF">CPF</option>
            <option value="CNPJ">CNPJ</option>
          </select>

          <input
            type="text"
            placeholder="Pesquisar cliente"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

     

      {/* Tabela de Clientes */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-200">Nome</th>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-200">Identificador</th>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-200">Tipo</th>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-200">Email</th>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-200">Saldo</th>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-200">Última Consulta</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => <ClientRow client={client} key={client.id} />)
            ) : (
              <NoClientsFound />
            )}
          </tbody>
        </table>
      </div>

      {/* Botão para abrir o Modal de Adicionar Cliente */}
      <div className="mt-6 text-right">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none"
        >
          + Adicionar Cliente
        </button>
      </div>

      {/* Modal de Adicionar Cliente */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Adicionar Novo Cliente</h2>

            <input
              type="text"
              className="mb-4 p-3 border border-gray-300 rounded-sm w-full shadow-md focus:ring-2 focus:ring-blue-500"
              placeholder="Nome"
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            />

            <input
              type="text"
              className="mb-4 p-3 border border-gray-300 rounded-md w-full shadow-md focus:ring-2 focus:ring-blue-500"
              placeholder="Identificador (CPF ou CNPJ)"
              value={newClient.identifier}
              onChange={(e) => setNewClient({ ...newClient, identifier: e.target.value })}
            />

            <select
              className="mb-4 p-3 border border-gray-300 rounded-md w-full shadow-md focus:ring-2 focus:ring-blue-500"
              value={newClient.type}
              onChange={(e) => setNewClient({ ...newClient, type: e.target.value })}
            >
              <option value="CPF">CPF</option>
              <option value="CNPJ">CNPJ</option>
            </select>

            <input
              type="email"
              className="mb-4 p-3 border border-gray-300 rounded-md w-full shadow-md focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              value={newClient.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            />

            <input
              type="number"
              className="mb-4 p-3 border border-gray-300 rounded-md w-full shadow-md focus:ring-2 focus:ring-blue-500"
              placeholder="Saldo"
              value={newClient.balance}
              onChange={(e) => setNewClient({ ...newClient, balance: Number(e.target.value) })}
            />

            <div className="flex justify-between mt-6">
              <button
                onClick={handleAddClient}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Adicionar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
