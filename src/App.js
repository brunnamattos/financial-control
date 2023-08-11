import React from "react";
import "./style.css";
import Menu from "./components/Menu";
import Section from "./components/Section";
import Card from "./components/Card";

export default function App() {
  return (
    <div>
      Hello, World!
      <Menu />
      <main>
        <Section title="Dashboard">
          <Card title="Saldo atual" color="blue" value="R$350.000,00" />
          <Card title="Receitas" color="green" value="R$5.000,00" />
          <Card title="Despesas" color="red" value="R$4.000,00" />
        </Section>
        <Section title="Transações recentes">
          
        </Section>
      </main>
    </div>
  );
}
