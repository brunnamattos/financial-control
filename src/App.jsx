import React from "react";
import "./style.css";
import FinanceProvider from "./context/FinanceContext";
import TransactionSection from "./components/TransactionSection";
import Summary from "./components/Summary";
import Header from "./components/Header";

export default function App() {
  return (
    <FinanceProvider>
      <Header />

      <main>
        <Summary />
        <TransactionSection />
      </main>
    </FinanceProvider>
  );
}
