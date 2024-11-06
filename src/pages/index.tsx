import type { NextPage } from "next";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import ClientTable from "../components/Tables";
import DashboardHome from "../components/CardHome";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col w-full h-[100vh]">
      <Header />
      
      <ClientTable />
    </div>
  );
};

export default Home;
