import { useState, useEffect } from "react";
import "./style.css";
import moment from "moment";
import Card from "./components/Card";
import getTotalTransactions from "./components/TotalTransactions";
import senFinanceLogo from "./assets/images/senfinancelogo.png";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(storedCategories);

    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
  }, []);

  const addCategory = (category) => {
    const newCategory = {
      ...category,
    };
    setCategories([...categories, newCategory]);
  };

  const editCategory = (index, updatedCategory) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = updatedCategory;
    setCategories(updatedCategories);
  };

  const deleteCategory = (index) => {
    const updatedCategories = categories.filter((_, idx) => idx !== index);
    setCategories(updatedCategories);
  };

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      date: moment().format("DD/MM/YYYY"),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const editTransaction = (idx, updatedTransaction) => {
    const updatedTransactions = [...transactions];
    updatedTransactions[idx] = updatedTransaction;
    setTransactions(updatedTransactions);
  };

  const deleteTransaction = (idx) => {
    const updatedTransactions = transactions.filter((_, i) => i !== idx);
    setTransactions(updatedTransactions);
  };

  const totalEntradas = getTotalTransactions(transactions);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [categories, transactions]);

  return (
    <div className="App">
      <header>
        <img src={senFinanceLogo} alt="SenFinance Logo" />
      </header>
      <main>
        <section>
          <span className="section-title">Dashboard</span>
          <div className="cards">
            <Card
              title="Saldo atual"
              color="blue"
              transactions={transactions}
            />
            <Card title="Receitas" color="green" transactions={transactions} />
            <Card title="Despesas" color="red" transactions={transactions} />
          </div>
        </section>
        <section>
          <span className="section-title">Transações</span>
        </section>
      </main>
    </div>
  );
}
