import React from "react";
import "./style.css";
import senFinanceLogo from "./assets/images/senfinancelogo.png";
import FinanceProvider from "./context/FinanceContext";
import Card from "./components/Card";
import TransactionSection from "./components/TransactionSection";

export default function App() {
  return (
    <FinanceProvider>
      <div className="App">
        <header>
          <img src={senFinanceLogo} alt="SenFinance Logo" />
        </header>
        <main>
          <section className="dashboard">
            <span className="section-title">Dashboard</span>
            <div className="cards">
              <Card title="Saldo atual" color="blue" transactions={5000} />
              <Card title="Receitas" color="green" transactions={7000} />
              <Card title="Despesas" color="red" transactions={2000} />
            </div>
          </section>
          <section className="dashboard">
            <span className="section-title">Transações</span>
            <TransactionSection />
          </section>
        </main>
      </div>
    </FinanceProvider>
  );
}
